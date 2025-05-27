import api from "@/lib/api.tsx";
import { toast } from "react-toastify";

export const deleteUser = async (userID: number, fetchData: () => void) => {
  try {
    const confirmed = window.confirm(
      "Czy na pewno chcesz usunąć tego użytkownika?",
    );

    if (!confirmed) return;

    await api.delete(`/user/${userID}`);

    toast.success("Użytkownik został usunięty!");
    fetchData();
  } catch (error: any) {
    console.error(error);
    toast.error("Wystąpił błąd podczas usuwania użytkownika: ", error.message);
  }
};

export const switchAdmin = async (userID: number, fetchData: () => void) => {
  try {
    await api.patch(`/user/${userID}/`);

    toast.success("Uprawnienia użytkownika zostały zmienione!");
    fetchData();
  } catch (error: any) {
    console.error(error);
    toast.error(
      "Wystąpił błąd podczas zmiany uprawnień użytkownika: ",
      error.message,
    );
  }
};

export const changeStatus = async (
  userID: number,
  status: string,
  fetchData: () => void,
) => {
  try {
    await api.patch(
      `/user/${userID}`,
      { status: status },
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    toast.success("Status użytkownika został zmieniony!");
    fetchData();
  } catch (error: any) {
    console.error(error);
    toast.error(
      "Wystąpił błąd podczas zmiany statusu użytkownika",
      error.message,
    );
  }
};
