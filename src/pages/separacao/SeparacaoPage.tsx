import { Link } from 'react-router-dom'
import { Settings2, Printer, Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { MOCK_OS } from '@/lib/mock-data'

export default function SeparacaoPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Separação (Picking)</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie Ordens de Separação e impressão de etiquetas.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Buscar por OS ou Pedido..." className="pl-9 bg-white" />
          </div>
          <Button variant="outline">
            <Settings2 className="w-4 h-4 mr-2" /> Filtros
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ordem (OS)</TableHead>
              <TableHead>Pedido Origem</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Operador</TableHead>
              <TableHead className="w-[200px]">Progresso</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_OS.map((os) => (
              <TableRow key={os.id}>
                <TableCell className="font-bold text-primary">{os.id}</TableCell>
                <TableCell className="text-muted-foreground">{os.orderId}</TableCell>
                <TableCell>{new Date(os.date).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{os.operator}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={os.progress} className="h-2 flex-1" />
                    <span className="text-xs font-medium w-8 text-right">{os.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      os.progress > 0 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                    }
                  >
                    {os.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" asChild className="bg-accent hover:bg-accent/90 text-white">
                    <Link to={`/separacao/os/${os.id}`}>
                      Executar <ArrowRight className="h-4 w-4 ml-1" />
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
