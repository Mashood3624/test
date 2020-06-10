/*eslint-disable */
import React, { Component } from "react";
import { render } from "react-dom";
import { AllAction } from '../store/index';
import Navbar from "reactjs-navbar";
import { connect } from 'react-redux';
// import "./style.css";

import backgroundImg from "../assets/image/loginBackGround1.jpg"
import Loader from "react-loader-spinner";
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
    display: "inlineBlock", margin: "auto", width: "70%", backgroundColor: 'black', opacity: 0.95, borderRadius: 4
}
class TermsAndCond extends Component {
    state = {
        isLoading: true
    };

    constructor() {
        super();
        this.state = {
            termsAndCond: ""
        };
    }

    componentWillMount() {
        this.props.GetTermsAndCondition()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            alert("Server Error")
        }
        if (nextProps.TermsConditionsRes) {
            console.log("nextProps.TermsConditionsRes",nextProps.TermsConditionsRes)
            this.setState({ termsAndCond: nextProps.TermsConditionsRes.payload.TermsConditions })
        }
    }
    render() {
        return (
            <div
                style={sectionStyle}
            >
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

                  
                    <div style={divStyle}>
                        <h1 style={{ color: 'white', marginLeft: 10 }}>Terms and Conditions:</h1>
                        {this.state.termsAndCond ===""? 
                         <h1 style={{ color: 'white', marginLeft: 10, height:'250px' }}  >Loding...</h1>
                        :
                        <p style={{ color: 'white', justifyContent: 'center', fontSize: '15px', padding: 20 }}>

                            {this.state.termsAndCond}</p>
                            }
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        TermsConditionsRes: state.AllActionReducer.TermsConditionsRes,
        error: state.AllActionReducer.error,
         
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        GetTermsAndCondition: () => dispatch(AllAction.GetTermsAndCondition()),


    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TermsAndCond); 