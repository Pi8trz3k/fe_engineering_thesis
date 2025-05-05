import { useAuth } from "@/hooks/useAuth.tsx";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "@/components/Elements/Forms/LoginForm.tsx";

export default function LoginPage() {
  return <LoginForm />;
}
