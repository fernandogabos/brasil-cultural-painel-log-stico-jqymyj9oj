import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Plus, Download, Edit, Users, Shield, Link as LinkIcon } from 'lucide-react'

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-title font-bold text-brand-primary tracking-tight">
            Gestão de Acessos & Auditoria
          </h1>
          <p className="text-muted-foreground mt-1">
            Controle de usuários internos, associações a municípios e logs do sistema.
          </p>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-6 bg-slate-100 p-1 rounded-xl">
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-white data-[state=active]:text-brand-primary font-semibold"
          >
            <Users className="w-4 h-4 mr-2" /> Usuários Internos
          </TabsTrigger>
          <TabsTrigger
            value="clients"
            className="data-[state=active]:bg-white data-[state=active]:text-brand-primary font-semibold"
          >
            <Users className="w-4 h-4 mr-2" /> Clientes (Portal)
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="data-[state=active]:bg-white data-[state=active]:text-brand-primary font-semibold"
          >
            <Shield className="w-4 h-4 mr-2" /> Logs de Auditoria
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card className="border-t-4 border-t-brand-primary shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-title">Usuários Cadastrados</CardTitle>
                <CardDescription>
                  Gerencie quem tem acesso ao painel administrativo.
                </CardDescription>
              </div>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold">
                <Plus className="w-4 h-4 mr-2" /> Novo Usuário
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-6 max-w-sm relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  className="pl-9 bg-slate-50 border-slate-200"
                />
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-brand-primary">Nome / Email</TableHead>
                      <TableHead className="font-bold text-brand-primary">Cargo</TableHead>
                      <TableHead className="font-bold text-brand-primary">
                        Perfil do Sistema
                      </TableHead>
                      <TableHead className="font-bold text-brand-primary">
                        Municípios Vinculados
                      </TableHead>
                      <TableHead className="font-bold text-brand-primary">Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell>
                        <p className="font-bold text-slate-800">Carlos Mendes</p>
                        <p className="text-xs text-slate-500">carlos@bc.com.br</p>
                      </TableCell>
                      <TableCell className="text-slate-600">Executivo de Vendas</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-brand-primary text-brand-primary"
                        >
                          Comercial
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" size="sm" className="h-6 text-brand-orange p-0">
                          <LinkIcon className="w-3 h-3 mr-1" /> 5 Municípios
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-100 text-emerald-800 border-0">Ativo</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4 text-slate-400" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell>
                        <p className="font-bold text-slate-800">Vanessa Silva</p>
                        <p className="text-xs text-slate-500">vanessa@bc.com.br</p>
                      </TableCell>
                      <TableCell className="text-slate-600">Líder de Separação</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-brand-primary text-brand-primary"
                        >
                          Logística
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-slate-400">N/A</span>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-100 text-emerald-800 border-0">Ativo</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4 text-slate-400" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-slate-50/50 opacity-70">
                      <TableCell>
                        <p className="font-bold text-slate-800">João Pedro</p>
                        <p className="text-xs text-slate-500">joao@bc.com.br</p>
                      </TableCell>
                      <TableCell className="text-slate-600">Auxiliar Administrativo</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-brand-primary text-brand-primary"
                        >
                          Administrador
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-slate-400">N/A</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-slate-500">
                          Inativo
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4 text-slate-400" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients">
          <Card className="border-t-4 border-t-brand-primary shadow-soft animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-title">Usuários de Clientes (Municípios)</CardTitle>
                <CardDescription>
                  Gerencie os acessos ao Portal do Cliente (máx. 5 por município). Controle
                  permissões e visibilidade de documentos.
                </CardDescription>
              </div>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold">
                <Plus className="w-4 h-4 mr-2" /> Novo Acesso Cliente
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-6 max-w-sm relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                <Input
                  placeholder="Buscar por município ou CNPJ..."
                  className="pl-9 bg-slate-50 border-slate-200"
                />
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-brand-primary">
                        Município / CNPJ
                      </TableHead>
                      <TableHead className="font-bold text-brand-primary">
                        Usuário / Email
                      </TableHead>
                      <TableHead className="font-bold text-brand-primary">Perfil</TableHead>
                      <TableHead className="font-bold text-brand-primary">Docs Visíveis?</TableHead>
                      <TableHead className="font-bold text-brand-primary">Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell>
                        <p className="font-bold text-slate-800">Campinas - SP</p>
                        <p className="text-xs text-slate-500">12.345.678/0001-90</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-slate-700">Maria Silva</p>
                        <p className="text-xs text-slate-500">maria.silva@campinas.sp.gov.br</p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-brand-primary text-brand-primary"
                        >
                          Gestor
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 border-0">Sim (3)</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-100 text-emerald-800 border-0">Ativo</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4 text-slate-400" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell>
                        <p className="font-bold text-slate-800">Campinas - SP</p>
                        <p className="text-xs text-slate-500">12.345.678/0001-90</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-slate-700">João Souza</p>
                        <p className="text-xs text-slate-500">joao.souza@campinas.sp.gov.br</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-slate-600">
                          Acompanhante
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-slate-500 border-0">
                          Não
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-100 text-emerald-800 border-0">Ativo</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4 text-slate-400" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
              <div>
                <CardTitle className="font-title">Histórico de Ações (Logs)</CardTitle>
                <CardDescription>
                  Rastreabilidade completa de todas as interações no sistema (CRUD, Mudança de
                  Status).
                </CardDescription>
              </div>
              <Button
                variant="outline"
                className="border-brand-primary text-brand-primary font-bold"
                onClick={() => alert('Download do CSV iniciado.')}
              >
                <Download className="w-4 h-4 mr-2" /> Exportar CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Input type="date" className="w-[180px] bg-slate-50" />
                <Input
                  placeholder="Filtrar por usuário ou módulo..."
                  className="w-[300px] bg-slate-50"
                />
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-brand-primary">Data / Hora</TableHead>
                      <TableHead className="font-bold text-brand-primary">Usuário</TableHead>
                      <TableHead className="font-bold text-brand-primary">Módulo</TableHead>
                      <TableHead className="font-bold text-brand-primary w-[40%]">
                        Ação Realizada
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="text-slate-500 font-medium whitespace-nowrap">
                        23/04/2026 14:32:05
                      </TableCell>
                      <TableCell className="font-bold text-slate-700">Vanessa Silva</TableCell>
                      <TableCell>
                        <Badge variant="outline">Separação</Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        Iniciou OS-2026-045 - Checklist de itens validado.
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="text-slate-500 font-medium whitespace-nowrap">
                        23/04/2026 11:15:22
                      </TableCell>
                      <TableCell className="font-bold text-slate-700">Carlos Mendes</TableCell>
                      <TableCell>
                        <Badge variant="outline">Contratos</Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        Cadastrou contrato BC-2026-0001 (Pref. São Exemplo).
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="text-slate-500 font-medium whitespace-nowrap">
                        22/04/2026 09:00:10
                      </TableCell>
                      <TableCell className="font-bold text-slate-700">Admin</TableCell>
                      <TableCell>
                        <Badge variant="outline">Configurações</Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        Alterou SLA de Resolução de Divergência de 3 para 5 dias.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
