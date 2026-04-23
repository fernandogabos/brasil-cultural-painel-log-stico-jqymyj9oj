import { FileSignature, Download, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { MOCK_EXAM_LOTS, MOCK_FRACTIONATION } from '@/lib/mock-data'
import { useToast } from '@/hooks/use-toast'

export default function AvaliacoesPage() {
  const { toast } = useToast()

  const handleGenerateGabarito = () => {
    toast({
      title: 'Gabaritos Gerados',
      description: 'O PDF com os gabaritos pré-preenchidos foi gerado e baixado com sucesso.',
    })
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E5A] tracking-tight">Avaliações e Provas</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de lotes de gráfica, fracionamento logístico e gabaritos.
          </p>
        </div>
      </div>

      <Tabs defaultValue="lotes" className="w-full">
        <TabsList className="bg-slate-100/50 mb-4 h-12 w-full justify-start overflow-x-auto">
          <TabsTrigger
            value="lotes"
            className="data-[state=active]:bg-[#1A2E5A] data-[state=active]:text-white rounded-md px-6"
          >
            Lotes Recebidos
          </TabsTrigger>
          <TabsTrigger
            value="fracionamento"
            className="data-[state=active]:bg-[#1A2E5A] data-[state=active]:text-white rounded-md px-6"
          >
            Planejamento de Fracionamento
          </TabsTrigger>
          <TabsTrigger
            value="gabaritos"
            className="data-[state=active]:bg-[#1A2E5A] data-[state=active]:text-white rounded-md px-6"
          >
            Gerador de Gabaritos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lotes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Entrada de Material da Gráfica</CardTitle>
              <Button className="bg-[#F47920] hover:bg-[#F47920]/90 text-white">
                <Plus className="w-4 h-4 mr-2" /> Registrar Lote
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Lote</TableHead>
                    <TableHead>Tipo / Série</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Data Recebimento</TableHead>
                    <TableHead>Pacotes Originais</TableHead>
                    <TableHead>Total Unidades</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_EXAM_LOTS.map((lote) => (
                    <TableRow key={lote.id}>
                      <TableCell className="font-bold">{lote.id}</TableCell>
                      <TableCell>
                        {lote.type}
                        <br />
                        <span className="text-xs text-muted-foreground font-medium">
                          {lote.grade}
                        </span>
                      </TableCell>
                      <TableCell>{lote.period}</TableCell>
                      <TableCell>{new Date(lote.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        {lote.packages} pct x {lote.unitsPerPack} un
                      </TableCell>
                      <TableCell className="font-bold text-[#1A2E5A]">{lote.totalUnits}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fracionamento">
          <Card>
            <CardHeader>
              <CardTitle>Checklist de Fracionamento</CardTitle>
              <CardDescription>
                Cálculo automático de pacotes a serem abertos para atender a demanda exata de cada
                escola, minimizando perdas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido / Escola</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Demanda</TableHead>
                    <TableHead>Ação Sugerida</TableHead>
                    <TableHead>Plástico Bolha</TableHead>
                    <TableHead>Gabarito Anexo</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_FRACTIONATION.map((frac) => (
                    <TableRow
                      key={frac.id}
                      className={frac.status === 'Concluído' ? 'bg-slate-50 opacity-80' : ''}
                    >
                      <TableCell className="font-medium">
                        {frac.orderId}
                        <br />
                        <span className="text-xs text-slate-500">{frac.school}</span>
                      </TableCell>
                      <TableCell>{frac.exam}</TableCell>
                      <TableCell className="font-bold text-[#1A2E5A]">{frac.demand} un</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-amber-400 text-amber-700 bg-amber-50"
                        >
                          Abrir {frac.packsToOpen} pacote(s) de 100
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Checkbox checked={frac.status === 'Concluído'} disabled />
                      </TableCell>
                      <TableCell>
                        <Checkbox checked={frac.status === 'Concluído'} disabled />
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            frac.status === 'Concluído'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-800'
                          }
                        >
                          {frac.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gabaritos">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center text-[#1A2E5A]">
                <FileSignature className="w-5 h-5 mr-2" /> Gerar Gabaritos Dinâmicos
              </CardTitle>
              <CardDescription>
                Gera um PDF pronto para impressão com cabeçalho preenchido para a escola, evitando
                erros na hora da aplicação.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-700">Selecione o Pedido Vinculado</p>
                <div className="p-3 border rounded-md bg-slate-50 border-slate-200 font-medium text-sm">
                  PED-2023-0001 (São Paulo - SP)
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-700">Escolas do Pedido</p>
                <div className="space-y-3 border border-slate-200 rounded-md p-4 bg-white">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="esc1" defaultChecked />
                    <label htmlFor="esc1" className="text-sm font-medium leading-none">
                      EMEB Monteiro Lobato
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="esc2" defaultChecked />
                    <label htmlFor="esc2" className="text-sm font-medium leading-none">
                      EE Tarsila do Amaral
                    </label>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleGenerateGabarito}
                className="w-full bg-[#1A2E5A] hover:bg-[#1A2E5A]/90 text-white h-12 font-bold"
              >
                <Download className="w-4 h-4 mr-2" /> Baixar Caderno de Gabaritos (PDF)
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
