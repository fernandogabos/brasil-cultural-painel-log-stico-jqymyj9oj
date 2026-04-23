import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Package,
  Headphones,
  DollarSign,
  Clock,
  Phone,
  Mail,
  MessageSquare,
} from 'lucide-react'
import { MOCK_PORTAL_USER, MOCK_PORTAL_UPDATES } from '@/lib/mock-portal'

export default function PortalDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-title font-bold text-brand-primary tracking-tight">
          Olá, {MOCK_PORTAL_USER.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Bem-vindo(a) ao painel logístico de {MOCK_PORTAL_USER.municipality}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm border-l-4 border-l-brand-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Contratos Ativos</p>
                <p className="text-3xl font-bold text-brand-primary">1</p>
              </div>
              <div className="w-12 h-12 bg-brand-medium/10 rounded-full flex items-center justify-center text-brand-medium">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-brand-orange">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Pedidos em Andamento</p>
                <p className="text-3xl font-bold text-brand-primary">2</p>
              </div>
              <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
                <Package className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Saldo Disponível</p>
                <p className="text-2xl font-bold text-emerald-600">R$ 45.000</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-rose-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Tickets Abertos</p>
                <p className="text-3xl font-bold text-brand-primary">1</p>
              </div>
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
                <Headphones className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-title">Últimas Atualizações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_PORTAL_UPDATES.map((update) => (
                  <div
                    key={update.id}
                    className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      {update.type === 'order' && <Package className="w-5 h-5 text-brand-orange" />}
                      {update.type === 'doc' && <FileText className="w-5 h-5 text-brand-medium" />}
                      {update.type === 'ticket' && (
                        <MessageSquare className="w-5 h-5 text-rose-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{update.title}</p>
                      <p className="text-sm text-slate-500 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" /> {update.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/portal/pedidos">Ver todos os pedidos</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm bg-gradient-to-b from-brand-primary to-brand-medium text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-title text-white">Seu Representante</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <img
                src={MOCK_PORTAL_USER.rep.avatar}
                alt="Rep Avatar"
                className="w-20 h-20 rounded-full border-4 border-white/20 mb-3"
              />
              <p className="font-bold text-lg">{MOCK_PORTAL_USER.rep.name}</p>
              <p className="text-white/80 text-sm mb-4">{MOCK_PORTAL_USER.rep.role}</p>
              <div className="w-full space-y-2 text-sm text-left bg-white/10 p-3 rounded-lg">
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 opacity-70" /> {MOCK_PORTAL_USER.rep.email}
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 opacity-70" /> {MOCK_PORTAL_USER.rep.phone}
                </p>
              </div>
              <Button
                className="w-full mt-4 bg-white text-brand-primary hover:bg-slate-100"
                asChild
              >
                <Link to="/portal/chamados">Abrir Chamado</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
