import { useNavigate } from 'react-router-dom'
import { UploadCloud, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function NewEmpenhoPage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Sucesso',
      description: 'Empenho registrado e enviado para análise do Jurídico.',
    })
    navigate('/empenhos')
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Registrar Nota de Empenho</h1>
        <p className="text-muted-foreground mt-1">
          Preencha os dados e anexe o documento original.
        </p>
      </div>

      <Card>
        <CardHeader className="border-b bg-slate-50 rounded-t-lg">
          <CardTitle className="text-lg text-primary">Formulário de Registro</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Contrato Vinculado</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o contrato..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BC-2023-0045">BC-2023-0045 - São Paulo - SP</SelectItem>
                  <SelectItem value="BC-2023-0046">BC-2023-0046 - Campinas - SP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Número do Empenho</Label>
                <Input required placeholder="Ex: 2023NE00145" />
              </div>
              <div className="space-y-2">
                <Label>Data de Emissão</Label>
                <Input type="date" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Órgão Emissor</Label>
              <Input required placeholder="Ex: Secretaria Municipal de Educação" />
            </div>

            <div className="space-y-2">
              <Label>Valor do Empenho (R$)</Label>
              <Input type="number" required placeholder="0,00" />
            </div>

            <div className="space-y-2">
              <Label>Upload do PDF (Nota Original)</Label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                <UploadCloud className="w-6 h-6 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">
                  Arraste o arquivo PDF aqui
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Observações (Opcional)</Label>
              <Textarea placeholder="Alguma ressalva importante?" rows={3} />
            </div>

            <div className="flex justify-end pt-4 border-t gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/empenhos')}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                <CheckCircle className="mr-2 h-4 w-4" /> Enviar para Validação
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
