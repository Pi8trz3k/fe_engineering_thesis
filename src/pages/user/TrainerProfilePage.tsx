import emptyProfileCard from "@/assets/emptyProfileCard.avif";
import { TrainerProfilePageProps } from "@/pages/user/DataTypes/TrainersPageTypes.ts";

export default function TrainerProfilePage({
  trainerId,
}: TrainerProfilePageProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="relative w-[70%] aspect-[4/3] mx-auto">
          <img
            src={emptyProfileCard}
            alt="trener image"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            loading="lazy"
          />
        </div>
        <div className="bg-green-300">ASKNDajsndajsndjasnd </div>
        <div className="bg-yellow-300">ASKNDajsndajsndjasnd </div>
        <div className="bg-red-300">ASKNDajsndajsndjasnd </div>
        <div className="bg-brown-300">{trainerId} </div>
      </div>
    </>
  );
}
