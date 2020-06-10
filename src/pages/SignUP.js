/*eslint-disable */
import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { connect } from 'react-redux';
import { Growl } from 'primereact/growl';
import { Messages } from 'primereact/messages';
import { AuthAction } from '../store/index';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import backgroundImg from "../assets/image/loginBackGround1.jpg";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
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
    display: "inlineBlock", margin: "auto", width: "650px", height: '500px', backgroundColor: 'black', opacity: 0.95, borderRadius: 4
}



const gender = [
    { name: 'Male', code: 'NY' },
    { name: 'Female', code: 'RM' },
    { name: 'Other', code: 'LDN' },

];

class SignUP extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.showError = this.showError.bind(this);
        this.state = {
            loading:false,
            user: {
                Name: "",
                Email: '',
                Password: '',
                DOB: '',
                Gender: '',
                Locating: '',
                Occupation: "",

            },

        };

    }
    showError() {
        let msg = { severity: 'error', summary: 'Error Message', detail: 'Validation failed' };
        this.growl.show(msg);
        this.messages.show(msg);
    }

    componentWillMount() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (user !== null) {
            window.location = "#/App";}
        // if (this.props.LoginRes !== null || this.props.SignUpDataUploadRes !== null ) {
        //     // window.location = "#/App"
        // }


    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.error) {
            this.showError();

        }
        if (nextProps.SignUpDataUploadRes) {
        
            let msg = { severity: 'success', summary: 'Success', detail: 'Accont created' };
            this.growl.show(msg);
           setTimeout(()=>window.location = "#/", 3000) 
            // let user = nextProps.LoginRes;
            // sessionStorage.setItem('user', JSON.stringify(user));

        }
  

        // if (nextProps.isAuthenticated && nextProps.user && nextProps.userRights && nextProps.userActions) {

            // let userRights = nextProps.userRights;
            // let userRoles = nextProps.user[3];
            // let UserID = nextProps.user[1].UserID
            // let UserName = nextProps.user[1].UserName

            // sessionStorage.setItem('ApplicationMode', JSON.stringify('Online'));
            // sessionStorage.setItem('userRights', JSON.stringify(userRights));
            // sessionStorage.setItem('User_ID', JSON.stringify(UserID));
            // sessionStorage.setItem('UserName', JSON.stringify(UserName));
            // sessionStorage.setItem('WebToken', JSON.stringify(nextProps.user[0].token));
            // sessionStorage.setItem('userRoles', JSON.stringify(userRoles));
        //     window.location = "#/App"
        // }

    }

    componentWillMount() {
        // let userRights = JSON.parse(sessionStorage.getItem('userRights'));
        // if (userRights !== null) {
        //     window.location = "#/App"
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
        else if (this.state.user.Name === '' || this.state.user.Name.length < 3 || this.state.user.Name === undefined) {
            let msg = { severity: 'error', summary: 'Error Message', detail: "Invalid Name" };
            this.growl.show(msg); return false;
        }
        else if (this.state.user.DOB === '' || this.state.user.DOB=== null || this.state.user.DOB === undefined) {
            let msg = { severity: 'error', summary: 'Please Enter Date Of Birth', detail: "Invalid Date Of Birth" };
            this.growl.show(msg); return false;
        }
        else if (this.state.user.Gender.name === '' || this.state.user.Gender.name=== null || this.state.user.Gender.name === undefined) {
            let msg = { severity: 'error', summary: 'Please Enter Gender', detail: "Invalid Gender" };
            this.growl.show(msg); return false;
        }
        else if (this.state.user.Locating === '' || this.state.user.Locating=== null || this.state.user.Locating === undefined) {
            let msg = { severity: 'error', summary: 'Please Enter Location', detail: "Invalid Location" };
            this.growl.show(msg); return false;
        }
        else if (this.state.user.Occupation === '' || this.state.user.Occupation=== null || this.state.user.Occupation === undefined) {
            let msg = { severity: 'error', summary: 'Please Enter Occupation', detail: "Invalid Occupation" };
            this.growl.show(msg); return false;
        }
        else{
            return true
        }
    }
    onSubmit=(e)=> {
       
        if (this.checkFields()) {
            this.setState({loading:true})
            e.preventDefault();

            let user = {
                Email: this.state.user.Email,
                Password: this.state.user.Password,
                Name: this.state.user.Name,
                DOB: this.state.user.DOB,
                Gender: this.state.user.Gender.name,
                Locating: this.state.user.Locating,
                Occupation: this.state.user.Occupation,
    
    
            }
            console.log("user", user)
            
            this.props.Signup(user)
        }
        
        // appFirebase.auth().createUserWithEmailAndPassword(user.Email, user.Password)
        //     .then((res) => {
        //         console.log("res", res)
        //     })
        //     .catch(function (error) {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         console.log("err", error)
        //         // ...
        //     });

        // ;

        // window.location = "#/App"
    }





    updateProperty(property, value) {
        let user = this.state.user;
        user[property] = value;
        this.setState({ user: user });
    }
    navigateTologin = () => {
        this.props.history.push({
            pathname: '/'
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
                <div className="p-grid p-fluid"

                    style={sectionStyle}

                >
                    <Growl ref={(el) => this.growl = el} style={{ marginTop: '75px' }} />
                    <div style={divStyle}>





                        <form onSubmit={this.onSubmit} >
                            <div style={{ display: "inlineBlock", opacity: "1", margin: "auto", width: "80%", }}>

                            <div className="p-col-12" >
                                    <div className="p-grid">
                                        <LockOpenIcon fontSize="large" style={{ color: 'white', fontSize: 40, width: '50px', height: '50px', }} />
                                   {this.state.loading && <ProgressSpinner style={{ width: '60px', height: '60px', position:'absolute',marginLeft:70 }} strokeWidth="8" animationDuration=".5s" />}
                                </div>
                                </div>
                                <div className="p-col-9" style={{ textAlign: 'left' }}>
                                    <h2 style={{ color: 'white' }} className="welcome-text">Welcome User</h2>
                                    <span style={{ color: 'white' }} className="guest-sign-in">Sign up to Ecommerce System</span>
                                </div>
                                <div className="p-grid">
                                    <div className="p-col-6" style={{ textAlign: 'left', }}>
                                        <label style={{ color: 'white' }} className="login-label">Name</label>

                                        <InputText placeholder="Name" value={this.state.user.Name} onChange={(e) => { this.updateProperty('Name', e.target.value) }} required autoFocus />

                                    </div>
                                    <div className="p-col-6" style={{ textAlign: 'left', opacity: 1 }}>
                                        <label style={{ color: 'white' }} className="login-label">Date of birth</label>

                                        <Calendar value={this.state.user.DOB} onChange={(e) => { this.updateProperty('DOB', e.value) }} showIcon={true} />
                                    </div>
                                    <div className="p-col-6" style={{ textAlign: 'left', }}>
                                        <label style={{ color: 'white' }} className="login-label">Email</label>

                                        <InputText placeholder="Email" value={this.state.user.Email} onChange={(e) => { this.updateProperty('Email', e.target.value) }} required autoFocus />

                                    </div>
                                    <div className="p-col-6" style={{ textAlign: 'left', opacity: 1 }}>
                                        <label style={{ color: 'white' }} className="login-label">Password</label>

                                        <InputText type='password' placeholder="Password" value={this.state.user.Password} onChange={(e) => { this.updateProperty('Password', e.target.value) }} required />
                                    </div>
                                    <div className="p-col-6" style={{ textAlign: 'left', opacity: 1 }}>
                                        <label style={{ color: 'white' }} className="login-label">Gender</label>

                                        <Dropdown value={this.state.user.Gender} options={gender} onChange={(e) => { this.updateProperty('Gender', e.value) }} placeholder="Gender" optionLabel="name" style={{ width: '12em' }} />
                                    </div>

                                    <div className="p-col-6" style={{ textAlign: 'left', opacity: 1 }}>
                                        <label style={{ color: 'white' }} className="login-label">Occupation</label>

                                        <InputText placeholder="Occupation" value={this.state.user.Occupation} onChange={(e) => { this.updateProperty('Occupation', e.target.value) }} required />
                                    </div>
                                </div>
                                <div className="p-col-12" style={{ textAlign: 'left', }}>
                                    <label style={{ color: 'white' }} className="login-label">Locating</label>

                                    <InputText placeholder="Locating" value={this.state.user.Locating} onChange={(e) => { this.updateProperty('Locating', e.target.value) }} required autoFocus />

                                </div>
                                <div className="p-col-8 p-offset-2 " style={{ marginTop: 20 }}>
                                    <Button disabled={this.state.loading} className=" p-col-6 p-button-danger align-self-center" label="Sign Up" onClick={this.onSubmit} />
                                </div>


                                <Messages ref={(el) => this.messages = el} />

                                <div className="p-col-12" style={{ textAlign: 'left' }}>

                                    <span style={{ color: 'white' }} className="guest-sign-in">Already have account? Login<span onClick={() => this.navigateTologin()} style={{ textDecoration: "underline", marginLeft: 5, textAlign: 'center', cursor: 'pointer' }}>here</span> </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        // user: state.AuthReducer.user,
        // isAuthenticated: state.AuthReducer.isAuthenticated,
        // userRights: state.AuthReducer.userRights,
        // userActions: state.AuthReducer.userActions,
        error: state.AuthReducer.error,
        SignUpDataUploadRes:state.AuthReducer.SignUpDataUploadRes,
        // LoginRes:state.AuthReducer.LoginRes,
        // superAdminLoginRes: state.AuthReducer.superAdminLoginRes,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        Signup: (payload) => dispatch(AuthAction.Signup(payload)),


    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUP); 