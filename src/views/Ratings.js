import React, {useState} from "react";
import {
  DetailsList,
  SelectionMode,
  DetailsListLayoutMode,
  TextField
} from "@fluentui/react";

const Ratings = ({ratings}) => {
  const [playerFilter, setPlayerFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");

  const tableOfRatings = [
    { key: "ratingsColumn1", name: "Group", fieldName: "group"},
    { key: "ratingsColumn2", name: "Player", fieldName: "name"},
    { key: "ratingsColumn3", name: "Rating", fieldName: "rating"},
  ];

  return (
    <div className={"table-of-ratings"}>  
      <h2>
        Table of Ratings
      </h2>
      <div className={"filters"}>
        <div className={"filter group"}>
          <TextField
            label="Filter group"
            onChange={(event, filter) => setGroupFilter(filter.toLowerCase())}
            value={groupFilter}
          />
        </div>
        <div className={"filter player"}>
          <TextField
            label="Filter player"
            onChange={(event, filter) => setPlayerFilter(filter.toLowerCase())}
            value={playerFilter}
          />
        </div>
      </div>
      <DetailsList
        compact={true}
        items={ratings.filter(player =>
          player.name.toLowerCase().indexOf(playerFilter) !== -1 &&
          player.group.toLowerCase().indexOf(groupFilter) !== -1
        )}
        columns={tableOfRatings}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.fixedColumns}
      />
    </div>
  );
};

export default Ratings;