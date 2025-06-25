import { Button, Result } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/api.tsx";
import { statusTypes } from "@/pages/DataTypes/EmailConfirmationPage.ts";

export default function EmailConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<statusTypes>("pending");
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const confirmEmail = async () => {
      const actualUser = await api.get("/token/me");

      if (actualUser.data.is_mail_verified) {
        toast.success("Twój email jest już potwierdzony");
        navigate("/");
      }

      if (!token) {
        toast.error("Wystąpił błąd podczas potwierdzenia emaila");
        navigate("/");
        setStatus("error");
      }
      try {
        await api.post(`/email-service/confirm-email?token=${token}`, {
          headers: { "Content-Type": "application/json" },
        });

        setStatus("success");
      } catch (error: any) {
        const message = error.response.data.detail;
        console.error(message);
        setStatus("error");
        toast.error("Wystąpił błąd");
      }
    };

    confirmEmail();
  }, [token]);

  const sendEmailAgain = async () => {
    try {
      const actualUser = await api.get("/token/me");
      try {
        await api.post(
          `/email-service/send-first-email`,
          { email: actualUser.data.email },
          {
            headers: { "Content-Type": "application/json" },
          },
        );
        setDisabled(true);
      } catch (error: any) {
        const message = error.response.data.detail;
        console.log("error message: ", message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Wystąpił błąd podczas pobierania danych");
    }
  };

  return (
    <>
      <div>
        {status === "success" ? (
          <Result
            status="success"
            title="Sukces!"
            subTitle="Twój adres e-mail został pomyślnie potwierdzony."
            extra={[
              <Button type="primary" onClick={() => navigate("/")} key="home">
                Przejdź do strony głównej
              </Button>,
            ]}
            className="dark:text-white"
          />
        ) : (
          <Result
            status="error"
            title="Wystąpił błąd!"
            subTitle="Wystąpił błąd podczas potwierdzenia adresu email.
            Spróbuj ponownie, kliknij przycisk aby wysłać nową wiadomość na twoją skrzynkę!"
            extra={[
              <Button
                type="default"
                onClick={() => sendEmailAgain()}
                key="resend"
                disabled={disabled}
              >
                Wyślij email ponownie
              </Button>,
              <Button type="primary" onClick={() => navigate("/")} key="home">
                Przejdź do strony głównej
              </Button>,
            ]}
            className="dark:text-white"
          />
        )}
      </div>
    </>
  );
}
