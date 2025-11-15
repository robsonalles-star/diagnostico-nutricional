"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronLeft, ChevronRight, Sparkles, TrendingDown, TrendingUp, Heart, Clock, DollarSign, Calendar, Star, Zap, Target, ChefHat, ArrowRight, Gift, User, LogIn } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default function Home() {
  const router = useRouter()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentMealPrep, setCurrentMealPrep] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkAuth().catch(() => {
      // Silenciosamente trata erro de autenticação
      setIsLoggedIn(false)
    })
  }, [])

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser()
      setIsLoggedIn(!!user)
    } catch (error) {
      setIsLoggedIn(false)
      throw error
    }
  }

  const handleCTAClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard")
    } else {
      router.push("/auth/register")
    }
  }

  const testimonials = [
    {
      name: "Maria Silva",
      age: 32,
      result: "Perdeu 18kg em 4 meses",
      beforeWeight: "82kg",
      afterWeight: "64kg",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      quote: "Nunca pensei que seria tão fácil! As marmitas são deliciosas e eu economizei muito tempo e dinheiro."
    },
    {
      name: "João Pedro",
      age: 28,
      result: "Ganhou 8kg de massa muscular",
      beforeWeight: "68kg",
      afterWeight: "76kg",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      quote: "O plano personalizado me ajudou a atingir minhas metas de hipertrofia. Resultados incríveis!"
    },
    {
      name: "Ana Costa",
      age: 45,
      result: "Controlou diabetes e colesterol",
      beforeWeight: "Glicemia 180",
      afterWeight: "Glicemia 95",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      quote: "Minha saúde melhorou completamente. Meu médico ficou impressionado com os resultados dos exames!"
    },
    {
      name: "Carlos Mendes",
      age: 35,
      result: "Perdeu 25kg em 6 meses",
      beforeWeight: "105kg",
      afterWeight: "80kg",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      quote: "Transformei minha vida! Agora tenho energia, disposição e autoestima lá em cima."
    }
  ]

  const mealPrepImages = [
    {
      title: "Marmitas Fitness Completas",
      description: "Almoços balanceados para a semana toda",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop"
    },
    {
      title: "Preparação Organizada",
      description: "Tudo pronto em poucas horas",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop"
    },
    {
      title: "Variedade e Sabor",
      description: "Refeições diferentes todos os dias",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop"
    },
    {
      title: "Praticidade Total",
      description: "Congelamento e armazenamento perfeito",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop"
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const nextMealPrep = () => {
    setCurrentMealPrep((prev) => (prev + 1) % mealPrepImages.length)
  }

  const prevMealPrep = () => {
    setCurrentMealPrep((prev) => (prev - 1 + mealPrepImages.length) % mealPrepImages.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      {/* Header com Login/Registro */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">NutriPlan</span>
            </div>

            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Meu Painel
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/auth/login")}
                    className="text-gray-700 hover:text-emerald-600"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                  <Button
                    onClick={() => router.push("/auth/register")}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  >
                    Cadastrar Grátis
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30 text-sm sm:text-base px-4 py-1">
              <Sparkles className="w-4 h-4 mr-2" />
              Mais de 10.000 vidas transformadas
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Como Facilitar Suas Refeições e{" "}
              <span className="text-yellow-300">Transformar Sua Vida?</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-emerald-50 max-w-3xl mx-auto leading-relaxed">
              <span className="font-bold text-yellow-300">Chega de perder tempo pensando no que comer!</span> 
              <br className="hidden sm:block" />
              Receba seu cardápio completo + lista de compras + receitas prontas em minutos. 
              <br className="hidden sm:block" />
              <span className="font-semibold">Economize até R$ 800/mês</span> e tenha refeições saudáveis todos os dias!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={handleCTAClick}
                className="group relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 hover:from-yellow-500 hover:via-yellow-600 hover:to-orange-500 text-gray-900 font-bold text-lg sm:text-xl px-10 py-7 rounded-2xl shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300 w-full sm:w-auto border-2 border-yellow-300"
              >
                <span className="flex items-center gap-3">
                  <Gift className="w-6 h-6 animate-pulse" />
                  <span>Descobrir Meu Plano Ideal Grátis</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                  100% GRÁTIS
                </div>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => router.push("/checkout")}
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white font-semibold text-lg px-8 py-6 rounded-full backdrop-blur-sm w-full sm:w-auto"
              >
                Ver Planos Especiais
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {[
                { icon: Clock, text: "Economize 15h/mês", color: "bg-purple-500" },
                { icon: DollarSign, text: "Economize R$ 800/mês", color: "bg-green-500" },
                { icon: Target, text: "Atinja seus objetivos", color: "bg-blue-500" },
                { icon: ChefHat, text: "Receitas deliciosas", color: "bg-pink-500" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all hover:scale-105">
                  <div className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-bold">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-center">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Zap className="w-6 h-6" />
              <span>Resultado em 5 minutos</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30"></div>
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Heart className="w-6 h-6" />
              <span>Sem cartão de crédito</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30"></div>
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Star className="w-6 h-6" />
              <span>100% personalizado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Você Está Cansado de...
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Problems */}
              <div className="space-y-4">
                {[
                  "❌ Gastar horas pensando no que comer?",
                  "❌ Pedir delivery todo dia e gastar uma fortuna?",
                  "❌ Comer mal e se sentir sem energia?",
                  "❌ Não ter tempo para cozinhar?",
                  "❌ Não saber como emagrecer de forma saudável?"
                ].map((problem, index) => (
                  <div key={index} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <p className="text-gray-800 font-medium">{problem}</p>
                  </div>
                ))}
              </div>

              {/* Solutions */}
              <div className="space-y-4">
                {[
                  "✅ Cardápio completo pronto em minutos!",
                  "✅ Economize até R$ 800 por mês!",
                  "✅ Refeições balanceadas e deliciosas!",
                  "✅ Prepare tudo em 1 dia para o mês inteiro!",
                  "✅ Plano personalizado para seus objetivos!"
                ].map((solution, index) => (
                  <div key={index} className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                    <p className="text-gray-800 font-medium">{solution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleCTAClick}
                className="group relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-bold text-xl px-12 py-8 rounded-2xl shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  <span>Quero Facilitar Minhas Refeições Agora!</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <p className="mt-4 text-sm text-gray-600">
                ⚡ Diagnóstico gratuito • Sem compromisso • Resultado instantâneo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformations Carousel */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 text-base px-4 py-1">
              <Star className="w-4 h-4 mr-2" />
              Resultados Reais
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Eles Facilitaram Suas Refeições e{" "}
              <span className="text-emerald-600">Transformaram Suas Vidas!</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Veja como nossos clientes economizaram tempo, dinheiro e alcançaram seus objetivos
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <Card className="border-2 border-emerald-200 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Before/After Images */}
                  <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <img 
                        src={testimonials[currentTestimonial].image} 
                        alt={testimonials[currentTestimonial].name}
                        className="w-48 h-48 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-xl"
                      />
                      <div className="space-y-3">
                        <div className="bg-red-500 text-white px-6 py-3 rounded-full inline-block font-bold">
                          Antes: {testimonials[currentTestimonial].beforeWeight}
                        </div>
                        <div className="text-4xl font-bold text-gray-700">→</div>
                        <div className="bg-green-500 text-white px-6 py-3 rounded-full inline-block font-bold">
                          Depois: {testimonials[currentTestimonial].afterWeight}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
                    <div className="mb-6">
                      <Badge className="bg-yellow-400 text-gray-900 text-lg px-4 py-2 mb-4">
                        ⭐ {testimonials[currentTestimonial].result}
                      </Badge>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].age} anos
                      </h3>
                    </div>
                    
                    <blockquote className="text-lg text-gray-700 italic mb-6 border-l-4 border-emerald-500 pl-4">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>

                    <div className="flex gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <Button
              onClick={prevTestimonial}
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white hover:bg-gray-100 text-gray-900 shadow-xl rounded-full w-12 h-12"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={nextTestimonial}
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white hover:bg-gray-100 text-gray-900 shadow-xl rounded-full w-12 h-12"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-emerald-600 w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meal Prep Carousel */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-teal-100 text-teal-700 text-base px-4 py-1">
              <Clock className="w-4 h-4 mr-2" />
              Praticidade Total
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Suas Marmitas Prontas em{" "}
              <span className="text-teal-600">Poucas Horas!</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Prepare tudo em 1 dia e tenha refeições deliciosas e saudáveis para o mês inteiro
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={mealPrepImages[currentMealPrep].image}
                alt={mealPrepImages[currentMealPrep].title}
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {mealPrepImages[currentMealPrep].title}
                </h3>
                <p className="text-lg text-gray-200">
                  {mealPrepImages[currentMealPrep].description}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              onClick={prevMealPrep}
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white hover:bg-gray-100 text-gray-900 shadow-xl rounded-full w-12 h-12"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={nextMealPrep}
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white hover:bg-gray-100 text-gray-900 shadow-xl rounded-full w-12 h-12"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {mealPrepImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMealPrep(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentMealPrep ? "bg-teal-600 w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-400 text-gray-900 text-base px-4 py-1">
              <DollarSign className="w-4 h-4 mr-2" />
              Preços Imbatíveis
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Invista Menos que um{" "}
              <span className="text-emerald-600">Delivery por Semana!</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para facilitar suas refeições e transformar sua vida
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Bronze Plan */}
            <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-xl">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Bronze</CardTitle>
                <CardDescription className="text-base">Ideal para começar</CardDescription>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-gray-900">R$ 19,90</div>
                  <div className="text-sm text-gray-500 mt-1">/mês</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-2">
                    Menos que 1 delivery!
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Cardápio semanal personalizado",
                    "Lista de compras automática",
                    "Receitas básicas",
                    "Suporte por email"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={handleCTAClick}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white mt-6"
                >
                  Começar Agora
                </Button>
              </CardContent>
            </Card>

            {/* Silver Plan - POPULAR */}
            <Card className="border-2 border-emerald-500 hover:border-emerald-600 transition-all shadow-2xl scale-105 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-emerald-600 text-white text-sm px-4 py-1">
                  🔥 MAIS POPULAR
                </Badge>
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Prata</CardTitle>
                <CardDescription className="text-base">Melhor custo-benefício</CardDescription>
                <div className="mt-4">
                  <div className="text-sm text-gray-500 line-through">R$ 49,90</div>
                  <div className="text-4xl font-bold text-emerald-600">R$ 39,90</div>
                  <div className="text-sm text-gray-500 mt-1">/mês</div>
                  <Badge className="mt-2 bg-yellow-400 text-gray-900">20% OFF</Badge>
                  <div className="text-xs text-emerald-600 font-semibold mt-2">
                    Menos que 2 deliveries!
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Cardápio mensal completo",
                    "Lista de compras detalhada",
                    "Modo marmita com guia de preparo",
                    "Substituições automáticas",
                    "Receitas com vídeos",
                    "Suporte prioritário"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={handleCTAClick}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-6 text-lg py-6"
                >
                  Começar Agora
                </Button>
              </CardContent>
            </Card>

            {/* Gold Plan */}
            <Card className="border-2 border-yellow-400 hover:border-yellow-500 transition-all hover:shadow-xl">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Ouro</CardTitle>
                <CardDescription className="text-base">Experiência premium</CardDescription>
                <div className="mt-4">
                  <div className="text-sm text-gray-500 line-through">R$ 99,90</div>
                  <div className="text-4xl font-bold text-yellow-600">R$ 79,90</div>
                  <div className="text-sm text-gray-500 mt-1">/mês</div>
                  <Badge className="mt-2 bg-yellow-400 text-gray-900">20% OFF</Badge>
                  <div className="text-xs text-emerald-600 font-semibold mt-2">
                    Menos que 3 deliveries!
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Tudo do plano Prata +",
                    "Plano 100% personalizado",
                    "Ajustes semanais ilimitados",
                    "Chat com nutricionista/IA",
                    "Receitas exclusivas",
                    "Cálculo de macros em tempo real",
                    "Suporte VIP 24/7"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={handleCTAClick}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white mt-6"
                >
                  Começar Agora
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Annual Plan CTA */}
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl">
              <CardContent className="p-8 text-center">
                <Badge className="mb-4 bg-purple-600 text-white text-lg px-6 py-2">
                  🎁 OFERTA ESPECIAL ANUAL
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
                  Assine por 12 Meses e Ganhe Bônus Exclusivos!
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  <span className="font-bold text-purple-600">GRÁTIS:</span> Receitas de café da manhã + lanches da tarde (valor R$ 197)
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-3xl mb-2">☕</div>
                    <div className="font-bold text-gray-900">30 Cafés da Manhã</div>
                    <div className="text-sm text-gray-600">Receitas deliciosas e nutritivas</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-3xl mb-2">🥗</div>
                    <div className="font-bold text-gray-900">30 Lanches da Tarde</div>
                    <div className="text-sm text-gray-600">Opções saudáveis e práticas</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-sm text-gray-600 mb-1">Plano Prata Anual</div>
                    <div className="text-3xl font-bold text-purple-600">R$ 359,90</div>
                    <div className="text-sm text-emerald-600 font-semibold">Economize R$ 119 + Bônus!</div>
                  </div>
                  <div className="text-2xl text-gray-400 hidden sm:block">|</div>
                  <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-sm text-gray-600 mb-1">Plano Ouro Anual</div>
                    <div className="text-3xl font-bold text-yellow-600">R$ 719,90</div>
                    <div className="text-sm text-emerald-600 font-semibold">Economize R$ 239 + Bônus!</div>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => router.push("/checkout")}
                  className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-6 rounded-full shadow-xl"
                >
                  🎁 Garantir Bônus Agora
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Pronto para Facilitar Suas Refeições e{" "}
            <span className="text-yellow-300">Transformar Sua Vida?</span>
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-emerald-50 max-w-2xl mx-auto">
            Comece seu diagnóstico nutricional gratuito agora e receba seu plano personalizado em minutos!
            <br />
            <span className="font-bold text-yellow-300">Economize tempo, dinheiro e conquiste seus objetivos!</span>
          </p>
          <Button 
            size="lg" 
            onClick={handleCTAClick}
            className="group relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 hover:from-yellow-500 hover:via-yellow-600 hover:to-orange-500 text-gray-900 font-bold text-xl px-12 py-8 rounded-2xl shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300 border-2 border-yellow-300"
          >
            <span className="flex items-center gap-3">
              <Gift className="w-7 h-7 animate-pulse" />
              <span>Iniciar Diagnóstico Grátis Agora</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
              SEM CARTÃO
            </div>
          </Button>
          <p className="mt-6 text-sm text-emerald-100">
            ✓ Sem cartão de crédito • ✓ Resultado em 5 minutos • ✓ 100% personalizado • ✓ Economize até R$ 800/mês
          </p>
        </div>
      </section>
    </div>
  )
}
