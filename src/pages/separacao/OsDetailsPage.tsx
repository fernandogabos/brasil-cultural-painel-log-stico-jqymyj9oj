import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Printer,
  CheckSquare,
  Camera,
  PackageOpen,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MOCK_SCHOOLS_UPLOAD, MOCK_OS_ITEMS } from '@/lib/mock-data'
import { useToast } from '@/hooks/use-toast'

export default function OsDetailsPage() {
  const { id } = useParams()
  const { toast } = useToast()

  // Local state for checkboxes
  const [items, setItems] = useState(MOCK_OS_ITEMS)

  const handleCheck = (itemId: number) => {
    setItems(items.map((i) => (i.id === itemId ? { ...i, checked: !i.checked } : i)))
  }

  const handleComplete = () => {
    toast({ title: 'Escola Finalizada', description: 'Etiquetas prontas para impressão.' })
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/separacao">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">Execução {id}</h1>
            <p className="text-muted-foreground mt-1">
              Checklist de separação por escola e Controle de Qualidade.
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
              <Printer className="w-4 h-4 mr-2" /> Imprimir Etiquetas
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Visualização da Etiqueta Térmica</DialogTitle>
            </DialogHeader>
            <div className="border-2 border-slate-900 p-6 rounded bg-white shadow-inner font-mono text-sm relative">
              <div className="text-center font-bold text-xl border-b-2 border-slate-900 pb-2 mb-2">
                BRASIL CULTURAL
              </div>
              <p>
                <strong>PEDIDO:</strong> PED-2023-0001
              </p>
              <p>
                <strong>ESCOLA:</strong> EMEB Monteiro Lobato
              </p>
              <div className="my-4 border-y border-dashed border-slate-400 py-2">
                <p className="font-bold text-lg">Livro Didático 1º Ano</p>
                <p>QTD NESTA CAIXA: 60 UNID</p>
              </div>
              <div className="flex justify-between items-end font-bold text-2xl">
                <span>CAIXA:</span>
                <span className="border-2 border-slate-900 px-4 py-1 rounded">1 / 5</span>
              </div>
              <div className="absolute top-2 right-2 text-slate-300">
                <PackageOpen className="w-12 h-12 opacity-20" />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-accent" /> Checklist por Escola
              </CardTitle>
              <CardDescription>
                Expanda as escolas para realizar o picking (Bipagem ou Manual)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {MOCK_SCHOOLS_UPLOAD.map((school, sIndex) => (
                  <AccordionItem
                    value={`item-${sIndex}`}
                    key={sIndex}
                    className="border border-slate-200 rounded-lg mb-4 px-4 shadow-sm bg-white overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex justify-between items-center w-full pr-4">
                        <div className="flex flex-col items-start text-left">
                          <span className="font-bold text-primary text-lg">{school.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {school.items} itens totais • {school.boxes} Caixas previstas
                          </span>
                        </div>
                        {sIndex === 0 && (
                          <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-1 rounded-full uppercase">
                            Em andamento
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6 border-t border-slate-100">
                      <div className="space-y-4 mt-4">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${item.checked ? 'bg-slate-50 border-emerald-200' : 'bg-white border-slate-200 hover:border-accent/50'}`}
                          >
                            <Checkbox
                              id={`item-${item.id}`}
                              checked={item.checked}
                              onCheckedChange={() => handleCheck(item.id)}
                              className="mt-1 h-6 w-6 rounded-md data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor={`item-${item.id}`}
                                className={`text-base cursor-pointer ${item.checked ? 'line-through text-slate-400' : 'font-semibold text-slate-800'}`}
                              >
                                {item.name}
                              </Label>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                                  Qtd: {item.quantity}
                                </span>
                                <span className="text-sm text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                                  Caixas: {item.boxes}
                                </span>
                                {item.isExam && (
                                  <span className="flex items-center text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded border border-rose-100">
                                    <AlertTriangle className="w-3 h-3 mr-1" /> TRATO ESPECIAL
                                    (AVALIAÇÃO)
                                  </span>
                                )}
                              </div>

                              {item.isExam && (
                                <div className="mt-4 p-4 bg-rose-50/50 rounded-md border border-rose-100 space-y-3 animate-fade-in">
                                  <p className="text-sm font-semibold text-rose-800">
                                    Checklist Obrigatório (Material Sigiloso)
                                  </p>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`frac-${item.id}`}
                                      className="data-[state=checked]:bg-rose-600"
                                    />
                                    <label
                                      htmlFor={`frac-${item.id}`}
                                      className="text-sm font-medium leading-none cursor-pointer text-slate-700"
                                    >
                                      Fracionamento exato conferido por turma?
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`plast-${item.id}`}
                                      className="data-[state=checked]:bg-rose-600"
                                    />
                                    <label
                                      htmlFor={`plast-${item.id}`}
                                      className="text-sm font-medium leading-none cursor-pointer text-slate-700"
                                    >
                                      Envelopamento plástico preto lacrado aplicado?
                                    </label>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Button
                          onClick={handleComplete}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                        >
                          Finalizar Escola
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-t-4 border-t-blue-500 shadow-md">
            <CardHeader className="bg-slate-50/50 pb-4">
              <CardTitle className="flex items-center text-lg">
                <ShieldCheck className="w-5 h-5 mr-2 text-blue-500" /> Controle de Qualidade
                (Sampling)
              </CardTitle>
              <CardDescription>
                Amostragem estatística obrigatória antes da expedição.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div className="space-y-2">
                <Label>Caixas Amostradas</Label>
                <Input type="number" placeholder="Ex: 5" />
              </div>
              <div className="space-y-2">
                <Label>Unidades Verificadas Fisicamente</Label>
                <Input type="number" placeholder="Ex: 300" />
              </div>

              <div className="space-y-2 pt-2">
                <Label>Resultado da Auditoria</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      id="conf"
                      name="audit"
                      className="w-4 h-4 text-emerald-600"
                    />
                    <label htmlFor="conf" className="font-medium cursor-pointer flex-1">
                      Conforme
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-slate-50 cursor-pointer border-rose-200 bg-rose-50/30">
                    <input type="radio" id="nconf" name="audit" className="w-4 h-4 text-rose-600" />
                    <label
                      htmlFor="nconf"
                      className="font-medium cursor-pointer text-rose-700 flex-1"
                    >
                      Divergente
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Button variant="outline" className="w-full h-12 border-dashed border-2">
                  <Camera className="w-4 h-4 mr-2 text-slate-400" /> Anexar Foto Evidência
                </Button>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2">
                Salvar Auditoria
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
