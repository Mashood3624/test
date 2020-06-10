import React from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar } from 'primereact/progressbar';
import ReactTooltip from 'react-tooltip';

const GlobalHeader = (props) => {
    return (
        <div className="card card-w-title " style={{paddingBottom:0,paddingTop:0, boxShadow: "-1px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)" }} >
        <div className="p-grid" style={{ padding: "0px", marginBottom: '0px' ,backgroundColor:'white'  }}>
            <div className="p-col-12 p-lg-12" style={{ paddingBottom: '0px' }}>
                <div className="p-grid">
                    <div className="p-col-4 p-lg-1" style={{ float: 'left' }} >
                        <div>
                            <Link onClick={props.goBack} to={{}}>
                                <span><i className="fa fa-arrow-circle-left fa-2x" data-tip="Back to List" style={{ marginLeft: 0,marginTop:10  }}></i></span>
                            </Link>
                        </div>
                    </div>
                    <div className="p-col-4 p-lg-11" style={{ textAlign: 'center' }} >
                        
                            <div style={{ fontSize: '17px', color:'red', marginTop:10 }} >{props.HeadingText}</div>
                         
                    </div>
                    {/* <div className="p-col-4 p-lg-4" style={{ float: 'right', textAlign: 'right'}} >
                        {props.submitButton === true &&
                            <Link onClick={props.submitButton_OnClick} to={{}}>
                                <span><i className="fa fa-paper-plane " data-tip="Submit" style={{ marginLeft: 12, fontSize: '1.5em' }}></i></span>
                            </Link>
                        }
                        {props.SaveButton === true &&
                            <Link onClick={props.SaveButton_OnClick} to={{}}>
                                <span style={{fontSize:'20px'}}><i className="pi pi-check fa-2x" data-tip="Save" style={{ marginLeft: 12 }}></i></span>
                            </Link>
                        }
                        {props.printButton === true &&
                            <Link onClick={props.printButton_OnClick} to={{}}>
                                <i class="fa fa-print fa-2x" aria-hidden="true" data-tip="Save & Print" style={{ marginLeft: 12 }}></i>
                            </Link>
                        }
                    </div> */}
                </div>
                <div className="p-grid" style={{ marginTop: '5px' }}>
                    <div className="p-col-12 p-lg-12" style={{ height: '6px' }}>
                        {props.loading ?
                            <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
                            : null}
                    </div>
                </div>
                <ReactTooltip place="bottom" effect="float" />
            </div>
        </div>
        </div>
    )
}
export default GlobalHeader;
