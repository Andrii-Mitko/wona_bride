"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSlug } from "@/lib/utils/slug";
import { dressSchema, DressFormData } from "@/lib/validation/dress";
import type { Dress } from "@/types/dress";
import { dressSizes } from "@/data/sizes";
import CheckboxGroup from "@/components/CheckboxGroup/CheckboxGroup";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import css from "./DressForm.module.css";
import SizeSelectorAdmin from "@/components/SizeSelectorAdmin/SizeSelectorAdmin";
import { dressCategories, dressStyles, dressFabrics } from "@/data/options";

type Props = {
  initialData?: Dress;
};

export default function DressForm({ initialData }: Props) {
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DressFormData>({
    resolver: zodResolver(dressSchema),

    defaultValues: {
      name: initialData?.name ?? "",
      article: initialData?.article ?? "",
      price: initialData?.price ?? 0,
      color: initialData?.color ?? "",
      description: initialData?.description ?? "",

      sizeType: initialData?.sizeType ?? "letter",

      sizes: initialData?.sizes ?? [],

      fabric: initialData?.fabric ?? [],
      images: initialData?.images ?? [],
      category: initialData?.category ?? [],
      style: initialData?.style ?? [],

      isPopular: initialData?.isPopular ?? false,
    },
  });

  const sizeType = watch("sizeType");

  const selectedSizes = watch("sizes") ?? [];
  const selectedImages = watch("images") ?? [];
  const selectedCategories = watch("category") ?? [];
  const selectedStyles = watch("style") ?? [];
  const selectedFabrics = watch("fabric") ?? [];

  const onSubmit = async (data: DressFormData) => {
    try {
      const response = await fetch(
        isEdit ? `/api/dress/${initialData!._id}` : "/api/dress",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            slug: createSlug(data.name),
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          isEdit ? "Помилка оновлення сукні" : "Помилка створення сукні",
        );
      }

      const dress = await response.json();

      console.log("Створено:", dress);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.field}>
        <label>Назва</label>

        <input {...register("name")} />

        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div className={css.field}>
        <label>Артикул</label>

        <input {...register("article")} />

        {errors.article && <span>{errors.article.message}</span>}
      </div>

      <div className={css.field}>
        <label>Ціна</label>

        <input
          type="number"
          {...register("price", {
            valueAsNumber: true,
          })}
        />

        {errors.price && <span>{errors.price.message}</span>}
      </div>

      <div className={css.field}>
        <label>Колір</label>

        <input {...register("color")} />

        {errors.color && <span>{errors.color.message}</span>}
      </div>
      <CheckboxGroup
        title="Матеріали"
        options={dressFabrics}
        selected={selectedFabrics}
        onChange={(value) =>
          setValue("fabric", value, {
            shouldValidate: true,
          })
        }
      />

      {errors.fabric && <span>{errors.fabric.message}</span>}

      <CheckboxGroup
        title="Категорії"
        options={dressCategories}
        selected={selectedCategories}
        onChange={(value) =>
          setValue("category", value, {
            shouldValidate: true,
          })
        }
      />

      {errors.category && <span>{errors.category.message}</span>}
      <CheckboxGroup
        title="Стилі"
        options={dressStyles}
        selected={selectedStyles}
        onChange={(value) =>
          setValue("style", value, {
            shouldValidate: true,
          })
        }
      />

      {errors.style && <span>{errors.style.message}</span>}

      <ImageUploader
        images={selectedImages}
        onChange={(value) =>
          setValue("images", value, {
            shouldValidate: true,
          })
        }
      />

      {errors.images && <span>{errors.images.message}</span>}

      <div className={css.field}>
        <label>Тип розміру</label>

        <select {...register("sizeType")}>
          <option value="letter">Літерний (XS-XXXL)</option>

          <option value="women">Жіночий (34-60)</option>

          <option value="kids">Дитячий</option>
        </select>

        {errors.sizeType && <span>{errors.sizeType.message}</span>}
      </div>

      <SizeSelectorAdmin
        sizes={dressSizes[sizeType]}
        selectedSizes={selectedSizes}
        onChange={(sizes) =>
          setValue("sizes", sizes, {
            shouldValidate: true,
          })
        }
      />

      {errors.sizes && <span>{errors.sizes.message}</span>}

      <div className={css.field}>
        <label>Опис</label>

        <textarea rows={5} {...register("description")} />

        {errors.description && <span>{errors.description.message}</span>}
      </div>

      <div className={css.field}>
        <label>
          <input type="checkbox" {...register("isPopular")} />
          Популярна сукня
        </label>
      </div>

      <button type="submit">Зберегти</button>
    </form>
  );
}
