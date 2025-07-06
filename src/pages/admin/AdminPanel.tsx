import StatCard from "@/components/Elements/Cards/StatCard/StatCard.tsx";
import { UseData } from "@/hooks/useData.tsx";
import UserProfileCard from "@/components/Elements/Cards/UserProfileCard/UserProfileCard.tsx";

export default function AdminPanel() {
  const { data } = UseData();

  return (
    <>
      <title>BeFit.Always - panel administratora</title>
      <div className="flex flex-wrap justify-center">
        <StatCard
          cardText="Użytkownicy"
          value={data.admin?.counts.usersCount}
        />
        <StatCard
          cardText="Trenerzy"
          value={data.admin?.counts.trainersCount}
        />
        <StatCard
          cardText="Administratorzy"
          value={data.admin?.counts.adminsCount}
        />
      </div>
      <div className="pt-5">
        <UserProfileCard user={data.admin?.users ?? []} />
      </div>
    </>
  );
}
