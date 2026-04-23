import { AtendimentoNav } from '@/components/atendimento/atendimento-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import { DASHBOARD_STATS } from '@/lib/mock-atendimento'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Clock, CheckCircle2, TicketIcon } from 'lucide-react'

const barConfig = { tickets: { label: 'Tickets', color: 'hsl(var(--primary))' } }
const pieConfig = DASHBOARD_STATS.subjectDistribution.reduce(
  (acc, curr) => ({ ...acc, [curr.name]: { label: curr.name, color: curr.fill } }),
  {},
)

export default function AdminDashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
      <AtendimentoNav />
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard de Atendimento
        </h1>
        <p className="text-muted-foreground">Visão geral do volume e performance do suporte.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <Card className="bg-white shadow-sm border-slate-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-accent/10 text-accent rounded-full">
              <TicketIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Tickets Abertos</p>
              <p className="text-2xl font-bold text-slate-800">124</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-slate-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-full">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Tempo Médio Resposta</p>
              <p className="text-2xl font-bold text-slate-800">4.2h</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-slate-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Tickets Resolvidos (Mês)</p>
              <p className="text-2xl font-bold text-slate-800">89%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">Volume de Tickets por Área</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barConfig} className="h-[300px] w-full">
              <BarChart
                data={DASHBOARD_STATS.volumeByArea}
                margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="area"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="tickets"
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">Distribuição de Assuntos</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={pieConfig} className="h-[300px] w-full">
              <PieChart>
                <Pie
                  data={DASHBOARD_STATS.subjectDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  label
                >
                  {DASHBOARD_STATS.subjectDistribution.map((entry, index) => {
                    const colors = [
                      'hsl(var(--primary))',
                      'hsl(var(--accent))',
                      '#64748b',
                      '#0ea5e9',
                      '#10b981',
                    ]
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  })}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
