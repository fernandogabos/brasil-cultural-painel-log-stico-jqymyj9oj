import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Package,
  Headphones,
  Megaphone,
  Bell,
  Menu,
  LogOut,
  PlusCircle,
} from 'lucide-react'
import { MOCK_PORTAL_USER } from '@/lib/mock-portal'

const navItems = [
  { title: 'Home', url: '/portal/dashboard', icon: LayoutDashboard },
  { title: 'Indicadores', url: '/portal/indicadores', icon: BarChart3 },
  { title: 'Meus Contratos', url: '/portal/contratos', icon: FileText },
  { title: 'Meus Pedidos', url: '/portal/pedidos', icon: Package },
  { title: 'Suporte & Chamados', url: '/portal/chamados', icon: Headphones },
  { title: 'Mural de Avisos', url: '/portal/mural', icon: Megaphone },
]

function PortalSidebar() {
  const location = useLocation()
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <Sidebar collapsible="icon" className="border-r-0 shadow-lg">
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-sidebar-border px-4">
        {!isCollapsed ? (
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-white animate-fade-in">
            <div className="w-8 h-8 bg-brand-orange rounded-md flex items-center justify-center text-white">
              BC
            </div>
            <span>Portal do Cliente</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-brand-orange rounded-md flex items-center justify-center text-white font-bold">
            BC
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-4 flex flex-col items-center justify-center text-center">
            {!isCollapsed && (
              <>
                <p className="text-white font-semibold">{MOCK_PORTAL_USER.municipality}</p>
                <p className="text-sidebar-foreground/70 text-xs mt-1">
                  CNPJ: {MOCK_PORTAL_USER.cnpj}
                </p>
              </>
            )}
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mb-4 mt-2 px-2">
                <Button
                  asChild
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold"
                >
                  <Link to="/portal/pedidos/novo">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    {!isCollapsed && 'Solicitar Pedido'}
                  </Link>
                </Button>
              </SidebarMenuItem>
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.url)
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

function PortalHeader() {
  const { toggleSidebar } = useSidebar()
  const navigate = useNavigate()

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white text-slate-800 border-b border-slate-200 shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden text-slate-600 hover:bg-slate-100"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="hidden md:block font-title font-bold text-lg text-brand-primary">
          Área do Cliente
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative group text-slate-600 hover:bg-slate-100"
        >
          <Bell className="h-5 w-5 transition-colors" />
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-brand-orange rounded-full animate-pulse-ring shadow-sm" />
        </Button>

        <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-800 leading-none">
              {MOCK_PORTAL_USER.name}
            </span>
            <span className="text-xs text-slate-500">{MOCK_PORTAL_USER.role}</span>
          </div>
          <Avatar className="border-2 border-slate-200 cursor-pointer hover:border-brand-primary transition-colors">
            <AvatarImage
              src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=22"
              alt="Avatar"
            />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/portal/login')}
            title="Sair"
          >
            <LogOut className="h-4 w-4 text-slate-400 hover:text-rose-500" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export function PortalLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50 font-sans">
        <PortalSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <PortalHeader />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
