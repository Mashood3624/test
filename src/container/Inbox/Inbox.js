import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { GiftedChat } from "react-web-gifted-chat";

// import Button from "@material-ui/core/Button";
// import Avatar from "@material-ui/core/Avatar";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListItemText from "@material-ui/core/ListItemText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Dialog from "@material-ui/core/Dialog";
// import Typography from "@material-ui/core/Typography";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import appFirebase from '../../utilities/Firebase';



class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {},
      isAuthenticated: false,
    };
  }




//   componentDidMount() {

//   }

//   //   loadMessages() {
//   //     const callback = snap => {
//   //       const message = snap.val();
//   //       message.id = snap.key;
//   //       const { messages } = this.state;
//   //       messages.push(message);
//   //       this.setState({ messages });
//   //     };
//   //     firebase
//   //       .database()
//   //       .ref("/messages/")
//   //       .limitToLast(12)
//   //       .on("child_added", callback);
//   //   }

//   renderPopup() {
//     return (
//       <Dialog open={!this.state.isAuthenticated}>
//         <DialogTitle id="simple-dialog-title">Sign in</DialogTitle>
//         <div>
//           <List>
//             <ListItem button onClick={() => this.signIn()}>
//               <ListItemAvatar>
//                 <Avatar style={{ backgroundColor: "#eee" }}>
//                   <img
//                     src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
//                     height="30"
//                     alt="G"
//                   />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText primary="Sign in with Google" />
//             </ListItem>
//           </List>
//         </div>
//       </Dialog>
//     );
//   }

//   onSend(messages) {
//     for (const message of messages) {
//       this.saveMessage(message);
//     }
//   }

//   fun = () => {
//     const { otherUserId } = this.props.navigation.state.params
//     const { userId } = this.props.userObj
//     const { messageList } = this.state
//     const appFirebase = firebaseLib.firestore()
//     userObj = {
//       [userId]: true,
//       [otherUserId]: true,
//       createdAt: Date.now()
//     }

//     appFirebase.collection("Rooms")
//       .where("userObj." + userId, '==', true)
//       .where("userObj." + otherUserId, '==', true)
//       .onSnapshot(snapShot => {
//         console.log({ snapShot })
//         if (snapShot.empty) {
//           appFirebase.collection('Rooms').add({ userObj }).then((doc) => {
//             const roomId = doc.id
//             this.setState({ roomId })
//             return
//           })
//         }
//         snapShot.docChanges.forEach((value) => {
//           this.setState({ roomId: value.doc.id })
//           appFirebase.collection('Rooms').doc(value.doc.id)
//             .collection('Messages')
//             .orderBy('createdAt')
//             .onSnapshot(querySnapShot => {
//               if (querySnapShot.empty) console.log("nothing"); return
//               querySnapShot.docChanges.forEach((values) => {
//                 messageList.push(values.doc.data())
//               })
//               console.log({ messageList })
//               this.setState({ messageList })
//             })

//         })

//       })
//   }



//   sendMessage = async () => {
//     const { otherUserId } = this.props.navigation.state.params
//     const { userId, userName } = this.props.userObj
//     const { roomId, message } = this.state
//     const appFirebase = firebaseLib.firestore()
//     if (!message) return alert('Write a message')
//     const msgObj = {
//       message: message,
//       senderId: userId,
//       recieverId: otherUserId,
//       createdAt: Date.now(),
//       senderName: userName
//     }
//     await appFirebase.collection('Rooms').doc(roomId).collection('Messages').add(msgObj)
//     this.setState({ message: '' })
//   }


//   saveMessage(message) {
//     return appFirebase
//       .collection("")
//       .ref("/messages/")
//       .push(message)
//       .catch(function (error) {
//         console.error("Error saving message to Database:", error);
//       });
//   }

//   renderSignOutButton() {
//     if (this.state.isAuthenticated) {
//       return <Button onClick={() => this.signOut()}>Sign out</Button>;
//     }
//     return null;
//   }

//   renderChat() {
//     return (
//       <GiftedChat
//         user={this.chatUser}
//         messages={this.state.messages.slice().reverse()}
//         onSend={messages => this.onSend(messages)}
//       />
//     );
//   }

//   renderChannels() {
//     return (
//       <List>
//         <ListItem button>
//           <ListItemAvatar>
//             <Avatar>D</Avatar>
//           </ListItemAvatar>
//           <ListItemText primary="Default" />
//         </ListItem>


//         <ListItem button>
//           <ListItemAvatar>
//             <Avatar>D</Avatar>
//           </ListItemAvatar>
//           <ListItemText primary="Default" />
//         </ListItem>
//       </List>
//     );
//   }

//   renderChannelsHeader() {
//     return (
//       <AppBar position="static" color="default">
//         <Toolbar>
//           <Typography variant="h6" color="inherit">
//             Users
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     );
//   }
//   renderChatHeader() {
//     return (
//       <AppBar position="static" color="default">
//         <Toolbar>
//           <Typography variant="h6" color="inherit">
//             Default channel
//           </Typography>

//         </Toolbar>
//       </AppBar>
//     );
//   }
//   renderSettingsHeader() {
//     return (
//       <AppBar position="static" color="default">
//         <Toolbar>
//           <Typography variant="h6" color="inherit">
//             Settings
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     );
//   }

  render() {
    return (
      <div style={styles.container}>

        {/* {this.renderPopup()} */}
        {/* <div style={styles.channelList}>
          {this.renderChannelsHeader()}
          {this.renderChannels()}
        </div> */}
        {/* <div style={styles.chat}>
          {this.renderChatHeader()}
          {this.renderChat()}
        </div> */}
        {/* <div style={styles.settings}>
          {this.renderSettingsHeader()}
          {this.renderSignOutButton()}
        </div> */}
      </div>
    );
  }
 }


const styles = {
   container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "80vh",
    backgroundColor: 'white'
  },
  channelList: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  chat: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    borderWidth: "1px",
    borderColor: "#ccc",
    borderRightStyle: "solid",
    borderLeftStyle: "solid",
  },
  settings: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
};

export default Inbox