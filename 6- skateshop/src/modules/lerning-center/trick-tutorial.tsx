import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "../ui/button"

const trickTutorials = [
  {
    title: "Ollie",
    level: "Principiante",
    duration: "5 min",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    title: "Kickflip",
    level: "Intermedio",
    duration: "8 min",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    title: "Heelflip",
    level: "Intermedio",
    duration: "7 min",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    title: "360 Flip",
    level: "Avanzado",
    duration: "10 min",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

export function TrickTutorials() {
  return (
    <div className="bg-deep-black rounded-lg p-6 border border-rustic-brown hover:border-vintage-gold transition-colors">
      <h3 className="text-2xl font-bold text-vintage-gold mb-4">Aprende Trucos</h3>

      <div className="space-y-4 mt-6">
        {trickTutorials.map((trick, index) => (
          <div
            key={index}
            className="flex gap-4 items-center bg-coffee-brown/30 rounded-lg p-3 hover:bg-coffee-brown/50 transition-colors cursor-pointer group"
          >
            <div className="relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
              <Image src={trick.thumbnail || "/placeholder.svg"} alt={trick.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-8 w-8 text-vintage-gold" />
              </div>
            </div>
            <div className="flex-grow">
              <h4 className="text-lg font-semibold text-white">{trick.title}</h4>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs px-2 py-1 rounded bg-rustic-brown text-white">{trick.level}</span>
                <span className="text-xs text-gray-400">{trick.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="mt-6 w-full bg-vintage-gold text-deep-black hover:bg-rustic-brown hover:text-white">
        Ver Todos los Tutoriales
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
