import { Link } from 'react-router-dom'
import { Plus, Search, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const mockOrders = [
  {
    id: 'PED-2023-0002',
    date: '12/10/2023',
    status: 'Em Separação',
    items: 500,
    schools: 4,
    contract: 'BC-2023-0046',
  },
  {
    id: 'PED-2023-0001',
    date: '01/09/2023',
    status: 'Concluído',
    items: 1500,
    schools: 12,
    contract: 'BC-2023-0046',
  },
]

export default function PortalOrders() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-title font-bold text-brand-primary tracking-tight">
            Meus Pedidos
          </h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe o status das suas solicitações e entregas.
          </p>
        </div>
        <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 text-white shadow-sm">
          <Link to="/portal/pedidos/novo">
            <Plus className="mr-2 h-4 w-4" /> Solicitar Pedido
          </Link>
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar pedido por número..." className="pl-9 bg-slate-50" />
        </div>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Card key={order.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-brand-primary">{order.id}</h3>
                      <p className="text-sm text-slate-500">
                        Contrato: {order.contract} • Solicitado em {order.date}
                      </p>
                    </div>
                    <Badge
                      className={
                        order.status === 'Concluído'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>

                  <div className="flex gap-6 mt-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 uppercase font-semibold">
                        Total de Itens
                      </span>
                      <span className="font-bold text-slate-700">{order.items} un.</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 uppercase font-semibold">
                        Locais de Entrega
                      </span>
                      <span className="font-bold text-slate-700 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" /> {order.schools} escolas
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 md:w-64 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-center">
                  <div className="space-y-4 w-full">
                    <div className="relative pl-6 pb-4 border-l-2 border-brand-medium">
                      <span className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-brand-medium border-2 border-white"></span>
                      <p className="text-sm font-bold text-slate-800 leading-none">Aprovação</p>
                      <p className="text-xs text-slate-500 mt-1">Concluído</p>
                    </div>
                    <div
                      className={`relative pl-6 ${order.status === 'Concluído' ? 'border-l-2 border-brand-medium pb-4' : ''}`}
                    >
                      <span
                        className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-white ${order.status === 'Concluído' ? 'bg-brand-medium' : 'bg-brand-orange animate-pulse'}`}
                      ></span>
                      <p className="text-sm font-bold text-slate-800 leading-none">Separação</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {order.status === 'Concluído' ? 'Concluído' : 'Em andamento'}
                      </p>
                    </div>
                    {order.status === 'Concluído' && (
                      <div className="relative pl-6">
                        <span className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
                        <p className="text-sm font-bold text-emerald-600 leading-none">Entregue</p>
                        <p className="text-xs text-slate-500 mt-1">Finalizado</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
