/*eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { AllAction } from '../../store/action/index';
import DeleteBox from '../../components/DeleteBox/DeleteBox';
import ErrorBox from '../../components/ErrorBox/ErrorBox';
import { ProgressSpinner } from 'primereact/progressspinner';
import appFirebase from '../../utilities/Firebase';
const Categories = (props) => {
    const Categories = {
        Code: '',
        ID: '',
        CategoriesName: ''
    }
    const [actionCol, setActionCol] = useState([]);
    const [deleteBox, setDeleteBox] = useState(false);
    const [loadingDelete, setloadingDelete] = useState(false);


    const [errorBox, setErrorBox] = useState(false);
    const [editData, setEditData] = useState(false);
    const [msgString, setMsgString] = useState('');
    const [selectedList, setSelectedList] = useState(null);
    const [List, setList] = useState({

        rows: [],
        columns: [  
        { title: 'Categories Name', field: 'CategoriesName' },
        ]

    });
    const [loading, setLoading] = useState(false);
    const [property, updatePropert] = useState({
        Code: '',
        ID: '',
        CategoriesName: '',
        InActive: false
    })
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [loadingOnSave, setloadingOnSave] = useState(false);

    const onClickDelete = (rowData) => {
        setDeleteBox(true);
        setSelectedList(rowData);
    }


     const DeleteCategory = (arr, payload) => {
        let newArr = arr
        

        var index = -1;
        for (var i = 0, len = newArr.length; i < len; i++) {
            if (newArr[i].CategoriesName === payload.CategoriesName) {
                index = i;
                break;
            }
        }
        console.log({ index })

        newArr.splice(index,1)
        appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).update({
            category: newArr
        }).
            then((doc) => {
                setloadingDelete(false);
                setDeleteBox(false);
                getList()
                 
            }).catch((err) => {
                console.log({ err })
            })

    }
    const Delete = () => {
        console.log({selectedList})
        setloadingDelete(true)
        appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).get().
        then((doc) => {
            console.log({ data: doc.data().category })
            DeleteCategory(  doc.data().category, selectedList )
            
           
        }).catch((err) => {
            console.log({ err })
        })
     
         
    }
    const hide = () => {
        setSelectedList(null);
        setDeleteBox(false);
    }
    const getList=()=>{
        
        setLoading(true);

        appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).get().
        then((doc) => {
            console.log({ data: doc.data().category })
            setLoading(false);
            
            setList({ ...List, rows: doc.data().category })
        }).catch((err) => {
            console.log({ err })
        })
        

    }

    const insertCategory=(arr, payload)=>{

       
            let newArr = arr
            newArr.push(payload)
            appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).update({
                category: newArr
            }).
                then((doc) => {
                    setVisibleDialog(false);
                    getList()
                }).catch((err) => {
                    console.log({ err })
                })
        
        


    }

    const insertCategoryFunc = (payload) => {
         

      
            appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).get().
                then((doc) => {
                    console.log({ data: doc.data().category })
                    insertCategory(doc.data().category, payload)
                }).catch((err) => {
                    console.log({ err })
                })

       


    }
    const handleSave = () => {
        if (checkFields()) {
            setloadingOnSave(true)
            let payload = {
                CategoriesName: property.CategoriesName,
               

            }


            insertCategoryFunc(payload)


            

            if (editData) {




                // console.log({ payload })
                // props.insertCategories(payload)
                // appFirebase.firestore().collection(`categories(${props.LoginRes.Res})`).add({
                //     payload
                // }).then(() => {
                //     setVisibleDialog(false);
                //     setLoading(true);
                   
                //     let arr = []
                //     setLoading(true);
                //     setloadingDelete(false)
                //     setDeleteBox(false);
                //     appFirebase.firestore().collection(`categories(${props.LoginRes.Res})`).get()
                //         .then((querySnapshot) => {
            
                //             querySnapshot.forEach(function (doc) {
                //                 let data = {
            
                //                     CategoriesName: doc.data().payload.CategoriesName,
                //                     docId: doc.id,
                //                     CpmapnyID: doc.data().payload.CpmapnyID
                //                 }
                //                 arr.push(data)
                //                 // doc.data() is never undefined for query doc snapshots
                //                 console.log(doc.id, " => ", doc.data());
                //             })
                //             setList({ ...List, rows: arr })
                //             console.log("arr", arr)
                //             setLoading(false);
                //         })


 
                        
                // }).catch(() => {

                // })
            }
            else {
                // let payload = {
                //     Header: Header,
                //     FormName: 'Categoriess',
                //     ID: selectedList.CategoriesID

                // }
                // props.updateAllLists(payload)
            }
        }


    };
    const checkFields = () => {
        if (property.CategoriesName === '' || property.CategoriesName === null || property.CategoriesName === undefined) {
            setMsgString('Please Input Categories Name');
            setErrorBox(true);
            return false;
        }
        return true;
    }
    // const latestProps = useRef(props);
    useEffect(() => {
        getList()
    }, []);

    useEffect(() => {
        if (props.error) {
            setDeleteBox(false);
            setLoading(false);
            setloadingDelete(false)
            setloadingOnSave(false)
            setVisibleDialog(false);
            setMsgString(props.error);
            setErrorBox(true);
            props.AllListsNull()
        }

        if (props.ListInsertRes) {
            let paylaod = {
                FormName: 'Categoriess'
            }
            props.getAllLists(paylaod)
            props.AllListsNull()
            setVisibleDialog(false);
            setLoading(true);
        }
        if (props.ListRes) {
            setActionCol([

            ]);
            const activeColumn = {
                title: "InActive",
                field: "InActive",
                render: rowData => {
                    return <span className="table-checkbox"><Checkbox disabled checked={rowData.InActive === 1 ? true : false} Categories="default" /></span>
                }
            };
            props.ListRes.columns.splice(2, 0, activeColumn);
            setLoading(false);
            setList(props.ListRes);
            props.AllListsNull()
        }
        if (props.ListUpdateRes) {
            let paylaod = {
                FormName: 'Categoriess'
            }
            props.getAllLists(paylaod)
            setVisibleDialog(false);
            setLoading(true);

            // setList(props.ListRes);
            props.AllListsNull()
        }
        if (props.ListDelRes) {
            setloadingDelete(false)
            props.AllListsNull();
            props.getAllLists({ FormName: 'Categoriess' });
            setLoading(true);
            setSelectedList(null);
            setDeleteBox(false);
            setMsgString('');
        }

        ;
    })
    let growl;

    const addNew = () => {
        updatePropert({
            code: '',
            ID: '',
            InActive: '',
            CategoriesName: ''
        })
        setloadingOnSave(false)
        setVisibleDialog(true)
        setEditData(true);
    }
  
    const handleClose = () => {
        setVisibleDialog(false)
    }
    const hideError = () => {
        setErrorBox(false);
        setMsgString('');
    }

    return (
        <div className="p-grid p-fluid" >
            <div className="p-col-12 p-lg-12">
                <ErrorBox open={errorBox} onClose={hideError} msg={msgString} />
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={visibleDialog}>
                    <MuiDialogTitle disableTypography>
                        <Typography variant="h6">Add Categories</Typography>
                        <IconButton style={{ position: 'absolute', right: '5px', top: '10px' }} aria-label="close" onClick={handleClose}>


                            <CloseIcon />
                        </IconButton>
                    </MuiDialogTitle>
                    <DialogContent dividers style={{ width: `${Math.ceil(window.outerWidth / 4)}px` }}  >
                        <div style={{ marginBottom: '10px', marginTop: '5px' }} >
                            {/* <TextField disabled value={property.Code} fullWidth style={{ display: 'block', marginBottom: '20px', width: '100%' }} id="standard-basic" label="Code" /> */}
                            <TextField onChange={e => updatePropert({ ...property, CategoriesName: e.target.value })} value={property.CategoriesName} fullWidth style={{ display: 'block', marginBottom: '20px' }} id="standard-basic" label="Category Name" />

                        </div>
                        {loadingOnSave &&
                            <div style={{ position: 'absolute', top: 100, left: 200 }}>
                                <ProgressSpinner />
                            </div>}
                    </DialogContent>
                    <MuiDialogActions>
                        <Button disabled={loadingOnSave === true ? true : false} autoFocus onClick={handleSave} variant="outlined"  >Save</Button>
                        <Button disabled={loadingOnSave === true ? true : false} autoFocus onClick={handleClose} variant="outlined">Cancel</Button>
                    </MuiDialogActions>
                </Dialog>
                <MaterialTable
                    style={{
                        padding: '10px'
                    }}
                    title=
                    {
                        <div className="table-button" >
                            <span className="table-title" style={{ fontWeight: "bold", fontSize: "20px" }}>Categories Details</span>
                            <Button variant="contained" onClick={() => addNew()} className="table-button">Add<i className="fa fa-plus" style={{ marginLeft: '10px' }} disabled={false}></i></Button>

                        </div>
                    }
                    isLoading={loading}
                    columns={List.columns}
                    data={List.rows}
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
                        // {
                        //     icon: 'edit',
                        //     tooltip: 'edit',
                        //     onClick: (event, rowData) => {
                        //         onEdit(rowData);
                        //     },
                        //     // disabled:this.btnEditRights === true ? false : true
                        // },

                        {
                            icon: 'delete',
                            tooltip: 'Delete',
                            onClick: (event, rowData) => {
                                onClickDelete(rowData)
                            },
                            // disabled: this.btnDeleteRights === true ? false : true
                        },
                    ]}
                />
                <DeleteBox open={deleteBox} onDelete={Delete} onCancel={hide} loadingDelete={loadingDelete} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        LoginRes: state.AuthReducer.LoginRes,
        // users: state.AuthReducer.user,
        // userActions: state.AuthReducer.userActions,
        // ListRes: state.AllActionReducer.ListRes,
        // ListDelRes: state.AllActionReducer.ListDelRes,
        // ListInsertRes: state.AllActionReducer.ListInsertRes,
        // ListUpdateRes: state.AllActionReducer.ListUpdateRes,
        // error: state.AllActionReducer.error,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        insertCategories: (payload) => dispatch(AllAction.insertCategories(payload)),
        // AllListsNull: () => dispatch(AllAction.AllListsNull()),
        // updateAllLists: (payload) => dispatch(AllAction.updateAllLists(payload)),
        // getAllLists: (payload) => dispatch(AllAction.getAllLists(payload)),
        // deleteAllLists: (payload) => dispatch(AllAction.deleteAllLists(payload)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);