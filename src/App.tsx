import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import Layout from './components/Layout'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import ContractsPage from './pages/contracts/ContractsPage'
import NewContractPage from './pages/contracts/NewContractPage'
import EmpenhosPage from './pages/empenhos/EmpenhosPage'
import NewEmpenhoPage from './pages/empenhos/NewEmpenhoPage'
import PedidosPage from './pages/pedidos/PedidosPage'
import NewPedidoPage from './pages/pedidos/NewPedidoPage'
import PedidoDetailsPage from './pages/pedidos/PedidoDetailsPage'
import SeparacaoPage from './pages/separacao/SeparacaoPage'
import EstoquePage from './pages/estoque/EstoquePage'
import AvaliacoesPage from './pages/avaliacoes/AvaliacoesPage'
import MuralAvisosPage from './pages/mural/MuralAvisosPage'
import OsDetailsPage from './pages/separacao/OsDetailsPage'
import TrackerPage from './pages/tracker/TrackerPage'
import PublicPortalPage from './pages/atendimento/PublicPortalPage'
import TicketTrackerPage from './pages/atendimento/TicketTrackerPage'
import AdminTicketsPage from './pages/atendimento/AdminTicketsPage'
import AdminTicketDetailsPage from './pages/atendimento/AdminTicketDetailsPage'
import AdminDashboardPage from './pages/atendimento/AdminDashboardPage'
import AdminFaqPage from './pages/atendimento/AdminFaqPage'
import ExpedicaoPage from './pages/expedicao/ExpedicaoPage'
import RomaneioDetailsPage from './pages/expedicao/RomaneioDetailsPage'
import RouteTrackingPage from './pages/expedicao/RouteTrackingPage'
import DivergenciasPage from './pages/divergencias/DivergenciasPage'
import DivergenciaDetailsPage from './pages/divergencias/DivergenciaDetailsPage'
import SettingsPage from './pages/settings/SettingsPage'
import UsersPage from './pages/users/UsersPage'
import DemoFlowPage from './pages/demo/DemoFlowPage'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/contratos" element={<ContractsPage />} />
          <Route path="/contratos/novo" element={<NewContractPage />} />
          <Route path="/empenhos" element={<EmpenhosPage />} />
          <Route path="/empenhos/novo" element={<NewEmpenhoPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
          <Route path="/pedidos/novo" element={<NewPedidoPage />} />
          <Route path="/pedidos/:id" element={<PedidoDetailsPage />} />
          <Route path="/separacao" element={<SeparacaoPage />} />
          <Route path="/separacao/os/:id" element={<OsDetailsPage />} />
          <Route path="/estoque" element={<EstoquePage />} />
          <Route path="/avaliacoes" element={<AvaliacoesPage />} />
          <Route path="/mural" element={<MuralAvisosPage />} />
          <Route path="/atendimento/admin" element={<AdminTicketsPage />} />
          <Route path="/atendimento/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/atendimento/admin/faq" element={<AdminFaqPage />} />
          <Route path="/atendimento/admin/:id" element={<AdminTicketDetailsPage />} />
          <Route path="/expedicao" element={<ExpedicaoPage />} />
          <Route path="/expedicao/:id" element={<RomaneioDetailsPage />} />
          <Route path="/expedicao/:id/route" element={<RouteTrackingPage />} />
          <Route path="/divergencias" element={<DivergenciasPage />} />
          <Route path="/divergencias/:id" element={<DivergenciaDetailsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/demo" element={<DemoFlowPage />} />
          {/* Outros módulos seriam adicionados aqui */}
        </Route>

        {/* Rota pública fora do Layout (sem sidebar) */}
        <Route path="/tracker/:uuid" element={<TrackerPage />} />
        <Route path="/atendimento" element={<PublicPortalPage />} />
        <Route path="/atendimento/tracker/:id" element={<TicketTrackerPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
