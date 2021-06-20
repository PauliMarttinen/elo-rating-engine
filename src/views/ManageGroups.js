import React, {useState, useEffect} from "react";
import {DetailsList, SelectionMode, DetailsListLayoutMode} from "@fluentui/react/lib/DetailsList";

const ManageGroups = ({groupsData, playersData}) => {
  const [groups, setGroups] = useState(groupsData);
  
  const columns = [
    { key: "column1", name: "Date", fieldName: "date"},
    { key: "column2", name: "A Group", fieldName: "playerAGroup"},
    { key: "column3", name: "B Group", fieldName: "playerBGroup"},
    { key: "column4", name: "A", fieldName: "playerA"},
    { key: "column5", name: "B", fieldName: "playerB"},
    { key: "column6", name: "Result", fieldName: "result"},
    { key: "column7", name: "A Rating After", fieldName: "playerARatingAfter"},
    { key: "column8", name: "B Rating After", fieldName: "playerBRatingAfter"}
  ];

  return (
    <div>
      <h2>Manage Groups</h2>
      <DetailsList
        compact={true}
        items={groupsData}
        columns={columns}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.fixedColumns}
      />
    </div>
  );
};

export default ManageGroups;