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

const CreateCompany = (props) => {

    const [deleteBox, setDeleteBox] = useState(false);
    const [loadingDelete, setloadingDelete] = useState(false);
    const [actionCol, setActionCol] = useState([]);

    const [errorBox, setErrorBox] = useState(false);
    const [msgString, setMsgString] = useState('');
    const [selectedList, setSelectedList] = useState(null);
    const [List, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [AddBtn, setAddBtn] = useState(false);
    
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
        props.getCompany(props.LoginRes.Res);
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

      
        if (props.getCompanyList) {
            props.AllListsNull()
            setLoading(false);
            console.log("getCompanyList",props.getCompanyList[0])
            setList([props.getCompanyList[0]])
           
            };

            if (props.getCompanyListNull) {
                props.AllListsNull()
                setLoading(false);
                setErrorBox(true);
                setMsgString("No Record Found, Please add company details");
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
            pathname: "CreateCompanyForm",
            data:data
        })



    }
    const onEdit = (rowData) => {
        console.log("rowData",rowData)
        let data = {
            Company: Object.assign({}, rowData),
            newList: false,
            viewList: false,
            editList: true
        }

        props.history.push({
            pathname: "CreateCompanyForm",
            data:data,
        })
      

           
    }

    
    const addView = (rowData) => {
        let data = {
            Company: Object.assign({}, rowData),
            newList: false,
            viewList: true,
            editList: false
        }

        props.history.push({
            pathname: "CreateCompanyForm",
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
                            <span className="table-title" style={{ fontWeight: "bold", fontSize: "20px" }}>Company Details</span>
                            {AddBtn && <Button variant="contained" onClick={() => addNew()} className="table-button">Add<i className="fa fa-plus" style={{ marginLeft: '10px' }} disabled={false}></i></Button>}

                        </div>
                    }
                    isLoading={loading}
                    // columns={List.columns}
                    data={List}
                    columns={[
                        { title: 'Company Name', field: 'CompanyName' },
                        { title: 'Owner Name', field: 'OwnerName' },
                        { title: 'No OF Employee', field: 'NoOFEmployee' },
                        { title: 'Registration No', field: 'RegistrationNo' },
                        { title: 'GSTN No', field: 'GSTN_No' },
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
                            icon: 'edit',
                            tooltip: 'edit',
                            onClick: (event, rowData) => {
                                onEdit(rowData);
                            },
                            // disabled:this.btnEditRights === true ? false : true
                        },
                        {
                            icon: VisibilityOutlinedIcon,
                            tooltip: 'View',
                            onClick: (event, rowData) => {
                                addView(rowData);
                            },
                            // disabled:this.btnViewRights === true ? false : true
                        },
                        // {
                        //     icon: 'delete',
                        //     tooltip: 'Delete',
                        //     onClick: (event, rowData) => {
                        //         onClickDelete(rowData)
                        //     },
                        //     // disabled: this.btnDeleteRights === true ? false : true
                        // },
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
        getCompanyList:  state.AllActionReducer.getCompanyList,
        getCompanyListNull:state.AllActionReducer.getCompanyListNull
        // users: state.AuthReducer.user,
        // userActions: state.AuthReducer.userActions,
        // ListRes: state.AllActionReducer.ListRes,
        // ListDelRes: state.AllActionReducer.ListDelRes,
        // ListInsertRes: state.AllActionReducer.ListInsertRes,
        // ListUpdateRes: state.AllActionReducer.ListUpdateRes,
        // error: state.AllActionReducer.error,
        // sessionExpired: state.SessionExpiredReducer.sessionExpired
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        AllListsNull: () => dispatch(AllAction.AllListsNull()),

        getCompany: (payload) => dispatch(AllAction.getCompany(payload)),
        // deleteAllLists: (payload) => dispatch(AllAction.deleteAllLists(payload)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCompany);