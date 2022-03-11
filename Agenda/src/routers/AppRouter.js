import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startCheckLogin } from '../actions/auth';


import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { LoginScreen } from '../components/auth/LoginScreen';
import { AgendaScreen } from '../components/Agenda/AgendaScreen';



export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth);


    useEffect(() => {
      dispatch( startCheckLogin() );
    }, [dispatch])
    

    if ( checking ) {
      return (<h5>Espere...</h5>);
    }

    return (
      <Router>
          <div>
              <Switch>

                  <PublicRoute 
                      exact 
                      path="/login" 
                      component={ LoginScreen }
                      isAuthenticated={ !!uid }
                  />

                  <PrivateRoute 
                      exact 
                      path="/" 
                      component={ AgendaScreen } 
                      isAuthenticated={ !!uid }
                  />

                  <Redirect to="/" />   
              </Switch>
          </div>
      </Router>
  )
}
