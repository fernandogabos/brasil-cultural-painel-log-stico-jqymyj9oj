import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronRight, UploadCloud, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function NewContractPage() {
  const [step, setStep] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setStep(3)
      setHasError(true) // Simulate validation error initially
    }, 1500)
  }

  const handleFinalize = () => {
    toast({
      title: 'Contrato Criado',
      description: 'O contrato BC-2023-0049 foi registrado com sucesso.',
    })
    navigate('/contratos')
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-primary">Novo Contrato</h1>
        <p className="text-muted-foreground mt-1">
          Siga os passos para registrar um novo contrato no sistema.
        </p>
      </div>

      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent transition-all duration-500 -z-10"
          style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
        ></div>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-slate-50 transition-colors ${step >= s ? 'bg-accent text-white' : 'bg-slate-200 text-slate-400'}`}
          >
            {step > s ? <Check className="w-5 h-5" /> : s}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Informações Gerais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>ID Auto-gerado</Label>
                  <Input value="BC-2023-0049" disabled className="bg-slate-100" />
                </div>
                <div className="space-y-2">
                  <Label>Município / Órgão</Label>
                  <Input placeholder="Ex: Prefeitura de São Paulo" />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input placeholder="00.000.000/0001-00" />
                </div>
                <div className="space-y-2">
                  <Label>Comercial Responsável</Label>
                  <Input placeholder="Nome do vendedor" />
                </div>
                <div className="space-y-2">
                  <Label>Data Assinatura</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Valor Total Contratado (R$)</Label>
                  <Input type="number" placeholder="0,00" />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button onClick={() => setStep(2)} className="bg-primary">
                  Próximo Passo <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 text-center animate-fade-in">
              <h2 className="text-xl font-semibold mb-2">Upload de Documentos</h2>
              <p className="text-muted-foreground mb-8">
                Envie o PDF do contrato e a planilha XLSX com os itens.
              </p>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-4">
                <div className="p-4 bg-blue-50 text-blue-500 rounded-full">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-medium text-slate-700">
                    Clique para selecionar ou arraste os arquivos
                  </p>
                  <p className="text-sm text-slate-500 mt-1">Suporta PDF, XLSX, CSV (Max 10MB)</p>
                </div>
              </div>

              <div className="flex justify-between pt-8">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Voltar
                </Button>
                <Button onClick={handleUpload} disabled={isUploading} className="bg-primary">
                  {isUploading ? 'Processando...' : 'Processar Planilha'}{' '}
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Revisão e Validação</h2>

              {hasError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Divergência Encontrada</AlertTitle>
                  <AlertDescription>
                    A soma dos itens da planilha (R$ 145.000,00) difere do Valor Total informado no
                    passo 1 (R$ 150.000,00).
                    <Button
                      variant="link"
                      className="px-1 text-white underline"
                      onClick={() => setHasError(false)}
                    >
                      Corrigir automaticamente para prosseguir
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-slate-50 rounded-lg p-4 border">
                <p className="text-sm font-medium mb-4">Itens Identificados (3)</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm p-2 bg-white rounded border">
                    <span>Kit Escolar Infantil</span>
                    <span>1.000 un x R$ 50,00</span>
                    <span className="font-bold">R$ 50.000,00</span>
                  </div>
                  <div className="flex justify-between text-sm p-2 bg-white rounded border">
                    <span>Mochila BC Padrão</span>
                    <span>1.000 un x R$ 80,00</span>
                    <span className="font-bold">R$ 80.000,00</span>
                  </div>
                  <div className="flex justify-between text-sm p-2 bg-white rounded border">
                    <span>Estojo Completo</span>
                    <span>1.000 un x R$ 15,00</span>
                    <span className="font-bold">R$ 15.000,00</span>
                  </div>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t font-bold text-lg">
                  <span>Total Calculado:</span>
                  <span className={hasError ? 'text-rose-500' : 'text-emerald-600'}>
                    R$ {hasError ? '145.000,00' : '150.000,00'}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Voltar
                </Button>
                <Button
                  onClick={handleFinalize}
                  disabled={hasError}
                  className="bg-accent hover:bg-accent/90 text-white"
                >
                  Confirmar Cadastro <Check className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
