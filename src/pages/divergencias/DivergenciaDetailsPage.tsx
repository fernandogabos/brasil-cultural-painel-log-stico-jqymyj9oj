import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  FileText,
  FileBadge2,
  Package,
  Truck,
  Receipt,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { MOCK_DIVERGENCIAS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function DivergenciaDetailsPage() {
  const { id } = useParams()
  const { toast } = useToast()
  const [resolved, setResolved] = useState(false)

  const divergencia = MOCK_DIVERGENCIAS.find((d) => d.id === id) || MOCK_DIVERGENCIAS[0]
  const isResolved = divergencia.status === 'Resolvida' || resolved

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault()
    setResolved(true)
    toast({
      title: 'Divergência Resolvida',
      description:
        'Notificações automáticas enviadas para o cliente, comercial e logística. Tracker atualizado.',
    })
  }

  const dossierSteps = [
    { title: 'Contrato', id: 'BC-2023-0045', icon: FileText, date: '15/08/2023' },
    { title: 'Empenho', id: 'EMP-9921', icon: FileBadge2, date: '01/10/2023' },
    { title: 'Pedido', id: divergencia.orderId, icon: Package, date: '10/10/2023' },
    { title: 'Romaneio', id: 'ROM-2023-0001', icon: Truck, date: '14/10/2023' },
    { title: 'Nota Fiscal', id: 'NF-15430', icon: Receipt, date: '14/10/2023' },
  ]

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in-up max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/divergencias">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#1A2E5A] tracking-tight">{divergencia.id}</h1>
            {isResolved ? (
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-bold uppercase flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Resolvida
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-bold uppercase flex items-center">
                <Clock className="w-3 h-3 mr-1" /> Em Análise
              </span>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            Relatado por {divergencia.reportedBy} •{' '}
            {new Date(divergencia.createdAt).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-t-4 border-t-rose-500">
            <CardHeader>
              <CardTitle>Detalhes da Divergência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Tipo</p>
                  <p className="font-semibold text-lg">{divergencia.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">SLA Limite</p>
                  <p className="font-semibold text-lg text-rose-600">
                    {new Date(divergencia.slaEnd).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border">
                <p className="text-sm font-medium text-slate-800">"{divergencia.description}"</p>
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground uppercase font-bold mb-2">
                  Evidências (Anexos)
                </p>
                <div className="flex gap-2">
                  <div className="w-20 h-20 bg-slate-200 rounded border border-slate-300 flex items-center justify-center text-xs text-slate-500 cursor-pointer hover:bg-slate-300 transition-colors">
                    foto1.jpg
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-[#1A2E5A] text-white rounded-t-xl">
              <CardTitle className="flex items-center">
                <FileBadge2 className="w-5 h-5 mr-2" /> Dossiê Digital Automático
              </CardTitle>
              <CardDescription className="text-white/70">
                Documentos vinculados rastreados pelo sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <div className="relative flex justify-between max-w-3xl mx-auto px-4 overflow-x-auto py-2">
                <div className="absolute top-8 left-10 right-10 h-1 bg-slate-100 -z-10" />
                <div className="absolute top-8 left-10 right-10 h-1 bg-[#F47920] -z-10" />

                {dossierSteps.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center group relative bg-white px-2 min-w-[80px]"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center border-4 border-[#F47920] bg-white text-[#1A2E5A] shadow-sm">
                        <Icon className="w-5 h-5 relative z-10" />
                      </div>
                      <span className="text-xs font-bold mt-2 text-[#1A2E5A] text-center">
                        {step.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono text-center">
                        {step.id}
                      </span>
                      <span className="text-[10px] text-slate-400 text-center">{step.date}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card
            className={cn(
              'shadow-md transition-all',
              isResolved ? 'opacity-70' : 'border-[#F47920]',
            )}
          >
            <CardHeader className="bg-slate-50/50">
              <CardTitle className="text-lg">Resolução e Fechamento</CardTitle>
              <CardDescription>Obrigatório preencher para encerrar o SLA.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {isResolved ? (
                <div className="text-center p-6 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-emerald-500" />
                  <h3 className="font-bold">Divergência Encerrada</h3>
                  <p className="text-sm mt-1">
                    A solução foi registrada e comunicada aos envolvidos.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleResolve} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-[#1A2E5A]">Causa Raiz</Label>
                    <Textarea
                      required
                      placeholder="Qual foi o motivo da divergência?"
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-[#1A2E5A]">Solução Adotada</Label>
                    <Textarea
                      required
                      placeholder="Como o problema foi resolvido?"
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-[#F47920] hover:bg-[#F47920]/90 text-white"
                    >
                      Resolver e Notificar
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
