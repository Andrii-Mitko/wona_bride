// app/admin/orders/page.tsx

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import OrderStatus from "@/components/OrderStatus/OrderStatus";
import css from "../admin.module.css";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const cookieStore = await cookies();

  const adminAuth = cookieStore.get("admin-auth");

  if (!adminAuth || adminAuth.value !== "true") {
    redirect("/admin/login");
  }

  await connectDB();

  const orders = await Order.find().sort({
    createdAt: -1,
  });

  return (
    <main className={css.container}>
      <h1 className={css.title}>Замовлення</h1>

      {/* MOBILE */}

      <div className={css.mobileOrders}>
        {orders.map((order) => (
          <article key={order._id.toString()} className={css.orderCard}>
            <p>
              <strong>Дата:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString("uk-UA")}
            </p>

            <p>
              <strong>Покупець:</strong> {order.customer.name}
            </p>

            <p>
              <strong>Телефон:</strong>{" "}
              <a href={`tel:${order.customer.phone}`}>{order.customer.phone}</a>
            </p>

            <p>
              <strong>Email:</strong> {order.customer.email}
            </p>

            <div>
              <strong>Товари:</strong>

              {order.items.map((item: (typeof order.items)[number]) => (
                <div key={`${item.dressId}-${item.size}`}>
                  {item.name}
                  <br />
                  Розмір: {item.size}
                  <br />
                  Кількість: {item.quantity}
                </div>
              ))}
            </div>

            <p>
              <strong>Коментар:</strong> {order.customer.comment || "-"}
            </p>

            <p>
              <strong>Сума:</strong> {order.total.toLocaleString("uk-UA")} ₴
            </p>

            <div>
              <OrderStatus id={order._id.toString()} status={order.status} />
            </div>
          </article>
        ))}
      </div>

      {/* DESKTOP */}

      <div className={css.desktopOrders}>
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
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("uk-UA")}
                  </td>

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
      </div>
    </main>
  );
}
