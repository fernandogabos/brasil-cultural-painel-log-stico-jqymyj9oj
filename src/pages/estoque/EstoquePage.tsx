import { useState } from 'react'
import { Package, ArrowDownUp, RefreshCcw, AlertTriangle, Trash2, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { MOCK_PRODUCTS, MOCK_STOCK_MOVEMENTS, MOCK_INVENTORY_CYCLES } from '@/lib/mock-data'

export default function EstoquePage() {
  const { toast } = useToast()

  const totalStock = MOCK_PRODUCTS.reduce((acc, p) => acc + p.total, 0)
  const lowStockProducts = MOCK_PRODUCTS.filter((p) => p.free < p.threshold)

  const handleDescarte = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Descarte Registrado',
      description: 'O descarte foi registrado e passará por autorização.',
    })
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E5A] tracking-tight">Estoque</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de inventário e movimentações físicas.
          </p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="bg-slate-100/50 mb-4 h-12 w-full justify-start overflow-x-auto">
          <TabsTrigger
            value="dashboard"
            className="data-[state=active]:bg-[#1A2E5A] data-[state=active]:text-white rounded-md px-6"
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger
            value="produtos"
            className="data-[state=active]:bg-[#1A2E5A] data-[state=active]:text-white rounded-md px-6"
          >
            Produtos
          </TabsTrigger>
          <TabsTrigger
            value="movimentacoes"
            className="data-[state=active]:bg-[#1A2E5A] data-[state=active]:text-white rounded-md px-6"
          >
            Movimentações
          </TabsTrigger>
          <TabsTrigger
            value="ciclos"
            className="data-[state=active]:bg-[#1A2E5A] data-[state=active]:text-white rounded-md px-6"
          >
            Ciclos de Inventário
          </TabsTrigger>
          <TabsTrigger
            value="descarte"
            className="data-[state=active]:bg-[#1A2E5A] data-[state=active]:text-white rounded-md px-6"
          >
            Descarte
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Volume Total em Estoque</p>
                  <h3 className="text-3xl font-bold text-[#1A2E5A]">
                    {totalStock} <span className="text-base font-normal text-slate-500">un</span>
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-blue-50 text-blue-500">
                  <Package className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Produtos em Alerta (Baixo Saldo Livre)
                  </p>
                  <h3 className="text-3xl font-bold text-rose-500">{lowStockProducts.length}</h3>
                </div>
                <div className="p-3 rounded-full bg-rose-50 text-rose-500">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </div>
          {lowStockProducts.length > 0 && (
            <Card className="border-rose-200">
              <CardHeader>
                <CardTitle className="text-rose-600 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" /> Alertas de Estoque Mínimo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Saldo Livre</TableHead>
                      <TableHead>Mínimo Ideal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStockProducts.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.code}</TableCell>
                        <TableCell>{p.description}</TableCell>
                        <TableCell className="text-rose-600 font-bold">{p.free}</TableCell>
                        <TableCell className="text-slate-500">{p.threshold}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="produtos">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Catálogo de Produtos</CardTitle>
              <Button className="bg-[#F47920] hover:bg-[#F47920]/90 text-white">
                <Plus className="w-4 h-4 mr-2" /> Novo Produto
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Descrição / Detalhes</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Físico (Total)</TableHead>
                    <TableHead>Reservado</TableHead>
                    <TableHead>Livre</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PRODUCTS.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.code}</TableCell>
                      <TableCell>
                        {p.description}
                        <br />
                        <span className="text-xs text-slate-400">
                          {p.grade} | Caixa: {p.boxQty} | Peso: {p.weight}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{p.type}</Badge>
                      </TableCell>
                      <TableCell>{p.total}</TableCell>
                      <TableCell className="text-amber-600 font-medium">{p.reserved}</TableCell>
                      <TableCell
                        className={
                          p.free < p.threshold
                            ? 'text-rose-600 font-bold'
                            : 'text-emerald-600 font-bold'
                        }
                      >
                        {p.free}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movimentacoes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Histórico de Movimentações</CardTitle>
              <Button className="bg-[#1A2E5A] hover:bg-[#1A2E5A]/90 text-white">
                <ArrowDownUp className="w-4 h-4 mr-2" /> Registrar Movimentação
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Doc. Referência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_STOCK_MOVEMENTS.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>{new Date(m.date).toLocaleString('pt-BR')}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            m.type === 'Entrada'
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
                              : 'bg-rose-100 text-rose-800 hover:bg-rose-100'
                          }
                        >
                          {m.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{m.product}</TableCell>
                      <TableCell className="font-bold">{m.qty}</TableCell>
                      <TableCell>{m.user}</TableCell>
                      <TableCell className="text-muted-foreground">{m.doc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ciclos">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ciclos de Inventário</CardTitle>
              <Button className="bg-[#F47920] hover:bg-[#F47920]/90 text-white">
                <RefreshCcw className="w-4 h-4 mr-2" /> Iniciar Novo Ciclo
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome do Ciclo</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Divergências Encontradas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_INVENTORY_CYCLES.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.id}</TableCell>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{c.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{c.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {c.discrepancies > 0 ? (
                          <span className="text-rose-500 font-bold">
                            {c.discrepancies} ajustes gerados
                          </span>
                        ) : (
                          <span className="text-emerald-500 font-medium">Nenhuma</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="descarte">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center text-rose-600">
                <Trash2 className="w-5 h-5 mr-2" /> Registrar Descarte de Material
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDescarte} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Produto</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_PRODUCTS.map((p) => (
                          <SelectItem key={p.id} value={p.code}>
                            {p.code} - {p.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Quantidade a descartar</Label>
                    <Input type="number" min="1" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Motivo do Descarte</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avaria">Avaria / Danificado</SelectItem>
                      <SelectItem value="vencido">Conteúdo Desatualizado / Vencido</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Justificativa Detalhada</Label>
                  <Textarea
                    required
                    placeholder="Descreva os detalhes para a autorização..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                  Solicitar Autorização de Descarte
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
