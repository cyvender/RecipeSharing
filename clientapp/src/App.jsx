import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Login from './Pages/LogIn';
import { ContextComponent } from './Context';
import PrivateRoute from './components/PrivateRoute';
import AddRecipe from './Pages/AddRecipe';
import Categories from './Pages/Categories';
import Logout from './Pages/Logout';

const App = () => {
  return (
    <ContextComponent>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/addrecipe' element={
            <PrivateRoute>
              <AddRecipe />
            </PrivateRoute>} />
          <Route path='/categories' element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </Layout>
    </ContextComponent>

  );
}

export default App;