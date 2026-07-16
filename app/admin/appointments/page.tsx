import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import css from "../admin.module.css";
import AdminLogout from "@/components/AdminLogout/AdminLogout";
import AppointmentStatus from "@/components/AppointmentStatus/AppointmentStatus";

type AdminSearchParams = {
  search?: string;
  status?: string;
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<AdminSearchParams>;
}) {
  await connectDB();

  const { search = "", status = "" } = await searchParams;

  const appointments = await Appointment.find({
    ...(status && { status }),

    $or: [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        phone: {
          $regex: search,
          $options: "i",
        },
      },
      {
        dressName: {
          $regex: search,
          $options: "i",
        },
      },
    ],
  }).sort({
    createdAt: -1,
  });

  return (
    <main className={css.container}>
      <h1 className={css.title}>Записи на примірку</h1>
      <AdminLogout />
      <form method="GET" className={css.searchForm}>
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Пошук за ім'ям, телефоном або сукнею..."
          className={css.searchInput}
        />
        <select
          name="status"
          defaultValue={status}
          className={css.searchSelect}
        >
          <option value="">Усі статуси</option>
          <option value="new">🟡 Нові</option>
          <option value="confirmed">🔵 Підтверджені</option>
          <option value="completed">🟢 Виконані</option>
          <option value="cancelled">🔴 Скасовані</option>
        </select>
        <button type="submit" className={css.searchButton}>
          Пошук
        </button>
      </form>
      <div className={css.tableWrapper}>
        <table className={css.table}>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Сукня</th>
              <th>Розмір</th>
              <th>Ім`я</th>
              <th>Телефон</th>
              <th>Статус</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr key={item._id.toString()}>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                <td>{item.dressName}</td>

                <td>{item.sizes.join(", ")}</td>

                <td>{item.name}</td>

                <td>
                  <a href={`tel:${item.phone}`}>{item.phone}</a>
                </td>

                <td>
                  <AppointmentStatus
                    id={item._id.toString()}
                    status={item.status}
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
