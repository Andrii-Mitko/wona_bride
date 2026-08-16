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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormError from "@/components/FormError/FormError";
import Spinner from "@/components/Spinner/Spinner";

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
    formState: { errors, isSubmitting, isDirty },
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
      availability: initialData?.availability ?? "available",
    },
  });
  const router = useRouter();
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
          body: JSON.stringify(
            isEdit
              ? data
              : {
                  ...data,
                  slug: createSlug(data.name),
                },
          ),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Server error:", result);

        toast.error(
          result.error ?? result.message ?? "Не вдалося зберегти сукню",
        );

        return;
      }

      toast.success(isEdit ? "Сукню оновлено!" : "Сукню створено!");
      router.push("/admin/dresses");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(error instanceof Error ? error.message : "Помилка запиту");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.field}>
        <label>Назва</label>

        <input {...register("name")} />

        <FormError message={errors.name?.message} />
      </div>

      <div className={css.field}>
        <label>Артикул</label>

        <input {...register("article")} />

        <FormError message={errors.article?.message} />
      </div>

      <div className={css.field}>
        <label>Ціна</label>

        <input
          type="number"
          {...register("price", {
            valueAsNumber: true,
          })}
        />

        <FormError message={errors.price?.message} />
      </div>

      <div className={css.field}>
        <label>Колір</label>

        <input {...register("color")} />

        <FormError message={errors.color?.message} />
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

      <FormError message={errors.fabric?.message} />

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

      <FormError message={errors.category?.message} />
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

      <FormError message={errors.style?.message} />

      <ImageUploader
        images={selectedImages}
        onChange={(value) =>
          setValue("images", value, {
            shouldValidate: true,
          })
        }
      />

      <FormError message={errors.images?.message} />

      <div className={css.field}>
        <label>Тип розміру</label>

        <select {...register("sizeType")}>
          <option value="letter">Літерний (XS-XXXL)</option>

          <option value="women">Жіночий (34-60)</option>

          <option value="kids">Дитячий</option>
        </select>

        <FormError message={errors.sizeType?.message} />
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

      <FormError message={errors.sizes?.message} />

      <div className={css.field}>
        <label>Опис</label>

        <textarea rows={5} {...register("description")} />

        <FormError message={errors.description?.message} />
      </div>

      <div className={css.field}>
        <label>Наявність</label>

        <select {...register("availability")}>
          <option value="available">🟢 Є в наявності</option>

          <option value="order">🟡 Під замовлення</option>

          <option value="waiting">🔴 Модель очікується</option>
        </select>

        <FormError message={errors.availability?.message} />
      </div>

      <div className={css.field}>
        <label>
          <input type="checkbox" {...register("isPopular")} />
          Популярна сукня
        </label>
      </div>

      <button
        type="submit"
        className={css.submitButton}
        disabled={isSubmitting || (isEdit && !isDirty)}
      >
        {isSubmitting ? (
          <span className={css.buttonContent}>
            <Spinner size={18} />
            Збереження...
          </span>
        ) : isEdit ? (
          "Зберегти зміни"
        ) : (
          "Створити сукню"
        )}
      </button>
    </form>
  );
}
