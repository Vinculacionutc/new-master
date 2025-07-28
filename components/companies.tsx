"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  Tag,
  Filter,
} from "lucide-react"
import { Input } from "@/components/ui/input"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: string
  activo: boolean
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
}

interface ApiResponse {
  results: Empresa[]
}

const Companies: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [filteredEmpresas, setFilteredEmpresas] = useState<Empresa[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterActive] = useState<boolean | null>(null)
  const [filterType] = useState<"pequeña" | "mediana" | "grande" | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])

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
        const response = await fetch("https://api.camaradecomerciolamana.com/api/empresas/", {
          headers: { Accept: "application/json" },
        })

        if (!response.ok) throw new Error("Failed to fetch")

        const data: ApiResponse = await response.json()
        setEmpresas(data.results)
        setFilteredEmpresas(data.results)
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.results.map(empresa => empresa.categoria_nombre)))
        setCategories(uniqueCategories)
      } catch (error) {
        setError("Error fetching empresas")
        console.error(error)
      }
    }

    fetchEmpresas()
  }, [])

  useEffect(() => {
    const filtered = empresas.filter(
      (empresa) =>
        empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterActive === null || empresa.activa === filterActive) &&
        (filterType === null || empresa.tipo === filterType) &&
        (selectedCategory === null || empresa.categoria_nombre === selectedCategory)
    )
    setFilteredEmpresas(filtered)
  }, [searchTerm, filterActive, filterType, selectedCategory, empresas])

  if (error) {
    return (
      <div className="text-center text-white mt-5 bg-gray-950 min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-blue-950"
        >
          Empresas <span className="text-red-600">Asociadas</span>
        </motion.h1>

        <Card className="mb-8 bg-white shadow-md">
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
                {[
                  'Hoteles',
                  'Restaurante',
                  'Comisariatos',
                  'Productos Naturales',
                  'Funerarias',
                  'Almacén de ropa',
                  'Servicios Tecnológicos',
                  'Almacén de repuestos',
                  'Belleza y Maquillaje'
                ].filter(category => categories.includes(category)).map((category) => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmpresas.map((empresa, index) => (
            <Link
              key={empresa.id}
              href={`/companies/${empresa.id}`}
              className="block group"
            >
              <motion.div
                custom={index}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border border-gray-200 hover:border-red-200">
                  <CardHeader className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100">
                        <Image
                          src={getCloudinaryUrl(empresa.logo_url) || "/placeholder.svg"}
                          alt={empresa.nombre}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold text-blue-950 group-hover:text-red-600 transition-colors">
                          {empresa.nombre}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {empresa.tipo}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            {empresa.categoria_nombre}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-gray-600 mb-4 line-clamp-2">{empresa.descripcion}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        <Box className="w-4 h-4 mr-1" />
                        {empresa.productos.length} productos
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        empresa.activa 
                          ? "bg-green-50 text-green-700" 
                          : "bg-red-50 text-red-700"
                      }`}>
                        {empresa.activa ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Activa
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 mr-1" />
                            Inactiva
                          </>
                        )}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modal de Detalles */}
      <AnimatePresence>
        {selectedEmpresa && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl"
            >
              <div className="relative p-6">
                <button
                  onClick={() => setSelectedEmpresa(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="flex items-center mb-6">
                  <div className="relative w-20 h-20 mr-4 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100">
                    <Image
                      src={getCloudinaryUrl(selectedEmpresa.logo_url) || "/placeholder.svg"}
                      alt={selectedEmpresa.nombre}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-950 mb-2">{selectedEmpresa.nombre}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {selectedEmpresa.tipo}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {selectedEmpresa.categoria_nombre}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedEmpresa.activa 
                          ? "bg-green-50 text-green-700" 
                          : "bg-red-50 text-red-700"
                      }`}>
                        {selectedEmpresa.activa ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Activa
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 mr-1" />
                            Inactiva
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="mb-4 bg-gray-100">
                    <TabsTrigger
                      value="info"
                      className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                    >
                      Información
                    </TabsTrigger>
                    
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
                    </div>
                    <p className="text-gray-600 mb-4">{selectedEmpresa.descripcion}</p>
                    <Link
                      href={`/companies/${selectedEmpresa.id}`}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      Ver página completa
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Link>
                  </TabsContent>
                  <TabsContent value="products">
                    <ul className="space-y-2">
                      {selectedEmpresa.productos.map((producto) => (
                        <li
                          key={producto.id}
                          className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                        >
                          <span className="text-blue-950 font-medium">{producto.nombre}</span>
                          <span className="text-gray-600">{producto.precio}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
export default Companies




