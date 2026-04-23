import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'
import { toast } from 'sonner'
import bcLogoBranco from '@/assets/bc-logo-branco-b40b3.png'
import bcIcon from '@/assets/8e6af6dc-57b9-4132-b991-9f491121534e-91150.png'

export default function PortalLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Preencha email e senha')
      return
    }
    toast.success('Login realizado com sucesso!')
    navigate('/portal/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[45%] bg-brand-primary rounded-b-[60px] md:rounded-b-[100px] shadow-lg flex flex-col items-center pt-12 md:pt-16">
        <img
          src={bcLogoBranco}
          alt="Brasil Cultural"
          className="h-12 md:h-16 object-contain drop-shadow-md"
        />
      </div>
      <Card className="w-full max-w-md z-10 shadow-elevation border-0 animate-fade-in-up mt-12 md:mt-20 dark:bg-slate-900">
        <CardHeader className="text-center pb-8 pt-8">
          <div className="mx-auto w-20 h-20 mb-6 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100 dark:border-slate-800">
            <img
              src={bcIcon}
              alt="Brasil Cultural Icon"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <CardTitle className="text-2xl font-title text-brand-primary dark:text-brand-medium">
            Portal do Cliente
          </CardTitle>
          <CardDescription className="text-base mt-2 dark:text-slate-400">
            Acesso exclusivo para Gestores e Municípios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                Email Institucional
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="gestor@municipio.sp.gov.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 dark:border-slate-800 focus-visible:ring-brand-primary"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
                  Senha
                </Label>
                <a href="#" className="text-xs text-brand-medium hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 focus-visible:ring-brand-primary"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-12 text-base font-semibold mt-4"
            >
              Entrar no Portal
            </Button>
          </form>
          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Dúvidas? Entre em contato com seu representante Brasil Cultural.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
