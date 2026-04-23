import { Link } from 'react-router-dom'
import { AlertTriangle, Download, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { MOCK_DIVERGENCIAS } from '@/lib/mock-data'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

const CHART_DATA = [
  { type: 'Quantidade', count: 15, fill: '#1A2E5A' },
  { type: 'Avaria', count: 8, fill: '#F47920' },
  { type: 'Item Errado', count: 5, fill: '#64748b' },
  { type: 'Endereço', count: 2, fill: '#ef4444' },
]

export default function DivergenciasPage() {
  const { toast } = useToast()

  const handleExport = (format: string) => {
    toast({
      title: `Exportando para ${format}`,
      description: 'O download começará em instantes.',
    })
  }

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E5A] flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-[#F47920]" /> Divergências (SAC Logístico)
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestão de tickets, SLAs e dossiês de resolução.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleExport('Excel')}
            className="border-[#1A2E5A] text-[#1A2E5A]"
          >
            <Download className="h-4 w-4 mr-2" /> Excel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport('PDF')}
            className="border-[#F47920] text-[#F47920]"
          >
            <Download className="h-4 w-4 mr-2" /> PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Divergências por Tipo</CardTitle>
            <CardDescription>Volume de chamados abertos no período.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ChartContainer config={{}} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="bg-[#1A2E5A] text-white">
          <CardHeader>
            <CardTitle className="text-white/90">SLA de Resolução</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center h-[200px]">
            <span className="text-6xl font-black text-[#F47920]">12h</span>
            <span className="mt-2 text-white/80 font-medium text-center">
              Tempo médio para <br /> primeira resposta
            </span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tickets Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Pedido</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SLA Restante</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_DIVERGENCIAS.map((div) => {
                const isCritical =
                  new Date(div.slaEnd).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000 &&
                  div.status !== 'Resolvida'

                return (
                  <TableRow key={div.id}>
                    <TableCell className="font-bold">{div.id}</TableCell>
                    <TableCell>{div.orderId}</TableCell>
                    <TableCell>{div.type}</TableCell>
                    <TableCell>
                      <span className={div.priority === 'Alta' ? 'text-rose-600 font-bold' : ''}>
                        {div.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={div.status === 'Resolvida' ? 'outline' : 'default'}
                        className={
                          div.status === 'Aberta'
                            ? 'bg-[#F47920] hover:bg-[#F47920]/80'
                            : 'border-emerald-500 text-emerald-600'
                        }
                      >
                        {div.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {div.status === 'Resolvida' ? (
                        <span className="text-muted-foreground">-</span>
                      ) : (
                        <span
                          className={
                            isCritical
                              ? 'text-rose-600 font-bold flex items-center'
                              : 'text-slate-600'
                          }
                        >
                          {isCritical && <AlertTriangle className="w-3 h-3 mr-1" />}
                          &lt; 24h
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-[#1A2E5A]" asChild>
                        <Link to={`/divergencias/${div.id}`}>
                          Ver Dossiê <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
