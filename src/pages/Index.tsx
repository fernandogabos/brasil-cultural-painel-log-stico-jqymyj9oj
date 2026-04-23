import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AdminDashboard } from '@/components/dashboards/AdminDashboard'
import { LogisticsDashboard } from '@/components/dashboards/LogisticsDashboard'
import { SalesDashboard } from '@/components/dashboards/SalesDashboard'

export default function Index() {
  const [role, setRole] = useState('admin')

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-primary tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral e indicadores de performance por perfil.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-lg border shadow-sm">
          <span className="text-sm font-bold text-slate-500 pl-2 uppercase tracking-wide">
            Visão do Painel:
          </span>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-[200px] bg-slate-50 border-slate-200 font-bold text-brand-primary">
              <SelectValue placeholder="Selecione o perfil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrador (Estratégico)</SelectItem>
              <SelectItem value="logistics">Logística (Operacional)</SelectItem>
              <SelectItem value="sales">Comercial (Portfólio)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-2">
        {role === 'admin' && <AdminDashboard />}
        {role === 'logistics' && <LogisticsDashboard />}
        {role === 'sales' && <SalesDashboard />}
      </div>
    </div>
  )
}
