import React, { Component } from "react";
import "./App.css";
import UserList from "../src/containers/userlisting/userlisting";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      descr: "",
      url: "",
      userListing: null,
      button: "Submit",
      pageTitle: "Add Projects",
      ammendID: ""
    };
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeDescrHandler = this.changeDescrHandler.bind(this);
    this.changeUrlHandler = this.changeUrlHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.amendHandler = this.amendHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  // the 3 input field value handlers
  changeTitleHandler = e => {
    this.setState({ title: e.target.value });
  };

  changeDescrHandler = e => {
    this.setState({ descr: e.target.value });
  };

  changeUrlHandler = e => {
    this.setState({ url: e.target.value });
  };

  // the submit handler for adding new projects to the list. Sends a request to the server
  // to have the item written to the file.

  handleSubmit(e) {
    if (this.state.button === "Submit") {
      fetch("/addData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: this.state.title,
          descr: this.state.descr,
          url: this.state.url
        })
      })
        .then(res => res.json())
        .catch(error => console.log("Error:", error));
    } else {
      fetch("/ammendData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.state.ammendID,
          title: this.state.title,
          descr: this.state.descr,
          url: this.state.url
        })
      })
        .then(res => res.json())
        .catch(error => console.log("Error:", error));
    }
  }

  // the ammendhandler set properties and state accordinly so that the user can ammend
  // a specific part of the listing and that they do not need to retype all the value.

  amendHandler = e => {
    let id = e.target.id;
    this.setState({
      button: "Amend",
      pageTitle: "Amend Projects",
      ammendID: id,
      title: this.state.userListing[id].title,
      descr: this.state.userListing[id].descr,
      url: this.state.userListing[id].url
    });
  };

  // the delete handler to remove a project from the list. Sends a request to the server
  // to have the item deleted from the file./

  deleteHandler = e => {
    fetch("/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: e.target.id })
    })
      .then(res => res.json())
      .then(this.fetchData)
      .catch(error => console.log("Error:", error));
  };

  fetchData = () => {
    fetch("/userData")
      .then(res => res.json())
      .then(
        result => {
          let myResult = JSON.parse(result);
          this.setState({ userListing: myResult });
        },
        error => {
          console.log("error " + error);
          this.setState({
            error
          });
        }
      );
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="App">
        <div className="addProjects">
          <h1>{this.state.pageTitle}</h1>
          <form className="submitList" onSubmit={this.handleSubmit}>
            <input
              size="30"
              placeholder="Title"
              onChange={this.changeTitleHandler}
              id="item"
              name="item"
              value={this.state.title}
              required
            />
            <input
              size="70"
              placeholder="Description"
              onChange={this.changeDescrHandler}
              id="item"
              name="item"
              value={this.state.descr}
              required
            />
            <input
              size="50"
              placeholder="URL"
              onChange={this.changeUrlHandler}
              id="item"
              name="item"
              value={this.state.url}
              required
            />
            <button className="Submit" value={this.state.button} type="submit">
              {this.state.button}
            </button>
          </form>
        </div>
        <div className="projectList">
          <h1>List of My Web Projects To Date</h1>
          <div className="tableRow head">
            <div className="title">Title</div>
            <div className="desc">Description</div>
            <div className="url">URL</div>
            <div className="amend">Amend</div>
            <div className="amend">Remove</div>
          </div>

          <UserList
            userListing={this.state.userListing}
            changeHandler={this.amendHandler}
            deleteHandler={this.deleteHandler}
          />
        </div>
      </div>
    );
  }
}

export default App;
