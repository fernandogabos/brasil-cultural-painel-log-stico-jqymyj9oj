import { Bell, Search, Menu } from 'lucide-react'
import { useSidebar } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function AppHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white border-b border-border shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar pedido, contrato..."
            className="w-full bg-slate-50 pl-9 rounded-full border-none focus-visible:ring-1 focus-visible:ring-accent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative group">
          <Bell className="h-5 w-5 text-slate-600 group-hover:text-primary transition-colors" />
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-accent rounded-full animate-pulse-ring" />
        </Button>

        <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-primary leading-none">Júlia</span>
            <span className="text-xs text-muted-foreground">Jurídico</span>
          </div>
          <Avatar className="border-2 border-accent cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage
              src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12"
              alt="Júlia Avatar"
            />
            <AvatarFallback>JU</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
