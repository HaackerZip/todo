export const metadata = {
  title: 'Products - Skateshop',
  description: 'Browse our skateboarding products',
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex-1">
      {children}
    </section>
  )
}
