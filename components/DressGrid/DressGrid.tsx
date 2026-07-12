import { Dress } from "@/types/dress";

import DressCard from "@/components/DressCard/DressCard";

import css from "./DressGrid.module.css";

type DressGridProps = {
  dresses: Dress[];
};

const DressGrid = ({ dresses }: DressGridProps) => {
  if (!dresses.length) {
    return <p className={css.empty}>Колекція суконь поки порожня</p>;
  }

  return (
    <ul className={css.grid}>
      {dresses.map((dress, index) => (
        <DressCard key={dress.id} dress={dress} priority={index === 0} />
      ))}
    </ul>
  );
};

export default DressGrid;
