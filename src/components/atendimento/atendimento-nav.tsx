import { Button } from '@/components/ui/button'
import { Link, useLocation } from 'react-router-dom'
import { Inbox, LayoutDashboard, BookOpen } from 'lucide-react'

export function AtendimentoNav() {
  const loc = useLocation()
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <Button variant={loc.pathname === '/atendimento/admin' ? 'default' : 'outline'} asChild>
        <Link to="/atendimento/admin">
          <Inbox className="w-4 h-4 mr-2" /> Fila de Tickets
        </Link>
      </Button>
      <Button
        variant={loc.pathname === '/atendimento/admin/dashboard' ? 'default' : 'outline'}
        asChild
      >
        <Link to="/atendimento/admin/dashboard">
          <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
        </Link>
      </Button>
      <Button variant={loc.pathname === '/atendimento/admin/faq' ? 'default' : 'outline'} asChild>
        <Link to="/atendimento/admin/faq">
          <BookOpen className="w-4 h-4 mr-2" /> Base de Conhecimento
        </Link>
      </Button>
    </div>
  )
}
