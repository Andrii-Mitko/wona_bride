"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map/Map"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Завантаження карти...
    </div>
  ),
});

export default function LazyMap() {
  return <Map />;
}
