"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight,Calendar} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getCloudinaryUrl } from '@/utils/image';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface Noticia {
  id: number
  titulo: string
  contenido: string
  fecha_publicacion: string
  link: string
  foto: string
}

interface ApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: Noticia[]
}

const News: React.FC = () => {
  const [recentNews, setRecentNews] = useState<Noticia[]>([])
  const [selectedNews, setSelectedNews] = useState<Noticia | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://api.camaradecomerciolamana.com/api/noticias/")
        if (!response.ok) {
          throw new Error("Error fetching news")
        }
        const data: ApiResponse = await response.json()
        setRecentNews(data.results)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching news:", error)
        setError("No se pudieron cargar las noticias")
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px] bg-gray-950">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-20 bg-gray-950 text-red-500">{error}</div>
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-blue-950 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Noticias <span className="text-red-600">Recientes</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentNews.map((news) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gray-900">
                <div className="relative overflow-hidden h-48">
                  <Image 
                    src={getCloudinaryUrl(news.foto)} 
                    alt={news.titulo} 
                    width={500} 
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 text-red-600 mr-2" />
                    <span className="text-sm text-gray-400">
                      {new Date(news.fecha_publicacion).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-white hover:text-red-600 transition-colors">
                    {news.titulo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4 line-clamp-3">{news.contenido}</p>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedNews(news)}
                      className="text-red-600 hover:text-red-500 p-0"
                    >
                      Leer más <ChevronRight size={18} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={selectedNews !== null} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="sm:max-w-[700px] bg-gray-900 text-white">
          {selectedNews && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-red-600 mb-2">{selectedNews.titulo}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center mb-4">
                    <Calendar className="w-4 h-4 text-red-600 mr-2" />
                    <span className="text-sm text-gray-400">
                      {new Date(selectedNews.fecha_publicacion).toLocaleDateString()}
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="mb-6">
                <Image
                  src={getCloudinaryUrl(selectedNews.foto)}
                  alt={selectedNews.titulo}
                  width={500}
                  height={256}
                  className="object-cover rounded-md w-full"
                />
              </div>
              <p className="text-gray-300 mb-6">{selectedNews.contenido}</p>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setSelectedNews(null)}
                  className="text-white border-gray-700 hover:bg-gray-800"
                >
                  Cerrar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default News
