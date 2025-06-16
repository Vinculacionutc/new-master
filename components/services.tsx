"use client"

import { useEffect, useState } from "react"
import { motion} from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Activity, Code, Laptop, Star, Ear, Users, Zap, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface Service {
  id: number
  titulo: string
  descripcion: string
  icono_nombre: string
  categoria_nombre: string
  activo: boolean
}

interface APIResponse {
  count: number
  next: string | null
  previous: string | null
  results: Service[]
}

const iconMap: { [key: string]: React.ReactNode } = {
  activity: <Activity className="w-8 h-8" />,
  code: <Code className="w-8 h-8" />,
  laptop: <Laptop className="w-8 h-8" />,
  star: <Star className="w-8 h-8" />,
  ear: <Ear className="w-8 h-8" />,
  users: <Users className="w-8 h-8" />,
  zap: <Zap className="w-8 h-8" />,
  globe: <Globe className="w-8 h-8" />,
  shield: <Shield className="w-8 h-8" />,
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/servicios/")
        if (!response.ok) throw new Error("Failed to fetch services")
        const data: APIResponse = await response.json()
        setServices(data.results)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px] bg-gray-950">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600" />
      </div>
    )

  if (error) return <div className="text-red-500 text-center p-4 bg-gray-950">{error}</div>

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-blue-950 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Nuestros <span className="text-red-600">Servicios</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-gray-50 border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-blue-950">{service.titulo}</CardTitle>
                    <div className="text-red-600">
                      {iconMap[service.icono_nombre.toLowerCase()] || <Star className="w-8 h-8" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{service.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="bg-red-600 bg-opacity-10 text-red-600 border-red-600 border-opacity-20"
                    >
                      {service.categoria_nombre}
                    </Badge>
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedService(service)}
                      className="text-red-600 hover:text-red-500 hover:bg-gray-100"
                    >
                      Más detalles <ChevronRight size={18} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={selectedService !== null} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-[425px] bg-white text-gray-950">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600 flex items-center gap-2">
              {selectedService && (
                <>
                  {iconMap[selectedService.icono_nombre.toLowerCase()] || <Star className="w-6 h-6 text-red-600" />}
                  {selectedService.titulo}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-gray-600">{selectedService?.descripcion}</DialogDescription>
          </DialogHeader>
          {selectedService && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-semibold text-gray-700">Categoría:</span>
                <Badge
                  variant="outline"
                  className="bg-red-600 bg-opacity-10 text-red-600 border-red-600 border-opacity-20 justify-self-start"
                >
                  {selectedService.categoria_nombre}
                </Badge>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-semibold text-gray-700">Estado:</span>
                <Badge
                  variant={selectedService.activo ? "default" : "destructive"}
                  className={`justify-self-start ${selectedService.activo ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                >
                  {selectedService.activo ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedService(null)}
              className="text-gray-950 border-gray-300 hover:bg-gray-100"
            >
              Cancelar
            </Button>
          
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default Services
