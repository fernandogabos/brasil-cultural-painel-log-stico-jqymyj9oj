import { Bell, Search, Menu } from 'lucide-react'
import { useSidebar } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/theme-toggle'

export function AppHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-primary text-primary-foreground border-b border-primary-foreground/10 shadow-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-primary-foreground/60" />
          <Input
            type="search"
            placeholder="Buscar pedido, contrato..."
            className="w-full bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 pl-9 rounded-full border-transparent focus-visible:ring-1 focus-visible:ring-accent"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="relative group text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-white"
        >
          <Bell className="h-5 w-5 transition-colors" />
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-accent rounded-full animate-pulse-ring shadow-sm" />
        </Button>

        <div className="flex items-center gap-3 border-l pl-4 border-primary-foreground/20">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-white leading-none">Júlia</span>
            <span className="text-xs text-primary-foreground/70">Jurídico</span>
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
