import { Routes, Route } from 'react-router-dom';
import { HOME, SERVER_ERROR } from './CONSTANT';
import ServerError from 'pages/error/ServerError';
import NotFound from 'pages/error/NotFound';
import Home from 'pages/Home';
import MainLayout from 'layouts/MainLayout';
import UsersListContainer from 'pages/UsersList';

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path={HOME} element={<Home />} />
        <Route path="/users" element={<UsersListContainer />} />
        <Route path="/users/:id" element={<div>single user worksdd</div>} />
        <Route path="/article" element={<div>articles list works!</div>} />
      </Route>
      <Route path={SERVER_ERROR} element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
