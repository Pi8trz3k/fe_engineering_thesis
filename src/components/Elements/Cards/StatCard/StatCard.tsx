interface statCardProps {
  cardText: string;
  value: number | undefined;
}

export default function StatCard({ cardText, value }: statCardProps) {
  return (
    <div className="p-8 bg-white w-50 mx-5 my-2 md:my-0 dark:bg-gray-300 rounded-md shadow-lg text-center">
      <h3 className="text-lg font-semibold">{cardText}</h3>
      <p className="text-2xl font-semibold text-green-600">{value}</p>
    </div>
  );
}
