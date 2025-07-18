import { TrainerCardProps } from "@/pages/user/DataTypes/TrainersPageTypes.ts";
import { useNavigate } from "react-router-dom";
import { usePicture } from "@/utils/PictureProvider.tsx";
import { Spin } from "antd";
import { useEffect } from "react";

export default function TrainerCard({
  trainerId,
  name,
  lastName,
  meanOfStars,
  opinionsCount,
  locations,
  types,
}: TrainerCardProps) {
  const navigate = useNavigate();
  const { img, imgLoading, fetchImage } = usePicture();

  const getTypes = () => {
    if (!types || types.length === 0) return "Brak specjalizacji.";

    let text = "Specjalizacje: ";
    if (types.length > 0) {
      for (let i = 0; i < types.length; i++) {
        text = text + types[i];
        if (i == types.length - 1) {
          text = text + ".";
        } else {
          text = text + ", ";
        }
      }
      return text;
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchImage(trainerId);
  }, [trainerId]);

  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-4 transition-transform hover:scale-105">
      {imgLoading ? (
        <div className="flex justify-center items-center h-96 ">
          <Spin size="large" />
        </div>
      ) : (
        <div className="relative w-full aspect-[4/3]">
          <img
            src={img}
            alt="trener image"
            className="absolute inset-0 w-full h-full object-cover rounded-xl object-top"
            loading="lazy"
          />
        </div>
      )}

      <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
        {name} {lastName}
      </h3>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {[...new Set(locations.map((loc) => loc.name))].join(", ")}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">{getTypes()}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-green-project dark:text-green-400 text-sm">
          {opinionsCount
            ? `⭐ ${meanOfStars} (Opinie: ${opinionsCount})`
            : `Brak opinii`}
        </span>
        <button
          className="text-sm text-white bg-green-project px-3 py-1 rounded hover:bg-green-600 hover:cursor-pointer"
          onClick={() => navigate(`/trainers/${trainerId}`)}
        >
          Zobacz profil
        </button>
      </div>
    </div>
  );
}
