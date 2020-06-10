export default class AllAction {


    static INSERT_COMPANY = 'INSERT_COMPANY';
    static INSERT_COMPANY_SUCCESS = 'INSERT_COMPANY_SUCCESS';
    static INSERT_COMPANY_FAILURE = 'INSERT_COMPANY_FAILURE';

    static INSERT_DRIVER = 'INSERT_DRIVER';
    static INSERT_DRIVER_SUCCESS = 'INSERT_DRIVER_SUCCESS';
    static INSERT_DRIVER_FAILURE = 'INSERT_DRIVER_FAILURE';
    static INSERT_DRIVER_DATA_SUCCESS = 'INSERT_DRIVER_DATA_SUCCESS';
    static INSERT_DRIVER_DATA_FAILURE = 'INSERT_DRIVER_DATA_FAILURE';


    static INSERT_DRIVER_BY_ADMIN = 'INSERT_DRIVER_BY_ADMIN ';
    static INSERT_DRIVER_BY_ADMIN_SUCCESS = 'INSERT_DRIVER_BY_ADMIN_SUCCESS';
    static INSERT_DRIVER_BY_ADMIN_FAILURE = 'INSERT_DRIVER_BY_ADMIN_FAILURE';


    static INSERT_TERM_AND_CONDITIONS = 'INSERT_TERM_AND_CONDITIONS ';
    static INSERT_TERM_AND_CONDITIONS_SUCCESS = 'INSERT_TERM_AND_CONDITIONS_SUCCESS';
    static INSERT_TERM_AND_CONDITIONS_FAILURE = 'INSERT_TERM_AND_CONDITIONS_FAILURE';
    



    static INSERT_PRODUCTS = 'INSERT_PRODUCTS ';
    static INSERT_PRODUCTS_SUCCESS = 'INSERT_PRODUCTS_SUCCESS';
    static INSERT_PRODUCTS_FAILURE = 'INSERT_PRODUCTS_FAILURE'



    static INSERT_CATEGORIES = 'INSERT_CATEGORIES ';
    static INSERT_CATEGORIES_SUCCESS = 'INSERT_CATEGORIES_SUCCESS';
    static INSERT_CATEGORIES_FAILURE = 'INSERT_CATEGORIES_FAILURE'



    
    
    static GET_COMPANY = 'GET_COMPANY';
    static GET_COMPANY_SUCCESS = 'GET_COMPANY_SUCCESS';
    static GET_COMPANY_FAILURE = 'GET_COMPANY_FAILURE';
    static GET_COMPANY_SUCCESS_FAILURE = "GET_COMPANY_SUCCESS_FAILURE"


    static GET_TERMS_AND_CONDITIOND = 'GET_TERMS_AND_CONDITIOND';
    static GET_TERMS_AND_CONDITIOND_SUCCESS = 'GET_TERMS_AND_CONDITIOND_SUCCESS';
    static GET_TERMS_AND_CONDITIOND_FAILURE = 'GET_TERMS_AND_CONDITIOND_FAILURE';
    



    static GET_PRODUCTS = 'GET_PRODUCTS';
    static GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
    static GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';
    static GET_PRODUCTS_SUCCESS_FAILURE = 'GET_PRODUCTS_SUCCESS_FAILURE';
    

    static GET_DRIVERS = 'GET_DRIVERS';
    static GET_DRIVERS_SUCCESS = 'GET_DRIVERS_SUCCESS';
    static GET_DRIVERS_FAILURE = 'GET_DRIVERS_FAILURE';
    static GET_ALL_DRIVERS_SUCCESS_FAILURE = "GET_ALL_DRIVERS_SUCCESS_FAILURE"


    
    static UPDATE_COMPANY = 'UPDATE_COMPANY';
    static UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';
    static UPDATE_COMPANY_FAILURE = 'UPDATE_COMPANY_FAILURE';

    static UPDATE_DRIVER = 'UPDATE_DRIVER';
    static UPDATE_DRIVER_SUCCESS = 'UPDATE_DRIVER_SUCCESS';
    static UPDATE_DRIVER_FAILURE = 'UPDATE_DRIVER_FAILURE';

    

    static GET_ALL_COMPANY = 'GET_ALL_COMPANY';
    static GET_ALL_COMPANY_SUCCESS = 'GET_ALL_COMPANY_SUCCESS';
    static GET_ALL_COMPANY_FAILURE = 'GET_ALL_COMPANY_FAILURE';
    static GET_ALL_COMPANY_SUCCESS_FAILURE = "GET_ALL_COMPANY_SUCCESS_FAILURE"

    static GET_ALL_DRIVERS = 'GET_ALL_DRIVERS';
    static GET_ALL_DRIVERS_SUCCESS = 'GET_ALL_DRIVERS_SUCCESS';
    static GET_ALL_DRIVERS_FAILURE = 'GET_ALL_DRIVERS_FAILURE';
    static GET_ALL_DRIVERS_REQUEST_SUCCESS_FAILURE = "GET_ALL_DRIVERS_REQUEST_SUCCESS_FAILURE"


    
    static ALL_NULL = 'ALL_NULL';


    static AllListsNull() {
        return {
            type: AllAction.ALL_NULL,
        };
    }

    static insertCompany(payload) {
        console.log("insertCompany")
        return {
            type: AllAction.INSERT_COMPANY,
            payload
        };
    }
    static insertTermsConditions(payload) {
      
        return {
            type: AllAction.INSERT_TERM_AND_CONDITIONS,
            payload
        };
    }

    
    static insertDriver(payload) {

        return {
            type: AllAction.INSERT_DRIVER,
            payload
        };
    }
    static insertCategories(payload) {

        return {
            type: AllAction.INSERT_CATEGORIES,
            payload
        };
    }
    
    static insertProducts(payload) {

        return {
            type: AllAction.INSERT_PRODUCTS,
            payload
        };
    }
    static insertAdminDriver(payload) {

        return {
            type: AllAction.INSERT_DRIVER_BY_ADMIN,
            payload
        };
    }
    
    

    static getCompany(payload) {
        return {
            type: AllAction.GET_COMPANY,
            payload
        };
    }
    static GetTermsAndCondition() {
        return {
            type: AllAction.GET_TERMS_AND_CONDITIOND,
            
        };
    }

    static getProductsList(payload) {
        return {
            type: AllAction.GET_PRODUCTS,
            payload
        };
    }
    
    static getDriversList(payload) {
        console.log("getDriversList")
        return {
            type: AllAction.GET_DRIVERS,
            payload
        };
    }
    
    static getAllCompany() {
        return {
            type: AllAction.GET_ALL_COMPANY,

        };
    }


    static getDriverRequsetsList(payload) {
        return {
            type: AllAction.GET_ALL_DRIVERS,
            payload
        };
    }

    
 
    static updateCompany(payload) {
        return {
            type: AllAction.UPDATE_COMPANY,
            payload
        };
    }

    static updateDriver(payload) {
        return {
            type: AllAction.UPDATE_DRIVER,
            payload
        };
    }
    
    


}