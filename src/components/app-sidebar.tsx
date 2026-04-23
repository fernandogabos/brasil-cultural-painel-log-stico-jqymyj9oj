import { Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  FileText,
  FileBadge2,
  Package,
  Box,
  Truck,
  MapPin,
  AlertTriangle,
  Archive,
  Star,
  Headphones,
  Megaphone,
  Settings,
  Users,
  PlayCircle,
} from 'lucide-react'

const navItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Demo Flow', url: '/demo', icon: PlayCircle },
  { title: 'Mural de Avisos', url: '/mural', icon: Megaphone },
  { title: 'Contratos', url: '/contratos', icon: FileText },
  { title: 'Empenhos', url: '/empenhos', icon: FileBadge2 },
  { title: 'Pedidos', url: '/pedidos', icon: Package },
  { title: 'Separação', url: '/separacao', icon: Box },
  { title: 'Expedição', url: '/expedicao', icon: Truck },
  { title: 'Estoque', url: '/estoque', icon: Archive },
  { title: 'Tracker Público', url: '/tracker/demo-uuid', icon: MapPin },
  { title: 'Divergências', url: '/divergencias', icon: AlertTriangle },
  { title: 'Atendimento', url: '/atendimento/admin', icon: Headphones },
  { title: 'Usuários', url: '/users', icon: Users },
  { title: 'Configurações', url: '/settings', icon: Settings },
]

export function AppSidebar() {
  const location = useLocation()
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <Sidebar collapsible="icon" className="border-r-0 shadow-lg">
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-sidebar-border px-4">
        {!isCollapsed ? (
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-white animate-fade-in">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center text-white">
              BC
            </div>
            <span>Painel Logístico</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center text-white font-bold">
            BC
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 mt-4">Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  (item.url !== '/' && location.pathname.startsWith(item.url))
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="data-[active=true]:bg-brand-medium/20 data-[active=true]:border-l-4 data-[active=true]:border-brand-orange data-[active=true]:text-white transition-all duration-200 border-l-4 border-transparent hover:bg-white/5"
                    >
                      <Link to={item.url}>
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
