import { Badge } from '@/components/ui/badge'

export function TicketStatusBadge({ status }: { status: string }) {
  const getColors = (s: string) => {
    switch (s) {
      case 'Aberto':
        return 'bg-blue-100 text-blue-800'
      case 'Em Atendimento':
        return 'bg-purple-100 text-purple-800'
      case 'Aguardando Cliente':
        return 'bg-orange-100 text-orange-800'
      case 'Resolvido':
        return 'bg-green-100 text-green-800'
      case 'Fechado':
        return 'bg-gray-100 text-gray-800'
      case 'Reaberto':
        return 'bg-pink-100 text-pink-800'
      case 'Escalado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  return (
    <Badge variant="outline" className={`border-0 font-medium ${getColors(status)}`}>
      {status}
    </Badge>
  )
}

export function SlaBadge({ sla }: { sla: 'green' | 'yellow' | 'red' }) {
  const colors = {
    green: 'bg-emerald-500',
    yellow: 'bg-amber-400',
    red: 'bg-rose-500',
  }
  return (
    <div className="flex items-center gap-1.5" title={`SLA: ${sla}`}>
      <div className={`w-2.5 h-2.5 rounded-full ${colors[sla] || 'bg-gray-300'}`} />
      <span className="text-xs font-medium text-muted-foreground capitalize">
        {sla === 'green' ? 'No prazo' : sla === 'yellow' ? 'Atenção' : 'Atrasado'}
      </span>
    </div>
  )
}
