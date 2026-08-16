import { describe, it, expect } from "vitest";
import { createSlug } from "./slug";

describe("createSlug", () => {
  it("транслітерує українську назву в латиницю", () => {
    expect(createSlug("Весільна сукня")).toBe("vesilna-suknya");
  });

  it("транслітерує російські літери, яких немає в українському алфавіті", () => {
    expect(createSlug("Платье ёлка съезд")).toContain("yolka");
  });

  it("прибирає зайві пробіли та об'єднує дефіси", () => {
    expect(createSlug("  Сукня   з  мереживом  ")).toBe("suknya-z-merezhyvom");
  });

  it("прибирає апострофи", () => {
    expect(createSlug("Сукня А'ля рустик")).not.toContain("'");
    expect(createSlug("Сукня А'ля рустик")).not.toContain("'");
  });

  it("повертає fallback-слаг, якщо результат порожній", () => {
    const result = createSlug("!!!???");

    expect(result).toMatch(/^dress-\d+$/);
  });

  it("не залишає дефіс на початку або в кінці", () => {
    const result = createSlug("- Сукня -");

    expect(result.startsWith("-")).toBe(false);
    expect(result.endsWith("-")).toBe(false);
  });
});
