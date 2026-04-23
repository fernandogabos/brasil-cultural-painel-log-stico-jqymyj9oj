import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Save, Settings, Package, Bell, MapPin } from 'lucide-react'

export default function SettingsPage() {
  const { toast } = useToast()
  const handleSave = () =>
    toast({
      title: 'Configurações Salvas',
      description: 'As alterações foram aplicadas com sucesso no sistema.',
    })

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-title font-bold text-brand-primary tracking-tight">
          Configurações do Sistema
        </h1>
        <p className="text-muted-foreground mt-1">
          Gerencie regras operacionais, SLAs e personalizações (Restrito a Administradores).
        </p>
      </div>

      <Tabs defaultValue="sla" className="w-full">
        <TabsList className="mb-6 bg-slate-100 p-1 rounded-xl">
          <TabsTrigger
            value="sla"
            className="data-[state=active]:bg-white data-[state=active]:text-brand-primary font-semibold"
          >
            <Settings className="w-4 h-4 mr-2" /> Gestão de SLA
          </TabsTrigger>
          <TabsTrigger
            value="box"
            className="data-[state=active]:bg-white data-[state=active]:text-brand-primary font-semibold"
          >
            <Package className="w-4 h-4 mr-2" /> Config. de Caixas
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-white data-[state=active]:text-brand-primary font-semibold"
          >
            <Bell className="w-4 h-4 mr-2" /> Notificações
          </TabsTrigger>
          <TabsTrigger
            value="tracker"
            className="data-[state=active]:bg-white data-[state=active]:text-brand-primary font-semibold"
          >
            <MapPin className="w-4 h-4 mr-2" /> Tracker Público
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sla" className="space-y-4">
          <Card className="border-t-4 border-t-brand-primary shadow-soft">
            <CardHeader>
              <CardTitle className="font-title">Prazos e Alertas (Dias Úteis)</CardTitle>
              <CardDescription>
                Defina os limites para cada etapa do processo logístico e as ações de violação.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div className="grid gap-2">
                  <Label>Formalização do Pedido</Label>
                  <Input type="number" defaultValue={2} className="max-w-[120px]" />
                </div>
                <div className="grid gap-2">
                  <Label>Validação de Empenho</Label>
                  <Input type="number" defaultValue={5} className="max-w-[120px]" />
                </div>
                <div className="grid gap-2">
                  <Label>Início da Separação</Label>
                  <Input type="number" defaultValue={3} className="max-w-[120px]" />
                </div>
                <div className="grid gap-2">
                  <Label>Primeira Resposta à Divergência</Label>
                  <Input type="number" defaultValue={1} className="max-w-[120px]" />
                </div>
                <div className="grid gap-2">
                  <Label>Resolução de Divergência</Label>
                  <Input type="number" defaultValue={5} className="max-w-[120px]" />
                </div>
              </div>
              <div className="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-brand-primary border-b pb-2">
                  Gatilhos de Notificação
                </h4>
                <div className="flex items-center justify-between">
                  <Label className="font-medium cursor-pointer">
                    Avisar responsáveis em 50% do tempo
                  </Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="font-medium cursor-pointer">
                    Avisar responsáveis em 80% do tempo
                  </Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="font-bold text-rose-600 cursor-pointer">
                    Violação do SLA bloqueia o processo
                  </Label>
                  <Switch />
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <Label className="font-bold">Notificar Perfil (Em caso de violação)</Label>
                  <Select defaultValue="gerente">
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gerente">Gerência de Logística</SelectItem>
                      <SelectItem value="comercial">Comercial Responsável</SelectItem>
                      <SelectItem value="ambos">Ambos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            onClick={handleSave}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold"
          >
            <Save className="w-4 h-4 mr-2" /> Salvar Regras de SLA
          </Button>
        </TabsContent>

        <TabsContent value="box" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="font-title">Padrão de Caixas e Margem Operacional</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto / Categoria</TableHead>
                    <TableHead>Unidades p/ Caixa</TableHead>
                    <TableHead>Margem de Segurança (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Livros Didáticos (Geral)</TableCell>
                    <TableCell>
                      <Input type="number" defaultValue={50} className="w-24" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" defaultValue={0} className="w-24" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cadernos de Avaliação</TableCell>
                    <TableCell>
                      <Input type="number" defaultValue={100} className="w-24" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" defaultValue={5} className="w-24" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kits Literários</TableCell>
                    <TableCell>
                      <Input type="number" defaultValue={20} className="w-24" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" defaultValue={2} className="w-24" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Button
            onClick={handleSave}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold"
          >
            <Save className="w-4 h-4 mr-2" /> Atualizar Padrões
          </Button>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="font-title">Regras de Comunicação do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento Crítico</TableHead>
                    <TableHead>Canais de Envio</TableHead>
                    <TableHead>Frequência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold text-slate-700">
                      Novo Contrato Assinado
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="both">
                        <SelectTrigger className="w-[160px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system">App Interno</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="both">Ambos</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="realtime">
                        <SelectTrigger className="w-[160px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Imediato</SelectItem>
                          <SelectItem value="daily">Resumo Diário</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-slate-700">
                      Divergência Aberta p/ Cliente
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="both">
                        <SelectTrigger className="w-[160px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system">App Interno</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="both">Ambos</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="realtime">
                        <SelectTrigger className="w-[160px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Imediato</SelectItem>
                          <SelectItem value="daily">Resumo Diário</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Button
            onClick={handleSave}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold"
          >
            <Save className="w-4 h-4 mr-2" /> Salvar Regras
          </Button>
        </TabsContent>

        <TabsContent value="tracker" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="font-title">Personalização do Tracker Público</CardTitle>
              <CardDescription>
                Configure como o município visualiza o acompanhamento.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div className="grid gap-2">
                  <Label>Email de Disparo (Remetente)</Label>
                  <Input defaultValue="logistica@brasilcultural.com.br" />
                </div>
                <div className="grid gap-2">
                  <Label>Logo da Prefeitura (Mock/Placeholder)</Label>
                  <Input type="file" />
                </div>
                <div className="grid gap-2 pt-4">
                  <Label>Cor Primária (Hex)</Label>
                  <Input defaultValue="#003B73" className="w-32 h-10 p-1" type="color" />
                </div>
              </div>
              <div className="space-y-4 bg-slate-50 p-6 rounded-xl border">
                <h4 className="font-bold text-brand-primary">Textos Amigáveis (Por Etapa)</h4>
                <div className="grid gap-2">
                  <Label className="text-xs font-bold uppercase">1. Contrato</Label>
                  <Input
                    defaultValue="Contrato assinado e validado juridicamente."
                    className="bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs font-bold uppercase">2. Pedido Recebido</Label>
                  <Input
                    defaultValue="Pedido formalizado e recebido pelo nosso centro de distribuição."
                    className="bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs font-bold uppercase">3. Em Separação</Label>
                  <Input
                    defaultValue="Seu material está sendo separado e embalado pela nossa equipe."
                    className="bg-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            onClick={handleSave}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold"
          >
            <Save className="w-4 h-4 mr-2" /> Aplicar ao Tracker
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
