import { UseAuth } from "@/hooks/useAuth.tsx";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { usePicture } from "@/utils/PictureProvider.tsx";
import { Button, Spin } from "antd";
import UserProfileContent from "@/components/Elements/ProfileContent/UserProfileContent.tsx";
import TrainerProfileContent from "@/components/Elements/ProfileContent/TrainerProfileContent.tsx";
import ChangePasswordSection from "@/components/Elements/ProfileContent/ChangePasswordContent.tsx";
import { UserBackend } from "@/components/Elements/ProfileContent/DataTypes.ts";
import { toast } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";

export default function UserProfile() {
  const { role } = UseAuth();
  const { img, imgLoading, fetchImage } = usePicture();
  const [user, setUser] = useState<UserBackend>();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchActualUser = async () => {
      try {
        const response = await api.get("/token/me");
        setUser(response.data);
      } catch (error: any) {
        toast.error("Wystąpił błąd podczas pobierania danych!");
        console.log(error);
      }
    };

    fetchActualUser();
  }, []);

  const fetchImageFunc = () => {
    if (user?.user_id !== undefined) {
      fetchImage(user.user_id);
    }
  };

  useEffect(() => {
    fetchImageFunc();
  }, [user?.user_id]);

  const handleUpload = async () => {
    if (!file) return toast.warning("Wybierz plik!");

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      await api.post("/file/upload-picture-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Zdjęcie przesłane!");
      fetchImageFunc();
    } catch (err) {
      toast.error("Błąd przy przesyłaniu zdjęcia.");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-6 dark:text-white mt-6">
      {/* Zdjęcie i dane użytkownika/trenera */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Zdjęcie + upload */}
        <div className="flex flex-col items-center gap-4 lg:w-1/2">
          {imgLoading ? (
            <div className="flex justify-center items-center h-96 w-full">
              <Spin size="large" />
            </div>
          ) : (
            <div className="relative w-[80%] aspect-[4/3]">
              <img
                src={img}
                alt="Trainer image"
                className="absolute inset-0 w-full h-full object-cover rounded-xl object-top"
                loading="lazy"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <Button onClick={handleUpload} icon={<UploadOutlined />}>
            Prześlij zdjęcie
          </Button>
        </div>

        {/* Dane użytkownika/trenera */}
        <div className="lg:w-1/2">
          <UserProfileContent user={user} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ChangePasswordSection />
        </div>

        {role === "trainer" && user?.user_id && (
          <TrainerProfileContent trainerId={user.user_id} />
        )}
      </div>
    </div>
  );
}
