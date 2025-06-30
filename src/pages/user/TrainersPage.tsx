import TrainerCard from "@/components/Elements/Cards/TrainerCard/TrainerCard.tsx";
import api from "@/lib/api.tsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pagination, Spin } from "antd";
import { TrainerBackend } from "@/pages/DataTypes/TrainersPageTypes.ts";
import { useFilterData } from "@/utils/TrainersPageData.tsx";

const PAGE_SIZE = 12;

export default function TrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const { cities, fetchFilterData } = useFilterData();

  const fetchTrainers = async (page: number) => {
    setLoading(true);

    const skip = (page - 1) * PAGE_SIZE;

    try {
      const trainersResponse = await api.get(
        `/trainer?skip=${skip}&limit=${PAGE_SIZE}`,
      );
      console.log(trainersResponse);
      setTrainers(trainersResponse.data);
      setTotalCount(trainersResponse.data.length);
    } catch (error: any) {
      console.error(error);
      toast.error("Wystąpił błąd podczas pobierania danych");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers(currentPage);
    fetchFilterData();
  }, [currentPage]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center my-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer: TrainerBackend) => (
            <TrainerCard
              key={trainer.user_id}
              trainerId={trainer.user_id}
              name={trainer.name}
              lastName={trainer.last_name}
              meanOfStars={trainer.mean_of_stars}
              opinionsCount={trainer.opinions_count}
              locations={trainer.locations}
              types={trainer.types}
            />
          ))}
        </div>
      )}
      <div>
        {cities.map((city) => (
          <p key={city}>{city}</p>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={totalCount}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}
