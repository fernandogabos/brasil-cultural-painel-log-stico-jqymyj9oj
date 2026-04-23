import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Send, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { MOCK_PORTAL_TICKETS } from '@/lib/mock-portal'
import { toast } from 'sonner'

export default function PortalTicketDetails() {
  const { id } = useParams()
  const ticket = MOCK_PORTAL_TICKETS.find((t) => t.id === id) || MOCK_PORTAL_TICKETS[0]
  const [reply, setReply] = useState('')

  const handleReply = () => {
    if (!reply.trim()) return
    toast.success('Mensagem enviada com sucesso!')
    setReply('')
  }

  const handleCsat = (score: number) => {
    toast.success(`Avaliação de ${score} estrelas enviada. Obrigado!`)
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 animate-fade-in-up">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/portal/chamados">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-title font-bold text-slate-800 tracking-tight">
              Ticket {ticket.id}
            </h1>
            <Badge variant={ticket.status === 'Fechado' ? 'secondary' : 'default'}>
              {ticket.status}
            </Badge>
          </div>
          <p className="text-slate-600 mt-1">{ticket.subject}</p>
        </div>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-6 space-y-4 bg-slate-50/50 rounded-xl">
          {ticket.history.map((msg, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${msg.role === 'customer' ? 'bg-white border-slate-200 ml-8' : 'bg-brand-primary/5 border-brand-primary/10 mr-8'}`}
            >
              <div className="flex justify-between text-xs text-muted-foreground mb-2 border-b pb-2">
                <span
                  className={`font-semibold ${msg.role === 'staff' ? 'text-brand-primary' : 'text-slate-700'}`}
                >
                  {msg.author} {msg.role === 'staff' && '(Equipe BC)'}
                </span>
                <span>{msg.date}</span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed">{msg.content}</p>
            </div>
          ))}
          {ticket.history.length === 0 && (
            <p className="text-center text-slate-500 py-8">Nenhuma mensagem registrada ainda.</p>
          )}
        </CardContent>
      </Card>

      {ticket.status === 'Fechado' ? (
        <div className="bg-white p-6 rounded-xl border shadow-sm text-center space-y-4">
          <p className="text-slate-700 font-medium">Este chamado foi encerrado.</p>
          {!ticket.csat ? (
            <div className="pt-4 border-t">
              <p className="text-sm text-slate-500 mb-3">
                Como você avalia o atendimento recebido?
              </p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleCsat(star)}
                    className="text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    <Star className="w-8 h-8 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="pt-4 border-t text-amber-500 flex justify-center items-center gap-2">
              <Star className="w-5 h-5 fill-current" /> Avaliado com {ticket.csat} estrelas
            </div>
          )}
          <Button variant="link" className="text-brand-primary">
            Reabrir Chamado
          </Button>
        </div>
      ) : (
        <Card className="shadow-sm border-slate-200 overflow-hidden">
          <div className="bg-slate-50 p-4 border-b">
            <h3 className="font-semibold text-slate-800">Nova Mensagem</h3>
          </div>
          <CardContent className="p-4 space-y-4">
            <Textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Digite sua mensagem aqui..."
              rows={4}
              className="resize-none focus-visible:ring-brand-primary"
            />
            <div className="flex justify-end">
              <Button onClick={handleReply} className="bg-brand-primary">
                <Send className="w-4 h-4 mr-2" /> Enviar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
