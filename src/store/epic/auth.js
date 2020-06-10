
import { Observable } from 'rxjs';
import { AuthAction } from './../action/index';// eslint-disable-next-line
import { axiosPost, axiosPut } from '../../service/index';
import appFirebase from '../../utilities/Firebase'
import constants from '../../utilities/constants';// eslint-disable-next-line
const constant = constants.getConstant();

export default class AuthEpic {

    static login = (action$) =>
        action$.ofType(AuthAction.LOGIN)
            .do(x => (x))
            .switchMap(({ payload }) => {


                return Observable.fromPromise(appFirebase.auth().signInWithEmailAndPassword(payload.Email, payload.Password))
                    .map((response) => {
                        console.log("response",response.user.uid )
                        let Res={
                            Res:response.user.uid
                        }
                            return {
                                type: AuthAction.LOGIN_SUCCESS,
                                payload: Res
                            // };
                        }




                    }).catch(err => Observable.of({
                        type: AuthAction.LOGIN_FAILURE,
                        payload: err
                    }));
            });

    static Signup = (action$) =>
        action$.ofType(AuthAction.SIGNUP)
            .do(x => (x))
            .switchMap(({ payload }) => {

                return Observable.fromPromise(appFirebase.auth().createUserWithEmailAndPassword(payload.Email, payload.Password))
                    .map((response) => {

                        if (response) {
                            return {
                                type: AuthAction.SIGNUP_SUCCESS,
                                payload: { response, payload }
                            };
                        } else {
                            return {
                                type: AuthAction.SIGNUP_FAILURE,
                                payload: 'Server Error'
                            };
                        }
                    }).catch(err => Observable.of({
                        type: AuthAction.SIGNUP_FAILURE,
                        payload: err
                    }));
            });

    static SetUserData = (action$) =>
        action$.ofType(AuthAction.SIGNUP_SUCCESS)
            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFrom", payload)
                console.log("uid", payload.response.user.uid)
                return Observable.fromPromise(appFirebase.firestore().collection("Users").doc(payload.response.user.uid).set({
                    Name: payload.payload.Name,
                    DOB: payload.payload.DOB,
                    Gender: payload.payload.Gender,
                    Locating: payload.payload.Locating,
                    Occupation: payload.payload.Occupation,
                    Email: payload.payload.Email
                }))
                    .map((response) => {


                        return {
                            type: AuthAction.DATA_UPLOADED_SUCCESS,
                            payload: payload.response.user.uid
                        };


                    }).catch(err => Observable.of({
                        type: AuthAction.DATA_UPLOADED_FAILURE,
                        payload: err
                    }));
            });



}