import React, {useState} from "react";
import {
  DatePicker,
  DayOfWeek,
  Dropdown
} from "@fluentui/react";
import formatDate from "../utilities/formatDate";
import alphabetizeObjects from "../utilities/alphabetizeObjects";

const AddNewMatch = ({players, onAddMatch}) => {
  const newPlayer = {player: undefined, group: undefined, rating: undefined};

  const [date, setDate] = useState(undefined);
  const [playerA, setPlayerA] = useState(newPlayer);
  const [playerB, setPlayerB] = useState(newPlayer);
  const [result, setResult] = useState(undefined);

  const changePlayerA = (event, item) => {
    setPlayerA(item.key === -1 ? newPlayer : players.find(player => player.player === item.key));
  };

  const changePlayerB = (event, item) => {
    setPlayerB(item.key === -1 ? newPlayer : players.find(player => player.player === item.key));
  };

  const changeResult = (event, item) => {
    setResult(item.key);
  };

  const getPlayerARating = () => {
    if (playerA.rating === undefined && playerB.rating !== undefined)
    {
      return playerB.rating;
    }
    else if (playerA.rating === undefined)
    {
      return 69;
    }
    else
    {
      return playerA.rating;
    }
  };

  const getPlayerBRating = () => {
    if (playerB.rating === undefined && playerA.rating !== undefined)
    {
      return playerA.rating;
    }
    else if (playerB.rating === undefined)
    {
      return 420;
    }
    else
    {
      return playerB.rating;
    }
  };

  const newRatings = () => {
    const playerARating = getPlayerARating();
    const playerBRating = getPlayerBRating();

    const expectedA = 1/(1+Math.pow(10, (playerBRating - playerARating)/400));
    const expectedB = 1/(1+Math.pow(10, (playerARating - playerBRating)/400));
    const newRatingA = roundToFirstDecimalPoint(playerARating + 32*(result - expectedA));
    const newRatingB = roundToFirstDecimalPoint(playerBRating + 32*((1 - result) - expectedB));

    return {newRatingA, newRatingB};
  };

  const addMatch = () => {
    onAddMatch(
      date,
      playerA.group,
      playerB.group,
      playerA.player,
      playerB.player,
      result,
      newRatings().newRatingA,
      newRatings().newRatingB
    );

    setDate(undefined);
    setPlayerA(newPlayer);
    setPlayerB(newPlayer);
    setResult(undefined);
  };

  const getPlayerOptions = () => {
    return alphabetizeObjects(players.map(player => ({
      key: player.player,
      text: player.player + " [" + player.group +"] (" + player.rating + ")"
    })), "text");
  };

  const isSavingDisabled = () => {
    const isDateUndefined = date === undefined;
    const isPlayerAUndefined = playerA === undefined;
    const isPlayerBUndefined = playerB === undefined;
    /* const arePlayersTheSame = (playerA.player !== undefined ? playerA.player : newPlayerA)
                              ===
                              (playerB.player !== undefined ? playerB.player : newPlayerB); */
    const isResultUndefined = result === undefined;

    return isDateUndefined || isPlayerAUndefined || isPlayerBUndefined || /* arePlayersTheSame || */ isResultUndefined;
  };

  const resultOptions = [
    {key: 1, text: "Player A Win (1)"},
    {key: 0.66, text: "Player A Win in OT (2/3)"},
    {key: 0.5, text: "Draw (0.5)"},
    {key: 0.33, text: "Player B Win in OT (1/3)"},
    {key: 0, text: "Player B Win (0)"}
  ];

  return (
    <div>
      <h2>Add new match</h2>      
      <DatePicker
        label="Match date"
        firstDayOfWeek={DayOfWeek.Monday}
        formatDate={formatDate}
        placeholder={"Match date"}
        onSelectDate={date => setDate(date)}
        value={date}
      />
      <Dropdown
        label="Player A"
        placeholder="Player A"
        options={getPlayerOptions()}
        onChange={changePlayerA}
        selectedKey={playerA === undefined ? undefined : playerA.player}
      />
      <Dropdown
        label="Player B"
        placeholder="Player B"
        options={getPlayerOptions()}
        onChange={changePlayerB}
        selectedKey={playerB === undefined ? undefined : playerB.player}
      />
      <Dropdown
        label="Result"
        placeholder="Result"
        options={resultOptions}
        onChange={changeResult}
      />
      {/* <CreateNewPlayerPopup
        players={players}
      /> */}
    </div>
  );
};

export default AddNewMatch;