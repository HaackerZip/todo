// app/api/admin/upload/route.ts
import { NextResponse } from "next/server";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type UploadPrefix = "categories" | "products" | "temp";
const ALLOWED_PREFIXES: UploadPrefix[] = ["categories", "products", "temp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Helper para respuestas de error
const errorResponse = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

// POST - Subir nuevo archivo
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const prefix = formData.get("prefix") as UploadPrefix;

    if (!file) return errorResponse("Archivo requerido", 400);
    if (!ALLOWED_PREFIXES.includes(prefix))
      return errorResponse("Prefijo no válido", 400);
    if (file.size > MAX_FILE_SIZE)
      return errorResponse("El archivo excede los 5MB", 413);

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${prefix}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: filename,
        Body: buffer,
        ContentType: file.type,
      }),
    );

    return NextResponse.json({
      success: true,
      path: filename,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${filename}`,
    });
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error);
    return errorResponse("Error subiendo archivo", 500);
  }
}

// GET - Obtener archivo/lista
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");
    const prefix = searchParams.get("prefix") as UploadPrefix;
    const list = searchParams.get("list") === "true";

    if (list) {
      if (!prefix || !ALLOWED_PREFIXES.includes(prefix))
        return errorResponse("Prefijo requerido", 400);

      const { Contents } = await s3Client.send(
        new ListObjectsV2Command({
          Bucket: process.env.S3_BUCKET_NAME,
          Prefix: prefix,
        }),
      );

      const files = await Promise.all(
        Contents?.map(async (file) => ({
          path: file.Key,
          url: await getSignedUrl(
            s3Client,
            new GetObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: file.Key,
            }),
            { expiresIn: 3600 },
          ),
        })) || [],
      );

      return NextResponse.json(files);
    }

    if (!path) return errorResponse("Ruta requerida", 400);

    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: path,
      }),
      { expiresIn: 3600 },
    );

    return NextResponse.json({ url });
  } catch (error) {
    console.error("[GET_FILE_ERROR]", error);
    return errorResponse("Error obteniendo archivo", 500);
  }
}

// DELETE - Eliminar archivo
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");

    if (!path) return errorResponse("Ruta requerida", 400);

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: path,
      }),
    );

    return NextResponse.json({
      success: true,
      message: "Archivo eliminado",
    });
  } catch (error) {
    console.error("[DELETE_ERROR]", error);
    return errorResponse("Error eliminando archivo", 500);
  }
}

// PUT - Actualizar archivo
export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const oldPath = formData.get("oldPath") as string;

    if (!file || !oldPath) return errorResponse("Datos incompletos", 400);
    if (file.size > MAX_FILE_SIZE)
      return errorResponse("El archivo excede los 5MB", 413);

    const buffer = Buffer.from(await file.arrayBuffer());

    // Eliminar archivo anterior
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: oldPath,
      }),
    );

    // Subir nuevo archivo
    const newPath = `${oldPath.split("/")[0]}/${Date.now()}-${file.name}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: newPath,
        Body: buffer,
        ContentType: file.type,
      }),
    );

    return NextResponse.json({
      success: true,
      newPath,
      newUrl: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${newPath}`,
    });
  } catch (error) {
    console.error("[UPDATE_ERROR]", error);
    return errorResponse("Error actualizando archivo", 500);
  }
}
