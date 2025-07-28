import { useState } from "react";
import { useParams } from "react-router-dom";

export default function TrainingPlanDetailsPage() {
  const { trainingPlanId } = useParams<{ trainingPlanId: string }>();

  return (
    <div className="p-6">
      <p className="text-gray-600 mt-2">Plan ID: {trainingPlanId}</p>
    </div>
  );
}
