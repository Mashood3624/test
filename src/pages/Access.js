/*eslint-disable */
import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { connect } from 'react-redux';
import { Growl } from 'primereact/growl';
import { Messages } from 'primereact/messages';
import { AuthAction } from '../store/index';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import backgroundImg from "../assets/image/loginBackGround1.jpg"
import isEmail from 'validator/lib/isEmail';
import { ProgressSpinner } from 'primereact/progressspinner';
var sectionStyle = {
	backgroundImage: `url(${backgroundImg})`,
	width: '100%',
	height: '100%',
	backgroundSize: "cover", /* or contain depending on what you want */
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	margin: "auto",
	padding: 0,
	// opacity:0.95,
	backgroundColor: 'white',
	// backgroundRepeat: "round",
	jsutifyContent: 'center',
}
var divStyle = {
	display: "inlineBlock", margin: "auto", width: "450px", height: '400px',  
}





export default class Access extends Component {

	render() {
		return (
			<div className="bg" style={{
				width: '100%',
				height: '100%',
			}}  >
				<div className="p-grid p-fluid"

					style={sectionStyle}

				>

					<div style={divStyle} >
						<div style={{margin: "auto",width: "60px", height: '60px'}} >
							<div>
								<h1 style={{fontWeight:'bold'}}>Access</h1>
							</div>
							<h1 style={{fontWeight:'bold'}}> Denied</h1>
						</div>
						<div >

							<div  >
								<div  style={{margin: "auto",width: "290px", height: '100px'}}>
									<h3>Access denied to this resource.</h3>
									<p>You don't have the necessary permission.</p>
								</div>
								<Button label="Go To Dashboard" onClick={() => { window.location = "/" }} />
							</div>
						</div>
					</div>
				</div>
			</div >


		)
	}
}

