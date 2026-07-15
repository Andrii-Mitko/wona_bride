import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import OrderStatus from "@/components/OrderStatus/OrderStatus";
import css from "../admin.module.css";

export default async function OrdersPage() {
  await connectDB();

  const orders = await Order.find().sort({
    createdAt: -1,
  });

  return (
    <main className={css.container}>
      <h1 className={css.title}>Замовлення</h1>

      <div className={css.tableWrapper}>
        <table className={css.table}>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Покупець</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Товари</th>
              <th>Коментар</th>
              <th>Сума</th>
              <th>Статус</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id.toString()}
                className={
                  order.status === "new"
                    ? css.statusNew
                    : order.status === "confirmed"
                      ? css.statusConfirmed
                      : order.status === "completed"
                        ? css.statusCompleted
                        : css.statusCancelled
                }
              >
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                <td>{order.customer.name}</td>

                <td>{order.customer.phone}</td>
                <td>{order.customer.email}</td>
                <td>
                  {order.items.map((item: (typeof order.items)[number]) => (
                    <div key={`${item.dressId}-${item.size}`}>
                      <strong>{item.name}</strong>
                      <br />
                      Розмір: {item.size}
                      <br />
                      Кількість: {item.quantity}
                    </div>
                  ))}
                </td>
                <td>{order.customer.comment || "-"}</td>
                <td>{order.total.toLocaleString("uk-UA")} ₴</td>

                <td>
                  <OrderStatus
                    id={order._id.toString()}
                    status={order.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
