/*eslint-disable */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import MaterialTable from 'material-table'

class LookUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lookUpFilter: null

        };
    }
    componentDidUpdate() {
        if (this.props.LookUpOpen === false && this.state.lookUpFilter !== null) {
            this.setState({
                lookUpFilter: null
            })

        }


    }
    render() {
        var { LookUpClose, setLookUpData, onSelChangeLookUpData, LookUpOpen } = this.props;
        return (

            <div>
                {LookUpOpen &&

                    <div ref={this.props.reference} className="card card-w-title our-lookup p-col-12 p-md-8 p-lg-9" style={{ backgroundColor: 'transparent', padding: 0, overflow: "scroll", maxHeight: 300, width: 350, }}>
                        {this.props.columns &&
                            <MaterialTable


                                onRowClick={(e, x) => setLookUpData(e, x)}
                                columns={this.props.columns}
                                data={this.props.rows}
                                options={{
                                    search: false,
                                    showTitle: false,
                                    paging: false,
                                    sorting: false,
                                    search: false,

                                }}


                            />
                        }
                    </div>
                }
            </div>


        )
    }



}


// LookUp.propTypes = {

//     LookUpClose: PropTypes.func,
//     setLookUpData: PropTypes.func,
//     onSelChangeLookUpData: PropTypes.func,
//     lookUpOpen:PropTypes.bool
// };


export default LookUp;