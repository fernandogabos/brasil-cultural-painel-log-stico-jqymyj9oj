import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AtendimentoNav } from '@/components/atendimento/atendimento-nav'
import { TicketStatusBadge, SlaBadge } from '@/components/atendimento/status-badge'
import { MOCK_TICKETS } from '@/lib/mock-atendimento'
import { TicketChat } from '@/components/atendimento/ticket-chat'
import { ArrowLeft, Box, Copy, CornerUpRight } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminTicketDetailsPage() {
  const { id } = useParams()
  const ticket = MOCK_TICKETS.find((t) => t.id === id) || MOCK_TICKETS[0]

  const convertToDivergence = () => {
    toast.success('Ticket convertido em Divergência com sucesso! Redirecionando...')
  }

  const transferArea = () => {
    toast.info('Abrindo modal de transferência de área...')
  }

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
      <AtendimentoNav />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link to="/atendimento/admin">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">Ticket {ticket.id}</h1>
            <div className="flex gap-3 items-center mt-1.5">
              <TicketStatusBadge status={ticket.status} />
              <SlaBadge sla={ticket.sla} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:ml-auto pl-12 md:pl-0">
          <Button variant="outline" onClick={transferArea}>
            <CornerUpRight className="w-4 h-4 mr-2" /> Transferir
          </Button>
          <Button
            variant="destructive"
            onClick={convertToDivergence}
            className="bg-red-600 hover:bg-red-700"
          >
            <Copy className="w-4 h-4 mr-2" /> Converter p/ Divergência
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b pb-4">
              <CardTitle className="text-base text-slate-800">Detalhes da Solicitação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider">
                  Solicitante
                </p>
                <p className="font-medium text-slate-700">{ticket.requester}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider">
                  Município
                </p>
                <p className="font-medium text-slate-700">{ticket.municipality}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider">
                  Área de Atendimento
                </p>
                <p className="font-medium text-slate-700">{ticket.area}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider">
                  Responsável Atual
                </p>
                <p className="font-medium text-slate-700">{ticket.responsible}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider">
                  Abertura
                </p>
                <p className="font-medium text-slate-700">{ticket.date}</p>
              </div>
            </CardContent>
          </Card>

          {ticket.orderId && (
            <Card className="border-blue-200 bg-blue-50/40 shadow-sm">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm flex items-center gap-2 text-blue-900">
                  <Box className="w-4 h-4 text-blue-600" /> Pedido Vinculado
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <Link
                  to={`/pedidos/${ticket.orderId}`}
                  className="text-blue-700 font-bold hover:underline text-lg"
                >
                  {ticket.orderId}
                </Link>
                <p className="text-xs text-blue-600 mt-1 font-medium bg-blue-100 inline-block px-2 py-0.5 rounded">
                  Status Operacional: Em separação
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          <TicketChat ticketId={ticket.id} />
        </div>
      </div>
    </div>
  )
}
