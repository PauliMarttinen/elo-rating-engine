/* import logo from './logo.svg'; */
import React, {useEffect, useState} from "react";

import CSVPopup from "./popups/CSVPopup";
import EloRatings from "./EloRatings";
import ManageGroups from "./views/ManageGroups";
import ManagePlayers from "./views/ManagePlayers";
import AddNewMatch from "./views/AddNewMatch";

import './App.css';
import csvParser from "./utilities/csvParser";
import formatDate from "./utilities/formatDate";
import roundToFirstDecimalPoint from "./utilities/roundToFirstDecimalPoint";
import alphabetizeObjects from "./utilities/alphabetizeObjects";

import {DefaultButton} from "@fluentui/react";

const App = () => {
  const VIEWS = {
    MANAGE_GROUPS: 1,
    MANAGE_PLAYERS: 2,
    ADD_NEW_MATCH: 3
  };

  const [groups, setGroups] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [view, setView] = useState(VIEWS.ADD_NEW_MATCH)

  const getGroupNameAtTime = (data, time, id) => {
    const group = data.find(datum => datum.id === id);
    return group.name[group.name.length - 1].name;
  };

  const getPlayerGroupAtTime = (groupData, playerData, time, id) => {
    const player = playerData.find(datum => datum.id === id);
    return getGroupNameAtTime(groupData, time, player.group[player.group.length - 1].group);
  };

  const getPlayerNameAtTime = (data, time, id) => {
    const player = data.find(datum => datum.id === id);
    return player.name[player.name.length - 1].name;
  };

  const setData = (groupsData, playersData, matchesData) => {
    setGroups(groupsData);
    /* setPlayers(playersData);
    setMatches(matchesData);
  };

  useEffect(() => { */
    const ratings = [];

    setMatches(matchesData.map(match => {
      const date = formatDate(new Date(match.date * 1000));
      //const date = match.date;
      const playerAGroup = getPlayerGroupAtTime(groupsData, playersData, match.date, match.playerA);
      const playerBGroup = getPlayerGroupAtTime(groupsData, playersData, match.date, match.playerB);
      const playerA = match.playerA;
      const playerB = match.playerB;
      const playerAName = getPlayerNameAtTime(playersData, match.date, match.playerA);
      const playerBName = getPlayerNameAtTime(playersData, match.date, match.playerB);
      const result = {
        1: 1,
        0.75: 3/4,
        0.66: 2/3,
        0.5: 1/2,
        0.33: 1/3,
        0.25: 1/4,
        0: 0
      }[match.result];
      /* const result = {
        1: 1,
        0.75: 1,
        0.66: 1,
        0.5: 1/2,
        0.33: 0,
        0.25: 0,
        0: 0
      }[match.result]; */
      
      const coefficient = 32;
      const scale = 400;
      const initialRating = 2000;

      if (!ratings.find(player => player.id === playerA))
      {
        ratings.push({
          group: playerAGroup,
          id: playerA,
          name: playerAName,
          rating: initialRating
        });
      }

      if (!ratings.find(player => player.id === playerB))
      {
        ratings.push({
          group: playerBGroup,
          id: playerB,
          name: playerBName,
          rating: initialRating
        });
      }

      const playerARatingIndex = ratings.findIndex(player => player.id === playerA);
      const playerARatingBefore = ratings[playerARatingIndex].rating;
      const playerBRatingIndex = ratings.findIndex(player => player.id === playerB);
      const playerBRatingBefore = ratings[playerBRatingIndex].rating;

      const expectedA = 1/(1+Math.pow(10, (playerBRatingBefore - playerARatingBefore)/scale));
      const expectedB = 1/(1+Math.pow(10, (playerARatingBefore - playerBRatingBefore)/scale));
      const playerARatingAfter = roundToFirstDecimalPoint(playerARatingBefore + coefficient*(result - expectedA));
      const playerBRatingAfter = roundToFirstDecimalPoint(playerBRatingBefore + coefficient*((1 - result) - expectedB));

      ratings[playerARatingIndex].rating = playerARatingAfter;
      ratings[playerBRatingIndex].rating = playerBRatingAfter;

      return {
        date,
        playerAGroup,
        playerBGroup,
        playerA,
        playerB,
        playerAName,
        playerBName,
        playerARatingChange: `${playerARatingBefore} → ${playerARatingAfter}`,
        playerBRatingChange: `${playerBRatingBefore} → ${playerBRatingAfter}`,
        result
      };
    }));
    setPlayers(alphabetizeObjects(ratings, "rating").reverse());
  };
  /* }, [matches]); */

  return (
    <div className={"App"}>
      <h1>Elo Rating Engine</h1>
      <CSVPopup
        onSave={setData}
      />
      <EloRatings
        groups={groups}
        players={players}
        matches={matches}
      />
      <DefaultButton
        disabled={view === VIEWS.MANAGE_GROUPS}
        onClick={() => setView(VIEWS.MANAGE_GROUPS)}>
        Manage Groups
      </DefaultButton>
      <DefaultButton
        disabled={view === VIEWS.MANAGE_PLAYERS}
        onClick={() => setView(VIEWS.MANAGE_PLAYERS)}>
        Manage Players
      </DefaultButton>
      <DefaultButton
        disabled={view === VIEWS.ADD_NEW_MATCH}
        onClick={() => setView(VIEWS.ADD_NEW_MATCH)}>
        Add New Match
      </DefaultButton>
      {
        view === VIEWS.MANAGE_GROUPS &&
        <ManageGroups
          playersData={players}
          groupsData={groups}
        />
      }
      {
        view === VIEWS.MANAGE_PLAYERS &&
        <ManagePlayers
          playersData={players}
          groupsData={groups}
        />
      }
      {
        view === VIEWS.ADD_NEW_MATCH &&
        <AddNewMatch
          playersData={players}
          groupsData={groups}
        />
      }
    </div>
  );
};

export default App;
