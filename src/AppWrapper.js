import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import App from "./App";
import Login from "./pages/Login";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Access from "./pages/Access";
import SignUP from './pages/SignUP'
import LandingPage from './pages/LandingPage';
import TermsAndCond from './pages/TermsAndCond';

class AppWrapper extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0)
		}
	}

	render() {
		switch (this.props.location.pathname) {
			case "/":
				return <Route exact path="/" component={LandingPage} />
			case "/Login":
				return <Route exact path="/Login" component={Login} />

			case "/SignUp":
				return <Route exact path="/SignUp" component={SignUP} />
			case "/TermsAndCond":
				return <Route exact path="/TermsAndCond" component={TermsAndCond} />
			case "/error":
				return <Route exact path="/error" component={Error} />
			case "/notfound":
				return <Route exact path="/notfound" component={NotFound} />
			case "/access":
				return <Route exact path="/access" component={Access} />
			default:
				return <App />;
		}
	}
}

export default withRouter(AppWrapper);