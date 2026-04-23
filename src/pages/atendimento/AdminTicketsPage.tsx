import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MOCK_TICKETS } from '@/lib/mock-atendimento'
import { TicketStatusBadge, SlaBadge } from '@/components/atendimento/status-badge'
import { AtendimentoNav } from '@/components/atendimento/atendimento-nav'
import { Eye, Download, Filter } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminTicketsPage() {
  const exportData = () => toast.success('Relatório exportado com sucesso para Excel!')

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
      <AtendimentoNav />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Fila de Tickets</h1>
          <p className="text-muted-foreground">
            Acompanhe e gerencie os chamados de suporte por área.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" /> Filtros
          </Button>
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" /> Exportar Excel
          </Button>
        </div>
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[120px]">Ticket</TableHead>
              <TableHead>Município / UF</TableHead>
              <TableHead>Área</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>SLA</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_TICKETS.map((ticket) => (
              <TableRow key={ticket.id} className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-slate-700">{ticket.id}</TableCell>
                <TableCell className="text-slate-600">{ticket.municipality}</TableCell>
                <TableCell className="text-slate-600">{ticket.area}</TableCell>
                <TableCell>
                  <TicketStatusBadge status={ticket.status} />
                </TableCell>
                <TableCell>
                  <SlaBadge sla={ticket.sla} />
                </TableCell>
                <TableCell className="text-slate-600">{ticket.responsible}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="text-slate-500 hover:text-primary"
                  >
                    <Link to={`/atendimento/admin/${ticket.id}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
