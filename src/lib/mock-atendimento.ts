export const MOCK_FAQS = [
  {
    id: 1,
    subjectId: 'logistica',
    title: 'Como rastrear meu pedido?',
    content: 'Acesse a aba "Tracker Público" com o UUID do seu pedido enviado por e-mail.',
  },
  {
    id: 2,
    subjectId: 'logistica',
    title: 'O que fazer se faltar um item?',
    content:
      'Abra um ticket informando o número do pedido e as caixas que não chegaram para acionarmos a transportadora.',
  },
  {
    id: 3,
    subjectId: 'pedagogico',
    title: 'Onde encontro o manual do professor?',
    content:
      'O manual do professor é enviado digitalmente e também segue impresso na primeira remessa de livros didáticos.',
  },
  {
    id: 4,
    subjectId: 'financeiro',
    title: 'Como solicitar segunda via de nota fiscal?',
    content:
      'Abra um ticket na área Financeira solicitando a segunda via informando o CNPJ do município.',
  },
  {
    id: 5,
    subjectId: 'suporte',
    title: 'Não consigo fazer login no painel',
    content:
      'Certifique-se de que está usando o e-mail cadastrado. Se esqueceu a senha, clique em "Recuperar senha" na tela inicial.',
  },
]

export const MOCK_TICKETS = [
  {
    id: 'ATD-2023-0001',
    municipality: 'São Paulo - SP',
    requester: 'Maria Souza',
    area: 'Logística',
    status: 'Em Atendimento',
    date: '2023-10-24',
    sla: 'yellow' as const,
    responsible: 'Carlos Log',
    orderId: 'PED-2023-0001',
  },
  {
    id: 'ATD-2023-0002',
    municipality: 'Campinas - SP',
    requester: 'João Silva',
    area: 'Financeiro',
    status: 'Aberto',
    date: '2023-10-25',
    sla: 'green' as const,
    responsible: '-',
  },
  {
    id: 'ATD-2023-0003',
    municipality: 'Curitiba - PR',
    requester: 'Ana Rosa',
    area: 'Pedagógico',
    status: 'Escalado',
    date: '2023-10-20',
    sla: 'red' as const,
    responsible: 'Julia Edu',
  },
  {
    id: 'ATD-2023-0004',
    municipality: 'Osasco - SP',
    requester: 'Beto Luz',
    area: 'Suporte',
    status: 'Resolvido',
    date: '2023-10-23',
    sla: 'green' as const,
    responsible: 'Admin',
  },
  {
    id: 'ATD-2023-0005',
    municipality: 'Campinas - SP',
    requester: 'Cláudia Mendes',
    area: 'Comercial',
    status: 'Fechado',
    date: '2023-10-15',
    sla: 'green' as const,
    responsible: 'Ana Comercial',
  },
]

export const MOCK_MESSAGES = [
  {
    id: 1,
    ticketId: 'ATD-2023-0001',
    author: 'Maria Souza',
    role: 'customer',
    content:
      'Bom dia, gostaria de saber a previsão de entrega das caixas remanescentes da escola Monteiro Lobato.',
    date: '24/10/2023 10:00',
    isInternal: false,
  },
  {
    id: 2,
    ticketId: 'ATD-2023-0001',
    author: 'Carlos Log',
    role: 'staff',
    content: 'Atenção equipe: verificar com a transportadora sobre o atraso na rota 3 de SP.',
    date: '24/10/2023 10:15',
    isInternal: true,
  },
  {
    id: 3,
    ticketId: 'ATD-2023-0001',
    author: 'Carlos Log',
    role: 'staff',
    content:
      'Olá Maria, seu pedido está na rota de entrega para hoje à tarde. Qualquer imprevisto, avisaremos.',
    date: '24/10/2023 10:20',
    isInternal: false,
  },
]

export const DASHBOARD_STATS = {
  volumeByArea: [
    { area: 'Logística', tickets: 45 },
    { area: 'Pedagógico', tickets: 20 },
    { area: 'Financeiro', tickets: 15 },
    { area: 'Comercial', tickets: 10 },
    { area: 'Suporte', tickets: 5 },
  ],
  subjectDistribution: [
    { name: 'Atraso na Entrega', value: 30, fill: 'var(--color-chart-1)' },
    { name: 'Dúvida Material', value: 20, fill: 'var(--color-chart-2)' },
    { name: 'Faturamento', value: 15, fill: 'var(--color-chart-3)' },
    { name: 'Acesso Sistema', value: 5, fill: 'var(--color-chart-4)' },
    { name: 'Outros', value: 10, fill: 'var(--color-chart-5)' },
  ],
}
