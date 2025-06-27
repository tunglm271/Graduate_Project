-- Insert Indicator Groups
INSERT INTO indicator_groups (id, name) VALUES
(1, 'Chỉ số huyết học'),
(2, 'Sinh hóa máu'),
(3, 'Nước tiểu'),
(4, 'Chức năng gan'),
(5, 'Chức năng thận'),
(6, 'Lipid máu'),
(7, 'Đường huyết'),
(8, 'Dấu hiệu sinh tồn'),
(9, 'Điện giải đồ'),
(10, 'Hormone'),
(11, 'Viêm gan'),
(12, 'Miễn dịch'),
(13, 'Đông máu');


-- Insert Indicator Types
INSERT INTO indicator_types (indicator_group_id, name, unit) VALUES
-- Huyết học (Hematology)
(1, 'Hồng cầu (RBC)', '10^12/L'),
(1, 'Bạch cầu (WBC)', '10^9/L'),
(1, 'Tiểu cầu (PLT)', '10^9/L'),
(1, 'Hemoglobin (Hb)', 'g/L'),
(1, 'Hematocrit (HCT)', '%'),
(1, 'MCV', 'fL'),
(1, 'MCH', 'pg'),
(1, 'MCHC', 'g/L'),
(1, 'RDW', '%'),
(1, 'MPV', 'fL'),
(1, 'PDW', '%'),
(1, 'Neutrophil', '%'),
(1, 'Lymphocyte', '%'),
(1, 'Monocyte', '%'),
(1, 'Eosinophil', '%'),
(1, 'Basophil', '%'),

-- Sinh hóa máu (Blood Biochemistry)
(2, 'Glucose', 'mmol/L'),
(2, 'HbA1c', '%'),
(2, 'Urea', 'mmol/L'),
(2, 'Creatinine', 'μmol/L'),
(2, 'Acid Uric', 'μmol/L'),
(2, 'Protein toàn phần', 'g/L'),
(2, 'Albumin', 'g/L'),
(2, 'Globulin', 'g/L'),
(2, 'Bilirubin toàn phần', 'μmol/L'),
(2, 'Bilirubin trực tiếp', 'μmol/L'),
(2, 'GGT', 'U/L'),
(2, 'AST/SGOT', 'U/L'),
(2, 'ALT/SGPT', 'U/L'),
(2, 'ALP', 'U/L'),
(2, 'LDH', 'U/L'),
(2, 'CK', 'U/L'),
(2, 'CK-MB', 'U/L'),
(2, 'Troponin I', 'ng/mL'),
(2, 'Troponin T', 'ng/mL'),
(2, 'CRP', 'mg/L'),

-- Nước tiểu (Urine)
(3, 'Tỷ trọng', ''),
(3, 'pH', ''),
(3, 'Protein', ''),
(3, 'Glucose', ''),
(3, 'Ketone', ''),
(3, 'Bilirubin', ''),
(3, 'Urobilinogen', ''),
(3, 'Nitrite', ''),
(3, 'Hồng cầu', '/μL'),
(3, 'Bạch cầu', '/μL'),
(3, 'Tế bào biểu mô', '/μL'),
(3, 'Vi khuẩn', ''),
(3, 'Trụ niệu', '/μL'),

-- Chức năng gan (Liver Function)
(4, 'AST/SGOT', 'U/L'),
(4, 'ALT/SGPT', 'U/L'),
(4, 'ALP', 'U/L'),
(4, 'GGT', 'U/L'),
(4, 'Bilirubin toàn phần', 'μmol/L'),
(4, 'Bilirubin trực tiếp', 'μmol/L'),
(4, 'Protein toàn phần', 'g/L'),
(4, 'Albumin', 'g/L'),
(4, 'Globulin', 'g/L'),
(4, 'Tỷ lệ A/G', ''),

-- Chức năng thận (Kidney Function)
(5, 'Urea', 'mmol/L'),
(5, 'Creatinine', 'μmol/L'),
(5, 'eGFR', 'mL/min/1.73m²'),
(5, 'Acid Uric', 'μmol/L'),
(5, 'Microalbumin niệu', 'mg/L'),
(5, 'Protein niệu 24h', 'g/24h'),

-- Lipid máu (Blood Lipids)
(6, 'Cholesterol toàn phần', 'mmol/L'),
(6, 'Triglyceride', 'mmol/L'),
(6, 'HDL-C', 'mmol/L'),
(6, 'LDL-C', 'mmol/L'),
(6, 'Non-HDL-C', 'mmol/L'),
(6, 'Tỷ lệ Cholesterol/HDL', ''),
(6, 'Tỷ lệ LDL/HDL', ''),
(6, 'Apolipoprotein A1', 'g/L'),
(6, 'Apolipoprotein B', 'g/L'),
(6, 'Lp(a)', 'mg/L'),

-- Đường huyết (Blood Glucose)
(7, 'Glucose lúc đói', 'mmol/L'),
(7, 'HbA1c', '%'),
(7, 'Glucose sau ăn 2h', 'mmol/L'),
(7, 'Insulin', 'mU/L'),
(7, 'C-peptide', 'nmol/L'),
(7, 'HOMA-IR', ''),

-- Dấu hiệu sinh tồn (Vital Signs)
(8, 'Huyết áp tâm thu', 'mmHg'),
(8, 'Huyết áp tâm trương', 'mmHg'),
(8, 'Nhịp tim', 'lần/phút'),
(8, 'Nhịp thở', 'lần/phút'),
(8, 'Nhiệt độ', '°C'),
(8, 'SpO2', '%'),
(8, 'Cân nặng', 'kg'),
(8, 'Chiều cao', 'cm'),
(8, 'BMI', 'kg/m²'),
(8, 'Vòng eo', 'cm'),

-- Điện giải đồ (Electrolytes)
(9, 'Natri (Na+)', 'mmol/L'),
(9, 'Kali (K+)', 'mmol/L'),
(9, 'Clo (Cl-)', 'mmol/L'),
(9, 'Canxi toàn phần', 'mmol/L'),
(9, 'Canxi ion hoá', 'mmol/L'),
(9, 'Phospho', 'mmol/L'),
(9, 'Magie', 'mmol/L'),
(9, 'HCO3-', 'mmol/L'),

-- Hormone (Hormones)
(10, 'TSH', 'mU/L'),
(10, 'FT3', 'pmol/L'),
(10, 'FT4', 'pmol/L'),
(10, 'Cortisol', 'nmol/L'),
(10, 'FSH', 'U/L'),
(10, 'LH', 'U/L'),
(10, 'Progesterone', 'nmol/L'),
(10, 'Estradiol', 'pmol/L'),
(10, 'Testosterone', 'nmol/L'),
(10, 'Prolactin', 'mU/L'),
(10, 'GH', 'mU/L'),
(10, 'IGF-1', 'ng/mL'),
(10, 'ACTH', 'pg/mL'),
(10, 'PTH', 'ng/L'),
(10, 'Insulin', 'mU/L'),

-- Viêm gan (Hepatitis)
(11, 'HBsAg', ''),
(11, 'Anti-HBs', ''),
(11, 'HBeAg', ''),
(11, 'Anti-HBe', ''),
(11, 'Anti-HBc', ''),
(11, 'Anti-HBc IgM', ''),
(11, 'HBV DNA', 'IU/mL'),
(11, 'Anti-HAV IgG', ''),
(11, 'Anti-HAV IgM', ''),
(11, 'Anti-HCV', ''),
(11, 'HCV RNA', 'IU/mL'),
(11, 'Anti-HDV', ''),

-- Miễn dịch (Immunology)
(12, 'ANA', ''),
(12, 'Anti-dsDNA', 'IU/mL'),
(12, 'RF', 'IU/mL'),
(12, 'CRP', 'mg/L'),
(12, 'ESR', 'mm/h'),
(12, 'C3', 'g/L'),
(12, 'C4', 'g/L'),
(12, 'IgG', 'g/L'),
(12, 'IgA', 'g/L'),
(12, 'IgM', 'g/L'),
(12, 'IgE', 'IU/mL'),
(12, 'Anti-CCP', 'U/mL'),
(12, 'Anti-TPO', 'IU/mL'),
(12, 'Anti-TG', 'IU/mL'),

-- Đông máu (Coagulation)
(13, 'PT', 'giây'),
(13, 'INR', ''),
(13, 'APTT', 'giây'),
(13, 'Fibrinogen', 'g/L'),
(13, 'D-Dimer', 'mg/L'),
(13, 'AT III', '%'),
(13, 'Protein C', '%'),
(13, 'Protein S', '%'),
(13, 'Thời gian chảy máu', 'phút'),
(13, 'Thời gian đông máu', 'phút');

-- Thêm nhóm chỉ số tổng quát cơ bản
INSERT INTO indicator_groups (id, name) VALUES
(14, 'Chỉ số tổng quát cơ bản');

-- Thêm các chỉ số tổng quát cơ bản
INSERT INTO indicator_types (indicator_group_id, name, unit) VALUES
(14, 'Chiều cao', 'cm'),
(14, 'Cân nặng', 'kg'),
(14, 'BMI', 'kg/m²'),
(14, 'Huyết áp', 'mmHg'),
(14, 'Nhịp tim', 'lần/phút'),

