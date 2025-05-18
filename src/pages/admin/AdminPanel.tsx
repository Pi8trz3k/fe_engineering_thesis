import StatCard from "@/components/Elements/Cards/StatCard.tsx";
import { UseData } from "@/hooks/useData.tsx";

export default function AdminPanel() {
  const { data } = UseData();

  return (
    <>
      <title>BeFit.Always - panel administratora</title>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-15 gap-y-5 pt-10">
        <StatCard cardText="Użytkownicy" value={data.admin?.usersCount} />
        <StatCard cardText="Trenerzy" value={data.admin?.trainersCount} />
        <StatCard cardText="Administratorzy" value={data.admin?.adminsCount} />
      </div>
    </>
  );
}
