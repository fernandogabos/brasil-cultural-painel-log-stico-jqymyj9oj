import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { FileText, Eye, ArrowRight } from 'lucide-react'
import { MOCK_PORTAL_CONTRACTS } from '@/lib/mock-portal'

export default function PortalContracts() {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-title font-bold text-brand-primary tracking-tight">
          Meus Contratos
        </h1>
        <p className="text-muted-foreground mt-1">
          Acompanhe a execução financeira e os saldos dos contratos vigentes.
        </p>
      </div>

      <div className="grid gap-6">
        {MOCK_PORTAL_CONTRACTS.map((contract) => {
          const execPercent = (contract.executedValue / contract.totalValue) * 100

          let progressColor = 'bg-emerald-500'
          if (execPercent > 90) progressColor = 'bg-rose-500'
          else if (execPercent > 70) progressColor = 'bg-amber-500'

          return (
            <Card
              key={contract.id}
              className="shadow-sm overflow-hidden border-t-4 border-t-brand-primary"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <FileText className="text-brand-medium w-5 h-5" />
                          <h2 className="text-xl font-bold text-slate-800">{contract.id}</h2>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          Assinado em: {new Date(contract.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${contract.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {contract.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-500 font-medium">Valor Total</p>
                        <p className="font-bold text-slate-800">
                          {formatCurrency(contract.totalValue)}
                        </p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-500 font-medium">Valor Executado</p>
                        <p className="font-bold text-brand-medium">
                          {formatCurrency(contract.executedValue)}
                        </p>
                      </div>
                      <div className="bg-emerald-50 p-3 rounded-lg col-span-2 md:col-span-1">
                        <p className="text-xs text-emerald-600 font-medium">Saldo Disponível</p>
                        <p className="font-bold text-emerald-700">
                          {formatCurrency(contract.balance)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-slate-600">Execução Financeira</span>
                        <span className="text-slate-800">{execPercent.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${progressColor}`}
                          style={{ width: `${execPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50/50 flex flex-col justify-center items-center md:w-64 gap-3">
                    <Button
                      asChild
                      className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white"
                    >
                      <Link to={`/portal/contratos/${contract.id}`}>
                        <Eye className="w-4 h-4 mr-2" /> Ver Detalhes
                      </Link>
                    </Button>
                    {contract.status === 'Ativo' && (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange/10"
                      >
                        <Link to="/portal/pedidos/novo">
                          Solicitar Pedido <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
