"use client";

import dynamic from "next/dynamic";
import css from "./LazyMap.module.css";

const Map = dynamic(() => import("./Map/Map"), {
  ssr: false,
  loading: () => <div className={css.loading}>Завантаження карти...</div>,
});

export default function LazyMap() {
  return <Map />;
}
