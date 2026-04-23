import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useToast } from '@/hooks/use-toast'
import { MOCK_PORTAL_INDICATORS, MOCK_PORTAL_USER } from '@/lib/mock-portal'
import {
  Download,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  Clock,
  Package,
  FileText,
  Star,
  TrendingUp,
  AlertCircle,
  Truck,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PortalIndicators() {
  const { toast } = useToast()
  const data = MOCK_PORTAL_INDICATORS
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    toast({
      title: 'Gerando Relatório...',
      description: 'Seu relatório gerencial está sendo processado e o download iniciará em breve.',
    })
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: 'Relatório exportado!',
        description: 'Download concluído com sucesso.',
      })
      window.print()
    }, 2000)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  const financialPercent = (data.financial.executedValue / data.financial.totalValue) * 100

  const chartConfig = {
    score: {
      label: 'CSAT',
      color: 'hsl(var(--chart-2))',
    },
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up pb-8 print:bg-white print:text-black print:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-title font-bold text-brand-primary tracking-tight">
            Indicadores de Gestão
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Acompanhamento em tempo real do contrato de{' '}
            <strong>{MOCK_PORTAL_USER.municipality}</strong>.
          </p>
        </div>
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="bg-brand-primary hover:bg-brand-primary/90 text-white shadow-sm print:hidden"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório PDF
        </Button>
      </div>

      {/* Block 1: Contract Execution */}
      <section className="space-y-4">
        <h2 className="text-xl font-title font-semibold text-slate-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-medium" /> Execução do Contrato
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-xl shadow-[0_2px_8px_rgba(0,59,115,0.07)] border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-slate-500">
                Balanço Financeiro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-brand-primary">Valor Executado</span>
                  <span className="font-medium text-slate-700">
                    {formatCurrency(data.financial.executedValue)}
                  </span>
                </div>
                <Progress value={financialPercent} className="h-3 bg-slate-100" />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0%</span>
                  <span>Total: {formatCurrency(data.financial.totalValue)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Saldo Disponível</p>
                  <p className="text-lg font-bold text-emerald-600">
                    {formatCurrency(data.financial.balance)}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Uso Médio Mensal</p>
                  <p className="text-lg font-bold text-slate-700">
                    {formatCurrency(data.financial.averageMonthlyUsage)}
                  </p>
                </div>
              </div>

              {data.financial.depletionWarning && (
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">Atenção ao Esgotamento</p>
                    <p className="mt-0.5 leading-snug">
                      O saldo atual é suficiente para aprox.{' '}
                      <strong>{data.financial.estimatedMonthsLeft} meses</strong>. Isso ocorre antes
                      do fim da vigência ({data.financial.contractExpiration}).
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-[0_2px_8px_rgba(0,59,115,0.07)] border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-slate-500">
                Consumo de Itens (SOL/PED)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {data.items.map((item, idx) => {
                const pct = (item.requested / item.contracted) * 100
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{item.name}</span>
                      <span className="text-slate-500 text-xs">
                        {item.requested} / {item.contracted} un
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-1000',
                          item.color,
                        )}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Block 2: Deliveries & Logistics */}
      <section className="space-y-4 print:break-inside-avoid">
        <h2 className="text-xl font-title font-semibold text-slate-800 flex items-center gap-2">
          <Truck className="w-5 h-5 text-brand-orange" /> Logística e Entregas
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="rounded-xl shadow-[0_2px_8px_rgba(0,59,115,0.07)] border-slate-200 bg-brand-primary text-white">
                <CardContent className="p-5">
                  <Package className="w-6 h-6 mb-2 text-white/80" />
                  <p className="text-sm text-white/80 mb-1">Unidades Entregues</p>
                  <p className="text-3xl font-bold">
                    {data.logistics.unitsReceived.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-xl shadow-[0_2px_8px_rgba(0,59,115,0.07)] border-slate-200">
                <CardContent className="p-5">
                  <MapPin className="w-6 h-6 mb-2 text-brand-medium" />
                  <p className="text-sm text-slate-500 mb-1">Escolas Atendidas</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-slate-800">
                      {data.logistics.schoolsServed}
                    </p>
                    <p className="text-sm font-medium text-slate-400">
                      / {data.logistics.totalSchools}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-xl shadow-[0_2px_8px_rgba(0,59,115,0.07)] border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-slate-500">
                  Timeline de Entregas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pl-2 border-l-2 border-slate-100 ml-2 mt-2">
                  {data.logistics.timeline.map((event) => (
                    <div key={event.id} className="relative pl-6">
                      <div
                        className={cn(
                          'absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm',
                          event.status === 'completed'
                            ? 'bg-emerald-500'
                            : 'bg-brand-orange animate-pulse',
                        )}
                      />
                      <p className="text-sm font-medium text-slate-800">{event.description}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {event.date}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-xl shadow-[0_2px_8px_rgba(0,59,115,0.07)] border-slate-200 overflow-hidden flex flex-col">
            <CardHeader className="pb-3 border-b border-slate-100 bg-white z-10">
              <CardTitle className="text-base font-medium text-slate-500 flex items-center justify-between">
                <span>Mapa de Escolas</span>
                <div className="flex gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Entregue
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-brand-primary" /> Rota
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400" /> S/ Pedido
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <div className="relative flex-1 min-h-[300px] bg-slate-100 bg-[url('https://img.usecurling.com/p/800/600?q=city%20map&color=gray')] bg-cover bg-center">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
              {data.logistics.mapPins.map((pin) => (
                <div
                  key={pin.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                >
                  <MapPin
                    className={cn(
                      'w-6 h-6 drop-shadow-md transition-transform group-hover:scale-125',
                      pin.status === 'completed'
                        ? 'text-emerald-500 fill-emerald-100'
                        : pin.status === 'in-progress'
                          ? 'text-brand-primary fill-blue-100'
                          : 'text-slate-400 fill-slate-100',
                    )}
                  />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-20 shadow-lg">
                    {pin.name}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Block 3: Requests & Orders */}
      <section className="space-y-4 print:break-inside-avoid">
        <h2 className="text-xl font-title font-semibold text-slate-800 flex items-center gap-2">
          <Package className="w-5 h-5 text-emerald-600" /> Monitoramento de Pedidos (SOL e PED)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-xl shadow-[0_2px_8px_rgba(0,59,115,0.07)] border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-slate-500">
                Status de Solicitações (SOL)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-1" />
                  <p className="text-2xl font-bold text-emerald-700">
                    {data.orders.solicitacoes.approved}
                  </p>
                  <p className="text-xs text-emerald-600/80 font-semibold uppercase mt-1">
                    Aprovadas
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-center flex flex-col items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-500 mb-1" />
                  <p className="text-2xl font-bold text-amber-700">
                    {data.orders.solicitacoes.inAnalysis}
                  </p>
                  <p className="text-xs text-amber-600/80 font-semibold uppercase mt-1">
                    Em Análise
                  </p>
                </div>
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl text-center flex flex-col items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-rose-500 mb-1" />
                  <p className="text-2xl font-bold text-rose-700">
                    {data.orders.solicitacoes.rejected}
                  </p>
                  <p className="text-xs text-rose-600/80 font-semibold uppercase mt-1">
                    Rejeitadas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-[0_2px_8px_rgba(0,59,115,0.07)] border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-slate-500">
                Pedidos em Andamento (PED)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.orders.activeOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{order.id}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          ETA: {order.eta}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-brand-medium/10 text-brand-medium border-0 font-semibold"
                    >
                      {order.stage}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Block 4: Support Performance */}
      <section className="space-y-4 print:break-inside-avoid">
        <h2 className="text-xl font-title font-semibold text-slate-800 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> Qualidade do Atendimento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-xl shadow-[0_2px_8px_rgba(0,59,115,0.07)] border-slate-200">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500 mb-4">Volume de Chamados (SLA)</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                  <span className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400" /> Abertos
                  </span>
                  <span className="font-semibold text-slate-800">
                    {data.support.tickets.opened}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-emerald-50">
                  <span className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Resolvidos
                  </span>
                  <span className="font-semibold text-emerald-700">
                    {data.support.tickets.resolved}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-amber-50">
                  <span className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-orange" /> Pendentes
                  </span>
                  <span className="font-semibold text-amber-700">
                    {data.support.tickets.pending}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-[0_2px_8px_rgba(0,59,115,0.07)] border-slate-200">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-brand-medium mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">Tempo Médio de Resposta</p>
              <p className="text-4xl font-bold text-slate-800 tracking-tight">
                {data.support.avgResponseTimeDays}{' '}
                <span className="text-base font-medium text-slate-500">dias</span>
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-[0_2px_8px_rgba(0,59,115,0.07)] border-slate-200">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Satisfação (CSAT)</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-2xl font-bold text-slate-800">{data.support.avgCsat}</p>
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" /> +0.2
                </div>
              </div>
              <div className="flex-1 w-full mt-2 -ml-2">
                <ChartContainer config={chartConfig} className="h-[100px] w-full aspect-auto">
                  <LineChart
                    data={data.support.csatHistory}
                    margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      domain={[3, 5]}
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--color-score)"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: 'var(--color-score)', strokeWidth: 0 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
