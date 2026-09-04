"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./Login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });

    if (!res.ok) {
      setError("Невірний логін або пароль");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <section className={css.wrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.title}>Вхід в адмінку</h1>

        <input
          className={css.input}
          type="text"
          placeholder="Логін"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          className={css.input}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className={css.error}>{error}</p>}

        <button className={css.button} type="submit">
          Увійти
        </button>
      </form>
    </section>
  );
}
