import { useParams, Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MOCK_TICKETS, MOCK_MESSAGES } from '@/lib/mock-atendimento'
import { TicketStatusBadge } from '@/components/atendimento/status-badge'
import { useState } from 'react'
import { toast } from 'sonner'
import { ArrowLeft, User, Calendar, MapPin, Send } from 'lucide-react'

export default function TicketTrackerPage() {
  const { id } = useParams()
  const ticket = MOCK_TICKETS.find((t) => t.id === id) || MOCK_TICKETS[0]
  const [reply, setReply] = useState('')

  const handleReply = () => {
    if (!reply.trim()) return
    toast.success('Mensagem enviada com sucesso!')
    setReply('')
  }

  const handleReopen = () => {
    toast.success('Ticket reaberto com sucesso! A equipe será notificada.')
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" asChild className="mb-2 -ml-4">
          <Link to="/atendimento">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Portal
          </Link>
        </Button>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">Ticket {ticket.id}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1" /> {ticket.requester}
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> {ticket.municipality}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> {ticket.date}
              </span>
            </div>
          </div>
          <div className="shrink-0">
            <TicketStatusBadge status={ticket.status} />
          </div>
        </div>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6 space-y-4">
            {MOCK_MESSAGES.filter((m) => !m.isInternal).map((msg) => (
              <div
                key={msg.id}
                className={`p-5 rounded-xl border ${msg.role === 'customer' ? 'bg-blue-50/50 border-blue-100 ml-8 md:ml-16' : 'bg-white border-slate-200 mr-8 md:mr-16'}`}
              >
                <div className="flex justify-between text-xs text-muted-foreground mb-3 border-b pb-2">
                  <span className="font-semibold text-slate-700">
                    {msg.author} {msg.role === 'staff' && '(Equipe Brasil Cultural)'}
                  </span>
                  <span>{msg.date}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{msg.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {ticket.status === 'Fechado' ? (
          <div className="bg-white p-6 rounded-xl border text-center space-y-3">
            <p className="text-slate-600 font-medium">Este ticket encontra-se fechado.</p>
            <p className="text-sm text-muted-foreground mb-4">
              Caso o problema persista, você pode reabri-lo dentro de 7 dias úteis.
            </p>
            <Button onClick={handleReopen} variant="outline" size="lg" className="w-full sm:w-auto">
              Reabrir Ticket
            </Button>
          </div>
        ) : (
          <Card className="shadow-sm border-blue-200 overflow-hidden">
            <div className="bg-blue-50/50 p-4 border-b">
              <h3 className="font-semibold text-blue-900">Adicionar Resposta</h3>
            </div>
            <CardContent className="p-4 space-y-4">
              <Textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Escreva sua mensagem com detalhes..."
                rows={4}
                className="resize-none focus-visible:ring-blue-500"
              />
              <div className="flex justify-end">
                <Button onClick={handleReply} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4 mr-2" /> Enviar Resposta
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
