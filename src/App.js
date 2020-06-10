/*eslint-disable */
import React, { Component } from 'react';
import classNames from 'classnames';
import AppTopbar from './AppTopbar';// eslint-disable-next-line
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Routes } from './routes/index';


import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/layout.scss';
import './App.scss';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            User: {
                UserID: '',
                Curr_Pass: '',
                New_Pass: '',
                Conf_Pass: '',
            },
            msg: '',
            errorBox: false,
            layoutMode: 'static',
            layoutColorMode: 'light',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            topbarMenuActive: false,
            visibleChangePassDialog: false
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }
    componentDidMount() {
        this.SuperAdminRights= false
      
    }

    onWrapperClick = (event) => {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false,
            });
        }

        if (!this.topbarItemClick) {
            this.setState({
                topbarMenuActive: false
            })
        }

        this.menuClick = false;
        this.topbarItemClick = false;
    }

    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }

        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
    }

    onMenuItemClick(event) {
        if (!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    createMenu() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let SuperAdmin = JSON.parse(sessionStorage.getItem('SuperAdmin'));
        console.log("App.js USer", user)
        console.log("App.js Super Admin", SuperAdmin)
        if (user === null) {

            // let SuperAdmin = JSON.parse(sessionStorage.getItem('SuperAdmin'));
            if (SuperAdmin === null) {
                window.location = "#/";
            }
            else{
                window.location = "#/DashBoard";
              
                this.menu = [
                    {
                        label: 'Dashboard',
                        icon: 'fa fa-home',
                        disabled: false,
                        items: [],
                        command: () => { window.location = '#/DashBoard' }
                    },
                   
                    {
                        label: 'Add Terms and Conditions',
                        icon: 'fa fa-home',
                        disabled: false,
                        items: [],
                        command: () => { window.location = '#/TermsConditions' }
                    },
                  
        
                   
                
                ];
            }
        }
        else {
            console.log("else", "else")
            window.location = "#/App";
            this.menu = [
                {
                    label: 'Dashboard',
                    icon: 'fa fa-home',
                    disabled: false,
                    items: [],
                    command: () => { window.location = '#/App' }
                },
              
               
    
                {
                    label: `Create a Company`,
                    icon: 'fa fa-lock',
                    id: 16,
                    disabled: false,
                    command: () => { window.location = '#/CreateCompany' }
                     
                },
                {
                    label: `Drivers`,
                    icon: 'fa fa-cart-plus',
                    id: 16,
                    disabled: false,
                    command: () => { window.location = '#/Drivers' }
                    
                },
                {
                    label: 'Driver Requsets',
                    icon: 'fa fa-home',
                    disabled: false,
                    items: [],
                    command: () => { window.location = '#/DriverRequsets' }
                },
                {
                    label: 'Add Categories',
                    icon: 'fa fa-home',
                    disabled: false,
                    items: [],
                    command: () => { window.location = '#/AddCategories' }
                },
                {
                    label: `Products`,
                    icon: 'fa fa-cart-plus',
                    id: 16,
                    disabled: false,
                    command: () => { window.location = '#/Products' }
                    
                },
                {
                    label: `Inbox`,
                    icon: 'fa fa-cart-plus',
                    id: 16,
                    disabled: false,
                    command: () => { window.location = '#/Inbox' }
                    
                }
            
            ];
            
        }
    }

    nav = (e) => {
        // window.location = "#/" + e.item.id;
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    }

    onTopbarMenuButtonClick = (event) => {
        event.preventDefault();
        this.topbarItemClick = true;
        this.setState({ topbarMenuActive: !this.state.topbarMenuActive });
    }



    render() {
        // eslint-disable-next-line
        const logo = 'assets/layout/images/CBM_T.png';
        // const logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg';

        const wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });

        const sidebarClassName = classNames("layout-sidebar", {
            'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
            'layout-sidebar-light': this.state.layoutColorMode === 'light'
        });

        return (
            <div className={wrapperClass} id="main-wrapper" onClick={this.onWrapperClick}>
                <AppTopbar
                    topbarMenuActive={this.state.topbarMenuActive}
                    onChangePassword={this.onChangePassword}
                    onToggleMenu={this.onToggleMenu}
                    onTopbarMenuButtonClick={this.onTopbarMenuButtonClick}
                />

                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                    <div className="layout-logo">
                        {/* <img alt="Logo" src={logo} /> */}
                    </div>
                    <AppProfile />
                    <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                </div>

                <div className="layout-main">

                    {/* <Route path="/forms" component={FormsDemo} />
                    <Route path="/sample" component={SampleDemo} />
                    <Route path="/data" component={DataDemo} />
                    <Route path="/panels" component={PanelsDemo} />
                    <Route path="/overlays" component={OverlaysDemo} />
                    <Route path="/menus" component={MenusDemo} />
                    <Route path="/messages" component={MessagesDemo} />
                    <Route path="/charts" component={ChartsDemo} />
                    <Route path="/misc" component={MiscDemo} />
                    <Route path="/empty" component={EmptyPage} />
                <Route path="/documentation" component={Documentation} /> */}
                    // eslint-disable-next-line
                    <Routes />
                    <Route exact path="/App" exact component={Dashboard} />
                </div>

                {/* <AppFooter /> */}

                {/* <div className="layout-mask"></div> */}
            </div>
        );
    }
}

export default App;
