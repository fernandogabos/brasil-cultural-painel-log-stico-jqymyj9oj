import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { MOCK_CONTRACTS, MOCK_EMPENHOS, MOCK_SCHOOLS_UPLOAD } from '@/lib/mock-data'
import { useToast } from '@/hooks/use-toast'

export default function NewPedidoPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [contractId, setContractId] = useState('')
  const [empenhoId, setEmpenhoId] = useState('')
  const [uploaded, setUploaded] = useState(false)

  // Filtering active contracts and approved empenhos for technical block
  const validContracts = MOCK_CONTRACTS.filter((c) => c.status === 'Ativo')
  const validEmpenhos = MOCK_EMPENHOS.filter(
    (e) => e.status === 'Aprovado' && e.contractId === contractId,
  )

  const handleUpload = () => {
    toast({ title: 'Arquivo processado', description: 'Dados das escolas importados com sucesso.' })
    setUploaded(true)
  }

  const handleSave = () => {
    if (!contractId || !empenhoId || !uploaded) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Preencha todos os campos e faça o upload do anexo.',
      })
      return
    }
    toast({ title: 'Pedido criado', description: 'O pedido PED-2023-0004 foi gerado com sucesso.' })
    navigate('/pedidos')
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-primary tracking-tight">Novo Pedido</h1>
        <p className="text-muted-foreground mt-1">
          Crie um novo pedido vinculado a um contrato e empenho válidos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dados Básicos</CardTitle>
            <CardDescription>Informações obrigatórias para gerar o PED</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>ID do Pedido (Automático)</Label>
              <Input disabled value="PED-2023-0004" className="bg-slate-50 font-mono" />
            </div>

            <div className="space-y-2">
              <Label>Contrato Base (Apenas Ativos)</Label>
              <Select onValueChange={setContractId} value={contractId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um contrato..." />
                </SelectTrigger>
                <SelectContent>
                  {validContracts.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.id} - {c.city}
                    </SelectItem>
                  ))}
                  {validContracts.length === 0 && (
                    <SelectItem value="none" disabled>
                      Nenhum contrato ativo
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Empenho Aprovado</Label>
              <Select onValueChange={setEmpenhoId} value={empenhoId} disabled={!contractId}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      contractId ? 'Selecione o empenho...' : 'Selecione um contrato primeiro'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {validEmpenhos.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.id} - R$ {e.value.toLocaleString('pt-BR')}
                    </SelectItem>
                  ))}
                  {contractId && validEmpenhos.length === 0 && (
                    <SelectItem value="none" disabled>
                      Nenhum empenho aprovado para este contrato
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {contractId && validEmpenhos.length === 0 && (
                <p className="text-xs text-rose-500 mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" /> Bloqueio Técnico: Requer empenho
                  aprovado.
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Município / Destino</Label>
                <Input placeholder="Ex: São Paulo - SP" />
              </div>
              <div className="space-y-2">
                <Label>Data de Recepção</Label>
                <Input type="date" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Importação de Locais (Escolas)</CardTitle>
            <CardDescription>
              Faça upload do Excel/PDF municipal para preencher as escolas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!uploaded ? (
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center text-center gap-3 bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-slate-700">Arraste a planilha ou clique</p>
                  <p className="text-sm text-slate-500 mb-4">Excel (.xlsx) ou PDF com descritivo</p>
                  <Button onClick={handleUpload} variant="secondary">
                    Selecionar Arquivo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 !text-emerald-600" />
                  <AlertTitle>Upload Concluído</AlertTitle>
                  <AlertDescription>
                    2 escolas identificadas e processadas automaticamente.
                  </AlertDescription>
                </Alert>

                <Alert className="bg-amber-50 border-amber-200 text-amber-800">
                  <AlertTriangle className="h-4 w-4 !text-amber-600" />
                  <AlertTitle>Alerta de Divergência</AlertTitle>
                  <AlertDescription>
                    As quantidades da planilha diferem do saldo do contrato em 50 unidades (Livro 1º
                    Ano). Sinalizado para o Comercial.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {uploaded && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle>Locais de Entrega e Volumes</CardTitle>
            <CardDescription>Cálculo automático de caixas (ex: 60 unidades/caixa)</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Escola</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead className="text-right">Itens</TableHead>
                  <TableHead className="text-right">Caixas Estimadas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_SCHOOLS_UPLOAD.map((school, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {school.address} - {school.zip}
                    </TableCell>
                    <TableCell>{school.responsible}</TableCell>
                    <TableCell className="text-right font-medium">{school.items}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {school.boxes} caixas
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end gap-3 pb-8">
        <Button variant="outline" onClick={() => navigate('/pedidos')}>
          Cancelar
        </Button>
        <Button className="bg-accent hover:bg-accent/90" onClick={handleSave}>
          Gerar Pedido
        </Button>
      </div>
    </div>
  )
}
