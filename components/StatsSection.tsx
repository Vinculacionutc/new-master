"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { Building2, Users, Handshake, TrendingUp } from "lucide-react"

const stats = [
  { title: "Empresas Miembro", value: 100, icon: Building2, prefix: "" },
  { title: "Empleos Facilitados", value: 5000, icon: Users, prefix: "" },
  { title: "Acuerdos Comerciales", value: 75, icon: Handshake, prefix: "" },
  { title: "Crecimiento Económico Regional", value: 8, icon: TrendingUp, suffix: "%", prefix: "" },
]

const CorporateStatsSection = () => {
  const [currentStats, setCurrentStats] = useState(stats.map((stat) => ({ ...stat, currentValue: 0 })))
  const controls = useAnimation()

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  useEffect(() => {
    const animate = async () => {
      await controls.start("visible")
    }
    animate()

    stats.forEach((stat, index) => {
      setTimeout(() => {
        setCurrentStats((prevStats) =>
          prevStats.map((s, i) =>
            i === index ? { ...s, currentValue: stat.value } : s
          )
        )
      }, 600 + index * 100)
    })
  }, [controls])

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="text-4xl font-bold text-blue-950"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
            >
              {stat.prefix || ""}
              {stat.currentValue.toLocaleString()}
              {stat.suffix || ""}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CorporateStatsSection