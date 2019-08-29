import React, { useState, useEffect } from "react";
import { Button } from "antd";
import ReactTable from "react-table";
import "react-table/react-table.css";
import firebase from "firebase/app";
import "firebase/database";
import XLSX from "xlsx";

const questionDatabase = firebase.database();
const questionRef = questionDatabase.ref("k15-questions");

const wscols = [
  { wch: 4 },
  { wch: 10 },
  { wch: 30 },
  { wch: 6 },
  { wch: 50 },
  { wch: 20 },
  { wch: 20 }
];

const style = {
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
  textAlign: "center"
};

const AdminPage = () => {
  const [questions, setQuestion] = useState([]);
  const [totalOfSE, setTotalOfSE] = useState(0);
  const [totalOfIA, setTotalOfIA] = useState(0);
  const [totalOfAI, setTotalOfAI] = useState(0);
  const [totalOfIoT, setTotalOfIoT] = useState(0);

  useEffect(() => {
    getQuestion();
  }, [questions]);

  const getQuestion = () => {
    let question = [];
    questionRef.once("value", snapshot => {
      snapshot.forEach(snap => {
        if (typeof snap.val() === "object") {
          question.push(snap.val());
        }
      });
      setQuestion(question);
    });
    questionRef.child("totalOfSE").once("value", snapshot => {
      setTotalOfSE(snapshot.val());
    });
    questionRef.child("totalOfIA").once("value", snapshot => {
      setTotalOfIA(snapshot.val());
    });
    questionRef.child("totalOfIoT").once("value", snapshot => {
      setTotalOfIoT(snapshot.val());
    });
    questionRef.child("totalOfAI").once("value", snapshot => {
      setTotalOfAI(snapshot.val());
    });
  };

  const exportFile = () => {
    let counter = 0;
    let questionData = [
      [
        "No.",
        "Student ID",
        "Fullname",
        "Major",
        "Question",
        "Created at",
        "Updated at"
      ]
    ];
    questions.forEach(question => {
      counter++;
      let questionArr = [
        counter,
        question.id,
        question.name,
        question.major,
        question.question,
        question.timeCreate,
        question.timeUpdate
      ];
      questionData.push(questionArr);
    });
    questionData.push(["Total of SE", "", "", totalOfSE]);
    questionData.push(["Total of IA", "", "", totalOfIA]);
    questionData.push(["Total of IoT", "", "", totalOfIoT]);
    questionData.push(["Total of AI", "", "", totalOfAI]);
    questionData.push(["Total of all users", "", "", counter]);
    const wb = XLSX.utils.book_new();
    const wsAll = XLSX.utils.aoa_to_sheet(questionData);
    XLSX.utils.book_append_sheet(wb, wsAll, "All Questions");
    wsAll["!cols"] = wscols;
    let mergeRow = [];
    for (let i = 1; i <= 5; i++) {
      let cRow = i + counter + 1;
      let cRange = "A" + cRow + ":C" + cRow;
      mergeRow[i - 1] = XLSX.utils.decode_range(cRange);
    }
    wsAll["!merges"] = mergeRow;
    XLSX.writeFile(wb, "k15-questions.xlsx");
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

  return (
    <div className="AdminPage">
      <div style={style}>
        <div>
          <h1>K15 Questions Datasheet</h1>
          <Button type="dashed" onClick={exportFile}>
            Export to Excel
          </Button>
          <ReactTable
            style={{
              marginLeft: "-50%",
              marginRight: "-50%",
              marginTop: "20px"
            }}
            data={questions}
            columns={questionColumns}
            defaultPageSize={10}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
