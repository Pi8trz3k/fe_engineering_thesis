import { FrontendUser } from "@/providers/DataTypes/DataProviderTypes.ts";

export default function UserProfileCard({ user }: { user: FrontendUser }) {
  return (
    <>
      <table></table>
      {user.userID} {user.lastName} {user.email} {user.phoneNumber}{" "}
      {user.isAdmin ? "admin" : null} {user.type} {"Email"}{" "}
      {user.isMailVerified ? "potwierdzony" : "niepotwierdzony"}
    </>
  );
}
