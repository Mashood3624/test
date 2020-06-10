/*eslint-disable */
import { Observable } from 'rxjs';
import { AllAction, } from './../action/index';
import appFirebase from '../../utilities/Firebase'
import constants from '../../utilities/constants';// eslint-disable-next-line
const constant = constants.getConstant();

export default class AllActionEpic {



    static insertCompany = (action$) =>
        action$.ofType(AllAction.INSERT_COMPANY)

            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFrom", payload)
                let Company = payload
                return Observable.fromPromise(appFirebase.firestore().collection("companies").doc(payload.uid).set({


                    CompanyName: Company.CompanyName,
                    AboutCompany: Company.AboutCompany,
                    OwnerName: Company.OwnerName,
                    CompanyLocation: Company.CompanyLocation,
                    NoOFEmployee: Company.NoOFEmployee,
                    RegistrationNo: Company.RegistrationNo,
                    GSTN_No: Company.GSTN_No,
                    Status: "Pending",
                    uid:Company.uid,
                    DocumentUrl: Company.DocumentUrl,
                    latitude: 24.9159156,
                    longitude: 67.0573662,
                    rating: {
                        ratings: '0',
                        noOfUsers: '0',
                    },


                    driver: [],
                    category: [],
                    products: []
                }))
                    .map((response) => {
                        console.log("responseFromComapny", response)

                        return {
                            type: AllAction.INSERT_COMPANY_SUCCESS,
                            payload: "Inserted Successfully"
                        }

                    }).catch(err => Observable.of({
                        type: AllAction.INSERT_COMPANY_FAILURE,
                        payload: err
                    }));
            });

    static getCompany = (action$) =>
        action$.ofType(AllAction.GET_COMPANY)
            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFrom getCompany", payload)

                return Observable.fromPromise(appFirebase.firestore().collection("companies").doc(payload).get())
                    .map((doc) => {
                        console.log("docFromComapny getCompany")
                        if (doc.exists) {
                            return {
                                type: AllAction.GET_COMPANY_SUCCESS,
                                payload: [doc.data()]
                            }
                        }
                        else {

                            return {
                                type: AllAction.GET_COMPANY_SUCCESS_FAILURE,
                                payload: "No Data Found"
                            }
                        }

                    }).catch(err => Observable.of({
                        type: AllAction.GET_COMPANY_FAILURE,
                        payload: err
                    }));
            });


    static updateCompany = (action$) =>
        action$.ofType(AllAction.UPDATE_COMPANY)
            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFrom insertCompany", payload)
                let Company = payload
                return Observable.fromPromise(appFirebase.firestore().collection("companies").doc(payload.uid).update(
                    { 
                        CompanyName: Company.CompanyName,
                        AboutCompany: Company.AboutCompany,
                        OwnerName: Company.OwnerName,
                        CompanyLocation: Company.CompanyLocation,
                        NoOFEmployee: Company.NoOFEmployee,
                        RegistrationNo: Company.RegistrationNo,
                        GSTN_No: Company.GSTN_No,
                        Status: "Pending",
                        uid:Company.uid,
                        DocumentUrl: Company.DocumentUrl,
                        latitude: 24.9159156,
                        longitude: 67.0573662,
                        
    
    
                        
                     }
                ))
                    .map((doc) => {
                        console.log("docFromComapny insertCompany", doc)

                        return {
                            type: AllAction.UPDATE_COMPANY_SUCCESS,
                            payload: "Document successfully updated"
                        }

                    }).catch(err => Observable.of({
                        type: AllAction.UPDATE_COMPANY_FAILURE,
                        payload: err
                    }));
            });


    static getAllCompany = (action$) =>
        action$.ofType(AllAction.GET_ALL_COMPANY)
            .do(x => (x))
            .switchMap(() => {


                return Observable.fromPromise(appFirebase.firestore().collection("companies").get())
                    .map((querySnapshot) => {
                        let arr = []
                        console.log("docFromComapny getAllCompany", querySnapshot)
                        querySnapshot.forEach(function (doc) {
                            arr.push(doc.data().payload)
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                        })
                        console.log("arr", arr)
                        if (arr.length > 0) {
                            return {
                                type: AllAction.GET_ALL_COMPANY_SUCCESS,
                                payload: arr
                            }
                        }
                        else {

                            return {
                                type: AllAction.GET_ALL_COMPANY_SUCCESS_FAILURE,
                                payload: "No Data Found"
                            }
                        }

                    }).catch(err => Observable.of({
                        type: AllAction.GET_ALL_COMPANY_FAILURE,
                        payload: err
                    }));
            });


    static SignupDriver = (action$) =>
        action$.ofType(AllAction.INSERT_DRIVER)
            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFromSignupDriver", payload)
                return Observable.fromPromise(appFirebase.auth().createUserWithEmailAndPassword(payload.Email, payload.Password))
                    .map((response) => {

                        if (response) {
                            return {
                                type: AllAction.INSERT_DRIVER_SUCCESS,
                                payload: { response, payload }
                            };
                        } else {
                            return {
                                type: AllAction.SIGNUP_FAILURE,
                                payload: 'Server Error'
                            };
                        }
                    }).catch(err => Observable.of({
                        type: AllAction.SIGNUP_FAILURE,
                        payload: err
                    }));
            });


    static insertDriver = (action$) =>
        action$.ofType(AllAction.INSERT_DRIVER_SUCCESS)

            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFrom", payload)
                let Driver = payload.payload
                return Observable.fromPromise(appFirebase.firestore().collection("Drivers").doc(payload.response.user.uid).set(
                    {
                        DriverName: Driver.DriverName,
                        Email: Driver.Email,
                        Password: Driver.Password,
                        VehicleNo: Driver.VehicleNo,
                        Address: Driver.Address,
                        RegistrationNo: Driver.RegistrationNo,
                        DrivingLicenceNo: Driver.DrivingLicenceNo,
                        Status: "Pending",
                        CompanyId: Driver.CompanyId,
                        DocumentUrl: Driver.DocumentUrl,
                        DriverID: payload.response.user.uid



                    }
                ))
                    .map((response) => {
                        console.log("responseFromComapny", response)

                        return {
                            type: AllAction.INSERT_DRIVER_DATA_SUCCESS,
                            payload: "Inserted Successfully"
                        }

                    }).catch(err => Observable.of({
                        type: AllAction.INSERT_DRIVER_DATA_FAILURE,
                        payload: err
                    }));
            });

    static getDriversList = (action$) =>

        action$.ofType(AllAction.GET_DRIVERS)

            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFrom", payload)
                var DriversRef = appFirebase.firestore().collection("Drivers");

                let arr = []
                return Observable.fromPromise(appFirebase.firestore().collection("Drivers").where("CompanyId", "==", payload)
                    .get())
                    .map((querySnapshot) => {
                        querySnapshot.forEach(function (doc) {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                            arr.push(doc.data())
                        })
                        if (arr.length > 0) {
                            console.log("PayloadFrom", payload)
                            return {
                                type: AllAction.GET_DRIVERS_SUCCESS,
                                payload: arr
                            }
                        }
                        else {

                            return {
                                type: AllAction.GET_ALL_DRIVERS_SUCCESS_FAILURE,
                                payload: "No Data Found"
                            }
                        }


                    }).catch(err => Observable.of({
                        type: AllAction.GET_DRIVERS_FAILURE,
                        payload: err
                    }));
            });





    static updateDriver = (action$) =>
        action$.ofType(AllAction.UPDATE_DRIVER)
            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFrom UPDATE_DRIVER", payload)
                let Driver = payload
                return Observable.fromPromise(appFirebase.firestore().collection("Drivers").doc(payload.DriverID).update(
                    {
                        DriverName: Driver.DriverName,
                        Email: Driver.Email,
                        Password: Driver.Password,
                        VehicleNo: Driver.VehicleNo,
                        Address: Driver.Address,
                        RegistrationNo: Driver.RegistrationNo,
                        DrivingLicenceNo: Driver.DrivingLicenceNo,
                        Status: "Pending",
                        CompanyId: Driver.CompanyId,
                        DocumentUrl: Driver.DocumentUrl,
                        DriverID: Driver.DriverID



                    }
                ))
                    .map((doc) => {


                        return {
                            type: AllAction.UPDATE_DRIVER_SUCCESS,
                            payload: "Document successfully updated"
                        }

                    }).catch(err => Observable.of({
                        type: AllAction.UPDATE_DRIVER_FAILURE,
                        payload: err
                    }));
            });






    static getDriverRequsetsList = (action$) =>
        action$.ofType(AllAction.GET_ALL_DRIVERS)
            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("payloadEpic", payload)
                return Observable.fromPromise(appFirebase.firestore().collection("Drivers").where("CompanyId", "==", payload).get())
                    .map((querySnapshot) => {
                        let arr = []
                        console.log("docFromComapny getAllCompany", querySnapshot)
                        querySnapshot.forEach(function (doc) {
                            arr.push(doc.data())
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                        })
                        console.log("arr", arr)
                        if (arr.length > 0) {
                            return {
                                type: AllAction.GET_ALL_DRIVERS_SUCCESS,
                                payload: arr
                            }
                        }
                        else {

                            return {
                                type: AllAction.GET_ALL_DRIVERS_REQUEST_SUCCESS_FAILURE,
                                payload: "No Data Found"
                            }
                        }

                    }).catch(err => Observable.of({
                        type: AllAction.GET_ALL_DRIVERS_FAILURE,
                        payload: err
                    }));
            });








    static insertAdminDriver = (action$) =>
        action$.ofType(AllAction.INSERT_DRIVER_BY_ADMIN)

            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFrom", payload)
                let Driver = payload
                return Observable.fromPromise(appFirebase.firestore().collection("Drivers").doc(Driver.DriverID).set(
                    {
                        DriverName: Driver.DriverName,
                        Email: Driver.Email,
                        Password: Driver.Password,
                        VehicleNo: Driver.VehicleNo,
                        Address: Driver.Address,
                        RegistrationNo: Driver.RegistrationNo,
                        DrivingLicenceNo: Driver.DrivingLicenceNo,
                        CompanyId: Driver.CompanyId,
                        DocumentUrl: Driver.DocumentUrl,
                        DriverID: Driver.DriverID,
                        Status: Driver.Status,
                        DocumentUrl: Driver.DocumentUrl,
                        Reason: Driver.Reason


                    }
                ))
                    .map((response) => {
                        console.log("insertAdminDriver", response)

                        return {
                            type: AllAction.INSERT_DRIVER_BY_ADMIN_SUCCESS,
                            payload: "Inserted Successfully"
                        }

                    }).catch(err => Observable.of({
                        type: AllAction.INSERT_DRIVER_BY_ADMIN_FAILURE,
                        payload: err
                    }));
            });







    static insertProducts = (action$) =>
        action$.ofType(AllAction.INSERT_PRODUCTS)

            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFrom", payload)

                return Observable.fromPromise(appFirebase.firestore().collection("products").doc(payload.ProductsID).set({
                    payload
                }))
                    .map((response) => {
                        console.log("insertProducts", response)

                        return {
                            type: AllAction.INSERT_PRODUCTS_SUCCESS,
                            payload: "Inserted Successfully"
                        }

                    }).catch(err => Observable.of({
                        type: AllAction.INSERT_PRODUCTS_FAILURE,
                        payload: err
                    }));
            });











    static getProductsList = (action$) =>
        action$.ofType(AllAction.GET_PRODUCTS)
            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFrom getCompany", payload)
                let arr = []
                return Observable.fromPromise(appFirebase.firestore().collection("products").where("payload.CompanyId", "==", payload)
                    .get())
                    .map((querySnapshot) => {
                        querySnapshot.forEach(function (doc) {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data().payload);
                            arr.push(doc.data().payload)
                        })
                        if (arr.length > 0) {
                            console.log("PayloadFrom", payload)
                            return {
                                type: AllAction.GET_PRODUCTS_SUCCESS,
                                payload: arr
                            }
                        }
                        else {

                            return {
                                type: AllAction.GET_PRODUCTS_SUCCESS_FAILURE,
                                payload: "No Data Found"
                            }
                        }
                    })
                    .catch(err => Observable.of({
                        type: AllAction.GET_PRODUCTS_FAILURE,
                        payload: err
                    }));
            });










    static insertCategories = (action$) =>
        action$.ofType(AllAction.INSERT_CATEGORIES)

            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFrom", payload)

                return Observable.fromPromise(appFirebase.firestore().collection(`categories(${payload.CpmapnyID})`).add({
                    payload
                }))
                    .map((response) => {
                        console.log("responseFromComapny", response)

                        return {
                            type: AllAction.INSERT_CATEGORIES_SUCCESS,
                            payload: "Inserted Successfully"
                        }

                    }).catch(err => Observable.of({
                        type: AllAction.INSERT_CATEGORIES_FAILURE,
                        payload: err
                    }));
            });



    static insertTermsConditions = (action$) =>
        action$.ofType(AllAction.INSERT_TERM_AND_CONDITIONS)

            .do(x => (x))
            .switchMap(({ payload }) => {
                console.log("PayloadFrom", payload)

                return Observable.fromPromise(appFirebase.firestore().collection("TermsConditions").doc("TermsConditions").set({
                    payload
                }))
                    .map((response) => {
                        console.log("responseFromComapny", response)

                        return {
                            type: AllAction.INSERT_TERM_AND_CONDITIONS_SUCCESS,
                            payload: "Inserted Successfully"
                        }

                    }).catch(err => Observable.of({
                        type: AllAction.INSERT_TERM_AND_CONDITIONS_FAILURE,
                        payload: err
                    }));
            });




    static GetTermsAndCondition = (action$) =>
        action$.ofType(AllAction.GET_TERMS_AND_CONDITIOND)
            .do(x => (x))
            .switchMap(() => {

                let arr = []
                return Observable.fromPromise(appFirebase.firestore().collection("TermsConditions").doc("TermsConditions")
                    .get())
                    .map((response) => {
                        console.log("GetTermsAndCondition", response.data())

                        return {
                            type: AllAction.GET_TERMS_AND_CONDITIOND_SUCCESS,
                            payload: response.data()
                        }

                    })
                    .catch(err => Observable.of({
                        type: AllAction.GET_TERMS_AND_CONDITIOND_FAILURE,
                        payload: err
                    }));
            });

}