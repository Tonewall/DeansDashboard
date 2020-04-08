import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import queryString from 'query-string'
import DataView from './components/Data';
import Home from './components/Home'
import FullReport from './components/FullReport'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css'
import {NotificationContainer} from 'react-notifications'
import Cookies from 'js-cookie'

import {server} from './config'

class App extends Component {

  constructor(props) {
    super()
    this.state = 
      {
        verifying_user: true,
        logging_in: false,
        authorized: false
      }
  }

  componentDidMount() {
    fetch(server+'/verify_user',
      {
        headers:{'Content-Type' : 'application/json'},
        credentials: 'include'  // include cookies
      }
    )
    .then(function(response) {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response
    })
    .then(results => {
      results.json().then(data => {
        if(data.authorized)
        {
          // user is logged in and authorized to access
          this.setState({verifying_user: false, logging_in: false, authorized: true})
        }
        else
        {
          if(data.logged_in)
          {
            // user is logged in, but not authorized to access
            this.setState({verifying_user: false, logging_in: false, authorized: false})
          }
          else
          {
            // user is not logged in
            this.setState({verifying_user: false, logging_in: true, authorized: false})

            var appURL=window.location.protocol+'//'+window.location.host
            console.log(appURL)
            // check if the url is holding SSO ticket
            var values = queryString.parse(window.location.search)
            if(values.ticket===undefined)
            {
              Cookies.set('savedURL', window.location.href)
              // couldn't find ticket, redirect to cas login page
              window.location.href = 'https://login.gatech.edu/cas/login?service='+encodeURIComponent(appURL)
            }
            else
            {
              // ticket found, need to validate it
              fetch(server+'/validate_ticket',
                {
                  headers:{'Content-Type' : 'application/json'},
                  method: 'post',
                  body: JSON.stringify({"service": encodeURIComponent(appURL), "ticket": values.ticket}),
                  credentials: 'include'
                }
              )
              .then(function(response) {
                if(!response.ok) {
                    throw Error(response.statusText);
                }
                return response
              })
              .then(results => {
                  results.json().then(data => {
                    if(data.success)
                    {
                      // ticket validation success, redirect to the original webpage
                      if(Cookies.get('savedURL'))
                        window.location.href = Cookies.get('savedURL');
                      else
                        window.location.href = appURL;
                    }
                    else
                    {
                      // ticket validation fail, redirect to SSO login page
                      window.location.href = 'https://login.gatech.edu/cas/login?service='+encodeURIComponent(appURL)
                    }
                })
              })
              .catch(err => console.error(err))
            }
          }
        }
      })
    })
    .catch(err => console.error(err))
  }

  render() {
    return (
      this.state.authorized
      ?
      <div className="mainBody">
        <NotificationContainer/>
        <Router>
          <Switch>
              <Route exact path="/Data" component={DataView} />
              <Route exact path="/full-report/:incidentNumber" component={FullReport} />
              <Route path="/" component={Home}/>
          </Switch>
        </Router>
      </div>
      :
      (
        (this.state.verifying_user || this.state.logging_in)
        ?
        <div></div>
        :
        <div>Not authorized. Please contact GTPD OIT for authorization.</div>
      )
    );
  }
}

export default App;
