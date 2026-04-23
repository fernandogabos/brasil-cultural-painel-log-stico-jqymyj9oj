import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MOCK_MESSAGES } from '@/lib/mock-atendimento'
import { toast } from 'sonner'
import { Lock, MessageSquare } from 'lucide-react'

export function TicketChat({ ticketId }: { ticketId: string }) {
  const [reply, setReply] = useState('')
  const [mode, setMode] = useState('public')

  const handleSend = () => {
    if (!reply.trim()) return
    toast.success(mode === 'public' ? 'Resposta enviada ao cliente!' : 'Nota interna adicionada!')
    setReply('')
  }

  return (
    <Card className="flex flex-col h-[600px] border shadow-sm">
      <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
        {MOCK_MESSAGES.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded-lg border shadow-sm ${msg.isInternal ? 'bg-amber-50/50 border-amber-200 mr-12' : msg.role === 'customer' ? 'bg-white border-slate-200 mr-12' : 'bg-blue-50/50 border-blue-200 ml-12'}`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-slate-800">{msg.author}</span>
                {msg.isInternal && (
                  <span className="flex items-center text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                    <Lock className="w-3 h-3 mr-1" /> Interna
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{msg.date}</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{msg.content}</p>
          </div>
        ))}
      </CardContent>
      <div className="p-4 border-t bg-white">
        <Tabs value={mode} onValueChange={setMode} className="mb-3">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger
              value="public"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none border border-transparent data-[state=active]:border-blue-200"
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Resposta Pública
            </TabsTrigger>
            <TabsTrigger
              value="internal"
              className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 data-[state=active]:shadow-none border border-transparent data-[state=active]:border-amber-200"
            >
              <Lock className="w-4 h-4 mr-2" /> Nota Interna
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder={
            mode === 'public'
              ? 'Digite a mensagem que o cliente receberá...'
              : 'Digite uma nota invisível para o cliente...'
          }
          className={`min-h-[100px] resize-none ${mode === 'internal' ? 'bg-amber-50/30 focus-visible:ring-amber-400 border-amber-200' : 'focus-visible:ring-blue-400'}`}
        />
        <div className="flex justify-end mt-3">
          <Button
            onClick={handleSend}
            className={
              mode === 'internal'
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700'
            }
          >
            Enviar {mode === 'internal' ? 'Nota' : 'Resposta'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
