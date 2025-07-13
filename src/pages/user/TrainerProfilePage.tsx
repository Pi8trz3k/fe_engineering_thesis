import {
  OpinionBackend,
  TrainerProfilePageProps,
} from "@/pages/user/DataTypes/TrainersPageTypes.ts";
import { useEffect, useState } from "react";
import { Pagination, Spin } from "antd";
import OpinionCard from "@/components/Elements/Cards/OpinionCard/OpinionCard.tsx";
import {
  useOpinions,
  usePicture,
  useTrainer,
} from "@/utils/TrainerPageData.tsx";

export default function TrainerProfilePage({
  trainerId,
}: TrainerProfilePageProps) {
  const { trainer, trainerLoading, fetchTrainer } = useTrainer();
  const {
    opinions,
    totalOpinionsCount,
    opinionsLoading,
    fetchOpinions,
    OPINION_PAGE_SIZE,
  } = useOpinions();
  const { img, imgLoading, fetchImage } = usePicture();
  const [currentOpinionsPage, setCurrentOpinionsPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchTrainer(trainerId);
  }, [trainerId]);

  useEffect(() => {
    fetchOpinions(trainerId, currentOpinionsPage);
  }, [trainerId, currentOpinionsPage]);

  useEffect(() => {
    fetchImage(trainerId);
  }, [trainerId]);

  return trainerLoading ? (
    <div className="flex justify-center items-center h-96">
      <Spin size="large" />
    </div>
  ) : (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 dark:text-white">
        {imgLoading ? (
          <div className="flex justify-center items-center h-96">
            <Spin size="large" />
          </div>
        ) : (
          <div className="relative w-[65%] aspect-[4/3] mx-auto">
            <img
              src={img}
              alt="Trainer image"
              className="absolute inset-0 w-full h-full object-cover rounded-xl object-top"
              loading="lazy"
            />
          </div>
        )}

        <div>
          <div className="font-bold">
            {trainer?.name} {trainer?.last_name} (⭐ {trainer?.mean_of_stars})
          </div>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div>
          <div>
            <a className="font-semibold">Dostępne miasta: </a>
            {[...new Set(trainer?.locations?.map((loc) => loc.city))].join(
              ", ",
            ) || "Brak miast"}
          </div>
          <div>
            {" "}
            <span className="font-semibold">Specjalizacje: </span>
            {trainer?.types?.join(", ") || "Brak specjalizacji"}
          </div>
        </div>
        <div className="bg-red-300">ASKNDajsndajsndjasnd </div>
      </div>
      <p className="mt-5 mb-5 font-semibold dark:text-white">Opinie:</p>
      {opinionsLoading ? (
        <div className="flex justify-center my-10">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {totalOpinionsCount === 0 ? (
            ""
          ) : (
            <div className="flex justify-begin mb-4 gap-2">
              <button
                className={`px-3 py-1 rounded border font-semibold ${
                  sortOrder === "desc"
                    ? "bg-green-600 text-white dark:border-none"
                    : "bg-white dark:bg-white"
                }`}
                onClick={() => setSortOrder("desc")}
              >
                Od najlepszych
              </button>
              <button
                className={`px-3 py-1 rounded border font-semibold ${
                  sortOrder === "asc"
                    ? "bg-green-600 text-white dark:border-none"
                    : "bg-white dark:bg-white"
                }`}
                onClick={() => setSortOrder("asc")}
              >
                Od najsłabszych
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 dark:text-white">
            {[...opinions]
              ?.sort((a, b) =>
                sortOrder === "asc"
                  ? a.number_of_stars - b.number_of_stars
                  : b.number_of_stars - a.number_of_stars,
              )
              .map((opinion: OpinionBackend) => (
                <OpinionCard
                  key={opinion.opinion_id}
                  description={opinion.description}
                  numberOfStars={opinion.number_of_stars}
                />
              ))}
          </div>
        </>
      )}
      {totalOpinionsCount === 0 ? (
        <div className="dark:text-white">Brak opinii</div>
      ) : (
        <div className="mt-6 text-center">
          <Pagination
            current={currentOpinionsPage}
            pageSize={OPINION_PAGE_SIZE}
            total={totalOpinionsCount}
            onChange={(page) => setCurrentOpinionsPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </>
  );
}
