import Image from "next/image";
import Link from "next/link";

import { Dress } from "@/types/dress";
import { categoryLabels } from "@/lib/utils/dress";
import css from "./DressCard.module.css";

type Props = {
  dress: Dress;
  priority?: boolean;
};

const DressCard = ({ dress, priority = false }: Props) => {
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
      </Link>

      <div className={css.content}>
        <h3 className={css.title}>{dress.name}</h3>

        <p className={css.category}>
          {dress.category
            .map((category) => categoryLabels[category])
            .join(", ")}
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
