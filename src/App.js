import './App.css';
import { useState } from "react"
import Header2 from './components/header2/header2';
import ProfilePage from './pages/profile_page';
import UserProfile from './pages/user_another_profile';
import GameDetails from './pages/game_details';
import { Route } from "react-router-dom"
import ArhivePage from './pages/archive_page';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthPage from './pages/auth_page';
import ForgetPasswordPage from './pages/forget_password';
import { useLocation } from "react-router-dom"
import AuthService from "./Services/AuthService"
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RatingPage from './pages/rating_page';
import AdminPage from './pages/admin_page';
import EventPage from './pages/event_page';
import EventsArchivePage from './pages/events_archive_page';
import AcceptTokenPage from './pages/accept_token';
import ChangePasswordPage from './pages/forget_change_password';

function App() {
  const location = useLocation();


  return (

    <div className="App">

      {(location.pathname === '/auth') ||(location.pathname === '/forbidden') || (location.pathname === '/forget_password') || (location.pathname === '/accept_token') || (location.pathname === '/forget_change_password') ? null : <Header2 />}
      
      <Routes>
       <Route exact path="/games/:gameId" element={<GameDetails/>} />
        <Route exact path="/profile/me" element={
        <PrivateRoute>
        <ProfilePage />
       </PrivateRoute>
        } />
        <Route exact path="/profile/:userId" element={
        <PrivateRoute>
        <UserProfile />
       </PrivateRoute>
        } />

      <Route exact path="/rating" element={
        <PrivateRoute>
        <RatingPage />
       </PrivateRoute>
        } />
      <Route exact path="/admin" element={
        <PrivateRoute roles={["ROLE_ADMIN"]}>
          <AdminPage />
       </PrivateRoute>
        } />  
        <Route exact path="/archive" element={
          <PrivateRoute>
            <ArhivePage />
          </PrivateRoute>
        } />
        <Route exact path="/events/:eventId" element={
          <PrivateRoute>
            <EventPage />
          </PrivateRoute>
        } />
        <Route exact path="/events" element={
          <PrivateRoute>
            <EventsArchivePage />
          </PrivateRoute>
        } />
        <Route exact path="/auth" element={<AuthPage />} />
        <Route exact path="/forbidden" element={<>ЗАПРЕЩЕНО</>} />
        <Route exact path="/forget_password" element={<ForgetPasswordPage />} />
        <Route exact path="/accept_token" element={<AcceptTokenPage />} />
        <Route exact path="/forget_change_password" element={<ChangePasswordPage />} />
      </Routes>

    </div>
  );
}

export default App;
