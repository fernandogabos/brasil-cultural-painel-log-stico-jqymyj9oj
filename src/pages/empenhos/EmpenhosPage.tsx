import { Link } from 'react-router-dom'
import { Plus, Search, Eye } from 'lucide-react'
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
import { MOCK_EMPENHOS } from '@/lib/mock-data'

export default function EmpenhosPage() {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return <Badge className="bg-emerald-500">{status}</Badge>
      case 'Pendente':
        return <Badge className="bg-amber-500">{status}</Badge>
      case 'Recusado':
        return <Badge className="bg-rose-500">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Notas de Empenho</h1>
          <p className="text-muted-foreground mt-1">Aprovação e vínculo de notas com contratos.</p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90 text-white">
          <Link to="/empenhos/novo">
            <Plus className="mr-2 h-4 w-4" /> Registrar Empenho
          </Link>
        </Button>
      </div>

      <Card className="p-4 flex gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por Número do Empenho..." className="pl-9 bg-slate-50" />
        </div>
      </Card>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Contrato Vinculado</TableHead>
              <TableHead>Órgão Emissor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_EMPENHOS.map((empenho) => (
              <TableRow key={empenho.id} className="hover:bg-slate-50">
                <TableCell className="font-medium">{empenho.id}</TableCell>
                <TableCell className="text-blue-600 underline cursor-pointer">
                  {empenho.contractId}
                </TableCell>
                <TableCell>{empenho.body}</TableCell>
                <TableCell>{new Date(empenho.date).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(empenho.value)}
                </TableCell>
                <TableCell className="text-center">{getStatusBadge(empenho.status)}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/empenhos/revisar?id=${empenho.id}`}>
                      <Eye className="w-4 h-4 mr-2" /> Revisar
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
