import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { AuthAction } from './store/action';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ErrorBox from './components/ErrorBox/ErrorBox';
import encryptDecrypt from "./utilities/encryptDecrypt";
import constants from "./utilities/constants";

const constant = constants.getConstant();

class AppTopbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: {
                UserID: '',
                UserName: '',
                UserPass: '',
                Curr_Pass: '',
                New_Pass: '',
                Conf_Pass: ''
            },
            visibleChangePassDialog: false,
            changePassLoad: false,
            disablePassFields: false,
            msg: '',
            errorBox: false
        }
        this.SecretKey = constant.SecretKey;
    }

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    componentDidMount() {
        if (this.props.user) {
            let User = this.state.User;
            User['UserName'] = this.props.user[1].UserName;
            User['UserID'] = this.props.user[1].UserID;
            this.setState({
                User: User
            });
        }
        else {
            // window.location = "#/";
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.userDetailError) {
        //     this.setState({
        //         msg: nextProps.userDetailError,
        //         errorBox: true
        //     });
        //     this.props.userDetailNull();
        // }
        // if (nextProps.ChangePassRes) {
        //     let User = this.state.User;
        //     User['UserID'] = this.state.User.UserID;
        //     User['UserName'] = this.state.User.UserName;
        //     User['UserPass'] = '';
        //     User['Curr_Pass'] = '';
        //     User['New_Pass'] = '';
        //     User['Conf_Pass'] = '';
        //     this.setState({
        //         User: User,
        //         msg: nextProps.ChangePassRes.Message,
        //         errorBox: true,
        //         changePassLoad: false,
        //         disablePassFields: false,
        //         // visibleChangePassDialog: false,
        //     });
        //     this.props.changePassNull();
        // }
        // if (nextProps.userDetail) {
        //     let User = this.state.User;
        //     User['UserPass'] = nextProps.userDetail.Password
        //     this.setState({
        //         User: User
        //     });
        //     this.props.userDetailNull();
        // }
        // if (nextProps.sessionExpired) {
        //     window.location = "#/error";
        // }
    }

    onLogout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        this.props.logout();
        window.location = "#/"
    }

    checkField = () => {
        if (this.state.User.Curr_Pass === '' || this.state.User.Curr_Pass === undefined || this.state.User.Curr_Pass === null) {
            this.setState({
                msg: 'Please input Current Password.',
                errorBox: true
            });
            return false;
        }
        if (this.state.User.New_Pass === '' || this.state.User.New_Pass === undefined || this.state.User.New_Pass === null) {
            this.setState({
                msg: 'Please input New Password.',
                errorBox: true
            });
            return false;
        }
        if (this.state.User.Conf_Pass === '' || this.state.User.Conf_Pass === undefined || this.state.User.Conf_Pass === null) {
            this.setState({
                msg: 'Please Confirm Password.',
                errorBox: true
            });
            return false;
        }
        if (this.state.User.Conf_Pass !== this.state.User.New_Pass) {
            this.setState({
                msg: 'Passwords are not matched.',
                errorBox: true
            });
            return false;
        }
        return true;
    }

    checkPass = () => {
        let dct = new encryptDecrypt();
        let decrypted = dct.decrypt(this.state.User.UserPass, this.SecretKey);
        if (decrypted === this.state.User.Curr_Pass) {
            return true;
        }
        else {
            this.setState({
                msg: 'Current Password is incorrect.',
                errorBox: true
            });
            return false
        }
    }

    save = () => {
        if (this.checkField()) {
            if (this.checkPass()) {
                this.setState({ changePassLoad: true, disablePassFields: true });
                let encpt = new encryptDecrypt();
                let pass = encpt.encrypt(this.state.User.New_Pass,this.SecretKey);
                let payload = {
                    FormName: "ChangePassword",
                    Password: pass,
                    ID: this.state.User.UserID
                }
                this.props.changePass(payload);
            }
        }
    }

    handleClose = (e) => {
        let User = this.state.User;
            User['UserID'] = this.state.User.UserID;
            User['UserName'] = this.state.User.UserName;
            User['UserPass'] = '';
            User['Curr_Pass'] = '';
            User['New_Pass'] = '';
            User['Conf_Pass'] = '';
        this.setState({
            User:User,
            changePassLoad:false,
            errorBox:false,
            msg:'',
            visibleChangePassDialog: false
        });
    }

    onChangePassword = (e) => {
        e.preventDefault();
        if (this.state.User.UserID !== '') {
            this.setState({
                visibleChangePassDialog: true
            })
        }
    }

    updateProperty = (property, value) => {
        let User = this.state.User;
        User[property] = value;
        this.setState({ User: User });
    }

    hideError = () => {
        this.setState({
            errorBox: false,
            msg: ''
        });
    }

    loadUserInfo = () => {
        this.props.getUserDetail({ FormName: 'Users', ID: this.state.User.UserID });
    }

    render() {
        let topbarItemsClassName = classNames('topbar-items fadeInDown', { 'topbar-items-visible': this.props.topbarMenuActive });
        return (
            <div  className="layout-topbar clearfix">
                <button className="p-link layout-menu-button" onClick={this.props.onToggleMenu}>
                    <span className="pi pi-bars" />
                </button>
                <div className="layout-topbar-icons">
                    <button className="p-link" data-tip={this.state.UserID} onClick={this.props.onTopbarMenuButtonClick} style={{ float: 'right' }}>
                        <span className="layout-topbar-item-text" style={{ display: 'inline', fontSize: '14px', position: 'relative', bottom: '5px' }}>{this.state.UserID}</span>
                        <span className="layout-topbar-icon pi pi-user" />
                    </button>
                    {this.props.topbarMenuActive &&
                        <ul style={{ backgroundColor: 'grey', marginTop: '34px', borderRadius: '5px', padding: '10px', paddingLeft: '2px', height: '90px' }} className={topbarItemsClassName}>

                            <ul className="layout-menu fadeInDown" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                <li role="menuitem">
                                    <button className="p-link" onClick={this.onChangePassword}>
                                        <i className="fa fa-fw fa-lock"></i>
                                        <span>Change Password</span>
                                    </button>
                                </li>
                                <li role="menuitem">
                                    <button className="p-link" onClick={this.onLogout}>
                                        <i className="fa fa-fw fa-sign-out"></i>
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>


                        </ul>
                    }
                </div>
                {
                    this.state.visibleChangePassDialog &&
                    <React.Fragment>
                        <Dialog onEnter={() => this.loadUserInfo()} onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.visibleChangePassDialog}>
                            <ErrorBox open={this.state.errorBox} onClose={this.hideError} msg={this.state.msg} />
                            <MuiDialogTitle disableTypography>
                                <Typography variant="h6">Change Password</Typography>
                                <IconButton style={{ position: 'absolute', right: '5px', top: '10px' }} aria-label="close" onClick={this.handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </MuiDialogTitle>
                            <DialogContent dividers style={{ width: `${Math.ceil(window.outerWidth / 3)}px` }}  >
                                <TextField fullWidth value={this.state.User.UserName} disabled={true} style={{ display: 'block', marginBottom: '10px' }} variant="outlined" label="User ID" />
                                <TextField fullWidth type="password" value={this.state.User.Curr_Pass} disabled={this.state.disablePassFields} onChange={(e) => this.updateProperty('Curr_Pass', e.target.value)} style={{ display: 'block', marginBottom: '10px' }} variant="outlined" label="Current Password" />
                                <TextField fullWidth type="password" value={this.state.User.New_Pass} disabled={this.state.disablePassFields} onChange={(e) => this.updateProperty('New_Pass', e.target.value)} style={{ display: 'block', marginBottom: '10px' }} variant="outlined" label="New Password" />
                                <TextField fullWidth type="password" value={this.state.User.Conf_Pass} disabled={this.state.disablePassFields} onChange={(e) => this.updateProperty('Conf_Pass', e.target.value)} style={{ display: 'block', marginBottom: '10px' }} variant="outlined" label="Confirm Password" />
                            </DialogContent>
                            <MuiDialogActions>
                                {
                                    this.state.changePassLoad === false ?
                                        <Button onClick={(e) => this.save()} variant="outlined" >Change</Button>
                                        : null
                                }
                                <Button onClick={this.handleClose} variant="outlined">Cancel</Button>
                            </MuiDialogActions>
                        </Dialog>
                    </React.Fragment>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // user: state.AuthReducer.user,
        // sessionExpired: state.SessionExpiredReducer.sessionExpired,
        // userDetail: state.AuthReducer.userDetail,
        // ChangePassRes: state.AuthReducer.PassChangeRes,
        // userDetailError: state.AuthReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(AuthAction.logout()),
        // getUserDetail: (payload) => dispatch(AuthAction.getUserDetail(payload)),
        // userDetailNull: () => dispatch(AuthAction.userDetailNull()),
        // changePass: (payload) => dispatch(AuthAction.changePass(payload)),
        // changePassNull: () => dispatch(AuthAction.ChangePassNULL()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppTopbar);