import TrainerCard from "@/components/Elements/Cards/TrainerCard/TrainerCard.tsx";
import { useEffect, useState } from "react";
import { Pagination, Spin, Input, Select } from "antd";
import { TrainerBackend } from "@/pages/DataTypes/TrainersPageTypes.ts";
import { useFilterData, useTrainers } from "@/utils/TrainersPageData.tsx";

export default function TrainersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { cities, trainerTypes, fetchFilterData } = useFilterData();
  const { trainers, loading, totalCount, fetchTrainers, PAGE_SIZE } =
    useTrainers();
  const { Option } = Select;

  const [searchName, setSearchName] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined,
  );
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined,
  );
  const [selectedMinStars, setSelectedMinStars] = useState<number>(0);
  const starOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  useEffect(() => {
    fetchTrainers(
      currentPage,
      searchName,
      selectedCity,
      selectedType,
      selectedMinStars,
    );
  }, [currentPage, searchName, selectedCity, selectedType, selectedMinStars]);

  useEffect(() => {
    fetchFilterData();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row flex-wrap gap-3 mb-6">
        <Input
          placeholder="Szukaj po imieniu"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-xs"
        />

        <Select
          placeholder="Lokalizacja"
          value={selectedCity}
          onChange={(value) => {
            setSelectedCity(value);
            setCurrentPage(1);
          }}
          allowClear
          className="max-w-xs"
        >
          {cities.map((city) => (
            <Option key={city}>{city}</Option>
          ))}
        </Select>

        <Select
          placeholder="Specjalizacja"
          value={selectedType}
          onChange={(value) => {
            setSelectedType(value);
            setCurrentPage(1);
          }}
          allowClear
          className="max-w-xs"
        >
          {trainerTypes.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>

        <div className="flex items-center gap-2 max-w-xs">
          <span>Min. ocena:</span>
          <Select
            placeholder="Min. ocena"
            onChange={(value) => {
              setSelectedMinStars(value);
              setCurrentPage(1);
            }}
            allowClear
          >
            {starOptions.map((value) => (
              <Option key={value} value={value}>
                {value} ⭐
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer: TrainerBackend) => (
            <TrainerCard
              key={trainer.user_id}
              trainerId={trainer.user_id}
              name={trainer.name}
              lastName={trainer.last_name}
              meanOfStars={trainer.mean_of_stars}
              opinionsCount={trainer.opinions_count}
              locations={trainer.locations}
              types={trainer.types}
            />
          ))}
        </div>
      )}
      <div className="mt-6 text-center">
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={totalCount}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}
