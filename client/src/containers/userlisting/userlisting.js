import React from "react";

const userList = props => {
  let userData;

  // if no data is available, load the below tablerow.
  if (props.userListing === null) {
    userData = (
      <div className="tableRow">
        <div className="title">No Data Yet</div>
        <div className="desc">No Data Yet</div>
        <div className="url">No Data Yet</div>
        <div className="amend">Amend</div>
      </div>
    );

    // if data is available the below table rows are loaded.
  } else {
    userData = props.userListing.map((key, i) => {
      return (
        <div key={i} className="tableRow">
          <div className="title">{props.userListing[i].title}</div>
          <div className="desc">{props.userListing[i].descr}</div>
          <div className="url">
            <a href={"https://" + props.userListing[i].url}>
              {props.userListing === null
                ? "No Data Yet"
                : props.userListing[i].url}
            </a>
          </div>
          <div id={i} onClick={props.changeHandler} className="amend btn">
            Amend
          </div>
          <div id={i} onClick={props.deleteHandler} className="amend btn">
            Remove
          </div>
        </div>
      );
    });
  }

  return userData;
};

export default userList;
