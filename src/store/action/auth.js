export default class AuthAction {

    static LOGIN = 'LOGIN';
    static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    static LOGIN_FAILURE = 'LOGIN_FAILURE';

 
    static SUPER_ADMIN_LOGIN_SUCCESS = 'SUPER_ADMIN_LOGIN_SUCCESS';
    

    

    static SIGNUP = 'SIGNUP';
    static SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
    static SIGNUP_FAILURE = 'SIGNUP_FAILURE';

    
    static DATA_UPLOADED_SUCCESS = 'DATA_UPLOADED_SUCCESS';
    static DATA_UPLOADED_FAILURE = 'DATA_UPLOADED_FAILURE';

    
    
    static LOGOUT = 'LOGOUT';
    static LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

    static USER_DETAIL_NULL= "USER_DETAIL_NULL";
 

    static Signup(payload) {
        return {
            type: AuthAction.SIGNUP,
            payload
        };
    }

    static signin(payload) {
        return {
            type: AuthAction.LOGIN,
            payload
        };
    }

    static logout() {
        return {
            type: AuthAction.LOGOUT,
         
        };
    }

    
}