"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import css from "./AppointmentForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/Spinner/Spinner";
import {
  appointmentSchema,
  type AppointmentFormData,
} from "@/lib/validation/appointment";

type Props = {
  dressName: string;
  sizes: string[];
  sizeType: "letter" | "women" | "kids";
};

const sizeTypeLabel: Record<"letter" | "women" | "kids", string> = {
  letter: "Буквені розміри",
  women: "Жіночі розміри",
  kids: "Дитячі розміри",
};

export default function AppointmentForm({ dressName, sizes, sizeType }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      dressName,
      sizes: [],
      privacy: false,
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Помилка відправки");
      }

      router.push("/appointment-success");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className={css.section}>
      <h2 className={css.title}>Запис на примірку</h2>
      <p className={css.dress}>
        Сукня: <strong>{dressName}</strong>
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("dressName")} />
        <div className={css.sizes}>
          <p className={css.label}>Оберіть розмір *</p>

          <p className={css.sizeInfo}>{sizeTypeLabel[sizeType]}</p>

          <div className={css.sizesGrid}>
            {sizes.map((size) => (
              <label key={size} className={css.sizeItem}>
                <input type="checkbox" value={size} {...register("sizes")} />
                <span>{size}</span>
              </label>
            ))}
          </div>

          {errors.sizes && (
            <p className={css.error}>{String(errors.sizes.message)}</p>
          )}
        </div>
        <label className={css.label}>
          Ім`я *
          <input
            className={css.input}
            type="text"
            placeholder="Ваше ім'я"
            {...register("name", {
              required: "Вкажіть ваше ім'я",
            })}
          />
          {errors.name && (
            <p className={css.error}>{String(errors.name.message)}</p>
          )}
        </label>

        <label className={css.label}>
          Телефон *
          <input
            className={css.input}
            type="tel"
            placeholder="+380 XX XXX XX XX"
            {...register("phone", {
              required: "Вкажіть номер телефону",
            })}
          />
          {errors.phone && (
            <p className={css.error}>{String(errors.phone.message)}</p>
          )}
        </label>
        <label className={css.label}>
          Дата
          <input className={css.input} type="date" {...register("date")} />
        </label>

        <label className={css.label}>
          Час
          <input className={css.input} type="time" {...register("time")} />
        </label>

        <label className={css.label}>
          Повідомлення
          <textarea className={css.textarea} {...register("message")} />
        </label>
        <label className={css.checkboxLabel}>
          <input type="checkbox" {...register("privacy")} />

          <span>Я погоджуюся з Політикою конфіденційності</span>
        </label>

        <button type="submit" className={css.button} disabled={isSubmitting}>
          {isSubmitting ? (
            <span className={css.buttonContent}>
              <Spinner size={18} />
              Відправка...
            </span>
          ) : (
            "Записатися на примірку"
          )}
        </button>
      </form>
    </section>
  );
}
