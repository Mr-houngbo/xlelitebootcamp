-- ========================================
-- SEED DATA FOR XL ELITE BOOTCAMP
-- ========================================

-- Insert admin user
INSERT INTO users (id, email, password_hash, role) VALUES 
('00000000-0000-0000-0000-000000000001', 'admin@xlbootcamp.com', '$2b$10$hash_placeholder', 'admin');

-- Insert training groups
INSERT INTO groups (id, name, time_slot, max_capacity, current_capacity, is_active) VALUES 
('10000000-0000-0000-0000-000000000001', 'G1', '09h-12h', 20, 0, true),
('10000000-0000-0000-0000-000000000002', 'G2', '14h-17h', 20, 0, true),
('10000000-0000-0000-0000-000000000003', 'G3', '18h-21h', 20, 0, true);

-- Insert companies
INSERT INTO companies (id, name, logo, website, description, is_partner, is_active, participants_trained) VALUES 
('20000000-0000-0000-0000-000000000001', 'Orange Burkina', NULL, 'https://orange.bf', 'Opérateur télécom leader', true, true, 25),
('20000000-0000-0000-0000-000000000002', 'Bank of Africa', NULL, 'https://boa.bf', 'Banque commerciale', true, true, 18),
('20000000-0000-0000-0000-000000000003', 'Sonabel', NULL, 'https://sonabel.bf', 'Société nationale d\'électricité', false, true, 12),
('20000000-0000-0000-0000-000000000004', 'TotalEnergies', NULL, 'https://totalenergies.bf', 'Secteur pétrolier', true, true, 15),
('20000000-0000-0000-0000-000000000005', 'Ministère des Finances', NULL, NULL, 'Administration publique', false, true, 8);

-- Insert testimonials
INSERT INTO testimonials (id, participant_name, participant_photo, company, position, testimonial, rating, is_featured, is_active) VALUES 
('30000000-0000-0000-0000-000000000001', 'Aminata Traoré', NULL, 'Orange Burkina', 'Responsable Marketing', 'Cette formation m\'a permis de passer de 2h à 30min pour mes rapports mensuels. Investissement très rentable!', 5, true, true),
('30000000-0000-0000-0000-000000000002', 'Kader Ouédraogo', NULL, 'Bank of Africa', 'Analyste Financier', 'La certification Excel Expert a boosté ma carrière. J\'ai eu une promotion 3 mois après la formation.', 5, true, true),
('30000000-0000-0000-0000-000000000003', 'Marie Kabore', NULL, 'Sonabel', 'Chef de projet', 'Formateur excellent, pédagogie adaptée. Les cas pratiques sont très pertinents pour notre quotidien.', 5, false, true),
('30000000-0000-0000-0000-000000000004', 'Jean-Baptiste Yaméogo', NULL, 'TotalEnergies', 'Controller de gestion', 'Le meilleur investissement pour ma carrière professionnelle. Je recommande vivement!', 5, true, true),
('30000000-0000-0000-0000-000000000005', 'Fatimata Bâ', NULL, 'Freelance', 'Consultante', 'Formation intensive mais très efficace. J\'ai décroché 3 missions grâce à ma certification.', 5, false, true),
('30000000-0000-0000-0000-000000000006', 'Mohamed Compaoré', NULL, 'Ministère des Finances', 'Économiste', 'L\'approche par cas réels m\'a permis d\'appliquer directement mes nouvelles compétences.', 4, false, true);

-- Insert gallery images
INSERT INTO gallery (id, title, image_url, thumbnail_url, category, is_featured, is_active, sort_order) VALUES 
('40000000-0000-0000-0000-000000000001', 'Session G1 - Jour 1', '/images/gallery/g1-day1.jpg', '/images/gallery/thumbnails/g1-day1.jpg', 'training', true, true, 1),
('40000000-0000-0000-0000-000000000002', 'Certification Microsoft', '/images/gallery/certification.jpg', '/images/gallery/thumbnails/certification.jpg', 'certification', true, true, 2),
('40000000-0000-0000-0000-000000000003', 'Salle de formation Ouaga 2000', '/images/gallery/venue.jpg', '/images/gallery/thumbnails/venue.jpg', 'venue', false, true, 3),
('40000000-0000-0000-0000-000000000004', 'Formateur Leonce SODJINOU', '/images/gallery/trainer.jpg', '/images/gallery/thumbnails/trainer.jpg', 'team', true, true, 4),
('40000000-0000-0000-0000-000000000005', 'Travaux pratiques', '/images/gallery/practical.jpg', '/images/gallery/thumbnails/practical.jpg', 'training', false, true, 5),
('40000000-0000-0000-0000-000000000006', 'Cérémonie de remise des certificats', '/images/gallery/ceremony.jpg', '/images/gallery/thumbnails/ceremony.jpg', 'certification', true, true, 6);

-- Insert training sessions
INSERT INTO training_sessions (id, title, description, session_date, start_time, end_time, group_id, location, is_online, meeting_link, notes) VALUES 
('50000000-0000-0000-0000-000000000001', 'Jour 1: Fondamentaux Excel Avancé', 'Maîtrise des fonctions complexes, mise en forme conditionnelle, validation', '2025-06-09', '09:00:00', '12:00:00', '10000000-0000-0000-0000-000000000001', 'Ouaga 2000, Bâtiment A', false, NULL, 'Apporter ordinateur portable'),
('50000000-0000-0000-0000-000000000002', 'Jour 2: Analyse de Données', 'Tableaux croisés dynamiques, Power Query, graphiques avancés', '2025-06-10', '09:00:00', '12:00:00', '10000000-0000-0000-0000-000000000001', 'Ouaga 2000, Bâtiment A', false, NULL, 'Exercices pratiques sur données réelles'),
('50000000-0000-0000-0000-000000000003', 'Jour 3: Automatisation & VBA', 'Macros VBA, automatisation des tâches répétitives', '2025-06-11', '09:00:00', '12:00:00', '10000000-0000-0000-0000-000000000001', 'Ouaga 2000, Bâtiment A', false, NULL, 'Aucun prérequis VBA nécessaire'),
('50000000-0000-0000-0000-000000000004', 'Jour 4: Certification & Projets', 'Examen blanc, projets finaux, préparation certification', '2025-06-12', '09:00:00', '12:00:00', '10000000-0000-0000-0000-000000000001', 'Ouaga 2000, Bâtiment A', false, NULL, 'Session certification officielle'),
('50000000-0000-0000-0000-000000000005', 'Jour 1: Fondamentaux Excel Avancé', 'Maîtrise des fonctions complexes, mise en forme conditionnelle, validation', '2025-06-09', '14:00:00', '17:00:00', '10000000-0000-0000-0000-000000000002', 'Ouaga 2000, Bâtiment B', false, NULL, 'Apporter ordinateur portable'),
('50000000-0000-0000-0000-000000000006', 'Jour 2: Analyse de Données', 'Tableaux croisés dynamiques, Power Query, graphiques avancés', '2025-06-10', '14:00:00', '17:00:00', '10000000-0000-0000-0000-000000000002', 'Ouaga 2000, Bâtiment B', false, NULL, 'Exercices pratiques sur données réelles'),
('50000000-0000-0000-0000-000000000007', 'Jour 3: Automatisation & VBA', 'Macros VBA, automatisation des tâches répétitives', '2025-06-11', '14:00:00', '17:00:00', '10000000-0000-0000-0000-000000000002', 'Ouaga 2000, Bâtiment B', false, NULL, 'Aucun prérequis VBA nécessaire'),
('50000000-0000-0000-0000-000000000008', 'Jour 4: Certification & Projets', 'Examen blanc, projets finaux, préparation certification', '2025-06-12', '14:00:00', '17:00:00', '10000000-0000-0000-0000-000000000002', 'Ouaga 2000, Bâtiment B', false, NULL, 'Session certification officielle'),
('50000000-0000-0000-0000-000000000009', 'Jour 1: Fondamentaux Excel Avancé', 'Maîtrise des fonctions complexes, mise en forme conditionnelle, validation', '2025-06-09', '18:00:00', '21:00:00', '10000000-0000-0000-0000-000000000003', 'Online (Zoom)', true, 'https://zoom.us/j/123456789', 'Lien envoyé 48h avant'),
('50000000-0000-0000-0000-000000000010', 'Jour 2: Analyse de Données', 'Tableaux croisés dynamiques, Power Query, graphiques avancés', '2025-06-10', '18:00:00', '21:00:00', '10000000-0000-0000-0000-000000000003', 'Online (Zoom)', true, 'https://zoom.us/j/123456789', 'Exercices sur fichiers partagés'),
('50000000-0000-0000-0000-000000000011', 'Jour 3: Automatisation & VBA', 'Macros VBA, automatisation des tâches répétitives', '2025-06-11', '18:00:00', '21:00:00', '10000000-0000-0000-0000-000000000003', 'Online (Zoom)', true, 'https://zoom.us/j/123456789', 'Support VBA en direct'),
('50000000-0000-0000-0000-000000000012', 'Jour 4: Certification & Projets', 'Examen blanc, projets finaux, préparation certification', '2025-06-12', '18:00:00', '21:00:00', '10000000-0000-0000-0000-000000000003', 'Online (Zoom)', true, 'https://zoom.us/j/123456789', 'Certification en ligne');

-- Insert sample participants (for testing)
INSERT INTO participants (id, first_name, last_name, email, phone, company, position, profile_type, source, message, status, created_at, updated_at) VALUES 
('60000000-0000-0000-0000-000000000001', 'Aminata', 'Traoré', 'amina.traore@email.com', '+226 70 00 00 00', 'Orange Burkina', 'Responsable Marketing', 'cadre', 'linkedin', 'Très intéressée par cette formation', 'confirmed', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
('60000000-0000-0000-0000-000000000002', 'Kader', 'Ouédraogo', 'kader.ouedraogo@email.com', '+226 71 00 00 00', 'Bank of Africa', 'Analyste Financier', 'cadre', 'direct', 'Besoin de certification pour promotion', 'confirmed', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('60000000-0000-0000-0000-000000000003', 'Marie', 'Kabore', 'marie.kabore@email.com', '+226 72 00 00 00', 'Sonabel', 'Chef de projet', 'cadre', 'referral', 'Recommandé par un collègue', 'lead', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('60000000-0000-0000-0000-000000000004', 'Jean-Baptiste', 'Yaméogo', 'jb.yameogo@email.com', '+226 73 00 00 00', 'TotalEnergies', 'Controller de gestion', 'cadre', 'facebook', 'Formation recommandée', 'confirmed', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('60000000-0000-0000-0000-000000000005', 'Fatimata', 'Bâ', 'fatimata.ba@email.com', '+226 74 00 00 00', NULL, 'Consultante', 'freelance', 'instagram', 'Besoin de compétences Excel pour missions', 'lead', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day');

-- Insert sample registrations
INSERT INTO registrations (id, participant_id, group_id, registration_fee_amount, training_fee_amount, total_amount, payment_status, registration_fee_paid, training_fee_paid, payment_method, payment_reference, notes, created_at, updated_at) VALUES 
('70000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 25000, 125000, 150000, 'paid', true, true, 'mobile_money', 'MOOV123456', 'Paiement complet reçu', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('70000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 25000, 125000, 150000, 'partial', true, false, 'bank_transfer', 'BANK789012', 'Frais inscription payés', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('70000000-0000-0000-0000-000000000003', '60000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', 25000, 125000, 150000, 'pending', false, false, NULL, NULL, 'En attente de paiement', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('70000000-0000-0000-0000-000000000004', '60000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 25000, 125000, 150000, 'paid', true, true, 'mobile_money', 'ORANGE345678', 'Paiement complet reçu', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day');

-- Update group capacities based on registrations
UPDATE groups SET current_capacity = 2 WHERE id = '10000000-0000-0000-0000-000000000001';
UPDATE groups SET current_capacity = 1 WHERE id = '10000000-0000-0000-0000-000000000002';
UPDATE groups SET current_capacity = 1 WHERE id = '10000000-0000-0000-0000-000000000003';

-- Insert sample email logs
INSERT INTO email_logs (id, to_email, subject, template_name, status, sent_at, error_message, metadata) VALUES 
('80000000-0000-0000-0000-000000000001', 'amina.traore@email.com', 'Confirmation d''inscription - XL Elite Bootcamp Excel Expert', 'REGISTRATION_CONFIRMATION', 'sent', NOW() - INTERVAL '6 days', NULL, '{"participant_id": "60000000-0000-0000-0000-000000000001"}'),
('80000000-0000-0000-0000-000000000002', 'kader.ouedraogo@email.com', 'Confirmation d''inscription - XL Elite Bootcamp Excel Expert', 'REGISTRATION_CONFIRMATION', 'sent', NOW() - INTERVAL '4 days', NULL, '{"participant_id": "60000000-0000-0000-0000-000000000002"}'),
('80000000-0000-0000-0000-000000000003', 'admin@xlbootcamp.com', 'Nouvelle inscription - XL Elite Bootcamp', 'ADMIN_NEW_REGISTRATION', 'sent', NOW() - INTERVAL '6 days', NULL, '{"participant_id": "60000000-0000-0000-0000-000000000001"}'),
('80000000-0000-0000-0000-000000000004', 'amina.traore@email.com', 'Confirmation de paiement - XL Elite Bootcamp', 'PAYMENT_CONFIRMATION', 'sent', NOW() - INTERVAL '6 days', NULL, '{"participant_id": "60000000-0000-0000-0000-000000000001"}');
