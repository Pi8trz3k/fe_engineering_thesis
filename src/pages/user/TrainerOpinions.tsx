import { useEffect, useState } from "react";
import api from "@/lib/api.tsx";
import { UserBackend } from "@/components/Elements/ProfileContent/DataTypes.ts";
import { toast } from "react-toastify";
import TrainersOpinionCard from "@/components/Elements/Cards/TrainerOpinionCard/TrainersOpinionCard.tsx";
import { Spin } from "antd";

type OpinionBackend = {
  opinion_id: number;
  user_id: number;
  trainer_id: number;
  description: string;
  number_of_stars: number;
};

type Opinion = {
  opinion_id?: number;
  description: string | undefined;
  number_of_stars: number;
  isEditing: boolean;
  hasOpinion: boolean;
};

type Trainer = {
  user_id: number;
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  description: string;
  mean_of_stars: number;
  license_id: number;
  is_admin: boolean;
  is_mail_verified: boolean;
  status: string;
  type: string;
};

export default function TrainerOpinions() {
  const [trainersWithUserRelation, setTrainersWithUserRelation] = useState<
    Trainer[]
  >([]);
  const [user, setUser] = useState<UserBackend>();
  const [opinions, setOpinions] = useState<Record<number, Opinion>>({});

  useEffect(() => {
    const fetchActualUser = async () => {
      try {
        const response = await api.get("/token/me");
        setUser(response.data);
      } catch (error: any) {
        console.log(error);
        toast.error("Błąd podczas pobierania użytkownika.");
      }
    };
    fetchActualUser();
  }, []);

  useEffect(() => {
    const fetchTrainers = async () => {
      if (!user) return;
      try {
        const response = await api.get(
          `/user/get-user-trainers/${user.user_id}`,
        );
        setTrainersWithUserRelation(response.data);
      } catch (error: any) {
        console.log(error);
        toast.error("Błąd przy pobieraniu trenerów.");
      }
    };
    fetchTrainers();
  }, [user]);

  useEffect(() => {
    const fetchOpinions = async () => {
      if (!user || trainersWithUserRelation.length === 0) return;

      try {
        const opinionPromises = trainersWithUserRelation.map(
          async (trainer) => {
            try {
              const res = await api.get<OpinionBackend>(
                `/opinion/get-by-user-and-trainer/${user.user_id}/${trainer.user_id}`,
              );
              return {
                trainerId: trainer.user_id,
                opinion: {
                  opinion_id: res.data.opinion_id,
                  description: res.data.description,
                  number_of_stars: res.data.number_of_stars,
                  isEditing: false,
                  hasOpinion: true,
                },
              };
            } catch {
              return {
                trainerId: trainer.user_id,
                opinion: {
                  description: "",
                  number_of_stars: 0,
                  isEditing: true,
                  hasOpinion: false,
                },
              };
            }
          },
        );

        const opinionsArray = await Promise.all(opinionPromises);
        const loadedOpinions: Record<number, Opinion> = {};
        opinionsArray.forEach(({ trainerId, opinion }) => {
          loadedOpinions[trainerId] = opinion;
        });
        setOpinions(loadedOpinions);
      } catch (error: any) {
        console.log(error);
        toast.error("Błąd przy pobieraniu opinii.");
      }
    };
    fetchOpinions();
  }, [trainersWithUserRelation, user]);

  const handleNumberOfStarsChange = (
    trainerId: number,
    numberOfStars: number,
  ) => {
    setOpinions((prev) => ({
      ...prev,
      [trainerId]: { ...prev[trainerId], number_of_stars: numberOfStars },
    }));
  };

  const handleDescriptionChange = (trainerId: number, description: string) => {
    setOpinions((prev) => ({
      ...prev,
      [trainerId]: { ...prev[trainerId], description },
    }));
  };

  const toggleEdit = (trainerId: number) => {
    setOpinions((prev) => ({
      ...prev,
      [trainerId]: {
        ...prev[trainerId],
        isEditing: !prev[trainerId].isEditing,
      },
    }));
  };

  const handleSaveOpinion = async (trainerId: number) => {
    const opinion = opinions[trainerId];
    if (!opinion.description || opinion.number_of_stars === 0 || !user) {
      toast.warning("Uzupełnij treść i ocenę.");
      return;
    }

    try {
      if (opinion.hasOpinion && opinion.opinion_id) {
        await api.patch(`/opinion/${opinion.opinion_id}`, {
          description: opinion.description,
          number_of_stars: opinion.number_of_stars,
        });
      } else {
        const res = await api.post(`/opinion`, {
          trainer_id: trainerId,
          description: opinion.description,
          number_of_stars: opinion.number_of_stars,
        });

        const createdOpinion = res.data;

        setOpinions((prev) => ({
          ...prev,
          [trainerId]: {
            ...prev[trainerId],
            opinion_id: createdOpinion.opinion_id,
            hasOpinion: true,
          },
        }));
      }

      toast.success("Opinia została zapisana!");

      setOpinions((prev) => ({
        ...prev,
        [trainerId]: {
          ...prev[trainerId],
          isEditing: false,
        },
      }));
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.warning("Błąd! Twoja relacja musi zostać najpierw potwierdzona");
      } else {
        console.log(error);
        toast.error("Błąd podczas zapisywania opinii.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 pr-4 pt-4">
      {trainersWithUserRelation.map((trainer) => {
        const opinion = opinions[trainer.user_id];

        if (!opinion) {
          return (
            <div key={trainer.user_id} className="justify-center text-center">
              <Spin size="large" />
            </div>
          );
        }

        return (
          <TrainersOpinionCard
            key={trainer.user_id}
            trainer={trainer}
            opinion={opinion}
            onChangeDescription={handleDescriptionChange}
            onChangeStars={handleNumberOfStarsChange}
            onSave={handleSaveOpinion}
            onToggleEdit={toggleEdit}
          />
        );
      })}
    </div>
  );
}
