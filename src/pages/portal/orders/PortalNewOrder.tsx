import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
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
import {
  CheckCircle2,
  ChevronRight,
  PackagePlus,
  UploadCloud,
  Building,
  ArrowLeft,
} from 'lucide-react'
import { MOCK_PORTAL_CONTRACTS, MOCK_PORTAL_SCHOOLS } from '@/lib/mock-portal'
import { toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function PortalNewOrder() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [contractId, setContractId] = useState('')

  // Mocks
  const contract = MOCK_PORTAL_CONTRACTS.find((c) => c.id === contractId)

  const handleNext = () => setStep((s) => s + 1)
  const handlePrev = () => setStep((s) => s - 1)

  const handleSubmit = () => {
    toast.success(
      'Pré-pedido gerado com sucesso! A equipe da Brasil Cultural analisará a solicitação.',
    )
    navigate('/portal/pedidos')
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-fade-in-up pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/portal/pedidos')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-title font-bold text-brand-primary tracking-tight">
            Nova Solicitação de Pedido
          </h1>
          <p className="text-muted-foreground mt-1">
            Siga os passos para requisitar materiais do seu contrato.
          </p>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded-full mx-1 ${s <= step ? 'bg-brand-orange' : 'bg-slate-200'}`}
          />
        ))}
      </div>

      <Card className="shadow-md border-0">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon /> 1. Selecionar Contrato
              </CardTitle>
              <CardDescription>
                Escolha o contrato vigente para o qual deseja realizar o pedido.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 min-h-[300px]">
              <div className="space-y-2">
                <Label>Contrato Base</Label>
                <Select value={contractId} onValueChange={setContractId}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_PORTAL_CONTRACTS.filter((c) => c.status === 'Ativo').map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.id} - Saldo: R$ {c.balance.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {contract && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-6 animate-in fade-in">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    Itens disponíveis neste contrato:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {contract.items.map((i) => (
                      <li
                        key={i.code}
                        className="flex justify-between border-b border-blue-200/50 pb-1"
                      >
                        <span>{i.description}</span>
                        <span className="font-bold">{i.balance} un. livres</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-end bg-slate-50 rounded-b-xl border-t">
              <Button onClick={handleNext} disabled={!contractId} className="bg-brand-primary">
                Avançar <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building /> 2. Locais de Entrega
              </CardTitle>
              <CardDescription>
                Confirme ou adicione as escolas que receberão os materiais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 min-h-[300px]">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="w-12 text-center">Sel</TableHead>
                      <TableHead>Escola</TableHead>
                      <TableHead>Endereço</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_PORTAL_SCHOOLS.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="text-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 text-brand-orange"
                          />
                        </TableCell>
                        <TableCell className="font-medium text-slate-700">{s.name}</TableCell>
                        <TableCell className="text-sm text-slate-500">{s.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Button variant="outline" className="w-full border-dashed">
                + Solicitar Cadastro de Nova Escola
              </Button>
            </CardContent>
            <CardFooter className="justify-between bg-slate-50 rounded-b-xl border-t">
              <Button variant="ghost" onClick={handlePrev}>
                Voltar
              </Button>
              <Button onClick={handleNext} className="bg-brand-primary">
                Avançar <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PackagePlus /> 3. Distribuição de Quantidades
              </CardTitle>
              <CardDescription>Informe a quantidade de cada item por escola.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 min-h-[300px]">
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-800 text-sm mb-4">
                O sistema bloqueia solicitações que excedam o saldo disponível do contrato.
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-800">EMEB Monteiro Lobato</h4>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="col-span-3 text-sm text-slate-600">
                      Livro Didático Matemática 1º Ano
                    </div>
                    <Input type="number" defaultValue="200" className="text-right" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-800">EE Tarsila do Amaral</h4>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="col-span-3 text-sm text-slate-600">
                      Livro Didático Matemática 1º Ano
                    </div>
                    <Input type="number" defaultValue="150" className="text-right" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between bg-slate-50 rounded-b-xl border-t">
              <Button variant="ghost" onClick={handlePrev}>
                Voltar
              </Button>
              <Button onClick={handleNext} className="bg-brand-primary">
                Avançar <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </>
        )}

        {step === 4 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadCloud /> 4. Nota de Empenho
              </CardTitle>
              <CardDescription>
                Anexe a nota de empenho referente a esta solicitação (obrigatório).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 min-h-[300px]">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Número do Empenho</Label>
                  <Input placeholder="Ex: 2023NE00012" />
                </div>
                <div className="space-y-2">
                  <Label>Valor do Empenho (R$)</Label>
                  <Input placeholder="0,00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upload do Documento (PDF)</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-700">Clique para selecionar o PDF</p>
                  <p className="text-xs text-slate-500 mt-1">Máximo de 5MB</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between bg-slate-50 rounded-b-xl border-t">
              <Button variant="ghost" onClick={handlePrev}>
                Voltar
              </Button>
              <Button onClick={handleNext} className="bg-brand-primary">
                Revisar Pedido <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </>
        )}

        {step === 5 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 /> 5. Revisão Final
              </CardTitle>
              <CardDescription>
                Verifique os dados antes de submeter a solicitação para análise.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 min-h-[300px]">
              <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                <p className="text-sm">
                  <span className="text-slate-500">Contrato:</span>{' '}
                  <span className="font-semibold">{contract?.id}</span>
                </p>
                <p className="text-sm">
                  <span className="text-slate-500">Escolas de Destino:</span>{' '}
                  <span className="font-semibold">2 escolas selecionadas</span>
                </p>
                <p className="text-sm">
                  <span className="text-slate-500">Total de Itens:</span>{' '}
                  <span className="font-semibold">350 unidades</span>
                </p>
                <p className="text-sm">
                  <span className="text-slate-500">Empenho:</span>{' '}
                  <span className="font-semibold">2023NE00012 (Anexado)</span>
                </p>
              </div>
              <p className="text-sm text-slate-600">
                Ao finalizar, este pedido entrará em análise interna pela Brasil Cultural. Você será
                notificado em caso de aprovação ou divergências.
              </p>
            </CardContent>
            <CardFooter className="justify-between bg-slate-50 rounded-b-xl border-t">
              <Button variant="ghost" onClick={handlePrev}>
                Voltar
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold"
              >
                Confirmar Solicitação
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}

function FileTextIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}
