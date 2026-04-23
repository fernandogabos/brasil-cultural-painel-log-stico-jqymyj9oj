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
import OsDetailsPage from './pages/separacao/OsDetailsPage'
import TrackerPage from './pages/tracker/TrackerPage'

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
          {/* Outros módulos seriam adicionados aqui */}
        </Route>

        {/* Rota pública fora do Layout (sem sidebar) */}
        <Route path="/tracker/:uuid" element={<TrackerPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
