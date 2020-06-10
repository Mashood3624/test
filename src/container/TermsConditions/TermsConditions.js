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

const TermsConditions = (props) => {










    const [loadingOnSave, setloadingOnSave] = useState(false);
    const [errorBox, setErrorBox] = useState(false);
    const [msgString, setMsgString] = useState('');













    const [TermsConditions, setTermsConditions] = useState({
        TermsConditions: '',


    });
    const checkFields = () => {
        if (TermsConditions.TermsConditions === '' || TermsConditions.TermsConditions === null || TermsConditions.TermsConditions === undefined) {
            setMsgString('Plaes Insert Terms Conditions');
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
            let payload = {
                TermsConditions: TermsConditions.TermsConditions,


            }
            console.log("payload", payload)
            props.insertTermsConditions(payload)
        };
    }

    const hideError = () => {
        setErrorBox(false);
        setMsgString('');
    }


    useEffect(() => {
        if (props.error) {
            setMsgString('Server Error');
            setErrorBox(true);
        }

        if (props.insertTermsConditionsRes) {

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


                <div className="p-grid">
                    <div className="p-col-12 p-lg-12">
                        <div className="card card-w-title " style={{ boxShadow: "-1px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)" }} >
                            <div className="p-grid">




                                <div className="p-col-6 p-lg-12">
                                    <TextField
                                        multiline
                                        label="Add Termd and Conditions Text" onChange={e => setTermsConditions({ ...TermsConditions, TermsConditions: e.target.value })} value={TermsConditions.TermsConditions} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>






                                <div className="p-col-2 p-offset-8 ">
                                    <Button label="Submit" icon="pi pi-check" onClick={handleSave} />
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

        insertTermsConditionsRes: state.AllActionReducer.insertTermsConditionsRes,



    }
}

const mapDispatchToProps = dispatch => {
    return {
        AllListsNull: () => dispatch(AllAction.AllListsNull()),
        insertTermsConditions: (payload) => dispatch(AllAction.insertTermsConditions(payload)),

        updateTermsConditions: (payload) => dispatch(AllAction.updateTermsConditions(payload)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions);