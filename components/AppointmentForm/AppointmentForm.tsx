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
};

export default function AppointmentForm({ dressName }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = (data: AppointmentFormData) => {
    console.log(data);
  };
  return (
    <section className={css.section}>
      <h2 className={css.title}>Запис на примірку</h2>
      <p className={css.dress}>
        Сукня: <strong>{dressName}</strong>
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" value={dressName} {...register("dress")} />
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
          <input className={css.input} type="date" name="date" />
        </label>

        <label className={css.label}>
          Час
          <input className={css.input} type="time" name="time" />
        </label>

        <label className={css.label}>
          Повідомлення
          <textarea
            className={css.textarea}
            name="message"
            rows={5}
            placeholder="Наприклад: Мене цікавить примірка у суботу після 15:00."
          />
        </label>
        <label className={css.checkboxLabel}>
          <input type="checkbox" name="privacy" required />

          <span>Я погоджуюся з Політикою конфіденційності</span>
        </label>

        <button type="submit" className={css.button}>
          Записатися на примірку
        </button>
      </form>
    </section>
  );
}
