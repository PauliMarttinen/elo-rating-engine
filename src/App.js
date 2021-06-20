/* import logo from './logo.svg'; */
import React, {useEffect, useState} from "react";

import CSVPopup from "./popups/CSVPopup";
import EloRatings from "./EloRatings";
import ManageGroups from "./views/ManageGroups";
import ManagePlayers from "./views/ManagePlayers";
import AddNewMatch from "./views/AddNewMatch";

import './App.css';
import csvParser from "./utilities/csvParser";

import {DefaultButton} from "@fluentui/react";

const App = () => {
  /* const [groups, setGroups] = useState([
    {id: 1, name: "m", nameHistory: []},
    {id: 2, name: "n", nameHistory: []}
  ])
  const [players, setPlayers] = useState([
    {id: 1, name: "Kempeleen Kiri", nameHistory: [], group: 1, groupHistory: []},
    {id: 2, name: "Vimpelin Veto", nameHistory: [], group: 1, groupHistory: []},
    {id: 3, name: "Joensuun Maila", nameHistory: [], group: 1, groupHistory: []},
    {id: 4, name: "Haminan Palloilijat", nameHistory: [], group: 1, groupHistory: []},
    {id: 5, name: "Kirittäret, Jyväskylä", nameHistory: [], group: 2, groupHistory: []},
    {id: 6, name: "Siilinjärven Pesis", nameHistory: [], group: 2, groupHistory: []},
    {id: 7, name: "Mynämäen Vesa", nameHistory: [], group: 2, groupHistory: []},
    {id: 8, name: "Pesäkarhut, Pori", nameHistory: [], group: 2, groupHistory: []},
  ]);
  const [matches, setMatches] = useState([
    {date: "2021-06-02", playerAGroup: "m", playerBGroup: "m", playerA: "Kempeleen Kiri", playerB: "Vimpelin Veto", result: "0", playerARatingAfter: 1948, playerBRatingAfter: 2016},
    {date: "2021-06-02", playerAGroup: "m", playerBGroup: "m", playerA: "Joensuun Maila", playerB: "Haminan Palloilijat", result: "1", playerARatingAfter: 2016, playerBRatingAfter: 1984},
    {date: "2021-06-02", playerAGroup: "n", playerBGroup: "n", playerA: "Kirittäret, Jyväskylä", playerB: "Siilinjärven Pesis", result: "1", playerARatingAfter: 2016, playerBRatingAfter: 1984},
    {date: "2021-06-02", playerAGroup: "n", playerBGroup: "n", playerA: "Mynämäen Vesa", playerB: "Pesäkarhut, Pori", result: "0", playerARatingAfter: 1984, playerBRatingAfter: 2016},
    {date: "2021-06-03", playerAGroup: "m", playerBGroup: "m", playerA: "Kiteen Pallo -90", playerB: "Pattijoen Urheilijat, Raahe", result: "1", playerARatingAfter: 2016, playerBRatingAfter: 1984},
    {date: "2021-06-03", playerAGroup: "n", playerBGroup: "n", playerA: "Lapuan Virkiä", playerB: "Kempeleen Kiri", result: "1", playerARatingAfter: 2000, playerBRatingAfter: 1968},
    {date: "2021-06-03", playerAGroup: "m", playerBGroup: "m", playerA: "Koskenkorvan Urheilijat", playerB: "Imatran Pallo-Veikot", result: "0", playerARatingAfter: 1984, playerBRatingAfter: 2016},
    {date: "2021-06-03", playerAGroup: "m", playerBGroup: "m", playerA: "Sotkamon Jymy", playerB: "Siilinjärven Pesis", result: "1", playerARatingAfter: 2000, playerBRatingAfter: 1968},
    {date: "2021-06-04", playerAGroup: "m", playerBGroup: "m", playerA: "Manse PP, Tampere", playerB: "Hyvinkään Tahko", result: "1", playerARatingAfter: 2016, playerBRatingAfter: 1984},
    {date: "2021-06-04", playerAGroup: "m", playerBGroup: "m", playerA: "Joensuun Maila", playerB: "Kempeleen Kiri", result: "1", playerARatingAfter: 2029.8, playerBRatingAfter: 1954.2},
    {date: "2021-06-07", playerAGroup: "m", playerBGroup: "m", playerA: "Seinäjoen JymyJussit", playerB: "Koskenkorvan Urheilijat", result: "2/3", playerARatingAfter: 1989.1, playerBRatingAfter: 1978.1}
  ]); */
  const VIEWS = {
    MANAGE_GROUPS: 1,
    MANAGE_PLAYERS: 2,
    ADD_NEW_MATCH: 3
  };

  //const [formattedMatches, setFormattedMatches] = useState([]);
  const [groups, setGroups] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [view, setView] = useState(VIEWS.ADD_NEW_MATCH)

  const setData = (groupsData, playersData, matchesData) => {
    setGroups(groupsData);
    setPlayers(playersData);
    setMatches(matchesData);
  };

  return (
    <div className={"App"}>
      <h1>Elo Rating Engine</h1>
      <CSVPopup
        onSave={setData}
      />
      <EloRatings
        groupsData={groups}
        playersData={players}
        matchesData={matches}
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

  /* const getRatingOfGroup = (group) => {
    return 2000;
  };

  const getGroupOfPlayer = (player) => {
    for (let match = 0; match < matches.length; match++)
    {
      if (matches.playerA === player)
      {
        return matches.playerAGroup;
      }
      else if (matches.playerB === player)
      {
        return matches.playerBGroup;
      }
    }

    return undefined;
  };

  const getRatingOfPlayer = (player) => {
    const matchesWithPlayer = matches.filter(match => match.playerA === player || match.playerB === player);

    if (matchesWithPlayer.length === 0)
    {
      return undefined;
    }

    const lastMatch = matchesWithPlayer[matchesWithPlayer.length - 1];
    
    if (lastMatch.playerA === player)
    {
      return lastMatch.playerARatingAfter;
    }
    else if (lastMatch.playerB === player)
    {
      return lastMatch.playerBRatingAfter;
    }
  };

  const getRatingsOfPlayers = (playerA, playerB) => {
    let playerARating = getRatingOfPlayer(playerA);
    let playerBRating = getRatingOfPlayer(playerB);
        
    if (playerARating === undefined && playerBRating === undefined)
    {
      const bothRatings = (getRatingOfGroup(getGroupOfPlayer(playerA)) + getRatingOfGroup(getGroupOfPlayer(playerB)))/2;
      return {
        playerARating: bothRatings,
        playerBRating: bothRatings
      }
    }
    else
    {
      if (playerARating === undefined)
      {
        playerARating = getRatingOfGroup(getGroupOfPlayer(playerA));
      }
      if (playerBRating === undefined)
      {
        playerBRating = getRatingOfGroup(getGroupOfPlayer(playerB));
      }
    }

    return {
      playerARating,
      playerBRating
    };
  };

  const getAllPlayers = () => {
    const players = [];

    for (let match = matches.length - 1; match >= 0; match--)
    {
      if (!players.some(player => player.player === matches[match].playerA && player.group === matches[match].playerAGroup))
      {
        players.push({
          player: matches[match].playerA,
          group: matches[match].playerAGroup,
          rating: matches[match].playerARatingAfter
        });
      }
      if (!players.some(player => player.player === matches[match].playerB && player.group === matches[match].playerAGroup))
      {
        players.push({
          player: matches[match].playerB,
          group: matches[match].playerAGroup,
          rating: matches[match].playerBRatingAfter
        });
      }
    }

    return players;
  };

  const formatResultString = (result) => {
    switch (result)
    {
      case 1:
        return "1";
      case 0.66:
        return "2/3";
      case 0.5:
        return "0.5";
      case 0.33:
        return "1/3";
      case 0:
        return "0";
    }
  };

  const addMatch = (date, playerAGroup, playerBGroup, playerAName, playerBName, result, playerARatingAfter, playerBRatingAfter) => {
    setMatches(previousMatches => [...previousMatches, {
      date: formatDate(date),
      playerAGroup,
      playerBGroup,
      playerA: playerAName,
      playerB: playerBName,
      result: formatResultString(result),
      playerARatingAfter,
      playerBRatingAfter
    }]);
  };

  return (
    <div className={"App"}>
      <h1>Elo Rating Engine</h1>
      <CSVPopup/>
      <MatchesTable
        matchesData={matches}
      />
      <NewMatchForm
        players={getAllPlayers()}
        onAddMatch={addMatch}
      />
    </div>
  ); */
};

export default App;
