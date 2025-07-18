import {
  TrainerBackendContent,
  TrainerLocation,
  TrainerProfileContentProps,
} from "@/components/Elements/ProfileContent/DataTypes.ts";
import { ChangeEvent, useEffect, useState } from "react";
import api from "@/lib/api.tsx";
import { toast } from "react-toastify";
import { Button, Input, Select } from "antd";

export default function TrainerProfileContent({
  trainerId,
}: TrainerProfileContentProps) {
  const [trainer, setTrainer] = useState<TrainerBackendContent | null>(null);
  const [locations, setLocations] = useState<TrainerLocation[]>([]);
  const formatLabel = (loc: TrainerLocation) => `${loc.name} – ${loc.district}`;
  const [trainerFormData, setTrainerFormData] = useState({
    description: trainer?.description || "",
    locations: trainer?.locations || [],
    types: trainer?.types || [],
  });

  const [loading, setLoading] = useState(false);
  const [availableTrainerTypes, setAvailableTrainerTypes] = useState<string[]>(
    [],
  );

  useEffect(() => {
    if (!trainerId) return;

    const fetchData = async () => {
      try {
        const [trainerResponse, typesResponse, locationsResponse] =
          await Promise.all([
            api.get(`/trainer/${trainerId}`),
            api.get("/trainer-type"),
            api.get("/city/"),
          ]);
        setTrainer(trainerResponse.data);
        setTrainerFormData({
          description: trainerResponse.data.description,
          locations: trainerResponse.data.locations,
          types: trainerResponse.data.types,
        });
        setAvailableTrainerTypes(typesResponse.data);
        setLocations(locationsResponse.data);
      } catch (error: any) {
        toast.error("Wystąpił błąd podczas pobierania danych!");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTrainerFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      console.log("data: ", trainerFormData);
      await api.patch(`/trainer/${trainer?.user_id}`, trainerFormData);
      toast.success("Dane zostały zaktualizowane.");
    } catch (error: any) {
      toast.error("Nie udało się zapisać zmian.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <label className="font-semibold">Opis:</label>
        <Input.TextArea
          name="description"
          value={trainerFormData.description}
          onChange={handleChange}
          rows={5}
        />
      </div>
      <div>
        <label className="font-semibold">Typy trenera:</label>
        <Select
          mode="multiple"
          placeholder="Wybierz typy trenera"
          value={trainerFormData.types}
          onChange={(value) =>
            setTrainerFormData((prev) => ({ ...prev, types: value }))
          }
          options={availableTrainerTypes.map((type) => ({
            label: type,
            value: type,
          }))}
          className="w-full mt-2"
        />
      </div>

      <div>
        <label className="font-semibold">Lokalizacje:</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Wybierz lokalizacje"
          value={trainerFormData.locations.map(formatLabel)}
          onChange={(selectedLabels) => {
            const selectedLocations = locations.filter((loc) =>
              selectedLabels.includes(formatLabel(loc)),
            );
            setTrainerFormData((prev) => ({
              ...prev,
              locations: selectedLocations,
            }));
          }}
          options={locations.map((loc) => ({
            label: formatLabel(loc),
            value: formatLabel(loc),
          }))}
        />
      </div>

      <Button
        type="primary"
        loading={loading}
        onClick={handleSave}
        className="mt-4 self-start"
      >
        Zapisz zmiany
      </Button>
    </div>
  );
}
