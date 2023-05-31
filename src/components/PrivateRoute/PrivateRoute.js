import { useEffect, useState } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import AuthService from "../../Services/AuthService";

function PrivateRoute({ children, roles,  ...rest }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [userRole, setUserRole] = useState(null); 
  const location = useLocation();
  
  useEffect(() => {
    async function fetchData() {
      const data = await AuthService.isUserLoggedIn();
      setIsUserLoggedIn(data);
      console.log("authenticated: " + data);

      if (data) {
        const role = await AuthService.getUserRole(); // Получить роль пользователя из сервиса аутентификации
        setUserRole(role);
       
      }
   
    }
    fetchData();
   
  }, [location.pathname]);

  if (isUserLoggedIn === null) {
    // Пока идёт проверка авторизации, отображаем заглушку
    return null;
  }

    if (isUserLoggedIn && roles && userRole) {
      if (roles.includes(userRole.description)===false) { // Если пользователь авторизован, но его роль не разрешена для доступа, перенаправляем на страницу запрета доступа
        return <Navigate to="/forbidden" />;
      }
    }

  return isUserLoggedIn ? <>{children}</> : <Navigate to="/auth" />;
}

export default PrivateRoute;