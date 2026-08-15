// components\DressCard\DressCard.tsx

import Image from "next/image";
import Link from "next/link";
import WishlistButton from "@/components/WishlistButton/WishlistButton";
import { Dress, DressCategory } from "@/types/dress";
import { categoryLabels } from "@/lib/utils/dress";
import css from "./DressCard.module.css";

type Props = {
  dress: Dress;
  priority?: boolean;
  activeCategory?: DressCategory;
};

const DressCard = ({ dress, priority = false, activeCategory }: Props) => {
  const displayCategory =
    activeCategory && dress.category.includes(activeCategory)
      ? activeCategory
      : dress.category[0];
  return (
    <article className={css.card}>
      <Link href={`/catalog/${dress.slug}`} className={css.imageLink}>
        <Image
          src={dress.images[0]}
          alt={dress.name}
          fill
          sizes="(min-width: 1440px) 300px, (min-width: 768px) 350px, 100vw"
          className={css.image}
          priority={priority}
        />

        <WishlistButton dress={dress} />
      </Link>

      <div className={css.content}>
        <h3 className={css.title}>{dress.name}</h3>

        <p className={css.category}>
          {displayCategory ? categoryLabels[displayCategory] : ""} сукня
        </p>

        <p className={css.price}>{dress.price.toLocaleString("uk-UA")} ₴</p>

        <Link
          href={`/catalog/${dress.slug}`}
          className={css.button}
          aria-label={`Детальніше про сукню ${dress.name}`}
        >
          Детальніше
        </Link>
      </div>
    </article>
  );
};

export default DressCard;
