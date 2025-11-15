"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser, signOut } from "@/lib/auth"
import { 
  ChefHat, 
  User, 
  LogOut, 
  Calendar, 
  ShoppingCart, 
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  Loader2
} from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/auth/login")
        return
      }
      setUser(currentUser)
    } catch (error) {
      router.push("/auth/login")
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Erro ao sair:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NutriPlan</h1>
                <p className="text-xs text-gray-600">Seu plano alimentar personalizado</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.user_metadata?.full_name || "Usuário"}
                </p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="border-emerald-200 hover:bg-emerald-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, {user?.user_metadata?.full_name?.split(' ')[0] || "Usuário"}! 👋
          </h2>
          <p className="text-gray-600">
            Aqui está seu painel personalizado com todas as ferramentas para facilitar suas refeições
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-emerald-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-emerald-600" />
                <Badge className="bg-emerald-100 text-emerald-700">Ativo</Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">7 dias</h3>
              <p className="text-sm text-gray-600">Cardápio semanal</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-teal-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <ShoppingCart className="w-8 h-8 text-teal-600" />
                <Badge className="bg-teal-100 text-teal-700">Pronto</Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">24 itens</h3>
              <p className="text-sm text-gray-600">Lista de compras</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-cyan-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-8 h-8 text-cyan-600" />
                <Badge className="bg-cyan-100 text-cyan-700">Disponível</Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">21 receitas</h3>
              <p className="text-sm text-gray-600">Receitas detalhadas</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <Badge className="bg-purple-100 text-purple-700">Em progresso</Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">2.5 kg</h3>
              <p className="text-sm text-gray-600">Progresso do mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Cardápio Semanal */}
          <Card className="border-2 border-emerald-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Cardápio Semanal</CardTitle>
                  <CardDescription>Suas refeições planejadas para os próximos 7 dias</CardDescription>
                </div>
                <Calendar className="w-10 h-10 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day, index) => (
                  <div key={day} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer">
                    <div>
                      <p className="font-semibold text-gray-900">{day}</p>
                      <p className="text-sm text-gray-600">3 refeições planejadas</p>
                    </div>
                    <Badge className="bg-emerald-600 text-white">Ver</Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                Ver Cardápio Completo
              </Button>
            </CardContent>
          </Card>

          {/* Lista de Compras */}
          <Card className="border-2 border-teal-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Lista de Compras</CardTitle>
                  <CardDescription>Ingredientes necessários para a semana</CardDescription>
                </div>
                <ShoppingCart className="w-10 h-10 text-teal-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {[
                  { category: "Proteínas", items: 8 },
                  { category: "Vegetais", items: 12 },
                  { category: "Carboidratos", items: 6 },
                  { category: "Laticínios", items: 4 },
                  { category: "Temperos", items: 5 }
                ].map((category) => (
                  <div key={category.category} className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{category.category}</p>
                      <p className="text-sm text-gray-600">{category.items} itens</p>
                    </div>
                    <Badge className="bg-teal-600 text-white">{category.items}</Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
                Ver Lista Completa
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Receitas e Objetivos */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Receitas Rápidas */}
          <Card className="border-2 border-cyan-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Receitas Rápidas</CardTitle>
                  <CardDescription>Prepare em menos de 30 minutos</CardDescription>
                </div>
                <Clock className="w-10 h-10 text-cyan-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Frango Grelhado com Legumes", time: "25 min" },
                  { name: "Omelete de Claras com Espinafre", time: "15 min" },
                  { name: "Salada de Quinoa Completa", time: "20 min" }
                ].map((recipe) => (
                  <div key={recipe.name} className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors cursor-pointer">
                    <div>
                      <p className="font-semibold text-gray-900">{recipe.name}</p>
                      <p className="text-sm text-gray-600">⏱️ {recipe.time}</p>
                    </div>
                    <Badge className="bg-cyan-600 text-white">Ver</Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                Ver Todas as Receitas
              </Button>
            </CardContent>
          </Card>

          {/* Seus Objetivos */}
          <Card className="border-2 border-purple-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Seus Objetivos</CardTitle>
                  <CardDescription>Acompanhe seu progresso</CardDescription>
                </div>
                <Target className="w-10 h-10 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">Peso Atual</p>
                    <Badge className="bg-purple-600 text-white">75 kg</Badge>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Meta: 70 kg • Faltam 5 kg</p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">Refeições Seguidas</p>
                    <Badge className="bg-emerald-600 text-white">12 dias</Badge>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Continue assim! 🔥</p>
                </div>

                <div className="p-4 bg-teal-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">Economia Mensal</p>
                    <Badge className="bg-teal-600 text-white">R$ 680</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Você economizou comparado a deliveries!</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Atualizar Objetivos
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
