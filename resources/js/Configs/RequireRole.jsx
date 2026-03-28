import { useMatches } from "react-router-dom";
import Forbidden from "../pages/errors/Forbidden";
import { useAuth } from "../contexts/AuthContext";

export default function RoleGuard({ children }) {
  const matches = useMatches();
  const { user } = useAuth();

  // Ambil minRole dari route paling dalam
  const requiredRole = matches
    .map((match) => match.handle?.minRole)
    .filter(Boolean)
    .pop();

  if (!requiredRole) return children;

  if (!user) return null; // atau loading

  if (user.role < requiredRole) {
    return <Forbidden />;
  }

  return children;
}
