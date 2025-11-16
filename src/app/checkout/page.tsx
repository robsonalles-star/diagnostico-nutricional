"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  Check, 
  Calendar, 
  Sparkles, 
  Star, 
  ChefHat, 
  Coffee, 
  UtensilsCrossed, 
  Cookie,
  Gift,
  TrendingUp,
  Shield,
  CreditCard,
  Lock,
  ArrowLeft,
  Zap,
  Percent
} from "lucide-react"

type Plan = {
  id: string
  name: string
  price: number
  annualPrice: number
  description: string
  features: string[]
  icon: any
  color: string
  popular?: boolean
}

type AddonPackage = {
  id: string
  name: string
  description: string
  monthlyPrice: number
  annualPrice: number
  icon: any
  color: string
  items: string[]
}

export default function CheckoutPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string>("silver")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [showSpecialOffer, setShowSpecialOffer] = useState(false)

  const plans: Plan[] = [
    {
      id: "bronze",
      name: "Bronze",
      price: 19.90,
      annualPrice: 179.90,
      description: "Ideal para começar",
      features: [
        "Cardápio semanal personalizado",
        "Lista de compras automática",
        "Receitas básicas",
        "Suporte por email"
      ],
      icon: Calendar,
      color: "orange"
    },
    {
      id: "silver",
      name: "Prata",
      price: 39.90,
      annualPrice: 359.90,
      description: "Melhor custo-benefício",
      features: [
        "Cardápio mensal completo",
        "Lista de compras detalhada",
        "Modo marmita com guia de preparo",
        "Substituições automáticas",
        "Receitas com vídeos",
        "Suporte prioritário"
      ],
      icon: Sparkles,
      color: "emerald",
      popular: true
    },
    {
      id: "gold",
      name: "Ouro",
      price: 79.90,
      annualPrice: 719.90,
      description: "Experiência premium",
      features: [
        "Tudo do plano Prata +",
        "Plano 100% personalizado",
        "Ajustes semanais ilimitados",
        "Chat com nutricionista/IA",
        "Receitas exclusivas",
        "Cálculo de macros em tempo real",
        "Suporte VIP 24/7"
      ],
      icon: Star,
      color: "yellow"
    }
  ]

  const addonPackages: AddonPackage[] = [
    {
      id: "breakfast",
      name: "Pacote Café da Manhã",
      description: "30 receitas deliciosas para começar o dia com energia",
      monthlyPrice: 29.90,
      annualPrice: 269.90,
      icon: Coffee,
      color: "amber",
      items: [
        "30 receitas de café da manhã",
        "Opções low-carb e fit",
        "Receitas rápidas (5-10 min)",
        "Lista de compras inclusa"
      ]
    },
    {
      id: "dinner",
      name: "Pacote Jantar",
      description: "30 jantares leves e nutritivos para sua rotina",
      monthlyPrice: 34.90,
      annualPrice: 314.90,
      icon: UtensilsCrossed,
      color: "purple",
      items: [
        "30 receitas de jantar",
        "Opções leves e digestivas",
        "Preparo em até 30 minutos",
        "Perfeito para meal prep"
      ]
    },
    {
      id: "snacks",
      name: "Pacote Lanches",
      description: "30 lanches saudáveis para matar a fome entre refeições",
      monthlyPrice: 24.90,
      annualPrice: 224.90,
      icon: Cookie,
      color: "pink",
      items: [
        "30 receitas de lanches",
        "Opções práticas para levar",
        "Snacks pré e pós-treino",
        "Alternativas saudáveis"
      ]
    }
  ]

  const selectedPlanData = plans.find(p => p.id === selectedPlan)!
  
  const calculateTotal = () => {
    const planPrice = billingCycle === "annual" 
      ? selectedPlanData.annualPrice 
      : selectedPlanData.price

    let addonsTotal = 0
    selectedAddons.forEach(addonId => {
      const addon = addonPackages.find(a => a.id === addonId)
      if (addon) {
        addonsTotal += billingCycle === "annual" ? addon.annualPrice : addon.monthlyPrice
      }
    })

    // Desconto especial para plano Bronze com pacotes
    let discount = 0
    if (selectedPlan === "bronze" && selectedAddons.length > 0) {
      discount = addonsTotal * 0.25 // 25% de desconto nos pacotes
    }

    return {
      planPrice,
      addonsTotal,
      discount,
      total: planPrice + addonsTotal - discount
    }
  }

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId)
    // Mostra oferta especial se escolher plano Bronze
    if (planId === "bronze") {
      setShowSpecialOffer(true)
    }
  }

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    )
  }

  const totals = calculateTotal()
  const annualSavings = billingCycle === "annual" 
    ? (selectedPlanData.price * 12) - selectedPlanData.annualPrice
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/")}
                className="text-gray-700 hover:text-emerald-600"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">NutriPlan</span>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 text-sm px-3 py-1">
              <Shield className="w-4 h-4 mr-1" />
              Checkout Seguro
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Escolha Seu Plano Ideal
            </h1>
            <p className="text-lg text-gray-600">
              Personalize sua experiência com pacotes adicionais
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Plan Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Billing Cycle Toggle */}
              <Card className="border-2 border-emerald-200">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <h3 className="font-bold text-lg mb-1">Escolha o Ciclo de Pagamento</h3>
                      <p className="text-sm text-gray-600">Economize até 25% no plano anual</p>
                    </div>
                    <RadioGroup
                      value={billingCycle}
                      onValueChange={(value: "monthly" | "annual") => setBillingCycle(value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="cursor-pointer">Mensal</Label>
                      </div>
                      <div className="flex items-center space-x-2 relative">
                        <RadioGroupItem value="annual" id="annual" />
                        <Label htmlFor="annual" className="cursor-pointer">Anual</Label>
                        <Badge className="absolute -top-3 -right-12 bg-yellow-400 text-gray-900 text-xs">
                          -25%
                        </Badge>
                      </div>
                    </RadioGroup>
                  </div>

                  {billingCycle === "annual" && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                      <div className="flex items-center gap-2 text-purple-700 font-bold mb-2">
                        <Gift className="w-5 h-5" />
                        <span>BÔNUS EXCLUSIVO DO PLANO ANUAL!</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        🎁 Ganhe <span className="font-bold text-purple-600">GRÁTIS</span> o Pacote de Café da Manhã + Lanches (valor R$ 197)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Plan Selection */}
              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  Selecione Seu Plano Base
                </h3>
                <RadioGroup value={selectedPlan} onValueChange={handlePlanChange}>
                  <div className="space-y-4">
                    {plans.map((plan) => (
                      <Card
                        key={plan.id}
                        className={`cursor-pointer transition-all ${
                          selectedPlan === plan.id
                            ? `border-2 border-${plan.color}-500 shadow-lg`
                            : "border-2 border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handlePlanChange(plan.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className={`w-10 h-10 bg-${plan.color}-100 rounded-full flex items-center justify-center`}>
                                  <plan.icon className={`w-5 h-5 text-${plan.color}-600`} />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-lg">{plan.name}</h4>
                                    {plan.popular && (
                                      <Badge className="bg-emerald-600 text-white text-xs">
                                        POPULAR
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">{plan.description}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-baseline gap-2 mb-3">
                                <span className="text-3xl font-bold text-gray-900">
                                  R$ {billingCycle === "annual" ? plan.annualPrice.toFixed(2) : plan.price.toFixed(2)}
                                </span>
                                <span className="text-gray-600">
                                  /{billingCycle === "annual" ? "ano" : "mês"}
                                </span>
                                {billingCycle === "annual" && (
                                  <Badge className="bg-yellow-400 text-gray-900 text-xs ml-2">
                                    Economize R$ {((plan.price * 12) - plan.annualPrice).toFixed(2)}
                                  </Badge>
                                )}
                              </div>

                              <ul className="space-y-2">
                                {plan.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm">
                                    <Check className={`w-4 h-4 text-${plan.color}-600 flex-shrink-0 mt-0.5`} />
                                    <span className="text-gray-700">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Special Offer for Bronze Plan */}
              {selectedPlan === "bronze" && (
                <Card className="border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-xl animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Percent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-orange-700 mb-2 flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          OFERTA ESPECIAL PARA VOCÊ!
                        </h3>
                        <p className="text-gray-700 mb-3">
                          Como você escolheu o plano de entrada, temos um <span className="font-bold text-orange-600">desconto especial de 25%</span> em qualquer pacote adicional que você adicionar!
                        </p>
                        <Badge className="bg-orange-500 text-white">
                          🎁 Adicione pacotes e economize 25%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Addon Packages */}
              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-purple-600" />
                  Pacotes Adicionais
                  {selectedPlan === "bronze" && (
                    <Badge className="bg-orange-500 text-white text-xs animate-bounce">
                      25% OFF
                    </Badge>
                  )}
                </h3>
                <div className="space-y-4">
                  {addonPackages.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id)
                    const price = billingCycle === "annual" ? addon.annualPrice : addon.monthlyPrice
                    const discountedPrice = selectedPlan === "bronze" ? price * 0.75 : price

                    return (
                      <Card
                        key={addon.id}
                        className={`cursor-pointer transition-all ${
                          isSelected
                            ? `border-2 border-${addon.color}-500 shadow-lg`
                            : "border-2 border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => toggleAddon(addon.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleAddon(addon.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className={`w-10 h-10 bg-${addon.color}-100 rounded-full flex items-center justify-center`}>
                                  <addon.icon className={`w-5 h-5 text-${addon.color}-600`} />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-lg">{addon.name}</h4>
                                  <p className="text-sm text-gray-600">{addon.description}</p>
                                </div>
                              </div>

                              <div className="flex items-baseline gap-2 mb-3">
                                {selectedPlan === "bronze" && (
                                  <span className="text-sm text-gray-500 line-through">
                                    R$ {price.toFixed(2)}
                                  </span>
                                )}
                                <span className={`text-2xl font-bold ${selectedPlan === "bronze" ? `text-${addon.color}-600` : "text-gray-900"}`}>
                                  R$ {discountedPrice.toFixed(2)}
                                </span>
                                <span className="text-gray-600">
                                  /{billingCycle === "annual" ? "ano" : "mês"}
                                </span>
                                {selectedPlan === "bronze" && (
                                  <Badge className="bg-orange-500 text-white text-xs">
                                    25% OFF
                                  </Badge>
                                )}
                              </div>

                              <ul className="space-y-1">
                                {addon.items.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm">
                                    <Check className={`w-4 h-4 text-${addon.color}-600 flex-shrink-0 mt-0.5`} />
                                    <span className="text-gray-700">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-2 border-emerald-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-br from-emerald-50 to-teal-50">
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-emerald-600" />
                      Resumo do Pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {/* Plan */}
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">Plano {selectedPlanData.name}</p>
                          <p className="text-xs text-gray-600">
                            {billingCycle === "annual" ? "Pagamento anual" : "Pagamento mensal"}
                          </p>
                        </div>
                        <p className="font-bold text-gray-900">
                          R$ {totals.planPrice.toFixed(2)}
                        </p>
                      </div>
                      {billingCycle === "annual" && annualSavings > 0 && (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          Você economiza R$ {annualSavings.toFixed(2)}
                        </Badge>
                      )}
                    </div>

                    {/* Addons */}
                    {selectedAddons.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <p className="font-semibold text-gray-900 mb-3">Pacotes Adicionais</p>
                          {selectedAddons.map(addonId => {
                            const addon = addonPackages.find(a => a.id === addonId)!
                            const price = billingCycle === "annual" ? addon.annualPrice : addon.monthlyPrice
                            const discountedPrice = selectedPlan === "bronze" ? price * 0.75 : price

                            return (
                              <div key={addonId} className="flex justify-between items-start mb-2 text-sm">
                                <p className="text-gray-700">{addon.name}</p>
                                <div className="text-right">
                                  {selectedPlan === "bronze" && (
                                    <p className="text-xs text-gray-500 line-through">
                                      R$ {price.toFixed(2)}
                                    </p>
                                  )}
                                  <p className="font-semibold text-gray-900">
                                    R$ {discountedPrice.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </>
                    )}

                    {/* Discount */}
                    {totals.discount > 0 && (
                      <>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-orange-600 flex items-center gap-1">
                            <Percent className="w-4 h-4" />
                            Desconto Especial (25%)
                          </p>
                          <p className="font-bold text-orange-600">
                            -R$ {totals.discount.toFixed(2)}
                          </p>
                        </div>
                      </>
                    )}

                    {/* Total */}
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-gray-900">Total</p>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">
                          R$ {totals.total.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-600">
                          {billingCycle === "annual" ? "cobrado anualmente" : "por mês"}
                        </p>
                      </div>
                    </div>

                    {/* Annual Bonus Reminder */}
                    {billingCycle === "annual" && (
                      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3">
                        <p className="text-xs text-purple-700 font-semibold flex items-center gap-1">
                          <Gift className="w-4 h-4" />
                          Bônus incluso: Café da Manhã + Lanches GRÁTIS!
                        </p>
                      </div>
                    )}

                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg py-6"
                    >
                      <Lock className="w-5 h-5 mr-2" />
                      Finalizar Compra Segura
                    </Button>

                    <div className="text-center space-y-2">
                      <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                        <Shield className="w-3 h-3" />
                        Pagamento 100% seguro e criptografado
                      </p>
                      <p className="text-xs text-gray-600">
                        ✓ Garantia de 7 dias • ✓ Cancele quando quiser
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Badges */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-gray-200">
                    <Shield className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">Seguro</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-gray-200">
                    <TrendingUp className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">Resultados</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-gray-200">
                    <Star className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">5 Estrelas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
