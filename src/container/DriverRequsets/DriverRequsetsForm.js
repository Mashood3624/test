/*eslint-disable */import React, { useState, useRef, useEffect, } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import GlobalHeader from "../../components/GlobalHeader/GlobalHeader"
import { AllAction } from '../../store/action';
import { Button } from 'primereact/button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Buttons from '@material-ui/core/Button';
import ErrorBox from '../../components/ErrorBox/ErrorBox';
import DialogContent from '@material-ui/core/DialogContent';
import appFirebase from '../../utilities/Firebase';

const ItemForm = (props) => {


    const UOMOptions = [{ value: 'NOs', label: 'NOs' }, { value: 'KGs', label: 'KGs' }];
    const [Reject, setReject] = React.useState(false);






    const [loadingOnSave, setloadingOnSave] = useState(false);
    const [errorBox, setErrorBox] = useState(false);
    const [msgString, setMsgString] = useState('');
    const [newData, setNewData] = useState(true);
    const [ViewData, setViewData] = useState(false);


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };








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
        DriverID:'',
        Reason:'',
        CompanyId:''

    });
    const checkFields = () => {
        if (Driver.Reason === '' || Driver.Reason === null || Driver.Reason === undefined) {
            setMsgString('Plaes Specify the resons for rejecting the request');
            setErrorBox(true);
            return false;
        }
       

        else {
            return true;
        }

    }
    
    const handleSave = () => {
            setloadingOnSave(true)
            let payload = {
                DriverName: Driver.DriverName,
                Email: Driver.Email,
                Password: Driver.Password,
                VehicleNo: Driver.VehicleNo,
                Address: Driver.Address,
                RegistrationNo: Driver.RegistrationNo,
                DrivingLicenceNo: Driver.DrivingLicenceNo,
                CompanyId: Driver.CompanyId,
                DocumentUrl: Driver.DocumentUrl,
                DriverID:Driver.DriverID,
                Status: "Approved",
                DocumentUrl: Driver.DocumentUrl,
                Reason:""
                
            }
                console.log("payload", payload)
                props.insertAdminDriver(payload)
    };
    const handleReject = () => {
      
        if (checkFields()) {
            setOpen(false);
            setloadingOnSave(true)
            let payload = {
                DriverName: Driver.DriverName,
                Email: Driver.Email,
                Password: Driver.Password,
                VehicleNo: Driver.VehicleNo,
                Address: Driver.Address,
                RegistrationNo: Driver.RegistrationNo,
                DrivingLicenceNo: Driver.DrivingLicenceNo,
                CompanyId: Driver.CompanyId,
                DocumentUrl: Driver.DocumentUrl,
                DriverID:Driver.DriverID,
                Status: "Rejected",
                DocumentUrl: Driver.DocumentUrl,
                Reason:Driver.Reason
            }
                console.log("payload", payload)
                props.insertAdminDriver(payload)
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

   console.log("props.location.data.Driver",props.location.data.Driver)
            if (props.location.data.viewList) {
                setViewData(true)
                setNewData(false)
                let Driver = props.location.data.Driver
                setDriver({
                    DriverName: Driver.DriverName,
                    Email: Driver.Email,
                    Password: Driver.Password,
                    VehicleNo: Driver.VehicleNo,
                    Address: Driver.Address,
                    RegistrationNo: Driver.RegistrationNo,
                    DrivingLicenceNo: Driver.DrivingLicenceNo,
                    DocumentUrl: Driver.DocumentUrl,
                    DriverID:Driver.DriverID,
                    CompanyId:Driver.CompanyId,
                   


                })
            }
        }
        else {
            props.history.push({
                pathname: "DriverRequsets"
            })
        }
    }, []);
    const handleUploadStart = () => {
        setPrgressBar(true)
        setUploadPrgress(20)
    }

    const handleUploadSuccess = filename => {
        // this.setState({ avatar: filename, progress: 100, isUploading: false });
        appFirebase
            .storage()
            .ref("Documents/" + props.LoginRes)
            .child(filename)

            .getDownloadURL()
            .then(url =>


                setDriver({ ...Driver, DocumentUrl: url }),
                setUploadPrgress(100)
            );
    };

    // const []
    useEffect(() => {
        if (props.error) {

        }

        if (props.insertDriverByAdminRes) {

            window.location = "#/DriverRequsets";

            props.AllListsNull()
        }
        if (props.updateDriverRes) {

            window.location = "#/DashBoard";

            props.AllListsNull()
        }


        
    })
    return (
        <div className="p-grid">
            <div className="p-col-12 p-lg-12">
                <ErrorBox open={errorBox} onClose={hideError} msg={msgString} />

                <GlobalHeader
                    loading={loadingOnSave}
                    goBack={() => props.history.goBack()}
                />
                <Dialog aria-labelledby="customized-dialog-title" open={open}>
                    <MuiDialogTitle disableTypography>
                        <Typography variant="h6">Plaes Specify the resons for rejecting the request</Typography>
                    </MuiDialogTitle>
                    <DialogContent>
                        <div className="p-col-6 p-lg-12">
                            <TextField   label="Reasons" onChange={e => setDriver({ ...Driver, Reason: e.target.value })} value={Driver.Reason} fullWidth style={{ display: 'block' }} variant="outlined" />
                        </div>

                    </DialogContent>
                    <MuiDialogActions>

                        <React.Fragment>
                            < Buttons autoFocus disabled={props.loadingDelete} onClick={handleReject} variant="outlined" >Reject</Buttons>
                            <Buttons disabled={props.loadingDelete} onClick={handleClose} variant="outlined">Cancel</Buttons>
                        </React.Fragment>
                    </MuiDialogActions>

                </Dialog >

                <div className="p-grid">
                    <div className="p-col-12 p-lg-12">
                        <div className="card card-w-title " style={{ boxShadow: "-1px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)" }} >
                            <div className="p-grid">




                            <div className="p-col-6 p-lg-4">
                                    <TextField label="Driver Name" onChange={e => setDriver({ ...Driver, DriverName: e.target.value })} value={Driver.DriverName} fullWidth style={{ display: 'block'}} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField disabled={newData===false?true:false} label="Email" onChange={e => setDriver({ ...Driver, Email: e.target.value })} value={Driver.Email} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField disabled={newData===false?true:false}  type={"Password"} label="Password" onChange={e => setDriver({ ...Driver, Password: e.target.value })} value={Driver.Password} fullWidth style={{ display: 'block' }} variant="outlined" />
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






                                <div className="p-col-2 p-offset-8 ">
                                    <Button label="Approve" icon="pi pi-check" onClick={handleSave} />
                                </div>
                                <div className="p-col-1 ">
                                    <Button label="Rject" icon="pi pi-check" onClick={handleClickOpen} />
                                </div>
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
        insertDriverByAdminRes: state.AllActionReducer.insertDriverByAdminRes,
        updateDriverRes: state.AllActionReducer.updateDriverRes,
        LoginRes: state.AuthReducer.LoginRes,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        AllListsNull: () => dispatch(AllAction.AllListsNull()),
        insertAdminDriver: (payload) => dispatch(AllAction.insertAdminDriver(payload)),
        updateDriver: (payload) => dispatch(AllAction.updateDriver(payload)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);