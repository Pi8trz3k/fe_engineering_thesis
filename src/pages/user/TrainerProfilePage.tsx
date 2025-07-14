import {
  OpinionBackend,
  TrainerProfilePageProps,
} from "@/pages/user/DataTypes/TrainersPageTypes.ts";
import { useEffect, useState } from "react";
import { Pagination, Spin, Input, Button, message } from "antd";
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
  const [messageToTrainer, setMessageToTrainer] = useState("");

  useEffect(() => {
    fetchTrainer(trainerId);
  }, [trainerId]);

  useEffect(() => {
    fetchOpinions(trainerId, currentOpinionsPage);
  }, [trainerId, currentOpinionsPage]);

  useEffect(() => {
    fetchImage(trainerId);
  }, [trainerId]);

  const handleSubmit = async () => {
    if (!messageToTrainer.trim()) {
      message.warning("Wiadomość nie może być pusta.");
      return;
    }
  };

  return trainerLoading ? (
    <div className="flex justify-center items-center h-96">
      <Spin size="large" />
    </div>
  ) : (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 dark:text-white mt-6">
        {imgLoading ? (
          <div className="flex justify-center items-center h-96 col-span-1 sm:col-span-1">
            <Spin size="large" />
          </div>
        ) : (
          <div className="relative w-[90%] aspect-[4/3] mx-auto">
            <img
              src={img}
              alt="Trainer image"
              className="absolute inset-0 w-full h-full object-cover rounded-xl object-top"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex flex-col gap-4 px-2">
          <div className="text-xl font-bold">
            {trainer?.name} {trainer?.last_name}
            <span className="ml-2 text-yellow-500">
              ⭐ {trainer?.mean_of_stars}
            </span>
          </div>

          <div>
            <p className="font-semibold">Opis:</p>
            <p className="italic text-gray-500 dark:text-gray-300">
              {trainer?.description || "Brak opisu"}
            </p>
          </div>

          <div>
            <p className="font-semibold">Dostępne miasta:</p>
            <p>
              {[...new Set(trainer?.locations?.map((loc) => loc.city))].join(
                ", ",
              ) || "Brak miast"}
            </p>
          </div>

          <div>
            <p className="font-semibold">Specjalizacje:</p>
            <p>{trainer?.types?.join(", ") || "Brak specjalizacji"}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 w-[95%] md:w-[50%] m-auto dark:text-white ">
        <a>Zapytaj o współpracę, wyślij wiadomość do trenera: </a>
        <Input.TextArea
          value={messageToTrainer}
          onChange={(e) => setMessageToTrainer(e.target.value)}
          rows={5}
          placeholder="Witam,szukam trenera personalnego do współpracy, który pomoże mi..."
        />
        <div className="flex justify-center mt-3">
          <Button
            type="primary"
            onClick={handleSubmit}
            className="bg-green-500 text-white w-[200px]"
          >
            Wyślij wiadomość
          </Button>
        </div>
      </div>

      <p className="mt-10 mb-5 font-semibold dark:text-white">Opinie:</p>
      {opinionsLoading ? (
        <div className="flex my-10">
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
