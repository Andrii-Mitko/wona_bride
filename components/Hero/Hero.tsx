import Image from "next/image";
import Link from "next/link";

import AppointmentModal from "@/components/AppointmentModal/AppointmentModal";

import css from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={css.hero}>
      <Image
        src="/images/IMG_4598.webp"
        alt="Весільна сукня WONA Bride"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className={css.heroImage}
      />

      <div className={css.overlay} />

      <div className={`${css.container} ${css.heroContainer}`}>
        <div className={css.heroContent}>
          <p className={css.badge}>
            WONA Bride · весільні та вечірні сукні у Барі
          </p>

          <h1 className={css.heroTitle}>
            Весільні та вечірні
            <br />
            сукні у Барі
          </h1>

          <p className={css.heroText}>
            Допоможемо знайти сукню, у якій ви почуватиметесь особливою.
          </p>

          <div className={css.heroActions}>
            <Link href="/catalog" className={css.button}>
              Переглянути колекцію
            </Link>

            <AppointmentModal className={css.secondaryButton} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
