import { notFound } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import DressModel from "@/models/DressModel";

import DressForm from "@/components/DressForm/DressForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditDressPage({ params }: Props) {
  await connectDB();

  const { id } = await params;

  const dress = await DressModel.findById(id).lean();

  if (!dress) {
    notFound();
  }

  return (
    <>
      <h1>Редагування сукні</h1>

      <DressForm initialData={JSON.parse(JSON.stringify(dress))} />
    </>
  );
}
