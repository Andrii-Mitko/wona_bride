import css from "./ProductTrust.module.css";

export default function ProductTrust() {
  return (
    <div className={css.wrapper}>
      <div className={css.item}>
        <span>🚚</span>
        <div>
          <strong>Доставка</strong>
          <p>По Україні Новою поштою</p>
        </div>
      </div>

      <div className={css.item}>
        <span>↩️</span>
        <div>
          <strong>Обмін та повернення</strong>
          <p>Допоможемо вирішити питання</p>
        </div>
      </div>

      <div className={css.item}>
        <span>💳</span>
        <div>
          <strong>Оплата</strong>
          <p>Зручний спосіб оплати</p>
        </div>
      </div>

      <div className={css.item}>
        <span>📞</span>
        <div>
          <strong>Потрібна консультація?</strong>
          <p>Напишіть нам</p>
        </div>
      </div>
    </div>
  );
}
