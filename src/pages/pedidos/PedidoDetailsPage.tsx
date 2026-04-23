import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, Circle, Clock, AlertTriangle, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const STAGES = [
  { id: 1, label: 'Contrato recebido', status: 'completed' },
  { id: 2, label: 'Pedido formalizado', status: 'completed' },
  { id: 3, label: 'Empenho aprovado', status: 'completed' },
  { id: 4, label: 'Pedido conferido', status: 'completed' },
  { id: 5, label: 'Em separação', status: 'current' },
  { id: 6, label: 'Pronto para expedição', status: 'pending' },
  { id: 7, label: 'Em transporte', status: 'pending' },
  { id: 8, label: 'Entregue (aguardando confirmação)', status: 'pending' },
  { id: 9, label: 'Concluído', status: 'pending' },
  { id: 10, label: 'Divergência aberta', status: 'issue' }, // This stage is situational, but kept in timeline per spec
]

export default function PedidoDetailsPage() {
  const { id } = useParams()

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/pedidos">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-primary tracking-tight">Pedido {id}</h1>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Em separação</Badge>
          </div>
          <p className="text-muted-foreground mt-1">Visão detalhada e timeline operacional.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Timeline Operacional (10 Etapas)</CardTitle>
              <CardDescription>Acompanhamento detalhado do ciclo de vida</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 py-2">
                {STAGES.map((stage, i) => (
                  <div key={stage.id} className="relative pl-8">
                    <span className="absolute -left-[11px] top-1 bg-white">
                      {stage.status === 'completed' && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 bg-white" />
                      )}
                      {stage.status === 'current' && (
                        <Circle className="w-5 h-5 text-blue-500 fill-blue-50 animate-pulse bg-white" />
                      )}
                      {stage.status === 'pending' && (
                        <Circle className="w-5 h-5 text-slate-300 bg-white" />
                      )}
                      {stage.status === 'issue' && (
                        <AlertTriangle className="w-5 h-5 text-rose-500 bg-white" />
                      )}
                    </span>
                    <div className="flex flex-col">
                      <span
                        className={`font-medium ${
                          stage.status === 'completed'
                            ? 'text-emerald-700'
                            : stage.status === 'current'
                              ? 'text-blue-700 font-bold'
                              : stage.status === 'issue'
                                ? 'text-rose-600 line-through'
                                : 'text-slate-500'
                        }`}
                      >
                        {stage.id}. {stage.label}
                      </span>
                      {stage.status === 'completed' && (
                        <span className="text-xs text-slate-400 mt-1">
                          <Clock className="inline w-3 h-3 mr-1" /> Finalizado
                        </span>
                      )}
                      {stage.status === 'current' && (
                        <span className="text-xs text-blue-500 mt-1 font-medium">
                          Etapa atual - 2 dias decorridos
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Contrato Vinculado</span>
                <p className="font-medium">BC-2023-0045</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Empenho</span>
                <p className="font-medium">EMP-9921</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Destino</span>
                <p className="font-medium">São Paulo - SP</p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <Button variant="outline" className="w-full justify-start">
                  Visualizar Planilha Original
                </Button>
              </div>
              <div>
                <Button className="w-full justify-start bg-accent hover:bg-accent/90 text-white">
                  Gerar Ordem de Separação (OS)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
