import { AuthAction } from '../action/index';

const INITIAL_STATE = {
    isLoading: true,
    user: null,
    error: null,
    isAuthenticated: false,
    SignUpRes:null,
    superAdminLoginRes:null,
    LoginRes:null,

};

export default function AuthReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        // case AuthAction.LOGIN:
        //     return Object.assign({}, state, { isLoading: true, error: null });

        case AuthAction.LOGIN_FAILURE:
            return Object.assign({}, state, { superAdminLoginRes:null, LoginRes:null, error:action.payload});

        case AuthAction.LOGIN_SUCCESS:
            console.log("LoginRes:action.payload",  action.payload)
            // return Object.assign({}, state, {LoginRes:action.payload, error:null });
            return Object.assign({}, state, {LoginRes:action.payload, error:null });
            
    
            case AuthAction.SIGNUP_FAILURE:
                return Object.assign({}, state, {SignUpRes:null, error:action.payload});
    
            // case AuthAction.SIGNUP_SUCCESS:
            //     return Object.assign({}, state, { SignUpRes:action.payload, error:null});
    


                case AuthAction.DATA_UPLOADED_FAILURE:
                    return Object.assign({}, state, {SignUpRes:null, error:action.payload});
        
                case AuthAction.DATA_UPLOADED_SUCCESS:
                    return Object.assign({}, state, { SignUpDataUploadRes:action.payload, error:null});



                case AuthAction.LOGOUT:
                    return Object.assign({}, state, { SignUpRes:null,LoginRes:null,SignUpDataUploadRes: null });

        case AuthAction.SUPER_ADMIN_LOGIN_SUCCESS:
            console.log("superAdminLoginRes:action.payload",  action.payload)

            return Object.assign({}, state, { superAdminLoginRes:action.payload, LoginRes:null, error:null});
            // return Object.assign({}, state, {superAdminLoginRes:action.payload, error:null,LoginRes:null, });
        // case AuthAction.GET_USER_RIGHTS_FAILURE:
        //     return Object.assign({}, state, { user: null,userRights: null, isAuthenticated: false, isLoading: false, error: action.payload  });

        // case AuthAction.GET_USER_ACTIONS_SUCCESS:
        //     return Object.assign({}, state, { userActions: action.payload[3], isAuthenticated: true, isLoading: false, error: null });

        // case AuthAction.GET_USER_ACTIONS_FAILURE:
        //     return Object.assign({}, state, { user: null,userActions: null, isAuthenticated: false, isLoading: false, error: action.payload  });

        // case AuthAction.THEME_TEMPLATE:
        //     return Object.assign({}, state, { isLoading: true, error: null });

        // case AuthAction.THEME_TEMPLATE_FAILURE:
        //     return Object.assign({}, state, { themeTemplate: null, error: action.payload });

        // case AuthAction.THEME_TEMPLATE_SUCCESS:
        //     return Object.assign({}, state, { themeTemplate: action.payload, error: null });

    


        // case AuthAction.GET_USER_DETAIL_SUCCESS:
        //     return Object.assign({}, state, { userDetail: action.payload, error: null });
        // case AuthAction.GET_USER_DETAIL_FAILURE:
        //     return Object.assign({}, state, { userDetail: null, error: action.payload });

        // case AuthAction.CHANGE_PASSWORD_SUCCESS:
        //     return Object.assign({}, state, { PassChangeRes: action.payload, error: null });
        // case AuthAction.CHANGE_PASSWORD_FAILURE:
        //     return Object.assign({}, state, { PassChangeRes: null, error: action.payload });

        // case AuthAction.USER_DETAIL_NULL:
        //     return Object.assign({}, state, {
        //         error: null,
        //         userDetail: null,
        //     });

        // case AuthAction.CHANGE_PASS_NULL:
        //     return Object.assign({}, state, {
        //         error: null,
        //         PassChangeRes: null,
        //     });


        case AuthAction.AUTH_NULL:
            return Object.assign({}, state, { themeTemplate: null, error: null,SignUpDataUploadRes: null });

        default:
            return state;
    }
}