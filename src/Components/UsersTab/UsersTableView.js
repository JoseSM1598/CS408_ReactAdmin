import React from 'react';
import MaterialTable from 'material-table';



export default function UsersTableView(props) {
  
  const [state, setState] = React.useState({
    columns: [
      { title: 'User ID', field: 'userId', type: "String" },
      { title: 'First Name', field: 'firstName', type: "String" },
      { title: 'Last Name', field: 'lastName', type: 'String' },
    ],
    data: props.data,
    tableOptions:{
      selection:false,
      exportButton: true,
      paging:false

    }
  });

  return (
    <div style={{overflow:"scroll"}}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <MaterialTable
        title="Users"
        columns={state.columns}
        data={state.data}
        options = {state.tableOptions}
        actions = {[
          {
            icon: 'arrow_left',
            tooltip: 'View Profile',
            onClick: props.onClick
          }
        ]}
      />
    </div>
  );
}

