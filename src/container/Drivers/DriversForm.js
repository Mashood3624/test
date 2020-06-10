/*eslint-disable */
import React, { useState, useRef, useEffect, } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import IconButton from '@material-ui/core/IconButton';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import GlobalHeader from "../../components/GlobalHeader/GlobalHeader"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import isEmail from 'validator/lib/isEmail';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import LookupTextField from '../../components/LookupTextField/LookupTextField';
import { AllAction } from '../../store/action';
import { Button } from 'primereact/button';
import LookUp from '../../components/Lookup/LookUp';
import ErrorBox from '../../components/ErrorBox/ErrorBox';
import { FileUpload } from 'primereact/fileupload';
import FileUploader from "react-firebase-file-uploader";
import appFirebase from '../../utilities/Firebase';
import { ProgressBar } from 'primereact/progressbar';
const { v4: uuidv4 } = require('uuid');
const ItemForm = (props) => {










    const [Rejected, setRejected] = useState(false);
    const [RejectedMsg, setRejectedMsg] = useState("");
    const [loadingOnSave, setloadingOnSave] = useState(false);
    const [errorBox, setErrorBox] = useState(false);
    const [msgString, setMsgString] = useState('');
    const [newData, setNewData] = useState(true);
    const [ViewData, setViewData] = useState(false);
    const [UploadPrgress, setUploadPrgress] = useState(0)
    const [PrgressBar, setPrgressBar] = useState(false)
    const [Driver, setDriver] = useState({
        DriverName: '',
        Email: '',
        Password: '',
        VehicleNo: '',
        Address: '',
        RegistrationNo: '',
        DrivingLicenceNo: '',
        DocumentUrl: '',
        DriverID: ''

    });
    const [driverArr, setDriverArr] = useState([])
    const checkFields = () => {
        if (Driver.DriverName === '' || Driver.DriverName === null || Driver.DriverName === undefined) {
            setMsgString('Please Input Driver Name');
            setErrorBox(true);
            return false;
        }
        else if (Driver.Email === '' || !isEmail(Driver.Email) || Driver.Email === undefined) {
            setMsgString('Please Input Valid Email');
            setErrorBox(true);
            return false;
        }
        else if (Driver.Password === '' || Driver.Password.length < 8 || Driver.Password === undefined) {
            setMsgString(' Password Must be grater than 8 character');
            setErrorBox(true);
            return false;
        }
        else if (Driver.VehicleNo === '' || Driver.VehicleNo === null || Driver.VehicleNo === undefined) {
            setMsgString('Please Input Vehicle No');
            setErrorBox(true);
            return false;
        }
        else if (Driver.Address === '' || Driver.Address === null || Driver.Address === undefined) {
            setMsgString('Please Input No OF Address');
            setErrorBox(true);
            return false;
        }
        else if (Driver.RegistrationNo === '' || Driver.RegistrationNo === null || Driver.RegistrationNo === undefined) {
            setMsgString('Please Input Registration No');
            setErrorBox(true);
            return false;
        }
        else if (Driver.DrivingLicenceNo === '' || Driver.DrivingLicenceNo === null || Driver.DrivingLicenceNo === undefined) {
            setMsgString('Please Input Driving Licence No');
            setErrorBox(true);
            return false;
        }
        else if (Driver.DocumentUrl === '' || Driver.DocumentUrl === null || Driver.DocumentUrl === undefined) {
            setMsgString('Please Upload  Document');
            setErrorBox(true);
            return false;
        }

        else {
            return true;
        }

    }
    const insertDriver = (arr, payload) => {
        let newArr = arr
        newArr.push(payload)
        appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).update({
            driver: newArr
        }).
            then((doc) => {
                props.history.push({
                    pathname: "Drivers"
                })
            }).catch((err) => {
                console.log({ err })
            })
    }

    const insertDriverFunc = (payload) => {
        console.log({ payload })

        appFirebase.auth().createUserWithEmailAndPassword(payload.Email, payload.Password).then(() => {
            appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).get().
                then((doc) => {
                    console.log({ data: doc.data().driver })
                    insertDriver(doc.data().driver, payload)
                }).catch((err) => {
                    console.log({ err })
                })

        }).catch((err) => {
            console.log({ err })
            if(err.code ==="auth/email-already-in-use"){
                setMsgString(err.message);
                setErrorBox(true);
                setloadingOnSave(false)

            }
        })


    }




    const updateDriver = (arr, payload) => {
        let newArr = arr
       

        var index = -1;
        for (var i = 0, len = newArr.length; i < len; i++) {
            if (newArr[i].DriverID === payload.DriverID) {
                index = i;
                break;
            }
        }
        console.log({ index })
        newArr[index] = payload
        appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).update({
            driver: newArr
        }).
            then((doc) => {
                props.history.push({
                    pathname: "Drivers"
                })
            }).catch((err) => {
                console.log({ err })
            })

    }
    const updateDriverFunc = (payload) => {
        appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).get().
            then((doc) => {
                console.log({ data: doc.data().driver })
                updateDriver(doc.data().driver, payload)
            }).catch((err) => {
                console.log({ err })
            })

    }
    const handleSave = () => {

        if (checkFields()) {
            setloadingOnSave(true)
            let payload = {

                DriverName: Driver.DriverName,
                Email: Driver.Email,
                Password: Driver.Password,
                VehicleNo: Driver.VehicleNo,
                Address: Driver.Address,
                RegistrationNo: Driver.RegistrationNo,
                DrivingLicenceNo: Driver.DrivingLicenceNo,
                Status: "Approved",
                CompanyId: props.LoginRes.Res,
                DocumentUrl: Driver.DocumentUrl,
                DriverID: newData === true ? uuidv4() : Driver.DriverID

            }

            if (newData) {

                console.log("payload", payload)
                // props.insertDriver(payload)
                insertDriverFunc(payload)
            }
            else {
                updateDriverFunc(payload)
                // props.updateDriver(payload)
            }
        }


    };
    const hideError = () => {
        setErrorBox(false);
        setMsgString('');
    }

    useEffect(() => {
        let SuperAdmin = JSON.parse(sessionStorage.getItem('SuperAdmin'));
        if (SuperAdmin !== null) {
            window.location = "#/access";
        }
        if (props.location.data) {

            if (props.location.data.editList) {
                setNewData(false)

                let Driver = props.location.data.Driver
                console.log("Driver", Driver)
                setDriver({
                    DriverName: Driver.DriverName,
                    Email: Driver.Email,
                    Password: Driver.Password,
                    VehicleNo: Driver.VehicleNo,
                    Address: Driver.Address,
                    RegistrationNo: Driver.RegistrationNo,
                    DrivingLicenceNo: Driver.DrivingLicenceNo,
                    DocumentUrl: Driver.DocumentUrl,
                    DriverID: Driver.DriverID

                })

                if (Driver.Status === "Rejected") {
                    setRejected(true)
                    setRejectedMsg(Driver.Reason)
                }
            }
            else if (props.location.data.newList) {


            }
            else if (props.location.data.viewList) {
                setViewData(true)
                setNewData(false)
                let Driver = props.location.data.Driver
                console.log("Driver", Driver)
                setDriver({
                    DriverName: Driver.DriverName,
                    Email: Driver.Email,
                    Password: Driver.Password,
                    VehicleNo: Driver.VehicleNo,
                    Address: Driver.Address,
                    RegistrationNo: Driver.RegistrationNo,
                    DrivingLicenceNo: Driver.DrivingLicenceNo,
                    DocumentUrl: Driver.DocumentUrl,
                    DriverID: Driver.DriverID

                })
            }
        }
        else {
            props.history.push({
                pathname: "Drivers"
            })
        }
    }, []);
    const handleUploadStart = () => {
        setPrgressBar(true)
        setUploadPrgress(20)
    }

    const handleUploadSuccess = filename => {
        console.log({ filename })
        const ext = filename.split('.').pop();


        if (ext === "pdf") {
            appFirebase
                .storage()
                .ref("Documents/" + props.LoginRes.Res)
                .child(filename)

                .getDownloadURL()
                .then(url =>


                    setDriver({ ...Driver, DocumentUrl: url }),
                    setUploadPrgress(100)
                );
        }
        else {
            setDriver({ ...Driver, DocumentUrl: "" })
            setUploadPrgress(0)
            setMsgString('Document Must be In .pdf formate');
            setErrorBox(true);
        }
    };

    // const []
    useEffect(() => {
        if (props.error) {

        }

        if (props.InsertDriverRes) {

            window.location = "#/Drivers";

            props.AllListsNull()
        }
        if (props.updateDriverRes) {

            window.location = "#/Drivers";

            props.AllListsNull()
        }


        // if (props.sessionExpired) {
        //     window.location = "#/error";
        //     props.AllListsNull()
        // }
    })
    return (
        <div className="p-grid">
            <div className="p-col-12 p-lg-12">
                <ErrorBox open={errorBox} onClose={hideError} msg={msgString} />

                <GlobalHeader
                    loading={loadingOnSave}
                    goBack={() => props.history.goBack()}


                    HeadingText={Rejected === true ? "Rejected Resons: " + RejectedMsg : null}
                />


                <div className="p-grid">
                    <div className="p-col-12 p-lg-12">
                        <div className="card card-w-title " style={{ boxShadow: "-1px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)" }} >
                            <div className="p-grid">




                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Driver Name" onChange={e => setDriver({ ...Driver, DriverName: e.target.value })} value={Driver.DriverName} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField disabled={newData === false ? true : false} label="Email" onChange={e => setDriver({ ...Driver, Email: e.target.value })} value={Driver.Email} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField disabled={newData === false ? true : false} type={"Password"} label="Password" onChange={e => setDriver({ ...Driver, Password: e.target.value })} value={Driver.Password} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Vehicle No" onChange={e => setDriver({ ...Driver, VehicleNo: e.target.value })} value={Driver.VehicleNo} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Address" onChange={e => setDriver({ ...Driver, Address: e.target.value })} value={Driver.Address} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Registration no" onChange={e => setDriver({ ...Driver, RegistrationNo: e.target.value })} value={Driver.RegistrationNo} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Driving Licence No" onChange={e => setDriver({ ...Driver, DrivingLicenceNo: e.target.value })} value={Driver.DrivingLicenceNo} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>

                                {newData === false &&
                                    <div className="p-col-6 p-lg-4">
                                        <br />
                                        <a target="_blank" href={Driver.DocumentUrl}>Documents</a>
                                    </div>

                                }



                                <div className="p-col-12 p-lg-12">
                                    <h2>Upload document In PDF Formate</h2>
                                </div>
                                <div className="p-col-12 p-lg-12">

                                    {/* <FileUpload customUpload={true} mode="basic" name="demo[]" accept="image/*" maxFileSize={1000000} onUpload={(e)=>onBasicUpload(e)} /> */}

                                    <FileUploader
                                        accept=".pdf"
                                        name="avatar"
                                        // randomizeFilename
                                        storageRef={appFirebase.storage().ref("Documents/" + props.LoginRes.Res)}
                                        onUploadStart={handleUploadStart}
                                        // onUploadError={this.handleUploadError}
                                        onUploadSuccess={handleUploadSuccess}
                                    // onProgress={this.handleProgress}
                                    />
                                    {PrgressBar &&
                                        <ProgressBar value={UploadPrgress}></ProgressBar>}
                                </div>

                                {ViewData === false && <div className="p-col-4   p-offset-8">
                                    <Button label="Submit" icon="pi pi-check" onClick={handleSave} />
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        error: state.AllActionReducer.error,
        InsertDriverRes: state.AllActionReducer.InsertDriverRes,
        updateDriverRes: state.AllActionReducer.updateDriverRes,
        LoginRes: state.AuthReducer.LoginRes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AllListsNull: () => dispatch(AllAction.AllListsNull()),
        insertDriver: (payload) => dispatch(AllAction.insertDriver(payload)),
        updateDriver: (payload) => dispatch(AllAction.updateDriver(payload)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);