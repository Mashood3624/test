/*eslint-disable */
import React, { useState, useRef, useEffect, } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import GlobalHeader from "../../components/GlobalHeader/GlobalHeader"

import MenuItem from '@material-ui/core/MenuItem';
import { v4 as uuidv4 } from 'uuid';
import { AllAction } from '../../store/action';
import { Button } from 'primereact/button';
import LookUp from '../../components/Lookup/LookUp';
import ErrorBox from '../../components/ErrorBox/ErrorBox';
import { FileUpload } from 'primereact/fileupload';
import FileUploader from "react-firebase-file-uploader";
import appFirebase from '../../utilities/Firebase';
import { ProgressBar } from 'primereact/progressbar';

const ProductsForm = (props) => {

    const Item = [
        "Category1",
        "Category2",
        "Category3",
        "Category4",
        "Category5",
        "Category6",
        "Category7",
        "Category8",
        "Category9",
        "Category10",
        "Category11",
        "Category12",
        "Category13",
        "Category14",

    ]
    const handleChangeCategory = event => {
        console.log("handleChangeCategory", event.target.value)

        setCategory(event.target.value)


    };



    const [Category, setCategory] = useState("");


    const [UploadSuc, setUploadSuc] = useState(false);

    const [Rejected, setRejected] = useState(false);
    const [RejectedMsg, setRejectedMsg] = useState("");
    const [loadingOnSave, setloadingOnSave] = useState(false);
    const [errorBox, setErrorBox] = useState(false);
    const [msgString, setMsgString] = useState('');
    const [newData, setNewData] = useState(true);
    const [ViewData, setViewData] = useState(false);
    const [UploadPrgress, setUploadPrgress] = useState(0)
    const [PrgressBar, setPrgressBar] = useState(false)
    const [ListCategory, setListCategory] = useState([])


    const [Products, setProducts] = useState({
        CompanyLocation: '',
        ProductName: '',
        Price: '',
        AvailableTimeFrom: '',
        AvailableTimeTo: '',
        Availablelocations: '',
        CommissionRate: '',
        ProductImages: [],
        ProductsID: '',
        ProductCategory: ''

    });
    const checkFields = () => {
        if (Products.CompanyLocation === '' || Products.CompanyLocation === null || Products.CompanyLocation === undefined) {
            setMsgString('Please Input Products Name');
            setErrorBox(true);
            return false;
        }
        else if (Products.ProductName === '' || Products.ProductName === undefined) {
            setMsgString('Please Input Valid ProductName');
            setErrorBox(true);
            return false;
        }
        else if (Products.Price === '' || Products.Price.length === null || Products.Price === undefined) {
            setMsgString('Please Input  Price  ');
            setErrorBox(true);
            return false;
        }
        else if (Products.AvailableTimeFrom === '' || Products.AvailableTimeFrom === null || Products.AvailableTimeFrom === undefined) {
            setMsgString('Please Input Available Time From');
            setErrorBox(true);
            return false;
        }
        else if (Products.AvailableTimeTo === '' || Products.AvailableTimeTo === null || Products.AvailableTimeTo === undefined) {
            setMsgString('Please Input  Available Time To');
            setErrorBox(true);
            return false;
        }
        else if (Products.Availablelocations === '' || Products.Availablelocations === null || Products.Availablelocations === undefined) {
            setMsgString('Please Input Available locations');
            setErrorBox(true);
            return false;
        }
        else if (Products.CommissionRate === '' || Products.CommissionRate === null || Products.CommissionRate === undefined) {
            setMsgString('Please Input Commission Rate');
            setErrorBox(true);
            return false;
        }
        else if (Products.ProductImages.length === 0 || Products.ProductImages === null || Products.ProductImages === undefined) {
            setMsgString('Please Upload Product Photoes');
            setErrorBox(true);
            return false;
        }

        else {
            return true;
        }

    }











    const insertProducts = (arr, payload) => {
        let newArr = arr
        newArr.push(payload)
        appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).update({
            products: newArr
        }).
            then((doc) => {
                props.history.push({
                    pathname: "Products"
                })
            }).catch((err) => {
                console.log({ err })
            })
    }

    const insertProductsFunc= (payload) => {
        console.log({ payload })

       
            appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).get().
                then((doc) => {
                    console.log({ data: doc.data().products  })
                    insertProducts(doc.data().products, payload)
                }).catch((err) => {
                    console.log({ err })
             

        }) 


    }




    const updateProducts = (arr, payload) => {
        let newArr = arr
       

        var index = -1;
        for (var i = 0, len = newArr.length; i < len; i++) {
            if (newArr[i].ProductsID === payload.ProductsID) {
                index = i;
                break;
            }
        }
        console.log({ index })
        newArr[index] = payload
        appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).update({
            products: newArr
        }).
            then((doc) => {
                props.history.push({
                    pathname: "Products"
                })
            }).catch((err) => {
                console.log({ err })
            })

    }
    const updateProductsFunc = (payload) => {
        appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).get().
            then((doc) => {
                console.log({ data: doc.data().products })
                updateProducts(doc.data().products, payload)
            }).catch((err) => {
                console.log({ err })
            })

    }





































    const handleSave = () => {

        if (checkFields()) {
            setloadingOnSave(true)

            if(newData){
                let payload = {

                    CompanyLocation: Products.CompanyLocation,
                    ProductName: Products.ProductName,
                    Price: Products.Price,
                    AvailableTimeFrom: Products.AvailableTimeFrom,
                    AvailableTimeTo: Products.AvailableTimeTo,
                    Availablelocations: Products.Availablelocations,
                    CommissionRate: Products.CommissionRate,
                    Status: "Approved",
                    CompanyId: props.LoginRes.Res,
                    ProductImages: Products.ProductImages,
                    ProductsID:  uuidv4() ,
                    ProductCategory: Products.ProductCategory
    
    
                }
    
    
                insertProductsFunc(payload)
            }
           else{
            let payload = {

                CompanyLocation: Products.CompanyLocation,
                ProductName: Products.ProductName,
                Price: Products.Price,
                AvailableTimeFrom: Products.AvailableTimeFrom,
                AvailableTimeTo: Products.AvailableTimeTo,
                Availablelocations: Products.Availablelocations,
                CommissionRate: Products.CommissionRate,
                Status: "Approved",
                CompanyId: props.LoginRes.Res,
                ProductImages: Products.ProductImages,
                ProductsID: Products.ProductsID,
                ProductCategory: Products.ProductCategory


            }

            updateProductsFunc(payload)
           }
          
            // props.insertProducts(payload)


        }


    };
    const hideError = () => {
        setErrorBox(false);
        setMsgString('');
    }
    const ImagesDiv = () =>
        <div>

        </div>
    useEffect(() => {
        getList()
        // appFirebase.firestore().collection(`categories(${props.LoginRes.Res})`).get()
        //     .then((querySnapshot) => {
        //         let arr = []
        //         querySnapshot.forEach(function (doc) {
        //             arr.push(doc.data().payload)
        //             // doc.data() is never undefined for query doc snapshots
        //             console.log(doc.id, " => ", doc.data());
        //         })
        //         setListCategory(arr)
               
        //     })








        let SuperAdmin = JSON.parse(sessionStorage.getItem('SuperAdmin'));
        if (SuperAdmin !== null) {
            window.location = "#/access";
        }
        if (props.location.data) {

            if (props.location.data.editList) {
                setNewData(false)

                let Products = props.location.data.Products
                console.log("Products", Products)
                setUploadSuc(true)
                setProducts({
                    CompanyLocation: Products.CompanyLocation,
                    ProductName: Products.ProductName,
                    Price: Products.Price,
                    AvailableTimeFrom: Products.AvailableTimeFrom,
                    AvailableTimeTo: Products.AvailableTimeTo,
                    Availablelocations: Products.Availablelocations,
                    CommissionRate: Products.CommissionRate,
                    Status: "Approved",
                    CompanyId: Products.CompanyId,
                    ProductImages: Products.ProductImages,
                    ProductsID: Products.ProductsID,
                    ProductCategory: Products.ProductCategory

                })

                if (Products.Status === "Rejected") {
                    setRejected(true)
                    setRejectedMsg(Products.Reason)
                }
            }
            else if (props.location.data.newList) {


            }
            else if (props.location.data.viewList) {
                setViewData(true)
                setNewData(false)
                setUploadSuc(true)
                let Products = props.location.data.Products
                console.log("Products", Products)
                setProducts({
                    CompanyLocation: Products.CompanyLocation,
                    ProductName: Products.ProductName,
                    Price: Products.Price,
                    AvailableTimeFrom: Products.AvailableTimeFrom,
                    AvailableTimeTo: Products.AvailableTimeTo,
                    Availablelocations: Products.Availablelocations,
                    CommissionRate: Products.CommissionRate,
                    Status: "Approved",
                    CompanyId: Products.CompanyId,
                    ProductImages: Products.ProductImages,
                    ProductsID: Products.ProductsID,
                    ProductCategory: Products.ProductCategory
                })
            }
        }
        else {
            props.history.push({
                pathname: "Products"
            })
        }
    }, []);
    const handleUploadStart = () => {
        setPrgressBar(true)
        setUploadPrgress(20)
    }
    const getList=()=>{
        
        

        appFirebase.firestore().collection("companies").doc(props.LoginRes.Res).get().
        then((doc) => {
            console.log({ data: doc.data().category })
     
            setListCategory(  doc.data().category)
            // setList({ ...List, rows: doc.data().category })
        }).catch((err) => {
            console.log({ err })
        })
        

    }
    const handleUploadSuccess = filename => {
        let arr = [];
        console.log({ filename })
        const ext = filename.split('.').pop();


        if (ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
            appFirebase
                .storage()
                .ref("ProductImges/" + props.LoginRes.Res)
                .child(filename)

                .getDownloadURL()
                .then(
                    url =>

                        Products.ProductImages.push({
                            filename,
                            url
                        }),
                    // setProducts({ ...Products, ProductImages: arr }),
                    setUploadPrgress(100),
                    setUploadSuc(true),
                    setTimeout(() => setPrgressBar(false), 1000)
                );

        }
        else {
            setProducts({ ...Products, ProductImages: "" })
            setUploadPrgress(0)
            setMsgString('Image Must   Only be In (jpeg,png Or jpg )formates');
            setErrorBox(true);
        }
    };

    const displayList = () => {
        return (Products.ProductImages.map((item, ind) => {
            return (

                <div className="p-col-6 p-lg-2" style={{ border: "1px solid" }}>

                    <img key={ind} src={item.url} alt="Smiley face" height="200px" width="200px" />
                    <i style={{ cursor: 'pointer', position: "relative", top: 0, left: 0, zIndex: 100 }} onClick={(e) => deleteImage(item, ind)} className="fa fa-trash fa-2x" aria-hidden="true"></i>

                </div>
            )
        }));
    }
    const deleteImage = (item, ind) => {
        console.log({ item, ind })
        Products.ProductImages.splice(ind, 1)

        appFirebase.storage().ref("ProductImges/" + props.LoginRes.Res).child(item.filename).delete()

    }
    useEffect(() => {
        if (props.error) {

        }

        if (props.insertProductRes) {

            window.location = "#/Products";

            props.AllListsNull()
        }
        if (props.updateProductsRes) {

            window.location = "#/Products";

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
                                    <TextField label="Company Location" onChange={e => setProducts({ ...Products, CompanyLocation: e.target.value })} value={Products.CompanyLocation} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Product Name" onChange={e => setProducts({ ...Products, ProductName: e.target.value })} value={Products.ProductName} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Price" onChange={e => setProducts({ ...Products, Price: e.target.value })} value={Products.Price} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="wholesale Price" onChange={e => setProducts({ ...Products, Price: e.target.value })} value={Products.Price} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Masjid Price" onChange={e => setProducts({ ...Products, Price: e.target.value })} value={Products.Price} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Available Time From" id="time" type="time" defaultValue="07:30" InputLabelProps={{ shrink: true, }} onChange={e => setProducts({ ...Products, AvailableTimeFrom: e.target.value })} value={Products.AvailableTimeFrom} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Available Time To" id="time" type="time" defaultValue="07:30" InputLabelProps={{ shrink: true, }} onChange={e => setProducts({ ...Products, AvailableTimeTo: e.target.value })} value={Products.AvailableTimeTo} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Available locations" onChange={e => setProducts({ ...Products, Availablelocations: e.target.value })} value={Products.Availablelocations} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>
                                <div className="p-col-6 p-lg-4">
                                    <TextField label="Commission Rate" onChange={e => setProducts({ ...Products, CommissionRate: e.target.value })} value={Products.CommissionRate} fullWidth style={{ display: 'block' }} variant="outlined" />
                                </div>

                                <div className="p-col-6 p-lg-4  ">
                                    <TextField
                                        fullWidth
                                        select
                                        id="outlined-select-currency"
                                        label="Product Category"
                                        value={Products.ProductCategory}
                                        // onChange={(e) => handleChangeCategory(e)}
                                        onChange={e => setProducts({ ...Products, ProductCategory: e.target.value })}

                                        helperText=""
                                        variant="outlined"
                                    >
                                        {ListCategory.map((item) => {
                                            return <MenuItem value={item.CategoriesName}>{item.CategoriesName}</MenuItem>
                                        })

                                        }

                                    </TextField>
                                </div>
                                {ViewData === false &&
                                    <div className="p-col-12 p-lg-12">
                                        <h2>Upload Photoes In (jpeg,png Or jpg ) Formates Only</h2>

                                    </div>}


                                {ViewData === false &&
                                    <div className="p-col-12 p-lg-12">



                                        <FileUploader
                                            multiple
                                            accept="images/*"
                                            name="avatar"
                                            // randomizeFilename
                                            storageRef={appFirebase.storage().ref("ProductImges/" + props.LoginRes.Res)}
                                            onUploadStart={handleUploadStart}
                                            // onUploadError={this.handleUploadError}
                                            onUploadSuccess={handleUploadSuccess}
                                        // onProgress={this.handleProgress}
                                        />
                                        {PrgressBar &&
                                            <ProgressBar value={UploadPrgress}></ProgressBar>}

                                    </div>}



                                {ViewData === false && <div className="p-col-4   p-offset-8">
                                    <Button label="Submit" icon="pi pi-check" onClick={handleSave} />
                                </div>}


                            </div>
                        </div>
                    </div>
                </div>

                <div className="card card-w-title " style={{ boxShadow: "-1px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)" }} >


                    {UploadSuc ?


                        <div className="p-grid">
                            {displayList()}


                        </div>
                        :
                        <div className="p-grid">
                            <div className="p-col-6 p-lg-3">
                                <img src="https://cdn.onlinewebfonts.com/svg/img_148071.png" alt="Smiley face" height="150px" width="150px" />
                            </div>
                            <div className="p-col-6 p-lg-3">
                                <img src="https://cdn.onlinewebfonts.com/svg/img_148071.png" alt="Smiley face" height="150px" width="150px" />
                            </div>
                            <div className="p-col-6 p-lg-3">
                                <img src="https://cdn.onlinewebfonts.com/svg/img_148071.png" alt="Smiley face" height="150px" width="150px" />
                            </div>
                            <div className="p-col-6 p-lg-3">
                                <img src="https://cdn.onlinewebfonts.com/svg/img_148071.png" alt="Smiley face" height="150px" width="150px" />
                            </div>
                        </div>

                    }

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        error: state.AllActionReducer.error,
        insertProductRes: state.AllActionReducer.insertProductRes,
        updateProductsRes: state.AllActionReducer.updateProductsRes,
        LoginRes: state.AuthReducer.LoginRes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AllListsNull: () => dispatch(AllAction.AllListsNull()),
        insertProducts: (payload) => dispatch(AllAction.insertProducts(payload)),
        updateProducts: (payload) => dispatch(AllAction.updateProducts(payload)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsForm);