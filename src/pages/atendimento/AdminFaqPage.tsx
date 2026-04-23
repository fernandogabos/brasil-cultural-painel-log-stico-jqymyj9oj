import { AtendimentoNav } from '@/components/atendimento/atendimento-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MOCK_FAQS } from '@/lib/mock-atendimento'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminFaqPage() {
  const handleDelete = () => toast.success('FAQ removida com sucesso!')
  const handleEdit = () => toast.info('Abrindo editor de FAQ...')

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
      <AtendimentoNav />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Base de Conhecimento (FAQ)
          </h1>
          <p className="text-muted-foreground">
            Gerencie as respostas sugeridas aos clientes no portal público.
          </p>
        </div>
        <Button className="shrink-0">
          <Plus className="w-4 h-4 mr-2" /> Nova FAQ
        </Button>
      </div>

      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[150px]">Área / Assunto</TableHead>
              <TableHead>Título da Dúvida</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_FAQS.map((faq) => (
              <TableRow key={faq.id} className="hover:bg-slate-50/50">
                <TableCell className="capitalize font-medium text-slate-600">
                  <span className="bg-slate-100 px-2 py-1 rounded-md text-xs">{faq.subjectId}</span>
                </TableCell>
                <TableCell className="font-medium text-slate-800">{faq.title}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEdit}
                    className="text-slate-500 hover:text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDelete}
                    className="text-slate-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
