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
