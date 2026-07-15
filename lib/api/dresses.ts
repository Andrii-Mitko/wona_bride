import "server-only";

import { connectDB } from "@/lib/mongodb";
import DressModel from "@/models/Dress";

import type { Dress, DressCategory } from "@/types/dress";

export type GetDressesParams = {
  page?: number;
  limit?: number;
  category?: DressCategory;
};

export type GetDressesResponse = {
  dresses: Dress[];
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
};

function normalizeDress(dress: {
  _id: unknown;
  name: string;
  slug: string;
  article: string;
  price: number;
  description: string;
  images: string[];
  category: DressCategory[];
  style: Dress["style"];
  color: string;
  fabric: string[];
  sizeType: Dress["sizeType"];
  sizes: string[];
  isPopular: boolean;
}): Dress {
  return {
    _id: String(dress._id),

    name: dress.name,
    slug: dress.slug,
    article: dress.article,

    price: dress.price,

    description: dress.description,

    images: dress.images,

    category: dress.category,

    style: dress.style,

    color: dress.color,

    fabric: dress.fabric,

    sizeType: dress.sizeType,

    sizes: dress.sizes,

    isPopular: dress.isPopular,
  };
}

export async function getDresses(
  params?: GetDressesParams,
): Promise<GetDressesResponse> {
  await connectDB();

  const page = params?.page ?? 1;
  const limit = params?.limit ?? 8;

  const filter = params?.category
    ? {
        category: params.category,
      }
    : {};

  const totalItems = await DressModel.countDocuments(filter);

  const dresses = await DressModel.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return {
    dresses: dresses.map(normalizeDress),

    totalItems,

    totalPages: Math.ceil(totalItems / limit),

    page,

    limit,
  };
}

export async function getDressBySlug(slug: string) {
  await connectDB();

  const dress = await DressModel.findOne({
    slug,
  }).lean();

  if (!dress) {
    return null;
  }

  return normalizeDress(dress);
}

export async function getSimilarDresses(slug: string, limit = 4) {
  await connectDB();

  const currentDress = await DressModel.findOne({
    slug,
  }).lean();

  if (!currentDress) {
    return [];
  }

  const dresses = await DressModel.find({
    slug: {
      $ne: slug,
    },

    style: {
      $in: currentDress.style,
    },
  })
    .limit(limit)
    .lean();

  return dresses.map(normalizeDress);
}
