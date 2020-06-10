/*eslint-disable */
import { AllAction } from '../action/index';

const INITIAL_STATE = {

    error: null,
    CompanyListRes: null,
    getCompanyList: null,
    updateCompanyRes: null,
    getCompanyListNull: null,
    InsertDriverRes: null,
    DriverListRes: null,
    updateDriverRes: null,
    insertDriverByAdminRes: null,
    insertProductRes: null,
    getProductsListNull: null,
    ProductsListRes: null,
    insertTermsConditionsRes: null,
    TermsConditionsRes: null,

};

export default function AllActionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AllAction.INSERT_COMPANY_SUCCESS:
            return Object.assign({}, state, { CompanyListRes: action.payload, isLoading: false, error: null });

        case AllAction.INSERT_COMPANY_FAILURE:
            return Object.assign({}, state, { CompanyListRes: null, isLoading: false, error: action.payload });


        case AllAction.GET_COMPANY_SUCCESS:
            return Object.assign({}, state, { getCompanyList: action.payload, isLoading: false, error: null });

        case AllAction.GET_COMPANY_FAILURE:
            return Object.assign({}, state, { getCompanyList: null, isLoading: false, error: action.payload });

        case AllAction.GET_COMPANY_SUCCESS_FAILURE:
            console.log("getCompanyListNull:", action.payload)
            return Object.assign({}, state, { getCompanyListNull: action.payload, isLoading: false, error: null });


        case AllAction.UPDATE_COMPANY_SUCCESS:
            return Object.assign({}, state, { updateCompanyRes: action.payload, isLoading: false, error: null });

        case AllAction.UPDATE_COMPANY_FAILURE:
            return Object.assign({}, state, { updateCompanyRes: null, isLoading: false, error: action.payload });



        case AllAction.GET_ALL_COMPANY_SUCCESS:
            return Object.assign({}, state, { getAllCompanyList: action.payload, isLoading: false, error: null });

        case AllAction.GET_ALL_COMPANY_SUCCESS_FAILURE:
            return Object.assign({}, state, { getAllCompanyListNull: null, isLoading: false, error: action.payload });
        case AllAction.GET_ALL_COMPANY_FAILURE:
            return Object.assign({}, state, { getAllCompanyList: action.payload, isLoading: false, error: null });


        case AllAction.INSERT_DRIVER_DATA_SUCCESS:
            return Object.assign({}, state, { InsertDriverRes: action.payload, isLoading: false, error: null });

        case AllAction.INSERT_DRIVER_DATA_FAILURE:
            return Object.assign({}, state, { InsertDriverRes: null, isLoading: false, error: action.payload });

        case AllAction.GET_DRIVERS_SUCCESS:
            return Object.assign({}, state, { DriverListRes: action.payload, isLoading: false, error: null });

        case AllAction.GET_DRIVERS_FAILURE:
            return Object.assign({}, state, { DriverListRes: null, isLoading: false, error: action.payload });

        case AllAction.GET_ALL_DRIVERS_SUCCESS_FAILURE:
            return Object.assign({}, state, { getDriverListNull: action.payload, isLoading: false, error: action.payload });

        case AllAction.GET_ALL_DRIVERS_SUCCESS:
            return Object.assign({}, state, { DriverReqListRes: action.payload, isLoading: false, error: null });


        case AllAction.GET_ALL_DRIVERS_REQUEST_SUCCESS_FAILURE:
            return Object.assign({}, state, { getDriverReqListNull: action.payload, isLoading: false, error: null });



        case AllAction.UPDATE_DRIVER_SUCCESS:
            return Object.assign({}, state, { updateDriverRes: action.payload, isLoading: false, error: action.payload });

        case AllAction.UPDATE_DRIVER_FAILURE:
            return Object.assign({}, state, { updateDriverRes: null, isLoading: false, error: action.payload });


        case AllAction.INSERT_DRIVER_BY_ADMIN_SUCCESS:
            return Object.assign({}, state, { insertDriverByAdminRes: action.payload, isLoading: false, error: action.payload });

        case AllAction.INSERT_DRIVER_BY_ADMIN_FAILURE:
            return Object.assign({}, state, { insertDriverByAdminRes: null, isLoading: false, error: action.payload });




        case AllAction.INSERT_PRODUCTS_SUCCESS:
            return Object.assign({}, state, { insertProductRes: action.payload, isLoading: false, error: action.payload });

        case AllAction.INSERT_PRODUCTS_FAILURE:
            return Object.assign({}, state, { insertProductRes: null, isLoading: false, error: action.payload });



            case AllAction.INSERT_TERM_AND_CONDITIONS_SUCCESS:
                return Object.assign({}, state, { insertTermsConditionsRes: action.payload, isLoading: false, error: null });
    
            case AllAction.INSERT_TERM_AND_CONDITIONS_FAILURE:
                return Object.assign({}, state, { insertTermsConditionsRes: null, isLoading: false, error: action.payload });
    


        case AllAction.GET_PRODUCTS_SUCCESS:
            return Object.assign({}, state, { ProductsListRes: action.payload, isLoading: false, error: action.payload });

        case AllAction.GET_PRODUCTS_FAILURE:
            return Object.assign({}, state, { ProductsListRes: null, isLoading: false, error: action.payload });

        case AllAction.GET_PRODUCTS_SUCCESS_FAILURE:
            return Object.assign({}, state, { getProductsListNull: action.payload, isLoading: false, error: null });




            
        case AllAction.GET_TERMS_AND_CONDITIOND_SUCCESS:
            return Object.assign({}, state, { TermsConditionsRes: action.payload, isLoading: false, error: null });

        case AllAction.GET_PRODUCTS_FAILURE:
            return Object.assign({}, state, { TermsConditionsRes: null, isLoading: false, error: action.payload });




        case AllAction.ALL_NULL:
            return Object.assign({}, state, {

                error: null,
                CompanyListRes: null,
                getCompanyList: null,
                updateCompanyRes: null,
                getCompanyListNull: null,
                getAllCompanyList: null,
                getAllCompanyListNull: null,
                InsertDriverRes: null,
                DriverListRes: null,
                getDriverListNull: null,
                updateDriverRes: null,
                getDriverReqListNull: null,
                DriverReqListRes: null,
                insertDriverByAdminRes: null,
                insertProductRes: null,
                getProductsListNull: null,
                ProductsListRes: null,
                insertTermsConditionsRes: null,
                TermsConditionsRes: null,
            });

        default:
            return state;
    }
}