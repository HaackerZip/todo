/*
  Warnings:

  - Added the required column `updatedAt` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orden" ADD COLUMN     "codigoSeguimiento" TEXT,
ADD COLUMN     "notas" TEXT;

-- AlterTable
ALTER TABLE "Pago" ADD COLUMN     "referenciaTransaccion" TEXT;

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descuento" DECIMAL(65,30),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "visitas" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Carrito_usuarioId_idx" ON "Carrito"("usuarioId");

-- CreateIndex
CREATE INDEX "Carrito_productoId_idx" ON "Carrito"("productoId");

-- CreateIndex
CREATE INDEX "Categoria_nombre_idx" ON "Categoria"("nombre");

-- CreateIndex
CREATE INDEX "Direccion_usuarioId_idx" ON "Direccion"("usuarioId");

-- CreateIndex
CREATE INDEX "Orden_usuarioId_idx" ON "Orden"("usuarioId");

-- CreateIndex
CREATE INDEX "Orden_fecha_idx" ON "Orden"("fecha");

-- CreateIndex
CREATE INDEX "Orden_estado_idx" ON "Orden"("estado");

-- CreateIndex
CREATE INDEX "OrdenDetalle_ordenId_idx" ON "OrdenDetalle"("ordenId");

-- CreateIndex
CREATE INDEX "OrdenDetalle_productoId_idx" ON "OrdenDetalle"("productoId");

-- CreateIndex
CREATE INDEX "Pago_ordenId_idx" ON "Pago"("ordenId");

-- CreateIndex
CREATE INDEX "Pago_estado_idx" ON "Pago"("estado");

-- CreateIndex
CREATE INDEX "Producto_nombre_idx" ON "Producto"("nombre");

-- CreateIndex
CREATE INDEX "Producto_precio_idx" ON "Producto"("precio");

-- CreateIndex
CREATE INDEX "Producto_categoriaId_idx" ON "Producto"("categoriaId");

-- CreateIndex
CREATE INDEX "Usuario_email_idx" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_fechaRegistro_idx" ON "Usuario"("fechaRegistro");
