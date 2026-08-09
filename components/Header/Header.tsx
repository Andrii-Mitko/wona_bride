// components\Header\Header.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import css from "./Header.module.css";
import { useCartStore } from "@/store/cartStore";
import { navigation } from "@/constants/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const items = useCartStore((state) => state.items);

  const cartCount = items.length;

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
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/catalog" className={css.button}>
          Переглянути сукні
        </Link>

        <Link href="/cart" className={css.cart} onClick={closeMenu}>
          🛒
          {cartCount > 0 && <span className={css.cartCount}>{cartCount}</span>}
        </Link>

        <button
          className={`${css.burger} ${isOpen ? css.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`${css.mobileMenu} ${isOpen ? css.show : ""}`}
      >
        <nav className={css.mobileNav}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}

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
