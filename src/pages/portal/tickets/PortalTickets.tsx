import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Headphones } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MOCK_PORTAL_TICKETS, MOCK_PORTAL_USER } from '@/lib/mock-portal'
import { toast } from 'sonner'

export default function PortalTickets() {
  const [open, setOpen] = useState(false)

  const handleOpenTicket = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)
    toast.success('Chamado aberto com sucesso!')
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-title font-bold text-brand-primary tracking-tight">
            Suporte & Chamados
          </h1>
          <p className="text-muted-foreground mt-1">
            Abra chamados e acompanhe as respostas da equipe.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white shadow-sm">
              <Headphones className="mr-2 h-4 w-4" /> Abrir Novo Chamado
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleOpenTicket}>
              <DialogHeader>
                <DialogTitle>Abrir Chamado de Suporte</DialogTitle>
                <DialogDescription>
                  Seus dados de contato e município já estão preenchidos.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Município / CNPJ</Label>
                    <Input
                      disabled
                      value={`${MOCK_PORTAL_USER.municipality}`}
                      className="bg-slate-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contato</Label>
                    <Input disabled value={MOCK_PORTAL_USER.email} className="bg-slate-50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Assunto</Label>
                  <Input required placeholder="Resumo do problema..." />
                </div>
                <div className="space-y-2">
                  <Label>Mensagem</Label>
                  <Textarea required placeholder="Descreva os detalhes..." rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-brand-primary">
                  Enviar Chamado
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar chamado por protocolo..." className="pl-9 bg-slate-50" />
        </div>
      </div>

      <div className="grid gap-4">
        {MOCK_PORTAL_TICKETS.map((ticket) => (
          <Card key={ticket.id} className="shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-slate-800">{ticket.subject}</h3>
                  <Badge
                    variant={ticket.status === 'Fechado' ? 'secondary' : 'default'}
                    className={
                      ticket.status === 'Em Atendimento'
                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                        : ''
                    }
                  >
                    {ticket.status}
                  </Badge>
                </div>
                <p className="text-sm text-slate-500">
                  Protocolo: {ticket.id} • Aberto em {ticket.date}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <p className="text-xs text-slate-500">Última atualização</p>
                  <p className="text-sm font-medium text-slate-700">{ticket.lastUpdate}</p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                >
                  <Link to={`/portal/chamados/${ticket.id}`}>Ver Conversa</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
