import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Truck,
  BookOpen,
  Handshake,
  Receipt,
  Settings,
  MessageCircle,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react'
import { MOCK_FAQS } from '@/lib/mock-atendimento'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const SUBJECTS = [
  { id: 'logistica', label: 'Logística e Entregas', icon: Truck },
  { id: 'pedagogico', label: 'Pedagógico', icon: BookOpen },
  { id: 'comercial', label: 'Comercial', icon: Handshake },
  { id: 'financeiro', label: 'Financeiro', icon: Receipt },
  { id: 'suporte', label: 'Suporte ao Sistema', icon: Settings },
  { id: 'outros', label: 'Outros', icon: MessageCircle },
]

export default function PublicPortalPage() {
  const [step, setStep] = useState(1)
  const [subject, setSubject] = useState('')
  const [ticketId, setTicketId] = useState('')

  const handleSubject = (id: string) => {
    setSubject(id)
    setStep(2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTicketId(`ATD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`)
    setStep(4)
  }

  const subjectData = SUBJECTS.find((s) => s.id === subject)
  const relatedFaqs = MOCK_FAQS.filter((f) => f.subjectId === subject)

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Central de Atendimento
          </h1>
          <p className="text-muted-foreground mt-2">
            Como podemos ajudar você ou seu município hoje?
          </p>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {SUBJECTS.map((s) => (
              <Card
                key={s.id}
                className="cursor-pointer hover:border-primary hover:shadow-md transition-all group"
                onClick={() => handleSubject(s.id)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                    <s.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="font-medium text-sm text-slate-700">{s.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" size="icon" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-bold text-slate-800">
                Dúvidas Frequentes - {subjectData?.label}
              </h2>
            </div>

            {relatedFaqs.length > 0 ? (
              <Accordion
                type="single"
                collapsible
                className="w-full bg-white rounded-xl shadow-sm border px-2"
              >
                {relatedFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                    <AccordionTrigger className="text-left font-medium text-slate-700 hover:text-primary">
                      {faq.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed px-1">
                      {faq.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Nenhuma FAQ encontrada para este assunto.
              </p>
            )}

            <div className="bg-white border p-6 rounded-xl shadow-sm text-center mt-6">
              <p className="mb-4 font-medium text-slate-700">
                As respostas acima não resolveram seu problema?
              </p>
              <Button onClick={() => setStep(3)} size="lg" className="w-full sm:w-auto">
                Abrir um Ticket de Suporte
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <Card className="animate-in slide-in-from-right-8 duration-300 shadow-md">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <Button variant="ghost" size="icon" onClick={() => setStep(2)} className="-ml-2">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Detalhes da Solicitação</h2>
                  <p className="text-sm text-muted-foreground">Área: {subjectData?.label}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Nome Completo *</Label>
                    <Input required placeholder="Ex: João da Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label>Cargo *</Label>
                    <Input required placeholder="Ex: Secretário de Educação" />
                  </div>
                  <div className="space-y-2">
                    <Label>Município/UF *</Label>
                    <Input required placeholder="Ex: Campinas - SP" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email de Contato *</Label>
                    <Input type="email" required placeholder="email@exemplo.com" />
                  </div>
                </div>

                {subject === 'logistica' && (
                  <div className="space-y-2 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                    <Label className="text-blue-900">Número do Pedido ou Contrato (Opcional)</Label>
                    <Input placeholder="Ex: PED-2023-0001" className="bg-white" />
                    <p className="text-xs text-blue-700 mt-1">
                      Isso nos ajuda a localizar sua entrega mais rapidamente.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Descrição do Problema *</Label>
                  <Textarea
                    required
                    rows={5}
                    placeholder="Descreva com detalhes o que está acontecendo..."
                    className="resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Anexos (Opcional)</Label>
                  <Input type="file" className="cursor-pointer" />
                  <p className="text-xs text-muted-foreground">PDF, JPG, PNG ou Excel até 10MB.</p>
                </div>
                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full">
                    Enviar Solicitação
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <div className="text-center space-y-4 animate-in zoom-in-95 duration-500 bg-white p-8 md:p-12 rounded-xl shadow-md border">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-700">
              Ticket Aberto com Sucesso!
            </h2>
            <p className="text-muted-foreground text-lg mt-2">
              Por favor, anote o seu número de protocolo:
            </p>
            <div className="text-4xl md:text-5xl font-black tracking-widest py-6 text-slate-800 bg-slate-50 rounded-lg my-4 border">
              {ticketId}
            </div>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              O prazo estimado (SLA) para a primeira resposta é de até 2 dias úteis. Enviamos um
              e-mail com o link de acompanhamento.
            </p>
            <div className="pt-8 flex flex-col gap-3 sm:flex-row justify-center">
              <Button asChild size="lg" className="sm:w-auto">
                <Link to={`/atendimento/tracker/${ticketId}`}>Acompanhar Ticket</Link>
              </Button>
              <Button variant="outline" onClick={() => setStep(1)} size="lg" className="sm:w-auto">
                Abrir Novo Ticket
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
