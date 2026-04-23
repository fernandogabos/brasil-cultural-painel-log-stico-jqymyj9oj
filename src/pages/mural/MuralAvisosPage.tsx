import { useState } from 'react'
import { Megaphone, AlertCircle, CheckCircle2, UserCheck, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MOCK_MURAL } from '@/lib/mock-data'

export default function MuralAvisosPage() {
  const [mural, setMural] = useState(MOCK_MURAL)

  const handleRead = (id: number) => {
    setMural((prev) => prev.map((m) => (m.id === id ? { ...m, readBy: [...m.readBy, 'Você'] } : m)))
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E5A] tracking-tight">Mural de Avisos</h1>
          <p className="text-muted-foreground mt-1">Comunicações gerais para toda a equipe.</p>
        </div>
        <Button className="bg-[#F47920] hover:bg-[#F47920]/90 text-white">
          <Plus className="w-4 h-4 mr-2" /> Novo Aviso
        </Button>
      </div>

      <div className="grid gap-4 max-w-4xl">
        {mural.map((aviso) => {
          const hasRead = aviso.readBy.includes('Você')
          return (
            <Card key={aviso.id} className={aviso.urgent ? 'border-rose-200 shadow-sm' : ''}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {aviso.urgent ? (
                      <Badge variant="destructive" className="bg-rose-500">
                        <AlertCircle className="w-3 h-3 mr-1" /> Urgente
                      </Badge>
                    ) : (
                      <div className="p-2 bg-blue-50 text-[#1A2E5A] rounded-full">
                        <Megaphone className="w-4 h-4" />
                      </div>
                    )}
                    <CardTitle className="text-xl text-[#1A2E5A]">{aviso.title}</CardTitle>
                  </div>
                  <span className="text-sm text-slate-500 font-medium">{aviso.date}</span>
                </div>
                <CardDescription className="ml-[52px] md:ml-[3.25rem]">
                  Publicado por {aviso.author}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-6 md:ml-[3.25rem]">{aviso.content}</p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <UserCheck className="w-4 h-4" /> Lido por {aviso.readBy.length} pessoa(s)
                  </div>
                  {!hasRead ? (
                    <Button
                      onClick={() => handleRead(aviso.id)}
                      variant="outline"
                      className="border-[#1A2E5A] text-[#1A2E5A] hover:bg-[#1A2E5A] hover:text-white"
                    >
                      Confirmar Leitura
                    </Button>
                  ) : (
                    <span className="text-emerald-600 flex items-center text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Leitura Confirmada
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
