import { UserProfileContentProps } from "@/components/Elements/ProfileContent/DataTypes.ts";
import CommonProfileContent from "@/components/Elements/ProfileContent/CommonProfileContent.tsx";

export default function UserProfileContent({ user }: UserProfileContentProps) {
  if (!user) return null;

  return (
    <CommonProfileContent
      user_id={user.user_id}
      name={user.name}
      last_name={user.last_name}
      phone_number={user.phone_number}
      email={user.email}
      password={user.password}
      is_mail_verified={user.is_mail_verified}
      status={user.status}
    />
  );
}
