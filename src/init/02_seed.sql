-- ============================================================
-- PeopleCore DEV — SEED INICIAL (CORRIGIDO)
-- ============================================================

-- 🔥 1. CRIA BANCO (SE NÃO EXISTIR)
CREATE DATABASE IF NOT EXISTS peoplecore_dev
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE peoplecore_dev;

-- ============================================================
-- 2. CATEGORIAS (DEPARTAMENTOS)
-- ============================================================

INSERT IGNORE INTO tb_categoria (id, departamento) VALUES
  (1, 'Tecnologia da Informação'),
  (2, 'Recursos Humanos'),
  (3, 'Financeiro'),
  (4, 'Operações'),
  (5, 'Comercial');

-- ============================================================
-- 3. USUÁRIOS (LOGIN TESTE)
-- senha padrão: admin123 / senha123 (bcrypt abaixo)
-- ============================================================

INSERT IGNORE INTO tb_usuario (id, nome, usuario, senha, mustChangePassword, globalRole, empresaId) VALUES
(
  1,
  'Admin PeopleCore',
  'admin@peoplecore.com.br',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- senha123
  false,
  'SUPER_ADMIN',
  NULL
),
(
  2,
  'Ana RH',
  'ana.rh@peoplecore.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  true,
  NULL,
  1
),
(
  3,
  'Carlos Gestor',
  'carlos.gestor@peoplecore.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  true,
  NULL,
  1
);

-- ============================================================
-- 4. FUNCIONÁRIOS
-- ============================================================

INSERT IGNORE INTO tb_funcionario (id, nome, cargo, horasTrabalhadas, salarioBase, usuario_id, categoria_id) VALUES
  (1, 'Maria Souza', 'Desenvolvedora Backend', 160, 8500.00, 1, 1),
  (2, 'João Pereira', 'Analista de RH', 160, 5200.00, 2, 2),
  (3, 'Fernanda Lima', 'Gerente Financeiro', 160, 12000.00, 3, 3),
  (4, 'Ricardo Alves', 'Analista Operações', 160, 4800.00, 1, 4),
  (5, 'Beatriz Costa', 'Frontend', 160, 7500.00, 2, 1);

-- ============================================================
-- 5. CONTRATOS
-- ============================================================

INSERT IGNORE INTO tb_contrato (id, tipo, status, dataAdmissao, funcionario_id) VALUES
  (1, 'CLT', 'ATIVO', '2023-01-10', 1),
  (2, 'CLT', 'ATIVO', '2022-06-15', 2),
  (3, 'CLT', 'ATIVO', '2021-03-01', 3),
  (4, 'PJ',  'ATIVO', '2024-01-05', 4),
  (5, 'CLT', 'ATIVO', '2023-08-20', 5);

-- ============================================================
-- 6. EPIs
-- ============================================================

INSERT IGNORE INTO tb_epi (id, nome, categoria, numeroCa, validadeCa, fabricante, estoqueAtual, estoqueMinimo) VALUES
  (1, 'Capacete', 'PROTECAO_CABECA', '12345', '2027-12-31', '3M', 50, 10),
  (2, 'Óculos', 'PROTECAO_OCULAR', '23456', '2026-06-30', 'Uvex', 30, 5),
  (3, 'Protetor Auricular', 'PROTECAO_AUDITIVA', '34567', '2026-12-31', 'Moldex', 100, 20),
  (4, 'Luvas', 'PROTECAO_MAOS', '45678', '2027-03-31', 'Steelco', 80, 15),
  (5, 'Bota', 'PROTECAO_PES', '56789', '2028-01-31', 'Bracol', 20, 5);

-- ============================================================
-- 7. TREINAMENTOS
-- ============================================================

INSERT IGNORE INTO tb_treinamento (id, nome, tipo, modalidade, cargaHoraria, nrRelacionada, validadeMeses, ativo) VALUES
  (1, 'NR-1 Gestão de Riscos', 'OBRIGATORIO_NR', 'PRESENCIAL', 8, 'NR-1', 12, true),
  (2, 'NR-6 EPIs', 'OBRIGATORIO_NR', 'PRESENCIAL', 4, 'NR-6', 12, true),
  (3, 'NR-17 Ergonomia', 'OBRIGATORIO_NR', 'EAD', 8, 'NR-17', 24, true),
  (4, 'Onboarding', 'ONBOARDING', 'PRESENCIAL', 16, NULL, NULL, true),
  (5, 'Liderança', 'COMPORTAMENTAL', 'HIBRIDO', 24, NULL, NULL, true);

-- ============================================================
-- 8. NR CONTROLE
-- ============================================================

INSERT IGNORE INTO tb_nr_controle (id, numero, nome, status, aplicavelEmpresa, responsavel) VALUES
  (1, 'NR-1', 'Gestão de Riscos', 'CONFORME', true, 'Ana RH'),
  (2, 'NR-5', 'CIPA', 'EM_ADEQUACAO', true, 'Ana RH'),
  (3, 'NR-6', 'EPI', 'CONFORME', true, 'Ana RH'),
  (4, 'NR-17', 'Ergonomia', 'CONFORME', true, 'Ana RH'),
  (5, 'NR-7', 'PCMSO', 'CONFORME', true, 'Ana RH');

SELECT 'Seed executado com sucesso!' AS status;