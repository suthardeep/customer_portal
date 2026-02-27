import { useAuth } from "@/features/auth/hooks/useAuth";

const ClientUserName = () => {
  const { user } = useAuth();
  return <div>{user?.fullName ?? ""}</div>;
};

export default ClientUserName;
