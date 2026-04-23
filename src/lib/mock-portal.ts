export const MOCK_PORTAL_USER = {
  name: 'Maria Silva',
  role: 'Gestor Municipal',
  municipality: 'Campinas - SP',
  cnpj: '12.345.678/0001-90',
  email: 'maria.silva@campinas.sp.gov.br',
  rep: {
    name: 'Carlos Dias',
    role: 'Executivo de Vendas',
    email: 'carlos@brasilcultural.com.br',
    phone: '(11) 99999-9999',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
  },
}

export const MOCK_PORTAL_CONTRACTS = [
  {
    id: 'BC-2023-0046',
    date: '2023-09-02',
    totalValue: 85000,
    executedValue: 40000,
    balance: 45000,
    status: 'Ativo',
    items: [
      {
        code: 'LIV-MAT-1',
        description: 'Livro Didático Matemática 1º Ano',
        contracted: 1000,
        ordered: 600,
        delivered: 500,
        balance: 400,
      },
      {
        code: 'AVAL-DIAG-1',
        description: 'Caderno de Avaliação Diagnóstica 1º Ano',
        contracted: 1000,
        ordered: 200,
        delivered: 200,
        balance: 800,
      },
    ],
    documents: [
      { id: 1, title: 'Contrato Assinado.pdf', date: '2023-09-05', size: '2.4 MB' },
      { id: 2, title: 'Aditivo_01.pdf', date: '2023-11-10', size: '1.1 MB' },
    ],
  },
  {
    id: 'BC-2022-0105',
    date: '2022-05-15',
    totalValue: 120000,
    executedValue: 115000,
    balance: 5000,
    status: 'Concluído',
    items: [],
    documents: [{ id: 3, title: 'Termo_Encerramento.pdf', date: '2023-05-20', size: '1.8 MB' }],
  },
]

export const MOCK_PORTAL_SCHOOLS = [
  { id: '1', name: 'EMEB Monteiro Lobato', address: 'Rua das Flores, 123', code: 'INEP-001' },
  { id: '2', name: 'EE Tarsila do Amaral', address: 'Av. Brasil, 987', code: 'INEP-002' },
  { id: '3', name: 'CMEI Ayrton Senna', address: 'Rua do Sol, 45', code: 'INEP-003' },
]

export const MOCK_PORTAL_UPDATES = [
  {
    id: 1,
    title: 'Pedido PED-2023-0002 em separação',
    time: 'Hoje, 10:30',
    type: 'order',
  },
  {
    id: 2,
    title: 'Novo documento adicionado ao contrato BC-2023-0046',
    time: 'Ontem, 16:45',
    type: 'doc',
  },
  {
    id: 3,
    title: 'Ticket #4092 respondido pelo suporte',
    time: '2 dias atrás',
    type: 'ticket',
  },
]

export const MOCK_PORTAL_TICKETS = [
  {
    id: 'CH-4092',
    subject: 'Atraso na entrega',
    status: 'Em Atendimento',
    date: '2023-10-15',
    lastUpdate: '2023-10-16',
    history: [
      {
        author: 'Maria Silva',
        role: 'customer',
        content: 'O pedido PED-2023-0002 estava previsto para ontem.',
        date: '15/10/2023 14:00',
      },
      {
        author: 'Suporte BC',
        role: 'staff',
        content:
          'Olá Maria, verificamos que houve um problema na transportadora. Nova previsão amanhã.',
        date: '16/10/2023 09:30',
      },
    ],
  },
  {
    id: 'CH-4011',
    subject: 'Dúvida sobre saldo',
    status: 'Fechado',
    date: '2023-09-20',
    lastUpdate: '2023-09-21',
    csat: 5,
    history: [],
  },
]

export const MOCK_PORTAL_MURAL = [
  {
    id: 1,
    title: 'Novos Livros Paradidáticos Disponíveis',
    content: 'O catálogo 2024 já está disponível para consulta e pedidos.',
    date: '2023-10-10',
    priority: 'Important',
  },
  {
    id: 2,
    title: 'Paralisação dos Correios',
    content: 'Devido à greve nacional, entregas podem sofrer atrasos de até 5 dias.',
    date: '2023-10-15',
    priority: 'Urgent',
  },
]
