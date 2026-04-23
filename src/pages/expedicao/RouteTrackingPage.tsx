import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, CheckCircle2, AlertCircle, Camera, Upload, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { MOCK_SCHOOLS_UPLOAD } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function RouteTrackingPage() {
  const { id } = useParams()
  const { toast } = useToast()
  const [selectedSchool, setSelectedSchool] = useState<any>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [statuses, setStatuses] = useState<Record<string, string>>({})

  const handleStatusChange = (schoolName: string, status: string) => {
    if (status === 'Entregue') {
      setSelectedSchool(schoolName)
      setShowConfirm(true)
    } else {
      setStatuses({ ...statuses, [schoolName]: status })
      toast({
        title: 'Status Atualizado',
        description: `${schoolName} marcado como ${status}. Tracker Público sincronizado.`,
      })
    }
  }

  const confirmDelivery = (e: React.FormEvent) => {
    e.preventDefault()
    setStatuses({ ...statuses, [selectedSchool]: 'Entregue' })
    setShowConfirm(false)
    toast({
      title: 'Entrega Confirmada',
      description: 'Comprovante digital salvo. Tracker atualizado.',
    })
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 animate-fade-in-up max-w-2xl mx-auto">
      <div className="flex items-center gap-4 bg-[#1A2E5A] text-white p-4 rounded-lg shadow-lg">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" asChild>
          <Link to="/expedicao">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold">Rota: {id}</h1>
          <p className="text-white/80 text-sm">Atualização em tempo real</p>
        </div>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {MOCK_SCHOOLS_UPLOAD.map((school, i) => {
          const status = statuses[school.name] || 'Pendente'
          const isDelivered = status === 'Entregue'
          const isProblem = status === 'Com problema'

          return (
            <div
              key={i}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow',
                  isDelivered ? 'bg-emerald-500' : isProblem ? 'bg-rose-500' : 'bg-slate-300',
                )}
              >
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-white shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[#1A2E5A] text-sm">{school.name}</h3>
                  <span
                    className={cn(
                      'text-[10px] uppercase px-2 py-0.5 rounded font-bold',
                      isDelivered
                        ? 'bg-emerald-100 text-emerald-700'
                        : isProblem
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-slate-100 text-slate-600',
                    )}
                  >
                    {status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{school.address}</p>

                {status !== 'Entregue' && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(school.name, 'Entregue')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Entregue
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(school.name, 'Com problema')}
                      className="border-rose-200 text-rose-600 hover:bg-rose-50 text-xs"
                    >
                      <AlertCircle className="w-3 h-3 mr-1" /> Problema
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1A2E5A]">Confirmação Digital de Entrega</DialogTitle>
          </DialogHeader>
          <form onSubmit={confirmDelivery} className="space-y-4">
            <div className="space-y-2">
              <Label>Data/Hora</Label>
              <Input value={new Date().toLocaleString('pt-BR')} disabled />
            </div>
            <div className="space-y-2">
              <Label>Nome do Recebedor</Label>
              <Input required placeholder="Ex: Maria Silva" />
            </div>
            <div className="space-y-2">
              <Label>Cargo / Documento</Label>
              <Input required placeholder="Ex: Diretora / RG 1234" />
            </div>
            <div className="space-y-2">
              <Label>Foto do Documento Assinado (Máx 10MB)</Label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <Camera className="h-8 w-8 text-slate-400 mb-2" />
                <span className="text-sm font-medium text-slate-600 flex items-center">
                  <Upload className="w-4 h-4 mr-1" /> Toque para Upload
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Observações (Opcional)</Label>
              <Textarea placeholder="Alguma avaria ou falta?" />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-[#F47920] hover:bg-[#F47920]/90 text-white"
              >
                Salvar Entrega
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
