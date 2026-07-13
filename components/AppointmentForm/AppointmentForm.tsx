"use client";
import { useForm } from "react-hook-form";
import css from "./AppointmentForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  appointmentSchema,
  type AppointmentFormData,
} from "@/lib/validation/appointment";

type Props = {
  dressName: string;
  onSuccess: () => void;
};

export default function AppointmentForm({ dressName, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      dressName,
      privacy: false,
    },
  });

  const onSubmit = (data: AppointmentFormData) => {
    console.log(data);

    onSuccess();
  };
  return (
    <section className={css.section}>
      <h2 className={css.title}>Запис на примірку</h2>
      <p className={css.dress}>
        Сукня: <strong>{dressName}</strong>
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("dressName")} />
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

        <button type="submit" className={css.button}>
          Записатися на примірку
        </button>
      </form>
    </section>
  );
}
