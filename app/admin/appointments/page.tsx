import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

import css from "../admin.module.css";

import AppointmentStatus from "@/components/AppointmentStatus/AppointmentStatus";

type AdminSearchParams = {
  search?: string;
  status?: string;
  page?: string;
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<AdminSearchParams>;
}) {
  const cookieStore = await cookies();

  const adminAuth = cookieStore.get("admin-auth");

  if (!adminAuth || adminAuth.value !== "true") {
    redirect("/admin/login");
  }

  await connectDB();

  const { search = "", status = "", page = "1" } = await searchParams;

  const currentPage = Number(page) || 1;

  const limit = 20;

  const skip = (currentPage - 1) * limit;

  const filter = {
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
  };

  const totalAppointments = await Appointment.countDocuments(filter);

  const appointments = await Appointment.find(filter)
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalAppointments / limit);

  return (
    <main className={css.container}>
      <h1 className={css.title}>Записи на примірку</h1>

      <form method="GET" className={css.searchForm}>
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Пошук за ім`ям, телефоном або сукнею..."
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

      {/* MOBILE */}

      <div className={css.mobileAppointments}>
        {appointments.map((item) => (
          <article key={item._id.toString()} className={css.appointmentCard}>
            <p>
              <strong>Дата:</strong>{" "}
              {new Date(item.createdAt).toLocaleDateString("uk-UA")}
            </p>

            <p>
              <strong>Сукня:</strong> {item.dressName}
            </p>

            <p>
              <strong>Розмір:</strong> {item.sizes.join(", ")}
            </p>

            <p>
              <strong>Ім`я:</strong> {item.name}
            </p>

            <p>
              <strong>Телефон:</strong>{" "}
              <a href={`tel:${item.phone}`}>{item.phone}</a>
            </p>

            <AppointmentStatus id={item._id.toString()} status={item.status} />
          </article>
        ))}
      </div>

      {/* DESKTOP */}

      <div className={css.desktopAppointments}>
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
                  <td>
                    {new Date(item.createdAt).toLocaleDateString("uk-UA")}
                  </td>

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
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        pathname="/admin/appointments"
        query={{
          search,
          status,
        }}
      />
    </main>
  );
}
