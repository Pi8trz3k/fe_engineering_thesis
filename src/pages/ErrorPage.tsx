interface ErrorPageProps {
  title: string;
  message: string;
}

export default function ErrorPage({ title, message }: ErrorPageProps) {
  return (
    <div className="p-6 text-center">
      <h1 className="font-bold">{title}</h1>
      <p>{message}</p>
    </div>
  );
}
