import { Dress, DressCategory } from "@/types/dress";
import RevealOnScroll from "@/components/RevealOnScroll/RevealOnScroll";
import DressCard from "@/components/DressCard/DressCard";

import css from "./DressGrid.module.css";

type DressGridProps = {
  dresses: Dress[];
  activeCategory?: DressCategory;
};

const DressGrid = ({ dresses, activeCategory }: DressGridProps) => {
  if (!dresses.length) {
    return <p className={css.empty}>Колекція суконь поки порожня</p>;
  }

  return (
    <ul className={css.grid}>
      {dresses.map((dress, index) => (
        <li key={dress._id}>
          <RevealOnScroll delay={(index % 8) * 60}>
            <DressCard
              dress={dress}
              priority={index < 4}
              activeCategory={activeCategory}
            />
          </RevealOnScroll>
        </li>
      ))}
    </ul>
  );
};

export default DressGrid;
