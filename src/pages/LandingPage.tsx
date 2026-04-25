import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserCheck, ArrowRight, Building2 } from 'lucide-react'
import bcLogoBranco from '@/assets/bc-logo-branco-b40b3.png'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-start pt-16 md:pt-28 lg:pt-36 px-4 md:px-8 pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[70%] sm:h-[65%] md:h-[60%] lg:h-[55%] bg-brand-primary rounded-b-[40px] md:rounded-b-[100px] shadow-lg"></div>

      <div className="z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-10 lg:gap-12 items-start mt-4 lg:mt-8">
        <div className="text-white space-y-6 text-center lg:text-left animate-fade-in-up">
          <img
            src={bcLogoBranco}
            alt="Brasil Cultural"
            className="h-16 sm:h-20 object-contain mx-auto lg:mx-0 drop-shadow-lg"
          />

          <div className="bg-black/20 backdrop-blur-md px-6 py-5 rounded-2xl border border-white/10 shadow-lg max-w-lg mx-auto lg:mx-0">
            <p className="text-xl md:text-2xl text-white font-semibold leading-relaxed drop-shadow-sm">
              Plataforma inteligente de gestão logística que acompanha o ciclo completo do seu
              pedido, desde o contrato até a entrega.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
            <Button
              asChild
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold h-14 px-8 text-lg shadow-elevation transition-transform hover:-translate-y-1 border-2 border-brand-orange/50"
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
              className="bg-white text-brand-primary hover:bg-slate-50 font-extrabold h-14 px-8 text-lg shadow-elevation transition-transform hover:-translate-y-1 border-2 border-white"
            >
              <Link to="/dashboard">Acesso Interno</Link>
            </Button>
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <Card className="shadow-elevation border-0 overflow-hidden dark:bg-slate-900">
            <div className="h-2 bg-brand-primary w-full"></div>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-brand-primary text-xl">
                <UserCheck className="w-6 h-6" />
                Credenciais de Demonstração
              </CardTitle>
              <CardDescription className="text-base dark:text-slate-400">
                Utilize os dados abaixo para testar os diferentes perfis da plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="group p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-brand-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">
                    Administrador Interno
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-xs uppercase tracking-wider mb-1 font-sans font-bold">
                      Email
                    </span>
                    admin@brasilcultural.com.br
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-xs uppercase tracking-wider mb-1 font-sans font-bold">
                      Senha
                    </span>
                    admin123
                  </div>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-brand-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shadow-[0px_0px_6px_0px_#808080]">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">Gestor (Cliente)</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-xs uppercase tracking-wider mb-1 font-sans font-bold">
                      Email
                    </span>
                    gestor@saoexemplo.gov.br
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-xs uppercase tracking-wider mb-1 font-sans font-bold">
                      Senha
                    </span>
                    cliente123
                  </div>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-brand-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">
                    Acompanhante (Cliente)
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-xs uppercase tracking-wider mb-1 font-sans font-bold">
                      Email
                    </span>
                    fiscal@saoexemplo.gov.br
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-xs uppercase tracking-wider mb-1 font-sans font-bold">
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
