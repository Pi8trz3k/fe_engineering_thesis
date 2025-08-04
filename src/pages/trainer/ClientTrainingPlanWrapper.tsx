import { useParams } from "react-router-dom";
import ClientTrainingPlanPage from "@/pages/trainer/ClientTrainingPlanPage.tsx";

export default function ClientTrainingPlanWrapper() {
  const { clientId } = useParams();

  const parsedId = clientId ? parseInt(clientId) : undefined;
  if (!parsedId) return <div>Invalid trainer ID</div>;

  return <ClientTrainingPlanPage clientId={parsedId} />;
}
