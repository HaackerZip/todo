npx create-next-app@latest skateshop
npm install tailwindcss

<!----------------------------- PRISMA  ----------------------------->
# 1. Instala Prisma y las dependencias necesarias
<!-- Instala Prisma CLI como dependencia de desarrollo (para 
manejar la base de datos y generar archivos de configuración) -->
npm install prisma --save-dev
<!-- Instala el cliente de Prisma para interactuar 
con la base de datos en el código -->
npm install @prisma/client
<!-- Este adaptador permite que Auth.js almacene los datos de autenticación 
en tu base de datos gestionada con Prisma. Es útil cuando necesitas persistir
 información como usuarios, sesiones, cuentas vinculadas, etc. -->
npm install @auth/prisma-adapter
# 2. Inicializa Prisma en el proyecto (crea la carpeta `prisma` y `schema.prisma`)
<!-- Inicializa Prisma en el proyecto, creando la carpeta
"prisma" con un esquema base en "schema.prisma" -->
npx prisma init
# 3. Define tu esquema en `prisma/schema.prisma`
# 4. Crea la primera migración y aplica cambios a la base de datos
<!-- Crea el primer historial de migración y sincroniza la  
base de datos con el esquema definido en "schema.prisma".
# Este comando también genera automáticamente el cliente de Prisma. -->
npx prisma migrate dev --name init
# 5. Genera el cliente de Prisma (esto ya se hace automáticamente en el paso anterior)
<!-- Genera el cliente de Prisma, permitiendo que el código 
TypeScript/JavaScript pueda interactuar con la base de datos -->
npx prisma generate

# Sincroniza el esquema con la base de datos sin generar migraciones
<!-- Sincroniza el esquema de Prisma con la base
de datos sin generar historial de migraciones.
Útil para pruebas rápidas o bases de datos temporales -->
npx prisma db push



npm install zustand
npm install next-auth
npm install axios
npm install stripe



npx prisma studio

<!-- Authjs -->
npm install next-auth@beta
npm install next-auth@latest
npm install @auth/core@latest

npx auth secret

npm list @auth/core

<!-- asdasd -->
<!-- ts-node tiene una opción especial (--esm) para ejecutar archivos
 TypeScript como módulos ES. Ejecuta el siguiente comando -->
npm install esm ts-node --save-dev
<!-- SCRIPT -->
npx tsx scripts/seed.ts

<!-- script -->