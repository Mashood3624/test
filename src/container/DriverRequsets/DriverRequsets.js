/*eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Growl } from 'primereact/growl';
import MaterialTable from 'material-table';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { AllAction } from '../../store/action/index';
import DeleteBox from '../../components/DeleteBox/DeleteBox';
import ErrorBox from '../../components/ErrorBox/ErrorBox';

const DriverRequsets = (props) => {

    const [deleteBox, setDeleteBox] = useState(false);
    const [loadingDelete, setloadingDelete] = useState(false);
    const [actionCol, setActionCol] = useState([]);

    const [errorBox, setErrorBox] = useState(false);
    const [msgString, setMsgString] = useState('');
    const [selectedList, setSelectedList] = useState(null);
    const [List, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [AddBtn, setAddBtn] = useState(true);
    
    const [property, updatePropert] = useState({
        Code: '',
        ID: '',
        SizeName: '',
        InActive: false
    })


    const onClickDelete = (rowData) => {
        setDeleteBox(true);
        setSelectedList(rowData)
        setMsgString('Are you sure want to delete ?');

    }
    const Delete = () => {
        setloadingDelete(true)
        const ID = selectedList.ItemID;
        let payload = {
            FormName: 'Items',
            ID: ID
        }
        // props.deleteAllLists(payload);
    }
    const hide = () => {
        setSelectedList(null);
        setDeleteBox(false);
    }


    // const latestProps = useRef(props);
    useEffect(() => {
        props.getDriverRequsetsList(props.LoginRes.Res);
        setLoading(true);
        let SuperAdmin = JSON.parse(sessionStorage.getItem('SuperAdmin'));
        if (SuperAdmin !== null) {
            window.location = "#/access";
        }

    }, []);

    useEffect(() => {
        if (props.error) {
            setMsgString(props.error);
            setLoading(false);
            setloadingDelete(false)
            setErrorBox(true);


            props.AllListsNull()
        }

      
        if (props.DriverReqListRes) {
            props.AllListsNull()
            setLoading(false);

            console.log("DriverReqListRes",props.DriverReqListRes)
            setList(props.DriverReqListRes)
           
            };

            if (props.getDriverReqListNull) {
                props.AllListsNull()
                setLoading(false);
                setErrorBox(true);
                setMsgString("No Record Found, Please add Driver details");
                setAddBtn(true)
                setList([])
               
                };
            
     
    })
    let growl;

    const addNew = () => {
        let data = {
           
            newList: true,
            viewList: false,
            editList: false
        }
        props.history.push({
            pathname: "DriverRequsetsForm",
            data:data
        })



    }
    const onEdit = (rowData) => {
        console.log("rowData",rowData)
        let data = {
            Driver: Object.assign({}, rowData),
            newList: false,
            viewList: false,
            editList: true
        }

        props.history.push({
            pathname: "DriverRequsetsForm",
            data:data,
        })
      

           
    }

    
    const addView = (rowData) => {
        let data = {
            Driver: Object.assign({}, rowData),
            newList: false,
            viewList: true,
            editList: false
        }

        props.history.push({
            pathname: "DriverRequsetsForm",
            data:data,
        })
      

           
    }
    const hideError = () => {
        setErrorBox(false);
        setMsgString('');
    }

    return (
        <div className="p-grid p-fluid" >
            <div className="p-col-12 p-lg-12">
                <ErrorBox open={errorBox} onClose={hideError} msg={msgString} />
                <Growl ref={(el) => growl = el} position="topright" style={{ marginTop: '50px' }} />

                <MaterialTable
                    style={{
                        padding: '10px'
                    }}
                    title=
                    {
                        <div className="table-button" >
                            <span className="table-title" style={{ fontWeight: "bold", fontSize: "20px" }}>DriverRequsets</span>

                        </div>
                    }
                    isLoading={loading}
                   
                    data={List}
                    columns={[
                        { title: 'Driver Name', field: 'DriverName' },
                        { title: 'Licence No', field: 'DrivingLicenceNo' },
                        { title: 'Email', field: 'Email' },
                        { title: 'Registration No', field: 'RegistrationNo' },
                        { title: 'Vehicle No', field: 'VehicleNo' },
                        { title: 'Status', field: 'Status' }, ]}
                  
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'No records to display',
                            filterRow: {
                                filterTooltip: 'Filter'
                            }
                        }
                    }}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        pageSizeOptions: [5, 10, 20, 30],
                        search: true,
                        headerStyle: {

                            fontWeight: 'bold',
                            paddingLeft: '10px',
                            paddingRight: '0px',
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            textAlign: 'left'

                        }
                    }}
                    actions={[
                         
                        {
                            icon: VisibilityOutlinedIcon,
                            tooltip: 'View',
                            onClick: (event, rowData) => {
                                addView(rowData);
                            },
                            
                        },
                        // {
                       
                    ]}
                />
                <DeleteBox open={deleteBox} msg={msgString} onDelete={Delete} onCancel={hide} loadingDelete={loadingDelete} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        LoginRes: state.AuthReducer.LoginRes,
        DriverReqListRes:  state.AllActionReducer.DriverReqListRes,
        getDriverReqListNull:state.AllActionReducer.getDriverReqListNull

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        AllListsNull: () => dispatch(AllAction.AllListsNull()),
        getDriverRequsetsList: (payload) => dispatch(AllAction.getDriverRequsetsList(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverRequsets);