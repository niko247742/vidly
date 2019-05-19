import React from 'react';
import './App.css';
//import Movies from './components/movies'
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import NavBar from './components/NavBav';
import Movies from './components/movies';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';

function App() {
  return (
    <div className="App container">
      <NavBar />
      <Switch>
        <Route path = "/login" component = { LoginForm } />
        <Route path = "/movies/:id" component = { MovieForm } />
        <Route path = "/movies" component = { Movies }/>
        <Route path = "/customers" component = { Customers }/>
        <Route path = "/rentals" component = { Rentals }/>
        <Route path = "/not-found" component = { NotFound } />
        <Redirect from = "/" exact to = "/movies" />
        <Redirect to = "/not-found" />
      </Switch>    
    </div>
  );
}

export default App;
