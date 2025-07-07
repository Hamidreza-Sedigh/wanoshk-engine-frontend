import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './pages/Login/index';  // or  './pages/Login/index'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard/index';
import EventsPage from './pages/EventsPage';
import MyRegistrations from './pages/MyRegistrations';
import SourcePage from './pages/sourcesPage';
import AllSources from './pages/sourcesPage/allSources';
import ContactUs  from './pages/ContactUs';
import NewsPage from './pages/NewsPage';
import TopNav from './components/TopNav';

export default function Routes(){
    return(
        <BrowserRouter>
            <TopNav/>
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/myregistrations' exact component={MyRegistrations} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/events' component={EventsPage} />
                <Route path='/addSource' component={SourcePage} />
                <Route path='/sources' component={AllSources} />
                <Route path='/contactus' component={ContactUs} />
                <Route path="/news/:id" component={NewsPage} />
            </Switch>
        </BrowserRouter>
    );
}