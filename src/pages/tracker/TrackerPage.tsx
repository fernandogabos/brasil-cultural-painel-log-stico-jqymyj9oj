import { useState } from 'react'
import {
  FileText,
  Inbox,
  PackageSearch,
  ListChecks,
  Truck,
  Handshake,
  AlertCircle,
  Search,
  Clock,
  MessageSquare,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { MOCK_MUNICIPALITY_MESSAGES } from '@/lib/mock-data'

export default function TrackerPage() {
  const { toast } = useToast()
  const [tracking, setTracking] = useState(false)
  const [activeTab, setActiveTab] = useState<'status' | 'mensagens'>('status')

  const brandPrimary = 'bg-[#1A2E5A]'
  const textPrimary = 'text-[#1A2E5A]'
  const borderPrimary = 'border-[#1A2E5A]'
  const brandOrange = 'bg-[#F47920]'
  const textOrange = 'text-[#F47920]'
  const borderOrange = 'border-[#F47920]'

  const steps = [
    { title: 'Contrato', icon: FileText, done: true, current: false },
    { title: 'Pedido recebido', icon: Inbox, done: true, current: false },
    { title: 'Em separação', icon: PackageSearch, done: true, current: false },
    { title: 'Pronto', icon: ListChecks, done: false, current: true },
    { title: 'Transporte', icon: Truck, done: false, current: false },
    { title: 'Entregue', icon: Handshake, done: false, current: false },
  ]

  const feed = [
    {
      time: 'Hoje, 11:15',
      text: 'Divergência (DIV-1001) relatada em análise pela nossa equipe.',
      isNew: true,
    },
    {
      time: 'Hoje, 09:30',
      text: 'Seu material foi separado e embalado pela nossa equipe.',
      isNew: false,
    },
    {
      time: 'Ontem, 14:00',
      text: 'Pedido formalizado e recebido pelo nosso centro de distribuição.',
      isNew: false,
    },
    { time: '10/10/2023', text: 'Contrato assinado e validado juridicamente.', isNew: false },
  ]

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault()
    toast({ title: 'Relato enviado', description: 'Uma divergência foi aberta e será analisada.' })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-8 px-4 font-sans">
      <div
        className={cn(
          'w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden animate-fade-in-up bg-white',
        )}
      >
        <div className={cn('p-8 text-center text-white', brandPrimary)}>
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-lg mx-auto mb-4 border border-white/20">
            BC
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Acompanhe sua Entrega</h1>
          <p className="text-blue-100/80 max-w-md mx-auto text-sm">
            Transparência total desde a formalização até a entrega na escola.
          </p>
          <div className="flex gap-2 mt-8 max-w-sm mx-auto">
            <Input
              placeholder="Digite seu Token ou UUID..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
            />
            <Button
              className={cn('h-12 px-6 font-bold hover:opacity-90 text-white', brandOrange)}
              onClick={() => setTracking(true)}
            >
              <Search className="w-4 h-4 mr-2" /> Buscar
            </Button>
          </div>
        </div>

        {tracking && (
          <div className="p-0 animate-fade-in">
            <div className="flex justify-center border-b border-slate-100 bg-slate-50 p-2 gap-2">
              <Button
                variant={activeTab === 'status' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('status')}
                className={activeTab === 'status' ? brandPrimary : 'text-slate-500'}
              >
                <PackageSearch className="w-4 h-4 mr-2" /> Status da Entrega
              </Button>
              <Button
                variant={activeTab === 'mensagens' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('mensagens')}
                className={activeTab === 'mensagens' ? brandPrimary : 'text-slate-500'}
              >
                <MessageSquare className="w-4 h-4 mr-2" /> Caixa de Mensagens (
                {MOCK_MUNICIPALITY_MESSAGES.length})
              </Button>
            </div>

            {activeTab === 'status' && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 border-b border-slate-100 bg-slate-50/50">
                  <div className="p-4 text-center">
                    <p className="text-xs text-slate-500 font-medium uppercase mb-1">Destino</p>
                    <p className={cn('font-bold text-sm', textPrimary)}>São Paulo - SP</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xs text-slate-500 font-medium uppercase mb-1">Previsão</p>
                    <p className={cn('font-bold text-sm', textPrimary)}>20/10/2023</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xs text-slate-500 font-medium uppercase mb-1">
                      Transportadora
                    </p>
                    <p className={cn('font-bold text-sm', textPrimary)}>LogExpress S/A</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xs text-slate-500 font-medium uppercase mb-1">Escolas</p>
                    <p className={cn('font-bold text-sm', textPrimary)}>12 Locais</p>
                  </div>
                </div>

                <div className="p-8 border-b border-slate-100">
                  <div className="relative flex justify-between max-w-2xl mx-auto">
                    <div className="absolute top-6 left-6 right-6 h-1 bg-slate-100 -z-10" />
                    <div
                      className={cn(
                        'absolute top-6 left-6 w-[60%] h-1 -z-10 transition-all duration-1000',
                        brandPrimary,
                      )}
                    />
                    {steps.map((step, i) => (
                      <div key={i} className="flex flex-col items-center group relative">
                        <div
                          className={cn(
                            'w-12 h-12 rounded-full flex items-center justify-center border-4 shadow-sm bg-white transition-all',
                            step.done
                              ? cn(borderPrimary, textPrimary)
                              : step.current
                                ? cn(
                                    borderOrange,
                                    textOrange,
                                    'shadow-orange-200 shadow-lg scale-110',
                                  )
                                : 'border-slate-200 text-slate-300',
                          )}
                        >
                          {step.current && (
                            <div
                              className={cn(
                                'absolute inset-0 rounded-full animate-ping opacity-20',
                                brandOrange,
                              )}
                            />
                          )}
                          <step.icon className="w-5 h-5 relative z-10" />
                        </div>
                        <span
                          className={cn(
                            'text-[10px] sm:text-xs font-semibold mt-3 text-center leading-tight',
                            step.done ? textPrimary : step.current ? textOrange : 'text-slate-400',
                          )}
                        >
                          {step.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 border-r border-slate-100 bg-white">
                    <h3 className={cn('font-bold text-lg mb-6 flex items-center', textPrimary)}>
                      <Clock className="w-5 h-5 mr-2 opacity-50" /> Histórico
                    </h3>
                    <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-px before:bg-slate-100">
                      {feed.map((item, i) => (
                        <div key={i} className="relative flex items-start">
                          <div
                            className={cn(
                              'absolute -left-6 w-3 h-3 rounded-full border-2 border-white top-1 shadow-sm',
                              item.isNew ? brandOrange : 'bg-slate-300',
                            )}
                          />
                          <div className="ml-2">
                            <time className="text-xs font-bold text-slate-400 block mb-1">
                              {item.time}
                            </time>
                            <p
                              className={cn(
                                'text-sm leading-relaxed',
                                item.isNew ? 'text-slate-800 font-medium' : 'text-slate-500',
                              )}
                            >
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 bg-slate-50/50">
                    <h3 className="font-bold text-lg mb-6 text-slate-700 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 opacity-50" /> Relatar Problema
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">
                      Faltou algo ou tem alguma dúvida? Envie um alerta direto para nossa equipe.
                    </p>
                    <form onSubmit={handleReport} className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs uppercase text-slate-500 font-bold">
                          Seu Nome / Cargo
                        </Label>
                        <Input className="bg-white" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs uppercase text-slate-500 font-bold">
                          Telefone
                        </Label>
                        <Input className="bg-white" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs uppercase text-slate-500 font-bold">
                          Descrição
                        </Label>
                        <Textarea className="bg-white min-h-[100px]" required />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#F47920] hover:bg-[#F47920]/90 text-white"
                      >
                        Enviar Alerta
                      </Button>
                    </form>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'mensagens' && (
              <div className="p-8 bg-slate-50/30">
                <h3 className={cn('font-bold text-xl mb-6 flex items-center', textPrimary)}>
                  Central de Comunicação com a Logística
                </h3>
                <div className="space-y-4 max-w-2xl mx-auto">
                  {MOCK_MUNICIPALITY_MESSAGES.map((m) => (
                    <div
                      key={m.id}
                      className={cn(
                        'p-4 rounded-xl',
                        m.sender === 'municipality'
                          ? 'bg-white border border-slate-200 ml-12 shadow-sm'
                          : cn('text-white mr-12 shadow-md', brandPrimary),
                      )}
                    >
                      <p
                        className={cn(
                          'text-xs mb-1 font-medium',
                          m.sender === 'municipality' ? 'text-slate-500' : 'text-blue-200',
                        )}
                      >
                        {m.user} • {m.time}
                      </p>
                      <p
                        className={cn(
                          'text-sm',
                          m.sender === 'municipality' ? 'text-slate-800' : 'text-white',
                        )}
                      >
                        {m.message}
                      </p>
                    </div>
                  ))}
                  <div className="mt-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <Textarea
                      placeholder="Digite sua dúvida ou resposta para a equipe logística..."
                      className="mb-3 bg-slate-50 border-transparent focus-visible:ring-1 focus-visible:ring-[#F47920]"
                    />
                    <Button className={cn('w-full text-white font-bold h-10', brandOrange)}>
                      Enviar Mensagem
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="mt-8 text-sm text-slate-400 font-medium">
        © 2026 Brasil Cultural. Plataforma Logística Integrada.
      </p>
    </div>
  )
}
