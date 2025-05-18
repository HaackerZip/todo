import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"

const assemblySteps = [
  {
    title: "Elige tu tabla",
    description: "Selecciona una tabla que se adapte a tu estilo y nivel de experiencia.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    title: "Monta los trucks",
    description: "Fija los trucks a la tabla con los tornillos y tuercas incluidos.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    title: "Instala los rodamientos",
    description: "Coloca los rodamientos en las ruedas usando una prensa o herramienta adecuada.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    title: "Coloca las ruedas",
    description: "Monta las ruedas en los trucks y asegúralas con las tuercas.",
    image: "/placeholder.svg?height=150&width=300",
  },
]

export function SkateAssemblyGuide() {
  return (
    <div className="bg-deep-black rounded-lg p-6 border border-rustic-brown hover:border-vintage-gold transition-colors">
      <h3 className="text-2xl font-bold text-vintage-gold mb-4">Cómo Armar tu Skate</h3>

      <div className="space-y-6 mt-6">
        {assemblySteps.map((step, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-shrink-0 bg-coffee-brown rounded-lg overflow-hidden w-full sm:w-24 h-24 flex items-center justify-center">
              <span className="text-4xl font-bold text-vintage-gold">{index + 1}</span>
            </div>
            <div className="flex-grow">
              <h4 className="text-lg font-semibold text-white">{step.title}</h4>
              <p className="text-gray-400 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Button className="mt-6 w-full bg-vintage-gold text-deep-black hover:bg-rustic-brown hover:text-white">
        Ver Guía Completa
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
