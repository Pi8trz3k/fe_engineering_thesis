import TrainerCard from "@/components/Elements/Cards/TrainerCard/TrainerCard.tsx";
import { useEffect, useState } from "react";
import { Pagination, Spin } from "antd";
import { TrainerBackend } from "@/pages/DataTypes/TrainersPageTypes.ts";
import { useFilterData, useTrainers } from "@/utils/TrainersPageData.tsx";

export default function TrainersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { cities, trainerTypes, fetchFilterData } = useFilterData();
  const { trainers, loading, totalCount, fetchTrainers, PAGE_SIZE } =
    useTrainers();

  useEffect(() => {
    fetchTrainers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchFilterData();
  }, []);

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
