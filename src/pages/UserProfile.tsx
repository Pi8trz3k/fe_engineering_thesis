import { UseAuth } from "@/hooks/useAuth.tsx";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { usePicture } from "@/utils/PictureProvider.tsx";
import { Spin } from "antd";
import UserProfileContent from "@/components/Elements/ProfileContent/UserProfileContent.tsx";
import TrainerProfileContent from "@/components/Elements/ProfileContent/TrainerProfileContent.tsx";

export type UserBackend = {
  user_id: number;
  name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  is_mail_verified: boolean;
  status: string;
  type: string;
  is_admin: boolean;
};

export default function UserProfile() {
  const { role } = UseAuth();
  const [userId, setUserId] = useState();
  const { img, imgLoading, fetchImage } = usePicture();
  const [user, setUser] = useState<UserBackend>();

  useEffect(() => {
    const fetchActualUser = async () => {
      try {
        const response = await api.get("/token/me");
        console.log("response", response.data);
        setUserId(response.data.user_id);
        setUser(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchActualUser();
  }, []);

  useEffect(() => {
    if (userId !== undefined) {
      fetchImage(userId);
    }
  }, [userId]);

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
      </div>
    </>
  );
}
