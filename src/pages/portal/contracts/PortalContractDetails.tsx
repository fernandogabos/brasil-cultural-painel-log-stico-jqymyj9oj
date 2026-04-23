import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowLeft, Download, FileText, Package } from 'lucide-react'
import { MOCK_PORTAL_CONTRACTS } from '@/lib/mock-portal'

export default function PortalContractDetails() {
  const { id } = useParams()
  const contract = MOCK_PORTAL_CONTRACTS.find((c) => c.id === id) || MOCK_PORTAL_CONTRACTS[0]

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/portal/contratos">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-title font-bold text-brand-primary tracking-tight">
            Contrato {contract.id}
          </h1>
          <p className="text-muted-foreground mt-1">
            Detalhamento de itens e documentos vinculados.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-brand-medium" /> Itens do Contrato
              </CardTitle>
              <CardDescription>Acompanhe o saldo unitário de cada item contratado.</CardDescription>
            </CardHeader>
            <CardContent>
              {contract.items.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="text-right">Contratado</TableHead>
                        <TableHead className="text-right">Pedido</TableHead>
                        <TableHead className="text-right font-bold text-emerald-600">
                          Saldo (Un.)
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contract.items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-mono text-xs">{item.code}</TableCell>
                          <TableCell className="font-medium text-slate-700">
                            {item.description}
                          </TableCell>
                          <TableCell className="text-right text-slate-500">
                            {item.contracted}
                          </TableCell>
                          <TableCell className="text-right text-slate-500">
                            {item.ordered}
                          </TableCell>
                          <TableCell className="text-right font-bold text-emerald-600 bg-emerald-50/30">
                            {item.balance}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  Nenhum item discriminado para este contrato.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-medium" /> Documentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contract.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-rose-100 text-rose-600 rounded flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 line-clamp-1">
                          {doc.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {doc.date} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-brand-medium">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {contract.documents.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">
                    Nenhum documento disponível.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
