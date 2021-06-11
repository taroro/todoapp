import React from 'react';
import firebase from "./firebase";

class Students extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            fullname: ""
        };
    }

    updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    addUser = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection("Teacher").add({
            fullname: this.state.fullname,
            email: this.state.email
        }); 
        this.setState({
            fullname: "",
            email: ""
        });
    };

    setAuto = e => {
        this.setState({
            fullname: "Tar",
            email: "artid.b@ubu.ac.th"
        });
    }

  render() {
    return (
        <form onSubmit={this.addUser}>
          <input
            type="text"
            name="fullname"
            placeholder="Full name"
            onChange={this.updateInput}
            value={this.state.fullname}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.updateInput}
            value={this.state.email}
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={this.setAuto}>Auto</button>
        </form>
        );
      }
   }
export default Students;