import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Send,
  Paperclip,
  CheckSquare,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { MOCK_INTERNAL_CHAT, MOCK_MUNICIPALITY_MESSAGES } from '@/lib/mock-data'

const STAGES = [
  { id: 1, label: 'Contrato recebido', status: 'completed' },
  { id: 2, label: 'Pedido formalizado', status: 'completed' },
  { id: 3, label: 'Empenho aprovado', status: 'completed' },
  { id: 4, label: 'Pedido conferido', status: 'completed' },
  { id: 5, label: 'Em separação', status: 'current' },
  { id: 6, label: 'Pronto para expedição', status: 'pending' },
  { id: 7, label: 'Em transporte', status: 'pending' },
  { id: 8, label: 'Entregue', status: 'pending' },
]

export default function PedidoDetailsPage() {
  const { id } = useParams()
  const { toast } = useToast()

  const [internalChat, setInternalChat] = useState(MOCK_INTERNAL_CHAT)
  const [newInternalMsg, setNewInternalMsg] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  const handleSendInternal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInternalMsg.trim()) return
    setInternalChat([
      ...internalChat,
      {
        id: Date.now(),
        user: 'Você',
        message: newInternalMsg,
        time: new Date().toLocaleString('pt-BR'),
        type: 'text',
      },
    ])
    setNewInternalMsg('')
  }

  const handleConcluir = () => {
    setIsCompleted(true)
    toast({
      title: 'Protocolo de Encerramento Automático',
      description:
        'Pedido Concluído. E-mails com Romaneio Assinado e NF foram enviados aos stakeholders (Jurídico, Comercial e Município).',
    })
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/pedidos">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#1A2E5A] tracking-tight">Pedido {id}</h1>
            <Badge
              className={
                isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
              }
            >
              {isCompleted ? 'Concluído' : 'Em separação'}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            Visão detalhada, timeline e comunicações do pedido.
          </p>
        </div>
      </div>

      <Tabs defaultValue="visao-geral" className="w-full">
        <TabsList className="bg-slate-100/50 mb-4 h-12 w-full justify-start overflow-x-auto">
          <TabsTrigger
            value="visao-geral"
            className="data-[state=active]:bg-[#1A2E5A] data-[state=active]:text-white rounded-md px-6"
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger
            value="interna"
            className="data-[state=active]:bg-[#1A2E5A] data-[state=active]:text-white rounded-md px-6"
          >
            Comunicações Internas
          </TabsTrigger>
          <TabsTrigger
            value="municipio"
            className="data-[state=active]:bg-[#1A2E5A] data-[state=active]:text-white rounded-md px-6"
          >
            Mensagens ao Município
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visao-geral">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Timeline Operacional</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 py-2">
                    {STAGES.map((stage) => (
                      <div key={stage.id} className="relative pl-8">
                        <span className="absolute -left-[11px] top-1 bg-white">
                          {isCompleted || stage.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : stage.status === 'current' ? (
                            <Circle className="w-5 h-5 text-[#F47920] fill-orange-50 animate-pulse" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300" />
                          )}
                        </span>
                        <div className="flex flex-col">
                          <span
                            className={`font-medium ${isCompleted || stage.status === 'completed' ? 'text-emerald-700' : stage.status === 'current' ? 'text-[#F47920] font-bold' : 'text-slate-500'}`}
                          >
                            {stage.id}. {stage.label}
                          </span>
                          {(isCompleted || stage.status === 'completed') && (
                            <span className="text-xs text-slate-400 mt-1">
                              <Clock className="inline w-3 h-3 mr-1" /> Finalizado
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Contrato</span>
                    <p className="font-medium">BC-2023-0045</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Empenho</span>
                    <p className="font-medium">EMP-9921</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Destino</span>
                    <p className="font-medium">São Paulo - SP</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <Button variant="outline" className="w-full justify-start mb-2">
                      Planilha Original
                    </Button>
                    <Button
                      onClick={handleConcluir}
                      disabled={isCompleted}
                      className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      <CheckSquare className="w-4 h-4 mr-2" />{' '}
                      {isCompleted ? 'Pedido Encerrado' : 'Concluir Pedido (Automático)'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="interna">
          <Card className="h-[500px] flex flex-col border-slate-200">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-[#1A2E5A]">Chat Interno: Pedido {id}</CardTitle>
              <CardDescription>
                Visível apenas para a equipe (Logística, Jurídico, Comercial).
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
              {internalChat.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.user === 'Você' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-xs text-slate-500 mb-1 font-medium">
                    {msg.user} • {msg.time}
                  </span>
                  <div
                    className={`p-3 rounded-xl max-w-[80%] text-sm ${msg.user === 'Você' ? 'bg-[#1A2E5A] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-800 shadow-sm'}`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t bg-white">
              <form onSubmit={handleSendInternal} className="flex gap-2">
                <Button type="button" variant="outline" size="icon" className="shrink-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  value={newInternalMsg}
                  onChange={(e) => setNewInternalMsg(e.target.value)}
                  placeholder="Use @ para mencionar um departamento..."
                  className="flex-1"
                />
                <Button
                  type="submit"
                  className="bg-[#F47920] hover:bg-[#F47920]/90 text-white shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="municipio">
          <Card className="h-[500px] flex flex-col border-slate-200">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-[#1A2E5A]">Mensagens ao Município</CardTitle>
              <CardDescription>
                Mensagens enviadas aqui aparecerão no Tracker Público do cliente.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
              {MOCK_MUNICIPALITY_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'internal' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-xs text-slate-500 mb-1 font-medium">
                    {msg.user} • {msg.time}
                  </span>
                  <div
                    className={`p-3 rounded-xl max-w-[80%] text-sm ${msg.sender === 'internal' ? 'bg-[#F47920] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-800 shadow-sm'}`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t bg-white">
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  placeholder="Escreva uma mensagem oficial para o município..."
                  className="flex-1"
                />
                <Button
                  type="submit"
                  className="bg-[#1A2E5A] hover:bg-[#1A2E5A]/90 text-white shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
