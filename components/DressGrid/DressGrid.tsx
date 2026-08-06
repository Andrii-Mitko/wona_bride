import { Dress, DressCategory } from "@/types/dress";

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
          <DressCard
            dress={dress}
            priority={index < 2}
            activeCategory={activeCategory}
          />
        </li>
      ))}
    </ul>
  );
};

export default DressGrid;
