import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const { session, user } = useAuth();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (user) return setIsValid(true);
    const verifySession = async () => {
      const isSessionValid = await session();
      setIsValid(isSessionValid);
    };
    verifySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isValid === null) {
    // Puedes mostrar un loader aquí si lo deseas
    return null;
  }

  if (isValid) {
    <Navigate to="/system/home" state={{ from: location }} replace />;
  }

  if (!isValid) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }


  return <>{children}</>;
}