import React, { useState, useEffect } from "react";
import { Button } from "antd";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import DataSheet from "./DataSheet";

const questionDatabase = firebase.database();
const adminRef = questionDatabase.ref("admin");

const AdminPage = () => {
  const [isLogin, setLogin] = useState(false);
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setLogin(!!user);
    });
    if (isLogin) {
      checkAuth();
    }
  });

  const checkAuth = () => {
    let authEmail = firebase.auth().currentUser.email.replace("@gmail.com", "");
    adminRef.child(authEmail).once("value", data => {
      if (data.val()) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  };

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult : () => false
    }
  };

  return (
    <div className="AdminPage" style={{ textAlign: "center" }}>
      {isLogin ? (
        <div>
          <h3>Welcome {firebase.auth().currentUser.displayName}</h3>
          <Button type="danger" onClick={() => firebase.auth().signOut()}>
            Sign out
          </Button>
          {isAuth ? (
            <DataSheet />
          ) : (
            <div>Sorry! You can not access this page</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "20%" }}>
          <h1>Please login to check your authority!</h1>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
