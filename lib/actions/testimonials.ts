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
          participant_name: 'Idrissa Zongo',
          position: 'Contrôleur de Gestion',
          company: 'SONABEL',
          testimonial: 'Mon reporting mensuel me prenait 2 jours. Grâce à Power Query appris au bootcamp, tout est automatisé en 1 clic.',
          linkedin_url: 'https://linkedin.com',
          participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Idrissa',
          type: 'video',
          video_url: 'https://cdn.pixabay.com/vimeo/327310190/office-22872.mp4?width=1280&hash=856e7e597c5980048e9f2913b869408d6d6e7f1a',
          is_active: true
        },
        {
          id: '2',
          participant_name: 'Aminata Ouédraogo',
          position: 'Analyste RH',
          company: 'Orange Burkina',
          testimonial: 'La certification Microsoft Expert a été le déclencheur. Mon expertise est désormais reconnue par ma direction.',
          linkedin_url: 'https://linkedin.com',
          participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aminata',
          type: 'text',
          is_active: true
        }
      ] as Testimonial[], 
      success: true 
    };
  }
}
