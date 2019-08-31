import React, { useState, useEffect } from "react";
import { Button } from "antd";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import DataSheet from "./DataSheet";

const questionDatabase = firebase.database();
const adminRef = questionDatabase.ref("admin");

const questionColumns = [
  {
    Header: "Student ID",
    columns: [
      {
        Header: "Student ID",
        id: "studentID",
        accessor: d => d.id
      }
    ]
  },
  {
    Header: "Fullname",
    columns: [
      {
        Header: "Fullname",
        id: "fullname",
        accessor: d => d.name
      }
    ]
  },
  {
    Header: "Major",
    columns: [
      {
        Header: "Major",
        id: "major",
        accessor: d => d.major
      }
    ]
  },
  {
    Header: "Question",
    columns: [
      {
        Header: "Question",
        id: "question",
        accessor: d => d.question
      }
    ]
  },
  {
    Header: "Created at",
    columns: [
      {
        Header: "Created at",
        id: "timeCreate",
        accessor: d => d.timeCreate
      }
    ]
  },
  {
    Header: "Updated at",
    columns: [
      {
        Header: "Updated at",
        id: "timeUpdate",
        accessor: d => d.timeUpdate
      }
    ]
  }
];

const AdminPage = () => {
  const [isLogin, setLogin] = useState(false);
  const [isAuth, setAuth] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    document.title = "K15 Questions Management";
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
=======
  const getQuestion = () => {
    let question = [];
    questionData.ref("k15-questions").once("value", snapshot => {
      snapshot.forEach(snap => {
        question.push(snap.val());
      });
      setQuestion(question);
>>>>>>> 9a3a16a47ec531767d0a04f17ef1127b4a81a919
    });
  };

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  return (
    <div className="AdminPage" style={{ textAlign: "center" }}>
      {isLogin ? (
        <div>
<<<<<<< HEAD
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
=======
          <h1>K15 Questions Datasheet</h1>
          <Button type="dashed" onClick={exportFile}>Export to Excel</Button>
          <ReactTable
            style={{
              marginLeft: "-50%",
              marginRight: "-50%",
              marginTop: "10px"
            }}
            data={questions}
            columns={questionColumns}
>>>>>>> 9a3a16a47ec531767d0a04f17ef1127b4a81a919
          />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
