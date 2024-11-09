import { Routes, Route } from 'react-router-dom';
import { HOME, SERVER_ERROR } from './CONSTANT';
import ServerError from 'pages/error/ServerError';
import NotFound from 'pages/error/NotFound';
import Home from 'pages/Home';
import MainLayout from 'layouts/MainLayout';
import UsersContainer from 'pages/Users';
import Articles from 'pages/Articles';

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path={HOME} element={<Home />} />
        <Route path="/users" element={<UsersContainer />} />
        {/* <Route path="/users/:id" element={<div>single user worksdd</div>} /> */}
        <Route path="/articles" element={<Articles />} />
      </Route>
      <Route path={SERVER_ERROR} element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
