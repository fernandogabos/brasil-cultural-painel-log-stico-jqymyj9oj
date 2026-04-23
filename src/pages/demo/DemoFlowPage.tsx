import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Play,
  FileText,
  Truck,
  AlertCircle,
  Package,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

const DEMO_STEPS = [
  {
    id: 1,
    title: 'Cadastro de Contrato e Empenho',
    desc: 'Prefeitura de São Exemplo, SP | BC-2026-0001 | R$ 120.000,00 | Empenho: NE 2026/042',
    icon: FileText,
  },
  {
    id: 2,
    title: 'Criação do Pedido (PED-2026-0001)',
    desc: 'Distribuição para 3 Escolas: João Paulo I, EMEI Girassol, Pedro Álvares',
    icon: Package,
  },
  {
    id: 3,
    title: 'Separação e Romaneio',
    desc: 'OS de separação gerada e motorista atribuído ao romaneio',
    icon: Truck,
  },
  {
    id: 4,
    title: 'Entrega Realizada',
    desc: 'Confirmação via app do motorista e upload do canhoto assinado',
    icon: CheckCircle2,
  },
  {
    id: 5,
    title: 'Sincronização Pública',
    desc: 'Portal Tracker atualizado para o cliente (Status: Entregue)',
    icon: CheckCircle2,
  },
  {
    id: 6,
    title: 'Simulação de Divergência',
    desc: 'Cliente reporta via Tracker: "Faltam 10 livros na João Paulo I"',
    icon: AlertCircle,
  },
  {
    id: 7,
    title: 'Resolução de Divergência',
    desc: 'Dossiê analisado, reenvio autorizado e cliente notificado com sucesso',
    icon: CheckCircle2,
  },
]

export default function DemoFlowPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const { toast } = useToast()

  const advanceStep = () => {
    if (currentStep < DEMO_STEPS.length) {
      setCurrentStep((prev) => prev + 1)
      toast({
        title: 'Simulação Avançada',
        description: `Passo ${currentStep + 1} executado no ambiente de testes.`,
      })
    }
  }

  const resetDemo = () => {
    setCurrentStep(0)
    toast({
      title: 'Sandbox Limpo',
      description: 'Todos os dados da demonstração foram resetados.',
    })
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-brand-primary p-8 rounded-2xl text-white shadow-xl bg-gradient-to-r from-brand-primary to-[#24407A]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Ambiente de Demonstração Interativo
          </h1>
          <p className="text-blue-100/90 text-sm max-w-2xl leading-relaxed">
            Simule o ciclo completo do pedido com os dados controlados da Prefeitura de São Exemplo.
            Valide a integração entre módulos desde a formalização até a resolução de problemas de
            entrega.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={resetDemo}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white font-bold"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Resetar Dados
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        <div className="md:col-span-1 space-y-2 relative before:absolute before:inset-0 before:ml-[1.45rem] before:h-full before:w-0.5 before:bg-slate-200">
          {DEMO_STEPS.map((step, index) => {
            const isActive = index + 1 === currentStep
            const isPast = index + 1 <= currentStep
            return (
              <div
                key={step.id}
                className={cn(
                  'relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300',
                  isActive
                    ? 'bg-white shadow-md border-2 border-brand-orange scale-[1.02]'
                    : 'hover:bg-slate-50',
                  isPast && !isActive ? 'opacity-70 grayscale' : '',
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center z-10 shrink-0 shadow-sm transition-all duration-500',
                    isPast
                      ? 'bg-emerald-500 text-white'
                      : isActive
                        ? 'bg-brand-orange text-white ring-4 ring-brand-orange/20'
                        : 'bg-white border-2 border-slate-300 text-slate-400',
                  )}
                >
                  {isPast && !isActive ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div className="pt-1">
                  <p
                    className={cn(
                      'font-bold text-sm leading-tight mb-1',
                      isActive ? 'text-brand-primary' : 'text-slate-700',
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-tight">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="md:col-span-2">
          <Card className="h-full border-0 shadow-2xl overflow-hidden rounded-2xl bg-white flex flex-col">
            <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-5">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-brand-primary">
                    Terminal de Execução (Sandbox)
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Visualização da etapa ativa no sistema.
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-white text-brand-primary border-brand-primary/20 font-bold px-3 py-1"
                >
                  Passo {currentStep} de 7
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="flex-1 p-8 flex flex-col items-center justify-center min-h-[450px] text-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-50/50">
                {currentStep === 0 && (
                  <div className="animate-fade-in-up space-y-4 max-w-sm">
                    <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-primary">
                      <Play className="w-10 h-10 ml-1" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Pronto para Iniciar?</h3>
                    <p className="text-slate-500 text-sm">
                      Clique no botão abaixo para disparar o pipeline de simulação de São Exemplo.
                    </p>
                  </div>
                )}

                {currentStep > 0 && currentStep < 7 && (
                  <div className="animate-fade-in-up w-full max-w-lg">
                    <div className="p-8 bg-white rounded-2xl shadow-lg border border-slate-100 text-left relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-orange to-brand-primary"></div>
                      <p className="text-[10px] uppercase font-bold text-brand-orange mb-3 tracking-wider">
                        Simulação em Andamento
                      </p>
                      <h4 className="font-bold text-xl mb-3 text-slate-800">
                        {DEMO_STEPS[currentStep - 1].title}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {DEMO_STEPS[currentStep - 1].desc}
                      </p>

                      {currentStep === 4 && (
                        <div className="w-full h-40 bg-slate-50 rounded-xl border-dashed border-2 border-slate-300 flex flex-col items-center justify-center text-slate-400 text-xs shadow-inner">
                          <CheckCircle2 className="w-8 h-8 mb-3 text-emerald-400" />
                          <span className="font-mono bg-white px-2 py-1 rounded shadow-sm border">
                            Canhoto_JoaoPaulo_Assinado.jpg
                          </span>
                        </div>
                      )}
                      {currentStep === 6 && (
                        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm font-medium flex items-start gap-3">
                          <AlertCircle className="w-6 h-6 shrink-0 text-rose-500 mt-0.5" />
                          <p>
                            <strong>Alerta Crítico:</strong> O cliente abriu uma divergência no
                            Tracker Público reportando que faltaram 10 unidades do Livro Didático na
                            Escola João Paulo I.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 7 && (
                  <div className="animate-fade-in-up space-y-4 max-w-md">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 shadow-inner">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Ciclo Concluído!</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      O pedido foi entregue com sucesso, a divergência foi tratada e o cliente
                      finalizado. A demonstração End-to-End foi validada.
                    </p>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-slate-100 bg-white flex justify-center">
                {currentStep < 7 ? (
                  <Button
                    size="lg"
                    onClick={advanceStep}
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-lg px-10 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 w-full max-w-sm"
                  >
                    Simular Próximo Passo <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={resetDemo}
                    variant="outline"
                    className="text-lg px-10 h-14 rounded-full border-2 border-slate-200 text-slate-600 font-bold w-full max-w-sm hover:bg-slate-50"
                  >
                    <RotateCcw className="ml-2 w-5 h-5 mr-2" /> Reiniciar Simulação
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
