import { NextResponse } from "next/server";
import type { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Файл не знайдено" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "wona-bride/dresses",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as UploadApiResponse);
            }
          },
        )
        .end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return NextResponse.json(
      {
        error: "Помилка завантаження фото",
      },
      {
        status: 500,
      },
    );
  }
}
