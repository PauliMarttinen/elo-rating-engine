import React, {useState} from "react";
import {
  DetailsList,
  SelectionMode,
  DetailsListLayoutMode,
  TextField
} from "@fluentui/react";

const Matches = ({matches}) => {
  const [playerFilter, setPlayerFilter] = useState("");

  const tableOfMatches = [
    { key: "matchesColumn1", name: "Date", fieldName: "date"},
    { key: "matchesColumn2", name: "A Group", fieldName: "playerAGroup"},
    { key: "matchesColumn3", name: "B Group", fieldName: "playerBGroup"},
    { key: "matchesColumn4", name: "Player A", fieldName: "playerAName"},
    { key: "matchesColumn5", name: "Player B", fieldName: "playerBName"},
    { key: "matchesColumn6", name: "Result", fieldName: "result"},
    { key: "matchesColumn7", name: "A Rating", fieldName: "playerARatingChange"},
    { key: "matchesColumn8", name: "B Rating", fieldName: "playerBRatingChange"}
  ];

  return (
    <>
      <h2>
        Table of Matches
      </h2>
      <TextField
        label="Filter player"
        onChange={(event, filter) => setPlayerFilter(filter.toLowerCase())}
        value={playerFilter}
      />
      <DetailsList
        compact={true}
        items={matches.filter(match => 
          match.playerAName.toLowerCase().indexOf(playerFilter) !== -1 ||
          match.playerBName.toLowerCase().indexOf(playerFilter) !== -1
        )}
        columns={tableOfMatches}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.fixedColumns}
      />
    </>
  );
};

export default Matches;