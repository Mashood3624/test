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
import Loader from "react-loader-spinner";
import Navbar from "reactjs-navbar";
import "reactjs-navbar/dist/index.css";
import {
    faUsers,
    faChartPie,
   
} from "@fortawesome/free-solid-svg-icons";
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
    display: "inlineBlock", margin: "auto", width: "450px", height: '400px', backgroundColor: 'black', opacity: 0.95, borderRadius: 4
}





class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.showError = this.showError.bind(this);
        this.state = {
            loading: false,
            user: {
                Email: '',
                Password: ''
            },

        };

    }
    showError() {
        let msg = { severity: 'error', summary: 'Error Message', detail: 'Invalid Email or Password' };
        this.growl.show(msg);
        this.messages.show(msg);
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)


        // if (nextProps.superAdminLoginRes!==null) {

        // console.log("nextProps.superAdminLoginRes",nextProps.superAdminLoginRes)
        // let SuperAdmin = nextProps.superAdminLoginRes;
        // sessionStorage.setItem('SuperAdmin', JSON.stringify(SuperAdmin));
        // }
        if (nextProps.error) {
            this.showError();
            this.setState({ loading: false })

        }
        if (nextProps.isLoading) {
            // this.showError();
            // this.setState({ loading: false })
            console.log("isLoading", nextProps.isLoading)

        }
        
        if (nextProps.LoginRes) {
            
            if (nextProps.LoginRes.Res === "4VqEZY9DTCYhzzb1xxTTrGupWOd2") {
                console.log("nextProps.superAdminLoginRes", nextProps.LoginRes)
                let SuperAdmin = nextProps.LoginRes.Res;
                sessionStorage.setItem('SuperAdmin', JSON.stringify(SuperAdmin));
                window.location = "#/App"
            }
            else{
                console.log("nextProps.LoginRes", nextProps.LoginRes)
                let user = nextProps.LoginRes.Res;
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location = "#/App"
            }
           

        }

        //  if (nextProps.superAdminLoginRes) {
        //     window.location = "#/App"

        // console.log("nextProps.superAdminLoginRes",nextProps.superAdminLoginRes)
        // let SuperAdmin = nextProps.superAdminLoginRes;
        // sessionStorage.setItem('SuperAdmin', JSON.stringify(SuperAdmin));

        // }

    }


    componentWillMount() {

        let user = JSON.parse(sessionStorage.getItem('user'));
        let SuperAdmin = JSON.parse(sessionStorage.getItem('SuperAdmin'));
        if (user !== null) {
            window.location = "#/App";
        }
        if (SuperAdmin !== null) {
            window.location = "#/App";
        }
        // if (this.props.LoginRes !== null) {
        //     // window.location = "#/App"
        // }


    }
    componentDidMount() {

        // if(this.props.user && this.props.userRights){

        // 	window.location = "#/App"
        //   }
    }
    checkFields = () => {
        if (this.state.user.Email === '' || !isEmail(this.state.user.Email) || this.state.user.Email === undefined) {
            let msg = { severity: 'error', summary: 'Error Message', detail: "Invalid Email" };
            this.growl.show(msg); return false;
        }
        else if (this.state.user.Password === '' || this.state.user.Password.length < 8 || this.state.user.Password === undefined) {
            let msg = { severity: 'error', summary: 'Password Must be greater than 8 Character', detail: "Invalid Password" };
            this.growl.show(msg); return false;
        }
        else {
            return true
        }
    }
    onSubmit(e) {
        if (this.checkFields()) {
            this.setState({ loading: true })
            e.preventDefault();

            let user = {
                Email: this.state.user.Email,
                Password: this.state.user.Password,



            }

            this.props.login(user)
        }

    }


    updateProperty(property, value) {
        let user = this.state.user;
        user[property] = value;
        this.setState({ user: user });
    }
    navigateToSignUp = () => {
        this.props.history.push({
            pathname: 'SignUp'
        })
    }
    render() {
        return (
            <div className="bg" style={{
                width: '100%',
                height: '100%',
            }}  >
                 <Navbar
                    logo={"https://i.ibb.co/TwWHPFZ/logo.png"}
                    loader={<Loader type="Puff" color="#D85B5B" height={25} width={25} />}
                    isLoading={this.state.isLoading}
                    helpCallback={() => {
                        alert("I need help... and coffee...");
                    }}
                    menuItems={[
                        {
                            title: "Sign Up",
                            icon: faUsers,
                            isAuth: true,
                            onClick: () => {
                                window.location = "#/SignUp";
                            }
                        },
                        {
                            title: "Login",
                            icon: faUsers,
                            isAuth: true,
                            onClick: () => {
                                // What you want to do...
                                window.location = "#/Login";
                            }
                        },
                        
                
                        {
                            title: "Term and Conditions",
                            icon: faChartPie,
                            isAuth: true,
                            onClick: () => {
                               
                                window.location = "#/TermsAndCond";
                            }
                        }
                    ]}
                />
                <div 
                className="p-grid p-fluid"
                    style={sectionStyle}
                >
                    
                    <Growl ref={(el) => this.growl = el} style={{ marginTop: '75px' }} />
                    <div  style={divStyle}  >





                        <form onSubmit={this.onSubmit}
                        //  style={divForm}
                        >
                            <div style={{ display: "inlineBlock", opacity: "1", margin: "auto", width: "80%", }}>

                                <div className="p-col-12" >
                                    <div className="p-grid">
                                        <LockOpenIcon fontSize="large" style={{ color: 'white', fontSize: 40, width: '50px', height: '50px', }} />
                                        {this.state.loading && <ProgressSpinner style={{ width: '60px', height: '60px', position: 'absolute', marginLeft: 70 }} strokeWidth="8" animationDuration=".5s" />}
                                    </div>
                                </div>
                                <div className="p-col-9" style={{ textAlign: 'left' }}>
                                    <h2 style={{ color: 'white' }} className="welcome-text">Welcome User</h2>
                                    <span style={{ color: 'white' }} className="guest-sign-in">Sign in to Ecommerce System</span>
                                </div>

                                <div className="p-col-12" style={{ textAlign: 'left', }}>
                                    <label style={{ color: 'white' }} className="login-label">Email</label>

                                    <InputText placeholder="Email" value={this.state.user.Email} onChange={(e) => { this.updateProperty('Email', e.target.value) }} required autoFocus />

                                </div>
                                <div className="p-col-12" style={{ textAlign: 'left', opacity: 1 }}>
                                    <label style={{ color: 'white' }} className="login-label">Password</label>

                                    <InputText type="password" placeholder="Password" value={this.state.user.Password} onChange={(e) => { this.updateProperty('Password', e.target.value) }} required />
                                </div>
                                <div className="p-col-12 button-pane" style={{ marginTop: 20 }}>
                                    <Button disabled={this.state.loading} className="p-button-danger" label="Sign In" onClick={this.onSubmit} />
                                </div>


                                <Messages ref={(el) => this.messages = el} />

                                <div className="p-col-12" style={{ textAlign: 'left' }}>

                                    <span style={{ color: 'white' }} className="guest-sign-in">Don't have account? Creat account<span onClick={() => this.navigateToSignUp()} style={{ textDecoration: "underline", marginLeft: 5, textAlign: 'center', cursor: 'pointer' }}>here</span> </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >


        )
    }
}

const mapStateToProps = (state) => {
    console.log("state.AuthReducer.superAdminLoginRes", state.AuthReducer)
    return {
        LoginRes: state.AuthReducer.LoginRes,
        error: state.AuthReducer.error,
        superAdminLoginRes: state.AuthReducer.superAdminLoginRes,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        login: (payload) => dispatch(AuthAction.signin(payload)),


    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Login); 