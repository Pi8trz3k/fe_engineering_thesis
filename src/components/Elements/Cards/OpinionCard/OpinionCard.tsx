import { OpinionCardProps } from "@/pages/user/DataTypes/TrainersPageTypes.ts";

export default function OpinionCard({
  description,
  numberOfStars,
}: OpinionCardProps) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md transition-transform hover:scale-105  border border-green-700">
      <p className="mt-5 ml-5">⭐ {numberOfStars} </p>
      <p className="mb-3 ml-5 italic">&quot;{description}&quot;</p>
    </div>
  );
}
