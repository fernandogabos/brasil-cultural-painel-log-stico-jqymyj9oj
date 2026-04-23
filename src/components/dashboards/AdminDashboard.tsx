import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { FileText, TrendingUp, AlertTriangle, Clock, Map as MapIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const CHART_ORDERS = [
  { month: 'Jan', orders: 120 },
  { month: 'Fev', orders: 150 },
  { month: 'Mar', orders: 180 },
  { month: 'Abr', orders: 220 },
  { month: 'Mai', orders: 200 },
  { month: 'Jun', orders: 250 },
  { month: 'Jul', orders: 210 },
  { month: 'Ago', orders: 280 },
  { month: 'Set', orders: 300 },
  { month: 'Out', orders: 350 },
  { month: 'Nov', orders: 400 },
  { month: 'Dez', orders: 450 },
]

const CHART_DIV = [
  { cause: 'Quantidade', count: 45, fill: '#ef4444' },
  { cause: 'Avaria', count: 25, fill: '#f59e0b' },
  { cause: 'Endereço', count: 15, fill: '#3b82f6' },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg flex gap-4 text-sm font-medium items-center shadow-sm">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <span>
          Alertas Globais: 5 Contratos vencendo em &lt; 30 dias | 12 Pedidos parados &gt; 15 dias |
          3 Produtos com estoque baixo | 8 Divergências sem resposta &gt; 48h
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { t: 'Contratos Ativos', v: '45', i: FileText, c: 'text-blue-500' },
          { t: 'Valor em Carteira', v: 'R$ 5.2M', i: TrendingUp, c: 'text-emerald-500' },
          {
            t: 'Taxa Divergência',
            v: '3.2%',
            s: 'Meta: < 5%',
            i: AlertTriangle,
            c: 'text-amber-500',
          },
          {
            t: 'Ciclo Médio',
            v: '14 dias',
            s: 'Empenho até Entrega',
            i: Clock,
            c: 'text-purple-500',
          },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{s.t}</p>
                <h3 className="text-2xl font-bold text-brand-primary">{s.v}</h3>
                {s.s && <p className="text-xs text-muted-foreground mt-1">{s.s}</p>}
              </div>
              <s.i className={`w-8 h-8 opacity-80 ${s.c}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Volume de Pedidos (12 Meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ orders: { color: '#1A2E5A' } }} className="h-[250px] w-full">
              <BarChart data={CHART_ORDERS} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Causas Divergências</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center pb-4">
            <ChartContainer config={{}} className="h-[200px] w-full max-w-[200px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={CHART_DIV}
                  dataKey="count"
                  nameKey="cause"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                >
                  {CHART_DIV.map((e, i) => (
                    <Cell key={i} fill={e.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Funil de Conversão (Mensal)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-2 w-full mt-2">
              <div className="w-full bg-[#1A2E5A] text-white text-center py-2 rounded-t-lg text-sm font-medium shadow-sm">
                Formalização (120)
              </div>
              <div className="w-[85%] bg-[#24407A] text-white text-center py-2 text-sm font-medium shadow-sm">
                Empenho (102)
              </div>
              <div className="w-[70%] bg-[#2E519A] text-white text-center py-2 text-sm font-medium shadow-sm">
                Separação (80)
              </div>
              <div className="w-[55%] bg-[#3863BA] text-white text-center py-2 rounded-b-lg text-sm font-medium shadow-sm">
                Entrega (60)
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gantt Simplificado (Top Pedidos)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 w-full mt-2">
              {[
                { id: 'PED-045', w1: '20%', w2: '30%', w3: '50%' },
                { id: 'PED-046', w1: '40%', w2: '40%', w3: '0%' },
                { id: 'PED-047', w1: '100%', w2: '0%', w3: '0%' },
              ].map((g, i) => (
                <div key={i} className="flex items-center text-sm gap-2">
                  <span className="w-16 font-medium text-slate-600">{g.id}</span>
                  <div className="flex-1 flex bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div style={{ width: g.w1 }} className="bg-[#1A2E5A] h-full"></div>
                    <div style={{ width: g.w2 }} className="bg-amber-400 h-full"></div>
                    <div style={{ width: g.w3 }} className="bg-emerald-500 h-full"></div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-16">
                <span>Formalizado</span>
                <span>Empenho</span>
                <span>Entregue</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custo Homem-Hora Base</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Custo Base Equipe (R$/h)</Label>
                <Input type="number" defaultValue={45.5} className="border-brand-primary/20" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Este valor é utilizado pelo sistema para calcular o custo interno estimado de
                retrabalho e resolução de divergências abertas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
