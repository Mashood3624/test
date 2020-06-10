import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MaterialTable from 'material-table';
import { Dialog } from 'primereact/dialog';

const TableLookup = (props) => {
    const data=[{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'},{text:'text',dec:'test'}]
    const columns=[{title:'text',field:'text'},{title:'dec',field:'dec'}]
    return (
        <Dialog visible={props.lookUpOpen} onHide={props.LookUpClose} showHeader={false} style={{ width: `${Math.ceil(window.outerWidth / 2.4)}px` }} contentStyle={{
            backgroundColor: 'transparent',
            padding: '0px',
            border: 'none'
        }} modal={true} >
            <MaterialTable

                data={props.LookupList.rows}
                columns={props.LookupList.columns}
                onRowClick={props.setLookUpData}
                title=
                {
                    <div className="lookup-table-close-button" >
                        <span className="table-title" style={{  fontSize: "18px" }}>{props.title}</span>
                        <IconButton disableFocusRipple={true} aria-label="close" onClick={props.LookUpClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                }
                style={{
                    padding: '5px',
                }}
                options={{
                    paging:false,
                    sorting:false,
                    maxBodyHeight:'260px',
                    headerStyle: {
                        fontWeight: 'bold',
                        paddingTop: '0px',
                        paddingBottom: '5px',
                        textAlign: 'left'
                    }
                }}
            />
        </Dialog>
    )
}

TableLookup.propTypes={
    LookUpClose: PropTypes.func,
    setLookUpData: PropTypes.func,
    onSelChangeLookUpData: PropTypes.func,
    lookUpOpen:PropTypes.bool
}

export default TableLookup;