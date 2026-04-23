import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Building2, Lock } from 'lucide-react'
import { toast } from 'sonner'

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-primary rounded-b-[100px] shadow-lg"></div>
      <Card className="w-full max-w-md z-10 shadow-elevation border-0 animate-fade-in-up">
        <CardHeader className="text-center pb-8 pt-10">
          <div className="mx-auto w-16 h-16 mb-6">
            <img
              src="https://img.usecurling.com/i?q=leaf&color=green&shape=fill"
              alt="Brasil Cultural"
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
          <CardTitle className="text-2xl font-title text-brand-primary">
            Portal do Cliente
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Acesso exclusivo para Gestores e Municípios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email Institucional
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="gestor@municipio.sp.gov.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 focus-visible:ring-brand-primary"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-slate-700">
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
                  className="pl-10 bg-slate-50 focus-visible:ring-brand-primary"
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
          <div className="mt-8 text-center text-sm text-slate-500">
            Dúvidas? Entre em contato com seu representante Brasil Cultural.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
