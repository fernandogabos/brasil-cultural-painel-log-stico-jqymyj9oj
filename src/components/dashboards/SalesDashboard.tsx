import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, MapPin, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react'

export function SalesDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-brand-primary shadow-soft">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Meus Contratos Ativos</p>
                <h3 className="text-3xl font-title font-bold mt-1 text-brand-primary">12</h3>
              </div>
              <FileText className="w-6 h-6 text-slate-300" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-brand-orange shadow-soft">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Em Execução (Entregando)
                </p>
                <h3 className="text-3xl font-title font-bold mt-1 text-brand-orange">5</h3>
              </div>
              <TrendingUp className="w-6 h-6 text-slate-300" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-status-completed shadow-soft">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Finalizados (2026)</p>
                <h3 className="text-3xl font-title font-bold mt-1 text-status-completed">8</h3>
              </div>
              <CheckCircle2 className="w-6 h-6 text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-title text-brand-primary">Status dos Meus Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  id: 'PED-2026-001',
                  muni: 'São Exemplo - SP',
                  status: 'Em Separação',
                  sColor: 'bg-brand-medium/10 text-brand-medium',
                },
                {
                  id: 'PED-2026-002',
                  muni: 'Campinas - SP',
                  status: 'Em Transporte',
                  sColor: 'bg-brand-orange/10 text-brand-orange',
                },
                {
                  id: 'PED-2026-003',
                  muni: 'Osasco - SP',
                  status: 'Falta Empenho',
                  sColor: 'bg-status-attention/10 text-status-attention',
                },
                {
                  id: 'PED-2026-004',
                  muni: 'Curitiba - PR',
                  status: 'Entregue',
                  sColor: 'bg-status-completed/10 text-status-completed',
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 border rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="font-bold text-brand-primary">{p.muni}</p>
                      <p className="text-xs text-muted-foreground font-medium">{p.id}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={p.sColor}>
                    {p.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-status-error font-title flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Divergências em Meus Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 'DIV-1001',
                  muni: 'São Exemplo - SP',
                  desc: 'Faltam 10 livros João Paulo I',
                  date: 'Hoje, 09:30',
                },
                {
                  id: 'DIV-1002',
                  muni: 'Campinas - SP',
                  desc: 'Caixa amassada reportada pela EMEI',
                  date: 'Ontem, 14:15',
                },
              ].map((d, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-xl bg-red-50/50 shadow-sm relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-status-error"></div>
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-red-900 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {d.muni}
                    </p>
                    <span className="text-xs text-red-500 font-bold">{d.date}</span>
                  </div>
                  <p className="text-sm text-red-800">{d.desc}</p>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xs font-bold text-red-600">Ref: {d.id}</p>
                    <Badge variant="outline" className="text-status-error border-red-300 bg-white">
                      Acompanhar
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
