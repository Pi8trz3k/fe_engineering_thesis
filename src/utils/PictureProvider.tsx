import { useState } from "react";
import api from "@/lib/api.tsx";
import defaultAvatar from "@/assets/defaultAvatar.avif";
import { toast } from "react-toastify";

export const usePicture = () => {
  const [img, setImg] = useState<string>();
  const [imgLoading, setImgLoading] = useState<boolean>(false);

  const fetchImage = async (trainerId: number) => {
    setImgLoading(true);

    try {
      await api
        .get(`/file/${trainerId}`, {
          responseType: "blob",
        })
        .then((res) => {
          if (res.status === 204) {
            setImg(defaultAvatar);
          } else {
            const imageBlob = res.data;
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
          }
        });
    } catch (error: any) {
      console.error(error);
      toast.error("Wystąpił błąd podczas pobierania danych");
    } finally {
      setImgLoading(false);
    }
  };

  return { img, imgLoading, fetchImage };
};
