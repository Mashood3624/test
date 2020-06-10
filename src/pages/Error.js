import React, {Component} from 'react';
import {Button} from "primereact/button";
import { connect } from 'react-redux';
// eslint-disable-next-line
import { AuthAction ,SessionExpiredAction} from '../store/index';
class Error extends Component {

	render() {
		return <div className="exception-body error">
			<div className="exception-text">
				<div className="exception-box">
					<span>Session</span>
				</div>
				<span> Expired</span>
			</div>
			<div className="exception-panel">
				<div className="exception-image">
					<img src="css/layout/images/exception/icon-error.png" alt="avalon-react"/>
				</div>
				<div className="exception-panel-content">
					<div className="information-text">
						<h3>Session has been expired.</h3>
						<p>Please login to continue</p>
					</div>
					<Button label="Go To Login" onClick={() => {window.location = "/"}} />
				</div>
			</div>
		</div>
	}
	componentWillMount() {
		sessionStorage.clear();
		this.props.logout();
		// this.props.SessionNull();
	}
}

const mapStateToProps = (state) => {
    return {
        user: state.AuthReducer.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(AuthAction.logout()),
        // SessionNull: () => dispatch(SessionExpiredAction.sessionNull()),
     
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Error);