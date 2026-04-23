import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Truck, Mail, Printer, FileText, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { MOCK_ROMANEIOS, MOCK_SCHOOLS_UPLOAD } from '@/lib/mock-data'

export default function RomaneioDetailsPage() {
  const { id } = useParams()
  const { toast } = useToast()

  const romaneio = MOCK_ROMANEIOS.find((r) => r.id === id) || MOCK_ROMANEIOS[0]

  const handlePrint2Ways = () => {
    toast({
      title: 'Gerando PDF 2 Vias',
      description: 'Documento contendo via da Empresa e via do Cliente para assinaturas.',
    })
  }

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Despacho Registrado',
      description: 'Motorista registrado e carga em trânsito.',
    })
  }

  const handleSendEmail = () => {
    toast({
      title: 'E-mail enviado',
      description: 'Romaneio enviado para o contato do município.',
    })
  }

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in-up max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/expedicao">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E5A] tracking-tight">{romaneio.id}</h1>
          <p className="text-muted-foreground mt-1">Vinculado ao Pedido: {romaneio.orderId}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" onClick={handleSendEmail}>
            <Mail className="h-4 w-4 mr-2" /> Enviar p/ Município
          </Button>
          <Button
            onClick={handlePrint2Ways}
            className="bg-[#1A2E5A] hover:bg-[#1A2E5A]/90 text-white"
          >
            <Printer className="h-4 w-4 mr-2" /> Imprimir 2 Vias
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#1A2E5A]" /> Itens do Romaneio
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {MOCK_SCHOOLS_UPLOAD.map((school, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-bold text-[#1A2E5A]">{school.name}</h4>
                      <p className="text-sm text-muted-foreground">{school.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{school.items} itens</p>
                      <p className="text-sm text-muted-foreground">{school.boxes} caixas</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-amber-50 rounded text-amber-800 text-sm font-medium">
                * Áreas de assinatura (Recebedor e Motorista) e número da NF serão incluídas no PDF
                final.
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-t-4 border-t-[#F47920] shadow-md">
            <CardHeader className="bg-slate-50/50">
              <CardTitle className="text-lg flex items-center">
                <Truck className="h-5 w-5 mr-2 text-[#F47920]" /> Registro de Despacho
              </CardTitle>
              <CardDescription>Obrigatório antes da saída do CD.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleDispatch} className="space-y-4">
                <div className="space-y-2">
                  <Label>Motorista</Label>
                  <Input
                    defaultValue={romaneio.driver !== '-' ? romaneio.driver : ''}
                    required
                    placeholder="Nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label>CPF</Label>
                  <Input placeholder="000.000.000-00" required />
                </div>
                <div className="space-y-2">
                  <Label>Placa do Veículo</Label>
                  <Input
                    defaultValue={romaneio.plate !== '-' ? romaneio.plate : ''}
                    required
                    placeholder="ABC-1234"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Transportadora</Label>
                  <Input
                    defaultValue={romaneio.carrier !== '-' ? romaneio.carrier : ''}
                    required
                    placeholder="Ex: Frota Própria"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#F47920] hover:bg-[#F47920]/90 text-white mt-4"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Confirmar Despacho
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
