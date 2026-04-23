import { Megaphone, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MOCK_PORTAL_MURAL } from '@/lib/mock-portal'

export default function PortalMural() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-title font-bold text-brand-primary tracking-tight">
          Mural de Avisos
        </h1>
        <p className="text-muted-foreground mt-1">
          Comunicados e informes importantes da Brasil Cultural para você.
        </p>
      </div>

      <div className="grid gap-4 max-w-4xl">
        {MOCK_PORTAL_MURAL.map((aviso) => (
          <Card
            key={aviso.id}
            className={
              aviso.priority === 'Urgent' ? 'border-rose-200 shadow-sm bg-rose-50/10' : 'shadow-sm'
            }
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {aviso.priority === 'Urgent' ? (
                    <Badge variant="destructive" className="bg-rose-500">
                      <AlertCircle className="w-3 h-3 mr-1" /> Urgente
                    </Badge>
                  ) : (
                    <div className="p-2 bg-blue-50 text-brand-primary rounded-full">
                      <Megaphone className="w-4 h-4" />
                    </div>
                  )}
                  <CardTitle className="text-xl text-slate-800">{aviso.title}</CardTitle>
                </div>
                <span className="text-sm text-slate-500 font-medium">{aviso.date}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 md:ml-[3.25rem]">{aviso.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
