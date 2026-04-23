import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from 'recharts'
import { FileText, FileBadge2, Box, AlertTriangle, Plus, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { CHART_ORDERS_DATA, CHART_CONTRACTS_STATUS, MOCK_ACTIVITIES } from '@/lib/mock-data'

const chartConfig = {
  orders: { label: 'Pedidos', color: 'hsl(var(--chart-1))' },
}

export default function Index() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Visão geral da operação logística.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" asChild className="flex-1 md:flex-none">
            <Link to="/empenhos/novo">
              <FileBadge2 className="mr-2 h-4 w-4" /> Registrar Empenho
            </Link>
          </Button>
          <Button asChild className="flex-1 md:flex-none bg-accent hover:bg-accent/90 text-white">
            <Link to="/contratos/novo">
              <Plus className="mr-2 h-4 w-4" /> Novo Contrato
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Contratos Ativos', value: '45', icon: FileText, color: 'text-blue-500' },
          { title: 'Empenhos Pendentes', value: '12', icon: FileBadge2, color: 'text-amber-500' },
          { title: 'Pedidos em Separação', value: '89', icon: Box, color: 'text-emerald-500' },
          { title: 'Alertas de SLA', value: '3', icon: AlertTriangle, color: 'text-rose-500' },
        ].map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
              </div>
              <div
                className={`p-3 rounded-full bg-slate-100 group-hover:scale-110 transition-transform ${stat.color}`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Pedidos por Mês</CardTitle>
            <CardDescription>Volume de pedidos processados no 1º semestre</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={CHART_ORDERS_DATA} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Status dos Contratos</CardTitle>
            <CardDescription>Distribuição atual da carteira</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-8">
            <ChartContainer config={{}} className="h-[250px] w-full max-w-[250px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={CHART_CONTRACTS_STATUS}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {CHART_CONTRACTS_STATUS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Atividade Recente</CardTitle>
              <CardDescription>Últimas ações realizadas no sistema</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-accent">
              Ver tudo <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {MOCK_ACTIVITIES.map((activity, i) => (
                <div
                  key={activity.id}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-primary">{activity.user}</span>
                      <span className="text-sm text-slate-600">{activity.action}</span>
                      <time className="text-xs text-slate-400 mt-1">{activity.time}</time>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
