import { UseAuth } from "@/hooks/useAuth.tsx";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { usePicture } from "@/utils/PictureProvider.tsx";
import { Spin } from "antd";
import UserProfileContent from "@/components/Elements/ProfileContent/UserProfileContent.tsx";
import TrainerProfileContent from "@/components/Elements/ProfileContent/TrainerProfileContent.tsx";
import ChangePasswordSection from "@/components/Elements/ProfileContent/ChangePasswordContent.tsx";
import { UserBackend } from "@/components/Elements/ProfileContent/DataTypes.ts";
import { toast } from "react-toastify";

export default function UserProfile() {
  const { role } = UseAuth();
  const { img, imgLoading, fetchImage } = usePicture();
  const [user, setUser] = useState<UserBackend>();

  useEffect(() => {
    const fetchActualUser = async () => {
      try {
        const response = await api.get("/token/me");
        console.log("response", response.data);
        setUser(response.data);
      } catch (error: any) {
        toast.error("Wystąpił błąd podczas pobierania danych!");
        console.log(error);
      }
    };

    fetchActualUser();
  }, []);

  useEffect(() => {
    if (user?.user_id !== undefined) {
      fetchImage(user.user_id);
    }
  }, [user?.user_id]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 dark:text-white mt-6">
        {imgLoading ? (
          <div className="flex justify-center items-center h-96 col-span-1 sm:col-span-1">
            <Spin size="large" />
          </div>
        ) : (
          <div className="relative w-[80%] lg:w-[70%] aspect-[4/3] mx-auto">
            <img
              src={img}
              alt="Trainer image"
              className="absolute inset-0 w-full h-full object-cover rounded-xl object-top"
              loading="lazy"
            />
          </div>
        )}

        {role === "user" ? (
          <UserProfileContent user={user} />
        ) : (
          <TrainerProfileContent />
        )}
        <div className="flex items-center justify-center">
          <ChangePasswordSection />
        </div>
      </div>
    </>
  );
}
