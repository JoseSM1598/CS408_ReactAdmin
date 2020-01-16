import React from "react";
import MaterialTable, { MTableBody } from "material-table";
import { transactions } from "./ExampleTransactions";

export default function MaterialTableDemo(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: "Transaction ID", field: "id", type: "String" },
      { title: "Status", field: "status", type: "String"},
      { title: "Transaction Type", field: "transactionType", type: "String"},
      { title: "Time Updated", field: "timeUpdated", type: "String" },
      {title: "User ID", field: "person", type: "String" },
      { title: "Question or Answer ID", field: "question_answer", type: "String" },
      
     
      
    ],
    data: props.data,
    tableOptions: {
      exportButton : true
    },
    
  });
  const tableStyle = {
    overflow : "scroll"
  }
  return (
    <div >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <MaterialTable
        title="Transactions"
        columns={state.columns}
        data={state.data}
        options={state.tableOptions}
      />
    </div>
  );
}
