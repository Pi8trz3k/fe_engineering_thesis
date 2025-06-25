import { Button, Result } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function EmailConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        toast.error("Wystąpił błąd podczas potwierdzenia emaila");
        navigate("/");
      }
    };

    confirmEmail();
  }, [token]);

  return (
    <>
      <div>
        <h1 className="dark:text-white">EmailConfirmationPage</h1>
        <p>{token}</p>
        <Result
          status="success"
          title="Sukces!"
          subTitle="Twój adres e-mail został pomyślnie potwierdzony."
          extra={[
            <Button type="primary" onClick={() => navigate("/")} key="home">
              Przejdź do strony głównej
            </Button>,
          ]}
        />
      </div>
    </>
  );
}
