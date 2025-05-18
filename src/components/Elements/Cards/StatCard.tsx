interface statCardProps {
  cardText: string;
  value: number | undefined;
}

export default function StatCard({ cardText, value }: statCardProps) {
  return (
    <div className="p-10 bg-white dark:bg-gray-300 rounded-md shadow-lg text-center">
      <h3 className="text-lg font-semibold">{cardText}</h3>
      <p className="text-2xl font-semibold text-green-600">{value}</p>
    </div>
  );
}
