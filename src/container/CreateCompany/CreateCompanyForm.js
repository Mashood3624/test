/*eslint-disable */import React, { useState, useRef, useEffect, } from 'react';
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
import FormControl from '@material-ui/core/FormControl';
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
 
const ItemForm = (props) => {


    // const UOMOptions = [{ value: 'NOs', label: 'NOs' }, { value: 'KGs', label: 'KGs' }];
    // const [age, setAge] = React.useState('');
    // const [STBtn, setSTBtn] = useState(true);
    // const [ColorBtn, setColorBtn] = useState(true);
    // const [CategoryBtn, setCategoryBtn] = useState(true);
    // const [SupplierBtn, setSupplierBtn] = useState(true);
    // const [SizeBtn, setSizeBtn] = useState(true);








    const [Rejected, setRejected] = useState(false);
    const [RejectedMsg, setRejectedMsg] = useState("");
    const [loadingOnSave, setloadingOnSave] = useState(false);
    const [errorBox, setErrorBox] = useState(false);
    const [msgString, setMsgString] = useState('');
    const [newData, setNewData] = useState(true);
    const [ViewData, setViewData] = useState(false);










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
        DocumentUrl: ''

    });
    const checkFields = () => {
        if (Company.CompanyName === '' || Company.CompanyName === null || Company.CompanyName === undefined) {
            setMsgString('Please Input Company Name');
            setErrorBox(true);
            return false;
        }
        else if (Company.AboutCompany === '' || Company.AboutCompany === null || Company.AboutCompany === undefined) {
            setMsgString('Please Input About Company');
            setErrorBox(true);
            return false;
        }
        else if (Company.OwnerName === '' || Company.OwnerName === null || Company.OwnerName === undefined) {
            setMsgString('Please Input Owner Name');
            setErrorBox(true);
            return false;
        }
        else if (Company.CompanyLocation === '' || Company.CompanyLocation === null || Company.CompanyLocation === undefined) {
            setMsgString('Please Input CompanyLocation');
            setErrorBox(true);
            return false;
        }
        else if (Company.NoOFEmployee === '' || Company.NoOFEmployee === null || Company.NoOFEmployee === undefined) {
            setMsgString('Please Input No OF Employee');
            setErrorBox(true);
            return false;
        }
        else if (Company.RegistrationNo === '' || Company.RegistrationNo === null || Company.RegistrationNo === undefined) {
            setMsgString('Please Input Registration No');
            setErrorBox(true);
            return false;
        }
        else if (Company.GSTN_No === '' || Company.GSTN_No === null || Company.GSTN_No === undefined) {
            setMsgString('Please Input GSTN No');
            setErrorBox(true);
            return false;
        }
        else if (Company.DocumentUrl === '' || Company.DocumentUrl === null || Company.DocumentUrl === undefined) {
            setMsgString('Please Upload  Document');
            setErrorBox(true);
            return false;
        }

        else {
            return true;
        }

    }
    const handleSave = () => {

        if (checkFields()) {
            setloadingOnSave(true)
            // let payload = {

            //    
            //     
            // }


            let payload = {
                CompanyName: Company.CompanyName,
                AboutCompany: Company.AboutCompany,
                OwnerName: Company.OwnerName,
                CompanyLocation: Company.CompanyLocation,
                NoOFEmployee: Company.NoOFEmployee,
                RegistrationNo: Company.RegistrationNo,
                GSTN_No: Company.GSTN_No,
                Status: "Pending",
                uid: props.LoginRes.Res,
                DocumentUrl: Company.DocumentUrl,
                latitude: 24.9159156,
                longitude: 67.0573662,
                rating: {
                    ratings: '0',
                    noOfUsers: '0',
                },


                driver: [  ],
                category: [{ category: "Food", },],
                products: [ ]
            }














            if (newData) {

                console.log("payload", payload)
                props.insertCompany(payload)
            }
            else {

                props.updateCompany(payload)
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

                let Company = props.location.data.Company
                console.log("Company", Company)
                setCompany({
                    CompanyName: Company.CompanyName,
                    AboutCompany: Company.AboutCompany,
                    OwnerName: Company.OwnerName,
                    CompanyLocation: Company.CompanyLocation,
                    NoOFEmployee: Company.NoOFEmployee,
                    RegistrationNo: Company.RegistrationNo,
                    GSTN_No: Company.GSTN_No,
                    DocumentUrl: Company.DocumentUrl,

                })

                if (Company.Status === "Rejected") {
                    setRejected(true)
                    setRejectedMsg(Company.Reason)
                }
            }
            else if (props.location.data.newList) {


            }
            else if (props.location.data.viewList) {
                setViewData(true)
                setNewData(false)
                let Company = props.location.data.Company
                console.log("Company", Company)
                setCompany({
                    CompanyName: Company.CompanyName,
                    AboutCompany: Company.AboutCompany,
                    OwnerName: Company.OwnerName,
                    CompanyLocation: Company.CompanyLocation,
                    NoOFEmployee: Company.NoOFEmployee,
                    RegistrationNo: Company.RegistrationNo,
                    GSTN_No: Company.GSTN_No,
                    DocumentUrl: Company.DocumentUrl,

                })
            }
        }
        else {
            props.history.push({
                pathname: "CreateCompany"
            })
        }
    }, []);
    const handleUploadStart = () => {
        setPrgressBar(true)
        setUploadPrgress(20)
    }

    const handleUploadSuccess = filename => {

        const ext = filename.split('.').pop();


        if (ext === "pdf") {
            appFirebase
                .storage()
                .ref("Documents/" + props.LoginRes.Res)
                .child(filename)

                .getDownloadURL()
                .then(url =>


                    setCompany({ ...Company, DocumentUrl: url }),
                    setUploadPrgress(100)
                );
        }
        else {
            setCompany({ ...Company, DocumentUrl: "" })
            setUploadPrgress(0)
            setMsgString('Document Must be In .pdf formate');
            setErrorBox(true);
        }
    };

    // const []
    useEffect(() => {
        if (props.error) {

        }

        if (props.CompanyListRes) {

            window.location = "#/CreateCompany";

            props.AllListsNull()
        }
        if (props.updateCompanyRes) {

            window.location = "#/CreateCompany";

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


                    HeadingText={Rejected === true ? "Rejected Resons: " + RejectedMsg : null}
                />


                <div className="p-grid">
                    <div className="p-col-12 p-lg-12">
                        <div className="card card-w-title " style={{ boxShadow: "-1px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)" }} >
                            <div className="p-grid">




                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Company Name" onChange={e => setCompany({ ...Company, CompanyName: e.target.value })} value={Company.CompanyName} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="About company" onChange={e => setCompany({ ...Company, AboutCompany: e.target.value })} value={Company.AboutCompany} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Owner Name" onChange={e => setCompany({ ...Company, OwnerName: e.target.value })} value={Company.OwnerName} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Company Location" onChange={e => setCompany({ ...Company, CompanyLocation: e.target.value })} value={Company.CompanyLocation} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="No. Of employee" onChange={e => setCompany({ ...Company, NoOFEmployee: e.target.value })} value={Company.NoOFEmployee} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Registration no" onChange={e => setCompany({ ...Company, RegistrationNo: e.target.value })} value={Company.RegistrationNo} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="GSTIN No" onChange={e => setCompany({ ...Company, GSTN_No: e.target.value })} value={Company.GSTN_No} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>

                                {newData === false &&
                                    <div className="p-col-6 p-lg-4">
                                        <br />
                                        <a target="_blank" href={Company.DocumentUrl}>Documents</a>
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

        CompanyListRes: state.AllActionReducer.CompanyListRes,
        updateCompanyRes: state.AllActionReducer.updateCompanyRes,
        LoginRes: state.AuthReducer.LoginRes,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        AllListsNull: () => dispatch(AllAction.AllListsNull()),
        insertCompany: (payload) => dispatch(AllAction.insertCompany(payload)),

        updateCompany: (payload) => dispatch(AllAction.updateCompany(payload)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);