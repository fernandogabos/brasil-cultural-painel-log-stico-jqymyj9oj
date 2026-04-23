import { Link } from 'react-router-dom'
import { Truck, Search, Plus, MapPin, Printer } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { MOCK_ROMANEIOS } from '@/lib/mock-data'
import { useToast } from '@/hooks/use-toast'

export default function ExpedicaoPage() {
  const { toast } = useToast()

  const handleNewRomaneio = () => {
    toast({
      title: 'Simulação',
      description: 'Geração automática de Romaneio será habilitada com o DB.',
    })
  }

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E5A] flex items-center gap-2">
            <Truck className="h-8 w-8" /> Expedição & Romaneios
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestão de cargas, motoristas e despacho de pedidos.
          </p>
        </div>
        <Button
          onClick={handleNewRomaneio}
          className="bg-[#F47920] hover:bg-[#F47920]/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" /> Gerar Romaneio Automático
        </Button>
      </div>

      <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded flex items-center text-sm">
        <strong className="mr-2">Atenção:</strong> Os dados são temporários até a integração com o
        banco de dados (Skip Cloud / Supabase).
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Romaneios Gerados</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar romaneio..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Romaneio ID</TableHead>
                <TableHead>Pedido REF</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Motorista / Placa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_ROMANEIOS.map((rom) => (
                <TableRow key={rom.id}>
                  <TableCell className="font-bold text-[#1A2E5A]">{rom.id}</TableCell>
                  <TableCell>{rom.orderId}</TableCell>
                  <TableCell>{new Date(rom.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    {rom.driver} <br />
                    <span className="text-xs text-muted-foreground">{rom.plate}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={rom.status === 'Em trânsito' ? 'default' : 'secondary'}
                      className={
                        rom.status === 'Em trânsito' ? 'bg-[#1A2E5A] hover:bg-[#1A2E5A]/80' : ''
                      }
                    >
                      {rom.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/expedicao/${rom.id}`}>
                        <Printer className="h-4 w-4 mr-1" /> Detalhes
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#F47920] text-[#F47920] hover:bg-[#F47920]/10"
                      asChild
                    >
                      <Link to={`/expedicao/${rom.id}/route`}>
                        <MapPin className="h-4 w-4 mr-1" /> Rota
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
