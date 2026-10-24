"use client";

import { useState } from "react";
import css from "./Login.module.css";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        setError(result.message ?? "Не вдалося увійти в адмінку");
        return;
      }

      // Переходимо до адмінки після успішної авторизації.
      window.location.replace("/admin");
    } catch {
      setError("Помилка з'єднання із сервером. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={css.wrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.title}>Вхід в адмінку</h1>

        <input
          className={css.input}
          type="text"
          placeholder="Логін"
          autoComplete="username"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

        <input
          className={css.input}
          type="password"
          placeholder="Пароль"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className={css.error}>{error}</p>}

        <button className={css.button} type="submit" disabled={loading}>
          {loading ? "Вхід..." : "Увійти"}
        </button>
      </form>
    </section>
  );
}
