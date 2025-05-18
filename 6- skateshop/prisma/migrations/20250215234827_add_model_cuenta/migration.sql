-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "emailVerificado" TIMESTAMP(3),
ADD COLUMN     "imagen" TEXT,
ALTER COLUMN "nombre" DROP NOT NULL,
ALTER COLUMN "contraseña" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Cuenta" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "proveedor" TEXT NOT NULL,
    "proveedorCuentaId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "expiresAt" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuenta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cuenta_proveedor_proveedorCuentaId_key" ON "Cuenta"("proveedor", "proveedorCuentaId");

-- AddForeignKey
ALTER TABLE "Cuenta" ADD CONSTRAINT "Cuenta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
