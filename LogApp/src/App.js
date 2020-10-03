import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/signup' exact render={() => <SignupForm />} />
        <Route path='/login' exact render={() => <LoginForm />} />

      </Switch>
    </Router>
  )
}

export default App

