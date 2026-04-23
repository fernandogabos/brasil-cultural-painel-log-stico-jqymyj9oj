import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Box, Truck, AlertCircle, Package, MapPin } from 'lucide-react'

export function LogisticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-slate-400">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pedidos Pendentes</p>
              <h3 className="text-3xl font-bold text-brand-primary">12</h3>
            </div>
            <Package className="w-8 h-8 text-slate-400" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Em Separação</p>
              <h3 className="text-3xl font-bold text-brand-primary">89</h3>
            </div>
            <Box className="w-8 h-8 text-blue-500" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Em Transporte</p>
              <h3 className="text-3xl font-bold text-brand-primary">45</h3>
            </div>
            <Truck className="w-8 h-8 text-emerald-500" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-rose-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> SLAs de Divergência Críticos (&lt; 48h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 bg-rose-50 rounded-lg border border-rose-100 shadow-sm"
                >
                  <div>
                    <p className="font-bold text-rose-900">DIV-100{i} - Quantidade</p>
                    <p className="text-xs text-rose-700 mt-0.5">
                      PED-2023-000{i} • Prazo expira em: 12h
                    </p>
                  </div>
                  <Badge variant="destructive" className="cursor-pointer">
                    Responder
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-5 h-5" /> Pedidos Travados (Falta Empenho)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-100 shadow-sm"
                >
                  <div>
                    <p className="font-bold text-amber-900">PED-2023-090{i}</p>
                    <p className="text-xs text-amber-700 mt-0.5">Aguardando há {i * 5} dias</p>
                  </div>
                  <Badge className="bg-amber-500 text-white hover:bg-amber-600 cursor-pointer">
                    Cobrar Jurídico
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Entregas Atrasadas por Município</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { m: 'São Paulo - SP', p: 5, d: 2 },
                { m: 'Campinas - SP', p: 2, d: 1 },
                { m: 'Osasco - SP', p: 1, d: 4 },
              ].map((muni, i) => (
                <div key={i} className="p-4 border border-rose-200 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <p className="font-bold text-brand-primary">{muni.m}</p>
                  </div>
                  <p className="text-sm font-medium text-slate-600">{muni.p} pedidos atrasados</p>
                  <p className="text-xs text-rose-600 mt-2 font-bold bg-rose-50 p-1.5 rounded inline-block">
                    Previsão rompida em {muni.d} dia(s)
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
