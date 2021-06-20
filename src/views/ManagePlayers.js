import React, {useState} from "react";

const ManagePlayers = ({groupsData, playersData}) => {
  const [players, setPlayers] = useState(playersData);

  return (
    <h2>Manage Players</h2>
  );
};

export default ManagePlayers;