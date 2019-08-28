import React, { useState, useEffect } from "react";
import { Button } from "antd";
import ReactTable from "react-table";
import "react-table/react-table.css";
import firebase from "firebase/app";
import "firebase/database";
import XLSX from "xlsx";

const questionData = firebase.database();

const style = {
  display: "flex",
  justifyContent: "center",
  textAlign: "center"
};

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
  const [questions, setQuestion] = useState([]);
  useEffect(() => {
    getQuestion();
  }, [questions]);

  const getQuestion = () => {
    let question = [];
    questionData.ref("k15-questions").once("value", snapshot => {
      snapshot.forEach(snap => {
        question.push(snap.val());
      });
      setQuestion(question);
    });
  };

  const exportFile = () => {
    let questionData = [["Student ID", "Fullname", "Major", "Question", "Created at", "Updated at"]];
    questions.forEach(question => {
      let questionArr = [question.id, question.name, question.major, question.question, question.timeCreate, question.timeUpdate];
      questionData.push(questionArr);
    });
    const wb = XLSX.utils.book_new();
    const wsAll = XLSX.utils.aoa_to_sheet(questionData);
    XLSX.utils.book_append_sheet(wb, wsAll, "All Users");
    XLSX.writeFile(wb, "k15-questions.xlsx");
  };

  return (
    <div className="AdminPage">
      <div style={style}>
        <div>
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
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
