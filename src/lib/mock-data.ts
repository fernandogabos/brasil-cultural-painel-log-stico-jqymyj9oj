export const MOCK_CONTRACTS = [
  {
    id: 'BC-2023-0045',
    city: 'São Paulo - SP',
    seller: 'Ana Silva',
    value: 150000,
    balance: 45000,
    status: 'Ativo',
    date: '2023-08-15',
  },
  {
    id: 'BC-2023-0046',
    city: 'Campinas - SP',
    seller: 'Carlos Dias',
    value: 85000,
    balance: 85000,
    status: 'Novo',
    date: '2023-09-02',
  },
  {
    id: 'BC-2023-0047',
    city: 'Curitiba - SP',
    seller: 'Ana Silva',
    value: 200000,
    balance: 10000,
    status: 'Crítico',
    date: '2023-05-10',
  },
  {
    id: 'BC-2023-0048',
    city: 'Osasco - SP',
    seller: 'Beto Luz',
    value: 50000,
    balance: 0,
    status: 'Concluído',
    date: '2023-01-20',
  },
]

export const MOCK_EMPENHOS = [
  {
    id: 'EMP-9921',
    contractId: 'BC-2023-0045',
    body: 'Sec. Educação SP',
    date: '2023-10-01',
    value: 45000,
    status: 'Pendente',
  },
  {
    id: 'EMP-9922',
    contractId: 'BC-2023-0046',
    body: 'Prefeitura Campinas',
    date: '2023-10-05',
    value: 20000,
    status: 'Aprovado',
  },
  {
    id: 'EMP-9923',
    contractId: 'BC-2023-0047',
    body: 'Sec. Educação Curitiba',
    date: '2023-09-28',
    value: 50000,
    status: 'Recusado',
  },
]

export const MOCK_ACTIVITIES = [
  {
    id: 1,
    user: 'Vanessa (Logística)',
    action: 'iniciou separação do Pedido #4021',
    time: '10 min atrás',
  },
  {
    id: 2,
    user: 'Carlos (Comercial)',
    action: 'cadastrou novo contrato BC-2023-0046',
    time: '2 horas atrás',
  },
  { id: 3, user: 'Júlia (Jurídico)', action: 'aprovou Empenho EMP-9922', time: 'Ontem, 14:30' },
  {
    id: 4,
    user: 'Sistema',
    action: 'alerta de SLA: Contrato BC-2023-0047 com saldo crítico',
    time: 'Ontem, 09:00',
  },
]

export const CHART_ORDERS_DATA = [
  { month: 'Jan', orders: 120 },
  { month: 'Fev', orders: 150 },
  { month: 'Mar', orders: 180 },
  { month: 'Abr', orders: 220 },
  { month: 'Mai', orders: 200 },
  { month: 'Jun', orders: 250 },
]

export const CHART_CONTRACTS_STATUS = [
  { status: 'Ativos', count: 45, fill: 'var(--color-chart-1)' },
  { status: 'Novos', count: 12, fill: 'var(--color-chart-2)' },
  { status: 'Críticos', count: 5, fill: 'var(--color-chart-4)' },
  { status: 'Concluídos', count: 30, fill: 'var(--color-chart-3)' },
]

export const MOCK_ORDERS = [
  {
    id: 'PED-2023-0001',
    contractId: 'BC-2023-0045',
    municipality: 'São Paulo - SP',
    date: '2023-10-10',
    status: 'Em separação',
    items: 1500,
    schools: 12,
    daysInStage: 2,
  },
  {
    id: 'PED-2023-0002',
    contractId: 'BC-2023-0046',
    municipality: 'Campinas - SP',
    date: '2023-10-12',
    status: 'Pendente',
    items: 500,
    schools: 4,
    daysInStage: 5,
  },
  {
    id: 'PED-2023-0003',
    contractId: 'BC-2023-0048',
    municipality: 'Osasco - SP',
    date: '2023-01-20',
    status: 'Concluído',
    items: 2000,
    schools: 15,
    daysInStage: 0,
  },
]

export const MOCK_OS = [
  {
    id: 'OS-2023-0001',
    orderId: 'PED-2023-0001',
    date: '2023-10-11',
    status: 'Em andamento',
    progress: 45,
    operator: 'Vanessa',
  },
  {
    id: 'OS-2023-0002',
    orderId: 'PED-2023-0002',
    date: '2023-10-13',
    status: 'Aguardando início',
    progress: 0,
    operator: '-',
  },
]

export const MOCK_SCHOOLS_UPLOAD = [
  {
    name: 'EMEB Monteiro Lobato',
    address: 'Rua das Flores, 123',
    items: 450,
    boxes: 8,
    zip: '01000-000',
    responsible: 'Maria Silva',
  },
  {
    name: 'EE Tarsila do Amaral',
    address: 'Av. Brasil, 987',
    items: 1050,
    boxes: 18,
    zip: '02000-000',
    responsible: 'João Souza',
  },
]

export const MOCK_OS_ITEMS = [
  {
    id: 1,
    name: 'Livro Didático 1º Ano (Matemática)',
    quantity: 300,
    boxes: 5,
    checked: false,
    isExam: false,
  },
  {
    id: 2,
    name: 'Livro Didático 1º Ano (Português)',
    quantity: 300,
    boxes: 5,
    checked: false,
    isExam: false,
  },
  {
    id: 3,
    name: 'Caderno de Avaliação Diagnóstica',
    quantity: 450,
    boxes: 8,
    checked: false,
    isExam: true,
  },
]

export const MOCK_ROMANEIOS = [
  {
    id: 'ROM-2023-0001',
    orderId: 'PED-2023-0001',
    date: '2023-10-14',
    status: 'Em trânsito',
    driver: 'João Marcos',
    plate: 'ABC-1234',
    carrier: 'LogExpress S/A',
    schools: 12,
    progress: 4,
  },
  {
    id: 'ROM-2023-0002',
    orderId: 'PED-2023-0003',
    date: '2023-10-15',
    status: 'Pendente',
    driver: '-',
    plate: '-',
    carrier: '-',
    schools: 15,
    progress: 0,
  },
]

export const MOCK_DIVERGENCIAS = [
  {
    id: 'DIV-1001',
    orderId: 'PED-2023-0001',
    type: 'Quantidade',
    description: 'Faltaram 10 caixas do Livro de Matemática 1º Ano',
    status: 'Aberta',
    priority: 'Alta',
    reportedBy: 'Maria Silva (Diretora)',
    slaEnd: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'DIV-1002',
    orderId: 'PED-2023-0003',
    type: 'Avaria',
    description: 'Livros amassados na caixa 4',
    status: 'Resolvida',
    priority: 'Média',
    reportedBy: 'João Pedro',
    slaEnd: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const MOCK_PRODUCTS = [
  {
    id: 'PRD-001',
    code: 'LIV-MAT-1',
    description: 'Livro Didático Matemática 1º Ano',
    type: 'Livro Didático',
    grade: '1º Ano',
    boxQty: 50,
    un: 'un',
    weight: '0.4kg',
    total: 1500,
    reserved: 300,
    free: 1200,
    threshold: 500,
  },
  {
    id: 'PRD-002',
    code: 'AVAL-DIAG-1',
    description: 'Caderno de Avaliação Diagnóstica 1º Ano',
    type: 'Avaliação',
    grade: '1º Ano',
    boxQty: 100,
    un: 'un',
    weight: '0.1kg',
    total: 800,
    reserved: 450,
    free: 350,
    threshold: 400,
  },
  {
    id: 'PRD-003',
    code: 'PAR-LIT-INF',
    description: 'Livro Paradidático Contos Infantis',
    type: 'Paradidático',
    grade: 'Educação Infantil',
    boxQty: 40,
    un: 'un',
    weight: '0.3kg',
    total: 400,
    reserved: 20,
    free: 380,
    threshold: 100,
  },
]

export const MOCK_STOCK_MOVEMENTS = [
  {
    id: 'MOV-001',
    type: 'Entrada',
    product: 'LIV-MAT-1',
    qty: 2000,
    user: 'João (Almoxarifado)',
    doc: 'NF-12345',
    date: '2023-10-01T10:00:00Z',
  },
  {
    id: 'MOV-002',
    type: 'Saída',
    product: 'LIV-MAT-1',
    qty: 500,
    user: 'Vanessa (Logística)',
    doc: 'PED-2023-0001',
    date: '2023-10-10T14:30:00Z',
  },
]

export const MOCK_INVENTORY_CYCLES = [
  {
    id: 'CYC-001',
    name: 'Bimestral Abril/2026',
    status: 'Concluído',
    date: '2026-04-01',
    discrepancies: 2,
  },
  {
    id: 'CYC-002',
    name: 'Mensal Maio/2026',
    status: 'Em andamento',
    date: '2026-05-01',
    discrepancies: 0,
  },
]

export const MOCK_MURAL = [
  {
    id: 1,
    title: 'Atualização no Processo de Fracionamento',
    content:
      'A partir de amanhã, o checklist de plástico bolha é obrigatório para todas as avaliações.',
    author: 'Diretoria',
    date: '2026-04-20',
    urgent: true,
    readBy: ['Júlia', 'Carlos'],
  },
  {
    id: 2,
    title: 'Feriado Municipal - Expedição suspensa',
    content:
      'Não haverá expedição na próxima sexta-feira devido ao feriado local. Ajustem as rotas.',
    author: 'RH',
    date: '2026-04-18',
    urgent: false,
    readBy: ['Vanessa', 'João', 'Carlos', 'Júlia'],
  },
]

export const MOCK_INTERNAL_CHAT = [
  {
    id: 1,
    user: 'Júlia (Jurídico)',
    message: 'O contrato já está validado para este pedido. Podem seguir.',
    time: '10/10/2023 09:00',
    type: 'text',
  },
  {
    id: 2,
    user: 'Vanessa (Logística)',
    message: 'Iniciando separação. Precisaremos fracionar as avaliações do 1º Ano.',
    time: '10/10/2023 14:00',
    type: 'text',
  },
]

export const MOCK_MUNICIPALITY_MESSAGES = [
  {
    id: 1,
    user: 'Equipe Logística',
    message:
      'Prezado município, as caixas estão prontas para embarque. Previsão de entrega mantida para dia 20/10.',
    time: '11/10/2023 10:00',
    sender: 'internal',
  },
  {
    id: 2,
    user: 'Maria Silva (Diretora)',
    message: 'Perfeito, aguardamos o envio. Haverá entrega fracionada diretamente na escola X?',
    time: '11/10/2023 11:30',
    sender: 'municipality',
  },
]

export const MOCK_EXAM_LOTS = [
  {
    id: 'LOT-1001',
    type: 'Avaliação Diagnóstica',
    grade: '1º Ano',
    period: '1º Bimestre',
    packages: 50,
    unitsPerPack: 100,
    totalUnits: 5000,
    date: '2026-04-05',
  },
  {
    id: 'LOT-1002',
    type: 'Simulado Estadual',
    grade: '3º Ano (EM)',
    period: '1º Semestre',
    packages: 20,
    unitsPerPack: 200,
    totalUnits: 4000,
    date: '2026-04-10',
  },
]

export const MOCK_FRACTIONATION = [
  {
    id: 'FRAC-001',
    orderId: 'PED-2023-0001',
    school: 'EMEB Monteiro Lobato',
    exam: 'Avaliação Diagnóstica 1º Ano',
    demand: 45,
    packsToOpen: 1,
    status: 'Pendente',
  },
  {
    id: 'FRAC-002',
    orderId: 'PED-2023-0001',
    school: 'EE Tarsila do Amaral',
    exam: 'Avaliação Diagnóstica 1º Ano',
    demand: 120,
    packsToOpen: 2,
    status: 'Concluído',
  },
]
