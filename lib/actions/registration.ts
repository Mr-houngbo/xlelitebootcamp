'use server';

import { createClient } from '@supabase/supabase-js';
import { RegistrationFormData } from '@/types/database';
import { ERROR_MESSAGES } from '@/lib/validations';

// Singleton : un seul client Supabase Service Role côté serveur
// NE JAMAIS utiliser ce client dans des composants client (browser)
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export async function createRegistration(data: RegistrationFormData) {
  const supabase = getSupabaseAdmin();

  try {
    // Check if participant already exists
    const { data: existingParticipant, error: checkError } = await supabase
      .from('participants')
      .select('id, first_name, last_name')
      .eq('email', data.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing participant:', checkError);
      return {
        success: false,
        error: 'Erreur lors de la vérification de l\'email',
      };
    }

    if (existingParticipant) {
      return {
        success: false,
        error: `Cet email (${data.email}) est déjà inscrit. ${existingParticipant.first_name} ${existingParticipant.last_name} a déjà complété une inscription.`,
      };
    }

    // Create participant
    const { data: participant, error: participantError } = await supabase
      .from('participants')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        position: data.position,
        profile_type: data.profileType,
        source: data.source,
        message: `[PAYS: ${data.country}] [FORMAT: ${data.format}] ${data.message || ''}`,
        status: 'lead',
      })
      .select()
      .single();

    if (participantError) {
      console.error('Error creating participant:', participantError);
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }

    // Create registration
    const { data: registration, error: registrationError } = await supabase
      .from('registrations')
      .insert({
        participant_id: participant.id,
        group_id: data.groupId,
        registration_fee_amount: 25000,
        training_fee_amount: 150000,
        payment_status: 'pending',
        registration_fee_paid: false,
        training_fee_paid: false,
      })
      .select()
      .single();

    if (registrationError) {
      console.error('Error creating registration:', registrationError);
      // Rollback participant creation
      await supabase.from('participants').delete().eq('id', participant.id);
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }

    // Mise à jour atomique de la capacité via RPC SQL pour éviter les race conditions
    // La fonction SQL fait un UPDATE ... SET current_capacity = current_capacity + 1
    const { error: updateError } = await supabase.rpc('increment_group_capacity', {
      p_group_id: data.groupId,
    });

    if (updateError) {
      // Non bloquant : l'inscription est créée, juste la capacité peut être désynchronisée
      console.error('Error updating group capacity (non-blocking):', updateError);
    }

    return {
      success: true,
      data: {
        participant,
        registration,
      },
    };

  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
}

export async function getGroups() {
  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching groups:', error);
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }

    return {
      success: true,
      data: data || [],
    };

  } catch (error) {
    console.error('Groups fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
}

export async function checkGroupAvailability(groupId: string) {
  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase
      .from('groups')
      .select('id, max_capacity, current_capacity')
      .eq('id', groupId)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error checking group availability:', error);
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }

    if (!data) {
      return {
        success: false,
        error: ERROR_MESSAGES.GROUP_FULL,
      };
    }

    const isAvailable = data.current_capacity < data.max_capacity;

    return {
      success: true,
      data: {
        ...data,
        available: isAvailable,
        remaining: data.max_capacity - data.current_capacity,
      },
    };

  } catch (error) {
    console.error('Group availability check error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
}
