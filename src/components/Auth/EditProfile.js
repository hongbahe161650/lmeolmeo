import React, { useState } from "react";
import { Button } from "react-bootstrap";

function EditProfile({ userParams, changeAuthMode, handleToggleToast }) {
  const [user, setUser] = useState(userParams);
  const [errorMessage, setErrorMessage] = useState("");
  const Validate = () => {
    const phonePattern = /^\d{10}$/;
    const namePattern = /^[a-zA-Z\s]{2,}$/;
    const addressRegex = /^[a-zA-Z0-9\s\.,#-]{5,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setErrorMessage("Invalid email format.");
      return false;
    }

    if (!phonePattern.test(user.phone)) {
      setErrorMessage(
        "Invalid phone number. Please enter a 10-digit phone number."
      );
      return false;
    }
    if (!namePattern.test(user.username)) {
      setErrorMessage(
        "Name must be at least 2 characters long and contain only letters and spaces."
      );
      return false;
    }
    if (!addressRegex.test(user.address)) {
      setErrorMessage(
        "Address must be at least 5 characters long and can contain letters, numbers, spaces, commas, dots, hashes, and hyphens."
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };
  const handleSubmit = () => {
    const validator = Validate();
    if (!validator) {
      return;
    }
    let result = window.confirm("Are you sure you want to edit this profile?");
    if (result) {
      localStorage.setItem("UserID", JSON.stringify(user));
      const users = JSON.parse(localStorage.getItem("users"));
      const updatedUsers = users.map((item) => {
        if (item.id === user.id) {
          return user;
        }
        return item;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      changeAuthMode();
      handleToggleToast();
    }
  };
  return (
    <div
      className="container bootstrap snippets bootdey border-0"
      style={{ marginTop: "10px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="text-primary">Edit Profile</h1>
        <Button
          variant="primary"
          onClick={() => {
            changeAuthMode();
          }}
        >
          Return
        </Button>
      </div>

      <hr />
      <div className="row">
        <div className="col-md-3">
          <div className="card-body">
            <img
              src="https://th.bing.com/th/id/R.ec949a67d0db9d12ddb7c09542d029d0?rik=0jM%2ftLOAxQTqoQ&pid=ImgRaw&r=0"
              className="avatar img-circle img-thumbnail"
              alt="avatar"
            />
          </div>
        </div>
        <div className="col-md-9 personal-info">
          <h3>Personal info</h3>
          <div className="form-group">
            <label className="col-lg-3 control-label">Name:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={user.username}
                name="accountname"
                onChange={(e) => {
                  setUser((currentUser) => ({
                    ...currentUser,
                    username: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Email:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={user.email}
                name="accountemail"
                onChange={(e) => {
                  setUser((currentUser) => ({
                    ...currentUser,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Phone:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={user.phone}
                name="accountphone"
                onChange={(e) => {
                  setUser((currentUser) => ({
                    ...currentUser,
                    phone: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Address:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={user.address}
                name="accountaddress"
                onChange={(e) => {
                  setUser((currentUser) => ({
                    ...currentUser,
                    address: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className="error-message" style={{ color: "red" }}>
          {errorMessage}
        </div>
      )}
      <div className="form-group" style={{ textAlign: "center" }}>
        <input
          onClick={() => {
            handleSubmit();
          }}
          type="submit"
          value="Update"
          className="btn btn-success"
        />
      </div>
    </div>
  );
}

export default EditProfile;
