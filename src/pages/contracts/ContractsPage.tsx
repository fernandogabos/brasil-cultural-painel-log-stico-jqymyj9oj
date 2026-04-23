import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter, MoreHorizontal, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { MOCK_CONTRACTS } from '@/lib/mock-data'

export default function ContractsPage() {
  const [selectedContract, setSelectedContract] = useState<(typeof MOCK_CONTRACTS)[0] | null>(null)

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ativo':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">{status}</Badge>
      case 'Novo':
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>
      case 'Crítico':
        return <Badge className="bg-rose-500 hover:bg-rose-600">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Contratos</h1>
          <p className="text-muted-foreground mt-1">Gestão de contratos e saldos disponíveis.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-white">
            <Link to="/contratos/novo">
              <Plus className="mr-2 h-4 w-4" /> Novo Contrato
            </Link>
          </Button>
        </div>
      </div>

      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por ID ou Município..." className="pl-9 bg-slate-50" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Filtros
        </Button>
      </Card>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>ID Contrato</TableHead>
              <TableHead>Município</TableHead>
              <TableHead>Comercial</TableHead>
              <TableHead>Data Assinatura</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
              <TableHead className="text-right">Saldo Disp.</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_CONTRACTS.map((contract) => (
              <TableRow
                key={contract.id}
                className="cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setSelectedContract(contract)}
              >
                <TableCell className="font-medium">{contract.id}</TableCell>
                <TableCell>{contract.city}</TableCell>
                <TableCell>{contract.seller}</TableCell>
                <TableCell>{new Date(contract.date).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell className="text-right">{formatCurrency(contract.value)}</TableCell>
                <TableCell className="text-right font-medium text-primary">
                  {formatCurrency(contract.balance)}
                </TableCell>
                <TableCell className="text-center">{getStatusBadge(contract.status)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!selectedContract} onOpenChange={(open) => !open && setSelectedContract(null)}>
        <SheetContent className="w-full sm:max-w-md bg-slate-50 p-0 overflow-y-auto">
          {selectedContract && (
            <div className="flex flex-col h-full">
              <SheetHeader className="p-6 bg-white border-b">
                <SheetTitle className="text-xl text-primary">{selectedContract.id}</SheetTitle>
                <SheetDescription>{selectedContract.city}</SheetDescription>
                <div className="mt-4">{getStatusBadge(selectedContract.status)}</div>
              </SheetHeader>
              <div className="p-6 flex flex-col gap-6">
                <Card className="p-4 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    Resumo Financeiro
                  </h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Valor Total Contratado</span>
                    <span className="font-medium">{formatCurrency(selectedContract.value)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-slate-600">Total Empenhado</span>
                    <span className="font-medium text-rose-500">
                      {formatCurrency(selectedContract.value - selectedContract.balance)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{
                        width: `${((selectedContract.value - selectedContract.balance) / selectedContract.value) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="font-semibold text-primary">Saldo Disponível</span>
                    <span className="text-lg font-bold text-emerald-600">
                      {formatCurrency(selectedContract.balance)}
                    </span>
                  </div>
                </Card>
                <Card className="p-4 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    Detalhes
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Comercial</p>
                      <p className="text-sm font-medium">{selectedContract.seller}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Data Assinatura</p>
                      <p className="text-sm font-medium">
                        {new Date(selectedContract.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </Card>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Ver Histórico Completo
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
