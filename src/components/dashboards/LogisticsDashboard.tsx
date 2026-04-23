import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Box, Truck, AlertCircle, Package, MapPin, CalendarDays } from 'lucide-react'

export function LogisticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-status-pending shadow-soft">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pedidos Pendentes</p>
              <h3 className="text-3xl font-title font-bold text-brand-primary">12</h3>
            </div>
            <Package className="w-8 h-8 text-status-pending" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-status-progress shadow-soft">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Em Separação</p>
              <h3 className="text-3xl font-title font-bold text-brand-primary">89</h3>
            </div>
            <Box className="w-8 h-8 text-status-progress" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-brand-orange shadow-soft">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Em Transporte</p>
              <h3 className="text-3xl font-title font-bold text-brand-primary">45</h3>
            </div>
            <Truck className="w-8 h-8 text-brand-orange" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-status-completed shadow-soft">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Entregues (Semana)</p>
              <h3 className="text-3xl font-title font-bold text-status-completed">32</h3>
            </div>
            <MapPin className="w-8 h-8 text-status-completed" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-status-error flex items-center gap-2 font-title">
              <AlertCircle className="w-5 h-5" /> SLAs de Divergência Críticos (&lt; 48h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 bg-red-50 rounded-xl border border-red-100 shadow-sm"
                >
                  <div>
                    <p className="font-bold text-red-900">DIV-100{i} - Quantidade</p>
                    <p className="text-xs text-red-700 mt-0.5">
                      PED-2026-000{i} • Prazo expira em: 12h
                    </p>
                  </div>
                  <Badge className="bg-status-error text-white hover:bg-status-error/90 cursor-pointer">
                    Responder
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-status-attention font-title">
              <AlertCircle className="w-5 h-5" /> Pedidos Travados (Falta Empenho)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl border border-yellow-100 shadow-sm"
                >
                  <div>
                    <p className="font-bold text-yellow-900">PED-2026-090{i}</p>
                    <p className="text-xs text-yellow-700 mt-0.5">Aguardando há {i * 5} dias</p>
                  </div>
                  <Badge className="bg-status-attention text-white hover:bg-status-attention/90 cursor-pointer">
                    Cobrar Jurídico
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-title text-brand-primary flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-brand-medium" /> Previsão de Separação (Semana)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: 'Segunda', qty: '1.200 itens', load: '85%' },
                { day: 'Terça', qty: '800 itens', load: '60%' },
                { day: 'Quarta', qty: '1.500 itens', load: '100%' },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 border-b last:border-0"
                >
                  <span className="font-medium text-slate-700 w-24">{f.day}</span>
                  <span className="text-sm text-slate-500 flex-1">{f.qty}</span>
                  <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: f.load }}
                      className={`h-full ${f.load === '100%' ? 'bg-status-attention' : 'bg-brand-medium'}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-title text-brand-primary">Municípios com Atraso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { m: 'São Paulo - SP', p: 5, d: 2 },
                { m: 'Campinas - SP', p: 2, d: 1 },
              ].map((muni, i) => (
                <div
                  key={i}
                  className="p-4 border border-red-200 bg-white rounded-xl shadow-sm relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-status-error"></div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <p className="font-bold text-brand-primary">{muni.m}</p>
                  </div>
                  <p className="text-sm font-medium text-slate-600">{muni.p} pedidos atrasados</p>
                  <p className="text-xs text-status-error mt-2 font-bold bg-red-50 p-1.5 rounded inline-block">
                    Rompido em {muni.d} dia(s)
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
