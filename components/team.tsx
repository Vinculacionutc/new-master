"use client"

import { useEffect, useState } from "react"
import { motion} from "framer-motion"
import { Mail, Phone, Award, Linkedin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface TeamMember {
  id: number
  nombre: string
  posicion: string
  imagen: string
  descripcion: string | null
  email?: string
  telefono?: string
  linkedin?: string
  departamento?: string
}

interface APIResponse {
  count: number
  next: string | null
  previous: string | null
  results: TeamMember[]
}

const TeamMembers = () => {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [filter, setFilter] = useState<string | null>(null)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("https://api.camaradecomerciolamana.com/api/equipos/")
        if (!response.ok) throw new Error("Failed to fetch team members")
        const data: APIResponse = await response.json()
        setMembers(data.results)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  const departamentos = Array.from(new Set(members.map((m) => m.departamento).filter(Boolean)))

  const filteredMembers = filter ? members.filter((member) => member.departamento === filter) : members

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600" />
      </div>
    )

  if (error) return <div className="text-red-500 text-center p-4 bg-gray-950">{error}</div>

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white py-20"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-extrabold text-center text-blue-950 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Nuestro <span className="text-red-600">Equipo</span>
        </motion.h2>

        <div className="flex justify-center mb-12 space-x-4 flex-wrap">
          <Button onClick={() => setFilter(null)} variant={filter === null ? "default" : "outline"} className="m-2">
            Todos
          </Button>
          {departamentos.map((depto) => (
          <Button
          key={depto}
          onClick={() => setFilter(depto ?? null)}
          variant={filter === depto ? "default" : "outline"}
          className="m-2"
        >
          {depto}
        </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
             
              <Card
                className="group cursor-pointer hover:border-red-600 transition-colors duration-300"
                onClick={() => setSelectedMember(member)}
              >
                <CardHeader className="text-center">
                  <div className="relative mb-6 inline-block">
                    <Avatar className="w-40 h-40 border-4 border-red-600">
                      <AvatarImage src={member.imagen} alt={member.nombre} />
                      <AvatarFallback>{member.nombre.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Badge className="absolute bottom-0 right-0 bg-red-600 text-gray-950">
                      <Award size={20} />
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-950 group-hover:text-red-600 transition-colors">
                    {member.nombre}
                  </CardTitle>
                  <CardDescription className="text-gray-600">{member.posicion}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 line-clamp-3 mb-4">
                    {member.descripcion || "Profesional comprometido con el éxito de nuestra organización."}
                  </p>
                  <div className="flex justify-center space-x-4">
                    {member.linkedin && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-5 w-5 text-red-600" />
                        </a>
                      </Button>
                    )}
                    {member.email && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={`mailto:${member.email}`}>
                          <Mail className="h-5 w-5 text-red-600" />
                        </a>
                      </Button>
                    )}
                    {member.telefono && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={`tel:${member.telefono}`}>
                          <Phone className="h-5 w-5 text-red-600" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={selectedMember !== null} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-red-600">{selectedMember.nombre}</DialogTitle>
                <DialogDescription className="text-gray-400">{selectedMember.posicion}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-red-600">
                  <AvatarImage src={selectedMember.imagen} alt={selectedMember.nombre} />
                  <AvatarFallback>{selectedMember.nombre.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-gray-300 mb-4">{selectedMember.descripcion}</p>
                <div className="flex justify-center space-x-4">
                  {selectedMember.linkedin && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {selectedMember.email && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={`mailto:${selectedMember.email}`}>
                        <Mail className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {selectedMember.telefono && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={`tel:${selectedMember.telefono}`}>
                        <Phone className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setSelectedMember(null)}>Cerrar</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.section>
  )
}

export default TeamMembers