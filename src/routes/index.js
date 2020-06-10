/*eslint eqeqeq:0*/
import React from 'react'
import { Route } from 'react-router-dom';
import CreateCompany from "../container/CreateCompany/CreateCompany";
import CreateCompanyForm from "../container/CreateCompany/CreateCompanyForm";

import Products from '../container/Products/Products'
import ProductsForm from '../container/Products/ProductsForm'
import DashBoard from '../container/DashBoard/DashBoard'
import DashBoardForm from '../container/DashBoard/DashBoardForm'
import Drivers from '../container/Drivers/Drivers'
import DriversForm from '../container/Drivers/DriversForm'

import DriverRequsets from '../container/DriverRequsets/DriverRequsets'
import DriverRequsetsForm from '../container/DriverRequsets/DriverRequsetsForm'

import AddCategories from '../container/AddCategories/AddCategories';
import TermsConditions from '../container/TermsConditions/TermsConditions';
import Inbox from '../container/Inbox/Inbox'

export const Routes = () => (

    <div>
        <Route exact path="/104" component={"SalesPersonList"} />
        <Route exact path="/CreateCompany" component={CreateCompany} />
        <Route exact path="/CreateCompanyForm" component={CreateCompanyForm} />
        
        <Route exact path="/ProductsForm" component={ProductsForm} />
        <Route exact path="/Products" component={Products} />
        <Route exact path="/DashBoard" component={DashBoard} />
        <Route exact path="/DashBoardForm" component={DashBoardForm} />

        <Route exact path="/Drivers" component={Drivers} />
        <Route exact path="/DriversForm" component={DriversForm} />

        <Route exact path="/DriverRequsets" component={DriverRequsets} />
        <Route exact path="/DriverRequsetsForm" component={DriverRequsetsForm} />
        <Route exact path="/AddCategories" component={AddCategories} />

        <Route exact path="/TermsConditions" component={TermsConditions} />
        <Route exact path="/Inbox" component={Inbox} />
        
    </div>
);