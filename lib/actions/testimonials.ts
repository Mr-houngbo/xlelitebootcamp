import { createClient } from '@/lib/supabase/server';
import { Testimonial } from '@/types/database';

export async function getTestimonials() {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data as Testimonial[], success: true };
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    // Fallback data for immediate display if DB is empty
    return { 
      data: [
        {
          id: '1',
          participant_name: 'Boling Faraba Dembele',
          position: 'Auditeur Interne',
          company: 'IBI Groupe',
          testimonial: "Vraiment j'ai été transformé par ce Cabinet Smart Otobos Consulting, la pédagogie de M LEONCE (coach) et le niveau de la formation étaient au summum de nos attentes . Alors vivement la prochaine formation .",
          linkedin_url: '#',
          participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Boling',
          type: 'text',
          is_active: true,
          rating: 5
        },
        {
          id: '2',
          participant_name: 'Abou Ouattara',
          position: 'Gestionnaire RH',
          company: 'Ouagadougou',
          testimonial: "Un grand merci au Cabinet Otobos Consulting et particulièrement à notre formateur, Léonce Toundé SODJINOU, pour la perfection avec laquelle la formation a été administrée, avec en plus, un coaching participatif et motivateur.",
          linkedin_url: '#',
          participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abou',
          type: 'text',
          is_active: true,
          rating: 5
        },
        {
          id: '3',
          participant_name: 'Ib Zahara',
          position: 'Créateur Digital',
          company: 'Cote d\'ivoire',
          testimonial: "Bonjour Coach, nous avons été très satisfait de la qualité et temps accorder aux participants. Franchement ça me fait un bout de temps sur les formations en ligne, la votre a été du jamais vu de ma part.",
          linkedin_url: '#',
          participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zahara',
          type: 'text',
          is_active: true,
          rating: 5
        },
        {
          id: '4',
          participant_name: 'Harris Djounga',
          position: 'Professionnel',
          company: 'Accra',
          testimonial: "Merci pour tout, formateur excellent, technique de formation de bonne qualité, contenu riche et varié. De toute les formations en ligne que j'ai déjà faite, la votre est de loin la meilleur et sans comparaison.",
          linkedin_url: '#',
          participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harris',
          type: 'text',
          is_active: true,
          rating: 5
        }
      ] as Testimonial[], 
      success: true 
    };
  }
}
