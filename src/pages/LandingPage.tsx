import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserCheck, ArrowRight, Building2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2/5 bg-brand-primary rounded-b-[100px] shadow-lg"></div>

      <div className="z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center mt-8">
        <div className="text-white space-y-6 text-center lg:text-left animate-fade-in-up">
          <div className="flex justify-center lg:justify-start">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
              <img
                src="https://img.usecurling.com/i?q=book&color=white&shape=fill"
                alt="Brasil Cultural"
                className="w-20 h-20 object-contain drop-shadow-md"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold tracking-tight leading-tight">
            Brasil Cultural
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Plataforma inteligente de gestão logística que acompanha o ciclo completo do seu pedido,
            desde o contrato até a entrega.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
            <Button
              asChild
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold h-14 px-8 text-lg shadow-elevation transition-transform hover:-translate-y-1"
            >
              <Link to="/portal/login">
                Portal do Cliente
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white hover:bg-white hover:text-brand-primary border-white/30 font-bold h-14 px-8 text-lg backdrop-blur-sm transition-transform hover:-translate-y-1"
            >
              <Link to="/dashboard">Acesso Interno</Link>
            </Button>
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <Card className="shadow-elevation border-0 overflow-hidden">
            <div className="h-2 bg-brand-primary w-full"></div>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-brand-primary text-xl">
                <UserCheck className="w-6 h-6" />
                Credenciais de Demonstração
              </CardTitle>
              <CardDescription className="text-base">
                Utilize os dados abaixo para testar os diferentes perfis da plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="group p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-800">Administrador Interno</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm font-mono text-slate-600 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1 font-sans font-bold">
                      Email
                    </span>
                    admin@brasilcultural.com.br
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1 font-sans font-bold">
                      Senha
                    </span>
                    admin123
                  </div>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-800">Gestor (Cliente)</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm font-mono text-slate-600 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1 font-sans font-bold">
                      Email
                    </span>
                    gestor@saoexemplo.gov.br
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1 font-sans font-bold">
                      Senha
                    </span>
                    cliente123
                  </div>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-800">Acompanhante (Cliente)</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm font-mono text-slate-600 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1 font-sans font-bold">
                      Email
                    </span>
                    fiscal@saoexemplo.gov.br
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1 font-sans font-bold">
                      Senha
                    </span>
                    cliente123
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
