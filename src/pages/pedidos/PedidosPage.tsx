import { Link } from 'react-router-dom'
import { Plus, Download, Eye, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { MOCK_ORDERS } from '@/lib/mock-data'

export default function PedidosPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-emerald-100 text-emerald-800'
      case 'Em separação':
        return 'bg-blue-100 text-blue-800'
      case 'Pendente':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Pedidos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os pedidos vinculados aos contratos.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar Excel
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-white">
            <Link to="/pedidos/novo">
              <Plus className="mr-2 h-4 w-4" /> Novo Pedido
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Buscar por ID ou município..." className="pl-9 bg-white" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID do Pedido</TableHead>
              <TableHead>Contrato</TableHead>
              <TableHead>Município</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Itens / Escolas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ORDERS.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-primary">{order.id}</TableCell>
                <TableCell>{order.contractId}</TableCell>
                <TableCell>{order.municipality}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell className="text-muted-foreground">
                  {order.items} itens em {order.schools} locais
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 items-start">
                    <Badge variant="secondary" className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {order.daysInStage} dias nesta etapa
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/pedidos/${order.id}`}>
                      <Eye className="h-4 w-4 mr-1" /> Ver
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
