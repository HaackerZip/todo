import { SectionTitle } from "../ui/section-title"
import { SkateAssemblyGuide } from "./skate-assembly-guide"
import { TrickTutorials } from "./trick-tutorial"

export function LearningCenter() {
  return (
    <section className="bg-gradient-to-b from-coffee-brown/30 to-deep-black rounded-xl p-8 border border-rustic-brown">
      <SectionTitle>Centro de Aprendizaje</SectionTitle>

      <div className="mt-6 mb-10">
        <p className="text-gray-300 max-w-3xl">
          Bienvenido a nuestro Centro de Aprendizaje, donde encontrarás todo lo que necesitas para iniciarte en el mundo
          del skateboarding o mejorar tus habilidades. Desde cómo armar tu primera tabla hasta tutoriales de trucos
          avanzados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        <SkateAssemblyGuide />
        <TrickTutorials />
      </div>
    </section>
  )
}
