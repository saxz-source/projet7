import React from 'react';
import LoginPage from '../Pages/LoginPage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUpPage from "../Pages/SignUpPage";
import HomePage from "../Pages/HomePage";
import AccountPage from '../Pages/AccountPage';
import PostMediaPage from "../Pages/PostMediaPage";
import PostTextPage from "../Pages/PostTextPage";
import ArticleWithCommentsPage from '../Pages/ArticleWithCommentsPage';
import PersonPage from '../Pages/PersonPage';
import ErrorPage from "../Pages/ErrorPage";
import ErrorServerPage from '../Pages/ErrorServerPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


function App() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/signup" component={SignUpPage}/>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/home/:postid" component={ArticleWithCommentsPage}/>
          <Route exact path="/account" component={AccountPage} />
          <Route exact path="/post/text" component={PostTextPage} />
          <Route exact path="/post/media" component={PostMediaPage} />
          <Route exact path="/post/:id" component={PersonPage}/>
          <Route exact path="/error-server" component={ErrorServerPage}/>
          <Route component={ErrorPage}/>
        </Switch>
      </BrowserRouter>
    );

  }

export default App;