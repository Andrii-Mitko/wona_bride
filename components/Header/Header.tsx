"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo} onClick={closeMenu}>
          <Image
            src="/images/logo.png"
            alt="WONA Bride"
            width={140}
            height={64}
            priority
          />
        </Link>

        <nav className={css.desktopNav}>
          <Link href="/catalog">Наші сукні</Link>
          <Link href="/#about">Про нас</Link>
          <Link href="/#popular">Популярні</Link>
          <Link href="/#feedback">Відгуки</Link>
          <Link href="/#contacts">Контакти</Link>
        </nav>

        <Link href="/catalog" className={css.button}>
          Переглянути сукні
        </Link>

        <button
          className={`${css.burger} ${isOpen ? css.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Меню"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`${css.mobileMenu} ${isOpen ? css.show : ""}`}>
        <nav className={css.mobileNav}>
          <Link href="/catalog" onClick={closeMenu}>
            Наші сукні
          </Link>

          <Link href="/#about" onClick={closeMenu}>
            Про нас
          </Link>

          <Link href="/#popular" onClick={closeMenu}>
            Популярні
          </Link>

          <Link href="/#feedback" onClick={closeMenu}>
            Відгуки
          </Link>
          <Link href="/#contacts" onClick={closeMenu}>
            Контакти
          </Link>

          <Link
            href="/catalog"
            className={css.mobileButton}
            onClick={closeMenu}
          >
            Переглянути сукні
          </Link>
        </nav>
      </div>
    </header>
  );
}
