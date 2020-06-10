/*eslint-disable */
import React, { useState, useRef, useEffect, } from 'react';
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
    const [Company, setCompany] = useState({
        CompanyName: '',
        AboutCompany: '',
        OwnerName: '',
        CompanyLocation: '',
        NoOFEmployee: '',
        RegistrationNo: '',
        GSTN_No: '',
        DocumentUrl: '',
        Reason:'',
        uid:''

    });
    const checkFields = () => {
        if (Company.Reason === '' || Company.Reason === null || Company.Reason === undefined) {
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
                CompanyName: Company.CompanyName,
                AboutCompany: Company.AboutCompany,
                OwnerName: Company.OwnerName,
                CompanyLocation: Company.CompanyLocation,
                NoOFEmployee: Company.NoOFEmployee,
                RegistrationNo: Company.RegistrationNo,
                GSTN_No: Company.GSTN_No,
                Status: "Approved",
                uid: Company.uid,
                DocumentUrl: Company.DocumentUrl,
                
            }
                console.log("payload", payload)
                props.insertCompany(payload)
    };
    const handleReject = () => {
      
        if (checkFields()) {
            setOpen(false);
            setloadingOnSave(true)
            let payload = {
                CompanyName: Company.CompanyName,
                AboutCompany: Company.AboutCompany,
                OwnerName: Company.OwnerName,
                CompanyLocation: Company.CompanyLocation,
                NoOFEmployee: Company.NoOFEmployee,
                RegistrationNo: Company.RegistrationNo,
                GSTN_No: Company.GSTN_No,
                Status: "Rejected",
                uid: Company.uid,
                DocumentUrl: Company.DocumentUrl,
                Reason:Company.Reason
            }
                console.log("payload", payload)
                props.insertCompany(payload)
        }


    };
    const hideError = () => {
        setErrorBox(false);
        setMsgString('');
    }
    useEffect(() => {
        let SuperAdmin = JSON.parse(sessionStorage.getItem('SuperAdmin'));
        if (SuperAdmin === null) {
            window.location = "#/access";
        }
        if (props.location.data) {

            if (props.location.data.editList) {
                setNewData(false)

                let Company = props.location.data.Company
                setCompany({
                    CompanyName: Company.CompanyName,
                    AboutCompany: Company.AboutCompany,
                    OwnerName: Company.OwnerName,
                    CompanyLocation: Company.CompanyLocation,
                    NoOFEmployee: Company.NoOFEmployee,
                    RegistrationNo: Company.RegistrationNo,
                    GSTN_No: Company.GSTN_No,
                    DocumentUrl: Company.DocumentUrl,
                    uid:Company.uid

                })
            }
            else if (props.location.data.newList) {


            }
            else if (props.location.data.viewList) {
                setViewData(true)
                setNewData(false)
                let Company = props.location.data.Company
                setCompany({
                    CompanyName: Company.CompanyName,
                    AboutCompany: Company.AboutCompany,
                    OwnerName: Company.OwnerName,
                    CompanyLocation: Company.CompanyLocation,
                    NoOFEmployee: Company.NoOFEmployee,
                    RegistrationNo: Company.RegistrationNo,
                    GSTN_No: Company.GSTN_No,
                    DocumentUrl: Company.DocumentUrl,
                    uid:Company.uid

                })
            }
        }
        else {
            props.history.push({
                pathname: "DashBoard"
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
            .ref("Documents/" + props.LoginRes.Res)
            .child(filename)

            .getDownloadURL()
            .then(url =>


                setCompany({ ...Company, DocumentUrl: url }),
                setUploadPrgress(100)
            );
    };

    // const []
    useEffect(() => {
        if (props.error) {

        }

        if (props.CompanyListRes) {

            window.location = "#/DashBoard";

            props.AllListsNull()
        }
        if (props.updateCompanyRes) {

            window.location = "#/DashBoard";

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
                />
                <Dialog aria-labelledby="customized-dialog-title" open={open}>
                    <MuiDialogTitle disableTypography>
                        <Typography variant="h6">Plaes Specify the resons for rejecting the request</Typography>
                    </MuiDialogTitle>
                    <DialogContent>
                        <div className="p-col-6 p-lg-12">
                            <TextField   label="Reasons" onChange={e => setCompany({ ...Company, Reason: e.target.value })} value={Company.Reason} fullWidth style={{ display: 'block' }} variant="outlined" />
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
                                    <TextField disabled={true} label="Company Name" onChange={e => setCompany({ ...Company, CompanyName: e.target.value })} value={Company.CompanyName} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField disabled={true} label="About company" onChange={e => setCompany({ ...Company, AboutCompany: e.target.value })} value={Company.AboutCompany} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField disabled={true} label="Owner Name" onChange={e => setCompany({ ...Company, OwnerName: e.target.value })} value={Company.OwnerName} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField disabled={true} label="Company Location" onChange={e => setCompany({ ...Company, CompanyLocation: e.target.value })} value={Company.CompanyLocation} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField disabled={true} label="No. Of employee" onChange={e => setCompany({ ...Company, NoOFEmployee: e.target.value })} value={Company.NoOFEmployee} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField disabled={true} label="Registration no" onChange={e => setCompany({ ...Company, RegistrationNo: e.target.value })} value={Company.RegistrationNo} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField disabled={true} label="GSTIN No" onChange={e => setCompany({ ...Company, GSTN_No: e.target.value })} value={Company.GSTN_No} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>

                                {newData === false &&
                                    <div className="p-col-6 p-lg-4">
                                        <br />
                                        <a target="_blank" href={Company.DocumentUrl}>Documents</a>
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
        // users: state.AuthReducer.user,
        // userActions: state.AuthReducer.userActions,
        // // sessionExpired: state.SessionExpiredReducer.sessionExpired,
        CompanyListRes: state.AllActionReducer.CompanyListRes,
        updateCompanyRes: state.AllActionReducer.updateCompanyRes,
        LoginRes: state.AuthReducer.LoginRes,

        // ColorLookupList: state.AllActionReducer.ColorLookupListRes,
        // CategoryLookupList: state.AllActionReducer.CategoryLookupListRes,
        // SupplierLookupList: state.AllActionReducer.SupplierLookupListRes,
        // SizeLookupList: state.AllActionReducer.SizeLookupListRes,
        // ListInsertRes: state.AllActionReducer.ListInsertRes,
        // ListUpdateRes: state.AllActionReducer.ListUpdateRes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AllListsNull: () => dispatch(AllAction.AllListsNull()),
        insertCompany: (payload) => dispatch(AllAction.insertCompany(payload)),

        updateCompany: (payload) => dispatch(AllAction.updateCompany(payload)),
        // getSTLookup: (payload) => (dispatch(AllAction.Lookup(payload))),
        // getColorLookup: (payload) => (dispatch(AllAction.getColorLookup(payload))),
        // getCategoryLookup: (payload) => (dispatch(AllAction.getCategoryLookup(payload))),
        // getSupplierLookup: (payload) => (dispatch(AllAction.getSupplierLookup(payload))),
        // getSizeLookup: (payload) => (dispatch(AllAction.getSizeLookup(payload))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);