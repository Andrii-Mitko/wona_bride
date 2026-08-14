// lib\api\dresses.ts

import "server-only";

import { connectDB } from "@/lib/mongodb";
import DressModel from "@/models/DressModel";

import type { Dress, DressCategory } from "@/types/dress";

export type GetDressesParams = {
  page?: number;
  limit?: number;
  category?: DressCategory;
  query?: string;
  isPopular?: boolean;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  sort?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
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
  availability: Dress["availability"];
}): Dress {
  return {
    _id: String(dress._id),
    createdAt: dress.createdAt
      ? dress.createdAt.toISOString()
      : new Date().toISOString(),

    updatedAt: dress.updatedAt
      ? dress.updatedAt.toISOString()
      : new Date().toISOString(),
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
    availability: dress.availability,
  };
}

export async function getDresses(
  params?: GetDressesParams,
): Promise<GetDressesResponse> {
  await connectDB();

  const page = params?.page ?? 1;
  const limit = params?.limit ?? 8;

  const filter: Record<string, unknown> = {};

  if (params?.category) {
    filter.category = params.category;
  }

  if (params?.isPopular !== undefined) {
    filter.isPopular = params.isPopular;
  }

  if (params?.size) {
    filter.sizes = params.size;
  }

  if (params?.minPrice !== undefined || params?.maxPrice !== undefined) {
    const priceFilter: Record<string, number> = {};

    if (params.minPrice !== undefined) {
      priceFilter.$gte = params.minPrice;
    }

    if (params.maxPrice !== undefined) {
      priceFilter.$lte = params.maxPrice;
    }

    filter.price = priceFilter;
  }

  if (params?.query) {
    filter.$or = [
      {
        name: {
          $regex: params.query,
          $options: "i",
        },
      },
      {
        article: {
          $regex: params.query,
          $options: "i",
        },
      },
      {
        style: {
          $regex: params.query,
          $options: "i",
        },
      },
      {
        fabric: {
          $regex: params.query,
          $options: "i",
        },
      },
      {
        color: {
          $regex: params.query,
          $options: "i",
        },
      },
    ];
  }

  const totalItems = await DressModel.countDocuments(filter);

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    popular: { isPopular: -1, createdAt: -1 },
    newest: { createdAt: -1 },
  };

  const sortOption = sortMap[params?.sort ?? "newest"] ?? sortMap.newest;

  const dresses = await DressModel.find(filter)
    .sort(sortOption)
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
