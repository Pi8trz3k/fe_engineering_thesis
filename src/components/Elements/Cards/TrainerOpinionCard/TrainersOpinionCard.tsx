import { useEffect } from "react";
import { Avatar, Card, Rate, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { usePicture } from "@/utils/PictureProvider.tsx";

export type Opinion = {
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
};

type Props = {
  trainer: Trainer;
  opinion: Opinion;
  onChangeDescription: (trainerId: number, description: string) => void;
  onChangeStars: (trainerId: number, stars: number) => void;
  onSave: (trainerId: number) => void;
  onToggleEdit: (trainerId: number) => void;
};

export default function TrainerOpinionCard({
  trainer,
  opinion,
  onChangeDescription,
  onChangeStars,
  onSave,
  onToggleEdit,
}: Props) {
  const fullName = `${trainer.name} ${trainer.last_name}`;
  const { img, fetchImage } = usePicture();

  useEffect(() => {
    fetchImage(trainer.user_id);
  }, [trainer.user_id]);

  return (
    <Card
      className="w-full "
      styles={{
        body: {
          display: "flex",
          gap: "1rem",
          alignItems: "flex-start",
          border: "1px solid black",
          borderRadius: "7px",
        },
      }}
    >
      <div className="flex flex-col items-center gap-2 w-50">
        <Avatar src={img} size={64} alt="Trainer profile image" />
        <div className="text-center text-lg font-medium">{fullName}</div>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <Rate
          value={opinion.number_of_stars}
          onChange={(value) =>
            opinion.isEditing && onChangeStars(trainer.user_id, value)
          }
          disabled={!opinion.isEditing}
        />

        <TextArea
          rows={4}
          placeholder="Napisz swoją opinię..."
          value={opinion.description}
          onChange={(e) => onChangeDescription(trainer.user_id, e.target.value)}
          disabled={!opinion.isEditing}
          className="w-full"
        />

        <div className="flex gap-2">
          {opinion.isEditing ? (
            <Button
              type="primary"
              onClick={() => onSave(trainer.user_id)}
              disabled={!opinion.description || opinion.number_of_stars === 0}
            >
              Zapisz
            </Button>
          ) : (
            <Button onClick={() => onToggleEdit(trainer.user_id)}>
              Edytuj opinię
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
