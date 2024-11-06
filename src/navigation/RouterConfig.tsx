import { Routes, Route } from 'react-router-dom';
import { HOME, SERVER_ERROR } from './CONSTANT';
import ServerError from 'pages/error/ServerError';
import NotFound from 'pages/error/NotFound';
import Home from 'pages/Home';
import CategoryTasks from 'pages/CategoryTasks';
import MainLayout from 'layouts/MainLayout';

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path={HOME} element={<Home />} />
        <Route path="category/:name" element={<CategoryTasks />} />
        <Route path="/users" element={<div>users list works!</div>} />
        <Route path="/users/:id" element={<div>single user worksdd</div>} />
        <Route path="/article" element={<div>articles list works!</div>} />
      </Route>
      <Route path={SERVER_ERROR} element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
