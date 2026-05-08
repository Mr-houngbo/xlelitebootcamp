-- Insérer les 3 groupes de base
INSERT INTO groups (name, time_slot, max_capacity, current_capacity, is_active) VALUES
('G1', '09h-12h', 20, 0, true),
('G2', '14h-17h', 20, 0, true),
('G3', '18h-21h', 20, 0, true)
ON CONFLICT (name) DO NOTHING;
