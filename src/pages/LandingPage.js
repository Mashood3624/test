/*eslint-disable */
import React, { Component } from "react";
import { render } from "react-dom";

import Navbar from "reactjs-navbar";

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
    display: "inlineBlock", margin: "auto", width: "650px", height: '500px', backgroundColor: 'black', opacity: 0.95, borderRadius: 4
}
export default class LandingPage extends Component {
    state = {
        isLoading: true
    };

    constructor() {
        super();
        this.state = {
            name: "React"
        };
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

                    {/* <div style={divStyle}>
                        <h1 style={{ color: 'white', marginLeft: 10 }}>Terms and Conditions:</h1>
                        <p style={{ color: 'white', justifyContent:'center',    fontSize:'15px', padding:20 }}>
                            Welcome to Facebook!

                            Facebook builds technologies and services that enable people to connect with each other, build communities and grow businesses. These Terms govern your use of Facebook, Messenger and the other products, features, apps, services, technologies and software that we offer (the Facebook Products or Products), except where we expressly state that separate terms (and not these) apply. These Products are provided to you by Facebook, Inc.

                            We don't charge you to use Facebook or the other products and services covered by these Terms. Instead, businesses and organisations pay us to show you ads for their products and services. By using our Products, you agree that we can show you ads that we think will be relevant to you and your interests. We use your personal data to help determine which ads to show you.

                            We don't sell your personal data to advertisers, and we don't share information that directly identifies you (such as your name, email address or other contact information) with advertisers unless you give us specific permission. Instead, advertisers can tell us things such as the kind of audience that they want to see their ads, and we show those ads to people who may be interested. We provide advertisers with reports about the performance of their ads that help them understand how people are interacting with their content. See Section 2 below to learn more.

                            Our Data Policy explains how we collect and use your personal data to determine some of the ads that you see and provide all of the other services described below. You can also go to your settings at any time to review the privacy choices you have about how we use your data.
                </p>
                    </div> */}
                </div>

            </div>
        );
    }
}

