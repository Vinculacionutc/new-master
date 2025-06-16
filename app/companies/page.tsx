"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { getCloudinaryUrl } from '@/utils/image'
import {
  Box,
  CheckCircle2,
  XCircle,
  ExternalLink,
  X,
  Search,
  Users,
  Briefcase,
  ChevronRight,
  Star,
  Tag,
  Filter,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: string
  activo: boolean
}

interface Testimonio {
  nombre: string
  comentario: string
}

interface PreguntaFrecuente {
  pregunta: string
  respuesta: string
}

interface Noticia {
  titulo: string
  fecha: string
  contenido: string
}

interface Empresa {
  id: number
  nombre: string
  descripcion: string
  productos: Producto[]
  activa: boolean
  sitio_web?: string
  logo_url: string
  tipo: "pequeña" | "mediana" | "grande"
  empleados: number
  fundacion: string
  categoria: number
  categoria_nombre: string
  telefono: string
  correo: string
  direccion: string
  fecha_registro: string
  redes_sociales: string[]
  certificaciones?: string[]
  logros?: string[]
  galeria?: string[]
  testimonios?: Testimonio[]
  preguntas_frecuentes?: PreguntaFrecuente[]
  noticias?: Noticia[]
}

interface ApiResponse {
  results: Empresa[]
}

const Companies: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [filteredEmpresas, setFilteredEmpresas] = useState<Empresa[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null)

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/empresas/")
        if (!response.ok) throw new Error("Failed to fetch")
        
        const data: ApiResponse = await response.json()
        setEmpresas(data.results)
        setFilteredEmpresas(data.results)
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.results.map((empresa: Empresa) => empresa.categoria_nombre))
        )
        setCategories(uniqueCategories)
        
        setLoading(false)
      } catch {
        setError("Error al cargar las empresas")
        setLoading(false)
      }
    }

    fetchEmpresas()
  }, [])

  useEffect(() => {
    const filtered = empresas.filter(empresa =>
      empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === null || empresa.categoria_nombre === selectedCategory)
    )
    setFilteredEmpresas(filtered)
  }, [searchTerm, selectedCategory, empresas])

  if (loading) return <div className="text-center py-10">Cargando...</div>
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>

  const renderCompanyCard = (empresa: Empresa, index: number) => (
    <motion.div
      key={empresa.id}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="group"
    >
      <Card className="h-full hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-white">
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg">
              <Image
                src={getCloudinaryUrl(empresa.logo_url) || "/placeholder.svg"}
                alt={empresa.nombre}
                width={96}
                height={96}
                className="transition-transform group-hover:scale-110 object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-2xl font-semibold text-blue-950 group-hover:text-red-600 transition-colors">
                {empresa.nombre}
              </CardTitle>
              <Badge variant="secondary" className="bg-red-600 text-white">
                {empresa.tipo}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-gray-600 mb-4 line-clamp-3">{empresa.descripcion}</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2 text-red-600" />
              {empresa.empleados} empleados
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Box className="w-4 h-4 mr-2 text-red-600" />
              {empresa.productos.length} productos
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm font-semibold ${empresa.activa ? "text-green-400" : "text-red-400"}`}>
              {empresa.activa ? "Activa" : "Inactiva"}
            </span>
            <Link
              key={empresa.id}
              href={`/companies/${empresa.id}`}
              className="block group animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-600 hover:bg-red-600/10 group-hover:translate-x-1 transition-transform"
                onClick={() => setSelectedEmpresa(empresa)}
              >
                Ver Detalles
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderModalContent = () => {
    if (!selectedEmpresa) return null

    return (
      <div className="relative p-6">
        <button
          onClick={() => setSelectedEmpresa(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} className="hover:rotate-90 transition-transform" />
        </button>

        <div className="flex items-center mb-6 space-x-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl">
            <Image
              src={getCloudinaryUrl(selectedEmpresa.logo_url) || "/placeholder.svg"}
              alt={selectedEmpresa.nombre}  
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-950 mb-2">{selectedEmpresa.nombre}</h3>
            <div className="flex items-center space-x-2">
              <Badge className="bg-red-600 text-white">{selectedEmpresa.tipo}</Badge>
              <div className="flex items-center text-red-600">
                <Star className="w-5 h-5 fill-current" />
                <span className="ml-1 text-sm">Empresa Destacada</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="bg-gray-800 mb-4">
            {["info"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                {tab === "info" && "Información"}
                {tab === "products" && "Productos"}
                {tab === "testimonials" && "Testimonios"}
                {tab === "faq" && "Preguntas"}
                {tab === "news" && "Noticias"}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="info">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Empleados:</span>
                <span className="ml-2 text-blue-950 font-semibold">{selectedEmpresa.empleados}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Fundación:</span>
                <span className="ml-2 text-blue-950 font-semibold">{selectedEmpresa.fundacion}</span>
              </div>
              <div className="flex items-center">
                <Box className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Productos:</span>
                <span className="ml-2 text-blue-950 font-semibold">{selectedEmpresa.productos.length}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Estado:</span>
                {selectedEmpresa.activa ? (
                  <span className="text-green-400 font-semibold flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-1" /> Activa
                  </span>
                ) : (
                  <span className="text-red-400 font-semibold flex items-center">
                    <XCircle className="w-5 h-5 mr-1" /> Inactiva
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{selectedEmpresa.descripcion}</p>
            <Link
              href={selectedEmpresa.sitio_web || "#"}
              target="_blank"
              className="inline-flex items-center text-red-600 hover:text-red-500 transition-colors"
            >
              Visitar Sitio Web
              <ExternalLink className="ml-2 w-4 h-4" />
            </Link>
          </TabsContent>
          <TabsContent value="products">
            <ul className="space-y-2">
              {selectedEmpresa.productos.map((producto) => (
                <li
                  key={producto.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-800 rounded"
                >
                  <span className="text-blue-950 font-medium">{producto.nombre}</span>
                  <span className="text-gray-600">{producto.precio}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="testimonials">
            <div className="space-y-2">
              {selectedEmpresa.testimonios?.map((testimonio, index) => (
                <div key={index} className="text-gray-600">
                  <p className="italic">{testimonio.comentario}</p>
                  <p className="font-semibold text-red-600">- {testimonio.nombre}</p>
                </div>
              )) || <p className="text-gray-400">No hay testimonios disponibles.</p>}
            </div>
          </TabsContent>
          <TabsContent value="faq">
            <div className="space-y-2">
              {selectedEmpresa.preguntas_frecuentes?.map((faq, index) => (
                <div key={index} className="text-gray-600">
                  <p className="font-semibold">{faq.pregunta}</p>
                  <p>{faq.respuesta}</p>
                </div>
              )) || <p className="text-gray-400">No hay preguntas frecuentes disponibles.</p>}
            </div>
          </TabsContent>
          <TabsContent value="news">
            <div className="space-y-2">
              {selectedEmpresa.noticias?.map((noticia, index) => (
                <div key={index} className="text-gray-600">
                  <p className="font-semibold">{noticia.titulo} <span className="text-gray-400">({noticia.fecha})</span></p>
                  <p>{noticia.contenido}</p>
                </div>
              )) || <p className="text-gray-400">No hay noticias disponibles.</p>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <section className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-center mb-12 text-blue-950"
        >
          Nuestras <span className="text-red-600">Empresas</span>
        </motion.h1>

        <Card className="mb-8 bg-white border border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-96">
                  <Input
                    type="text"
                    placeholder="Buscar empresas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full bg-white text-gray-900 border-gray-200 focus:border-blue-600 focus:ring-blue-600"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === null
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Todas
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEmpresas.map(renderCompanyCard)}
        </div>
      </div>

      <AnimatePresence>
        {selectedEmpresa && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden shadow-2xl"
            >
              {renderModalContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
export default Companies

