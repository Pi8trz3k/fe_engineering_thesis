import { useParams } from "react-router-dom";
import TrainerProfilePage from "./TrainerProfilePage.tsx";

export default function TrainerProfilePageWrapper() {
  const { trainerId } = useParams();

  const parsedId = trainerId ? parseInt(trainerId) : undefined;
  if (!parsedId) return <div>Invalid trainer ID</div>;

  return <TrainerProfilePage trainerId={parsedId} />;
}
