import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import authService from "../../services/user.services";
import useSnackbar from "../../hooks/useSnackbar";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const { user } = useAuth();
  const [checking, setChecking] = useState(true);
  const [isValid, setIsValid] = useState<boolean>(!!user);
  const { showMessage } = useSnackbar();

  useEffect(() => {
    const verifySession = async () => {
      if (user) {
        setIsValid(true);
        setChecking(false);
        return;
      }
      try {
        setChecking(true);
        const isSession = await authService.checkSession();
        if (isSession.status === 200) {
          setIsValid(true);
        } else if (isSession.status === 401) {
          setIsValid(false);
        }
      } catch {
        setIsValid(false);
        showMessage("Error al verificar la sesión", "error");
      } finally {
        setChecking(false);
      }
    };
    verifySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) {
    return null;
  }

  if (!isValid) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
