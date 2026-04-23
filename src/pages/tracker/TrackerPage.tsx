import { Package, Truck, CheckCircle, MapPin, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function TrackerPage() {
  const steps = [
    {
      title: 'Pedido Recebido',
      desc: 'Contrato validado e empenho aprovado.',
      date: '10/10/2023 14:00',
      active: true,
      done: true,
    },
    {
      title: 'Em Separação',
      desc: 'Materiais sendo preparados no CD.',
      date: '12/10/2023 09:30',
      active: true,
      done: true,
    },
    {
      title: 'Expedido',
      desc: 'Pedido coletado pela transportadora.',
      date: '15/10/2023 16:45',
      active: true,
      done: true,
    },
    {
      title: 'Em Rota de Entrega',
      desc: 'Caminhão a caminho do destino.',
      date: 'Em andamento',
      active: true,
      done: false,
    },
    {
      title: 'Entregue',
      desc: 'Material entregue na escola/município.',
      date: '-',
      active: false,
      done: false,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 font-sans">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center text-white font-bold text-xl shadow-lg">
          BC
        </div>
        <h1 className="text-2xl font-bold text-primary tracking-tight">Tracker Logístico</h1>
      </div>

      <Card className="w-full max-w-2xl shadow-xl border-t-4 border-t-accent animate-fade-in-up">
        <CardHeader className="bg-white rounded-t-xl pb-6 border-b">
          <CardTitle className="text-center text-slate-700 font-medium">
            Acompanhe seu pedido
          </CardTitle>
          <div className="flex gap-2 mt-4 max-w-md mx-auto">
            <Input defaultValue="UUID-8A7B-9C0D" className="bg-slate-100" />
            <Button className="bg-accent hover:bg-accent/90">
              <Search className="w-4 h-4 mr-2" /> Rastrear
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div>
              <p className="text-sm text-blue-600 font-semibold mb-1">Destino</p>
              <p className="text-lg font-bold text-primary flex items-center">
                <MapPin className="w-5 h-5 mr-2" /> São Paulo - SP
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600 font-semibold mb-1">Previsão</p>
              <p className="text-lg font-bold text-primary">20/10/2023</p>
            </div>
          </div>

          <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[1.4rem] before:h-full before:w-1 before:bg-slate-200">
            {steps.map((step, i) => (
              <div key={i} className="relative flex items-start group">
                <div
                  className={`absolute -left-6 flex items-center justify-center w-8 h-8 rounded-full border-4 border-white ${step.done ? 'bg-emerald-500' : step.active ? 'bg-accent animate-pulse' : 'bg-slate-200'} z-10 shadow-sm`}
                >
                  {step.done ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : step.active ? (
                    <Truck className="w-3 h-3 text-white" />
                  ) : (
                    <Package className="w-3 h-3 text-slate-400" />
                  )}
                </div>
                <div className="ml-6 flex-1 pt-1">
                  <h3
                    className={`text-lg font-semibold ${step.active ? 'text-primary' : 'text-slate-400'}`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${step.active ? 'text-slate-600' : 'text-slate-400'}`}
                  >
                    {step.desc}
                  </p>
                  <p className="text-xs font-medium text-slate-400 mt-2">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="mt-8 text-sm text-slate-400">
        © 2026 Brasil Cultural Editora. Todos os direitos reservados.
      </p>
    </div>
  )
}
