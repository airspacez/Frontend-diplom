import { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";

function PrivateRoute({ children, ...rest }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await AuthService.isUserLoggedIn();
      setIsUserLoggedIn(data);
    }
    fetchData();
  }, [isUserLoggedIn]);

  if (isUserLoggedIn === null) {
    // Пока идёт проверка авторизации, отображаем заглушку
    return null;
  }

  return isUserLoggedIn ? <>{children}</> : <Navigate to="/auth" />;
}

export default PrivateRoute;