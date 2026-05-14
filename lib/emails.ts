import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ========================================
// EMAIL TEMPLATES
// ========================================

export const EMAIL_TEMPLATES = {
  // Registration confirmation email
  REGISTRATION_CONFIRMATION: {
    subject: 'Confirmation d\'inscription - XL Elite Bootcamp Excel Expert',
    html: (data: {
      firstName: string;
      lastName: string;
      groupName: string;
      timeSlot: string;
      registrationFee: number;
      trainingFee: number;
      totalAmount: number;
      deadline: string;
    }) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation d'inscription - XL Elite Bootcamp</title>
        <style>
          body { font-family: Inter, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10B981, #F59E0B); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px; }
          .highlight { background: #f9fafb; padding: 20px; border-left: 4px solid #10B981; margin: 20px 0; }
          .cta { background: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Inscription Confirmée!</h1>
            <p>XL Elite Bootcamp - Formation Microsoft Excel Expert</p>
          </div>
          
          <div class="content">
            <p>Bonjour ${data.firstName} ${data.lastName},</p>
            
            <p>Nous sommes ravis de confirmer votre inscription à notre formation Microsoft Excel Expert!</p>
            
            <div class="highlight">
              <h3>📋 Détails de votre inscription</h3>
              <p><strong>Groupe:</strong> ${data.groupName}</p>
              <p><strong>Horaires:</strong> ${data.timeSlot}</p>
              <p><strong>Dates:</strong> 09 au 13 juin 2026</p>
            </div>
            
            <div class="highlight">
              <h3>💰 Coût de la formation</h3>
              <p><strong>Frais d'inscription:</strong> ${data.registrationFee.toLocaleString()} FCFA</p>
              <p><strong>Frais de formation:</strong> ${data.trainingFee.toLocaleString()} FCFA</p>
              <p><strong>Total:</strong> <strong>${data.totalAmount.toLocaleString()} FCFA</strong></p>
            </div>
            
            <div class="highlight">
              <h3>⏰ Deadline importante</h3>
              <p>Pour finaliser votre inscription, veuillez régler les frais avant le <strong>${data.deadline}</strong>.</p>
              <p>Les places sont limitées à 20 participants par groupe pour garantir une qualité optimale.</p>
            </div>
            
            <h3>🎯 Ce que vous obtiendrez</h3>
            <ul>
              <li>Formation intensive de 5 jours avec un formateur certifié Microsoft</li>
              <li>2 vouchers pour la certification Microsoft Excel Expert</li>
              <li>Licence Office 365 offerte</li>
              <li>Support post-formation de 3 mois</li>
            </ul>
            
            <h3>📞 Prochaines étapes</h3>
            <p>1. Effectuez le paiement via les méthodes suivantes:</p>
            <ul>
              <li>Mobile Money: +226 XX XX XX XX</li>
              <li>Virement bancaire: [Coordonnées bancaires]</li>
            </ul>
            <p>2. Envoyez nous la preuve de paiement par email</p>
            <p>3. Vous recevrez les détails de connexion pour la formation</p>
            
            <p>Pour toute question, n'hésitez pas à nous contacter:</p>
            <p>📧 Email: contact@xlbootcamp.com</p>
            <p>📱 Téléphone: +226 XX XX XX XX</p>
            
            <p>Nous avons hâte de vous accueillir!</p>
            <p>Cordialement,<br>L'équipe XL Elite Bootcamp</p>
          </div>
          
          <div class="footer">
            <p>© 2026 XL Elite Bootcamp - Tous droits réservés</p>
            <p>L'excellence Excel, en 5 jours.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },

  // Payment confirmation email
  PAYMENT_CONFIRMATION: {
    subject: 'Confirmation de paiement - XL Elite Bootcamp',
    html: (data: {
      firstName: string;
      lastName: string;
      amountPaid: number;
      paymentMethod: string;
      groupName: string;
    }) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de paiement - XL Elite Bootcamp</title>
        <style>
          body { font-family: Inter, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10B981, #F59E0B); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px; }
          .success { background: #d1fae5; color: #065f46; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Paiement Confirmé!</h1>
            <p>XL Elite Bootcamp - Formation Microsoft Excel Expert</p>
          </div>
          
          <div class="content">
            <p>Bonjour ${data.firstName} ${data.lastName},</p>
            
            <div class="success">
              <h3>🎉 Votre paiement a été reçu avec succès!</h3>
              <p><strong>Montant:</strong> ${data.amountPaid.toLocaleString()} FCFA</p>
              <p><strong>Méthode:</strong> ${data.paymentMethod}</p>
              <p><strong>Groupe:</strong> ${data.groupName}</p>
            </div>
            
            <p>Votre inscription est maintenant finalisée. Vous êtes officiellement inscrit à notre formation Microsoft Excel Expert!</p>
            
            <h3>📅 Dates importantes</h3>
            <p><strong>Début de la formation:</strong> Lundi 9 juin 2026</p>
            <p><strong>Fin de la formation:</strong> Vendredi 13 juin 2026</p>
            
            <h3>🎯 Ce qui vous attend</h3>
            <ul>
              <li>5 jours de formation intensive</li>
              <li>Formateur certifié Microsoft</li>
              <li>Petits groupes (max 20 participants)</li>
              <li>Certification Microsoft Excel Expert</li>
              <li>Licence Office 365 offerte</li>
            </ul>
            
            <h3>📍 Lieu de formation</h3>
            <p>Format hybride disponible:</p>
            <ul>
              <li>🏢 Présentiel: Ouaga 2000 (adresse exacte communiquée prochainement)</li>
              <li>💻 Online: Lien de connexion envoyé 48h avant le début</li>
            </ul>
            
            <p>Nous vous contacterons prochainement avec:</p>
            <ul>
              <li>Le lien pour la formation en ligne (si applicable)</li>
              <li>Les prérequis et matériel nécessaire</li>
              <li>Le programme détaillé jour par jour</li>
            </ul>
            
            <p>Pour toute question, nous sommes à votre disposition:</p>
            <p>📧 Email: contact@xlbootcamp.com</p>
            <p>📱 Téléphone: +226 XX XX XX XX</p>
            
            <p>Nous avons hâte de vous accompagner dans votre montée en compétences Excel!</p>
            <p>Cordialement,<br>L'équipe XL Elite Bootcamp</p>
          </div>
          
          <div class="footer">
            <p>© 2026 XL Elite Bootcamp - Tous droits réservés</p>
            <p>L'excellence Excel, en 5 jours.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },

  // Admin notification for new registration
  ADMIN_NEW_REGISTRATION: {
    subject: 'Nouvelle inscription - XL Elite Bootcamp',
    html: (data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      company?: string;
      position?: string;
      profileType: string;
      source: string;
      groupName: string;
      message?: string;
    }) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle inscription - XL Elite Bootcamp</title>
        <style>
          body { font-family: Inter, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10B981, #F59E0B); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px; }
          .info { background: #f9fafb; padding: 15px; border-left: 4px solid #10B981; margin: 10px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🆕 Nouvelle Inscription</h1>
            <p>XL Elite Bootcamp - Admin Notification</p>
          </div>
          
          <div class="content">
            <p>Une nouvelle inscription a été enregistrée sur la plateforme:</p>
            
            <div class="info">
              <h3>👤 Informations du participant</h3>
              <p><strong>Nom:</strong> ${data.firstName} ${data.lastName}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Téléphone:</strong> ${data.phone}</p>
              ${data.company ? `<p><strong>Entreprise:</strong> ${data.company}</p>` : ''}
              ${data.position ? `<p><strong>Poste:</strong> ${data.position}</p>` : ''}
              <p><strong>Profil:</strong> ${data.profileType}</p>
              <p><strong>Source:</strong> ${data.source}</p>
              <p><strong>Groupe:</strong> ${data.groupName}</p>
              ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
            </div>
            
            <h3>📊 Actions requises</h3>
            <ul>
              <li>✅ Confirmer la disponibilité des places dans le groupe</li>
              <li>💰 Suivre le processus de paiement</li>
              <li>📧 Envoyer les instructions de paiement si nécessaire</li>
              <li>📞 Contacter le participant pour plus d'informations</li>
            </ul>
            
            <p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/participants" 
                 style="background: #10B981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Voir dans l'admin
              </a>
            </p>
          </div>
          
          <div class="footer">
            <p>© 2026 XL Elite Bootcamp - Tous droits réservés</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },
} as const;

// ========================================
// EMAIL SENDING FUNCTIONS
// ========================================

export async function sendRegistrationConfirmation(data: {
  firstName: string;
  lastName: string;
  email: string;
  groupName: string;
  timeSlot: string;
  registrationFee: number;
  trainingFee: number;
  totalAmount: number;
  deadline: string;
}) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: [data.email],
      subject: EMAIL_TEMPLATES.REGISTRATION_CONFIRMATION.subject,
      html: EMAIL_TEMPLATES.REGISTRATION_CONFIRMATION.html(data),
    });

    if (error) {
      console.error('Error sending registration confirmation:', error);
      throw error;
    }

    return result;
  } catch (error) {
    console.error('Failed to send registration confirmation:', error);
    throw error;
  }
}

export async function sendPaymentConfirmation(data: {
  firstName: string;
  lastName: string;
  email: string;
  amountPaid: number;
  paymentMethod: string;
  groupName: string;
}) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: [data.email],
      subject: EMAIL_TEMPLATES.PAYMENT_CONFIRMATION.subject,
      html: EMAIL_TEMPLATES.PAYMENT_CONFIRMATION.html(data),
    });

    if (error) {
      console.error('Error sending payment confirmation:', error);
      throw error;
    }

    return result;
  } catch (error) {
    console.error('Failed to send payment confirmation:', error);
    throw error;
  }
}

export async function sendAdminNotification(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  profileType: string;
  source: string;
  groupName: string;
  message?: string;
}) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: [process.env.ADMIN_EMAIL!],
      subject: EMAIL_TEMPLATES.ADMIN_NEW_REGISTRATION.subject,
      html: EMAIL_TEMPLATES.ADMIN_NEW_REGISTRATION.html(data),
    });

    if (error) {
      console.error('Error sending admin notification:', error);
      throw error;
    }

    return result;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    throw error;
  }
}

// ========================================
// EMAIL LOGGING
// ========================================

export async function logEmail(data: {
  toEmail: string;
  subject: string;
  templateName: string;
  status: 'sent' | 'delivered' | 'bounced' | 'failed';
  errorMessage?: string;
  metadata?: Record<string, any>;
}) {
  // Implementation would log to database
  // This is a placeholder for the actual logging logic
  console.log('Email logged:', data);
}
