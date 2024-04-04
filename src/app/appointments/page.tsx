
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllAppointments from '@/components/appointment/AllAppointments';

export const metadata: Metadata = {
  title: "Appointments | Dashboard",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <AllAppointments />
    </DefaultLayout>
  );
};

export default TablesPage;
``