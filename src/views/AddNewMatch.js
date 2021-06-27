import React, {useState} from "react";
import {
  DatePicker,
  DayOfWeek,
  Dropdown,
  Slider,
  Text
} from "@fluentui/react";
import formatDate from "../utilities/formatDate";
import alphabetizeObjects from "../utilities/alphabetizeObjects";

const AddNewMatch = ({groups, players}) => {
  const [date, setDate] = useState(undefined);
  const [playerA, setPlayerA] = useState(undefined);
  const [playerB, setPlayerB] = useState(undefined);
  const [result, setResult] = useState(3);

  const changePlayerA = (event, item) => {
    setPlayerA(item.key === -1 ? undefined : players.find(player => player.player === item.key));
  };

  const changePlayerB = (event, item) => {
    setPlayerB(item.key === -1 ? undefined : players.find(player => player.player === item.key));
  };

  const getPlayerOptions = () => {
    return players.map((player, index) => ({
      key: index,
      text: player.group + " - " + player.name + " (" + player.rating + ")"
    }));
  };

  const getPlayerRating = (index) => {
    return players[index].rating;
  };

  const resultDisplay = () => {
    switch (result)
    {
      case 0:
        return (
          <div className={"label"}>
            <Text className={"raw-number"}>
              1
            </Text>
            <Text className={"explanation"}>
              Player A Wins Clearly
            </Text>
          </div>
        );
      case 1:
        return (
          <div className={"label"}>
            <Text className={"raw-number"}>
              3/4
            </Text>
            <Text className={"explanation"}>
              Player A Wins Safely
            </Text>
          </div>
        );
      case 2:
        return (
          <div className={"label"}>
            <Text className={"raw-number"}>
              2/3
            </Text>
            <Text className={"explanation"}>
              Player A Wins Barely
            </Text>
          </div>
        );
      case 3:
        return (
          <div className={"label"}>
            <Text className={"raw-number"}>
              0.5
            </Text>
            <Text className={"explanation"}>
              Draw
            </Text>
          </div>
        );
      case 4:
        return (
          <div className={"label"}>
            <Text className={"raw-number"}>
              1/3
            </Text>
            <Text className={"explanation"}>
              Player B Wins Barely
            </Text>
          </div>
        );
      case 5:
        return (
          <div className={"label"}>
            <Text className={"raw-number"}>
              1/4
            </Text>
            <Text className={"explanation"}>
              Player B Wins Safely
            </Text>
          </div>
        );
      case 6:
        return (
          <div className={"label"}>
            <Text className={"raw-number"}>
              0
            </Text>
            <Text className={"explanation"}>
              Player B Wins Clearly
            </Text>
          </div>
        );
    }
  };

  if (players.length <= 1)
  {
    return (
      <div className={"add-new-match"}>
        <h2>Add New Match</h2>
        <Text>
          Cannot add new match when there aren't at least two players. Create at least two players before adding a match.
        </Text>
      </div>
    );
  }

  return (
    <div className={"add-new-match"}>
      <h2>Add New Match</h2>
      <div className={"match-date"}>
        <DatePicker
          label={"Match date"}
          firstDayOfWeek={DayOfWeek.Monday}
          formatDate={formatDate}
          placeholder={"Match date"}
          onSelectDate={date => setDate(date)}
          value={date}
        />
      </div>
      <div className={"players"}>
        <div className={"player a"}>
          <Dropdown
            label={"Player A"}
            placeholder={"Player A"}
            options={alphabetizeObjects(getPlayerOptions(), "text")}
            onChange={changePlayerA}
            selectedKey={playerA === undefined ? undefined : playerA.player}
          />
        </div>
        <div className={"player b"}>
          <Dropdown
            label={"Player B"}
            placeholder={"Player B"}
            options={getPlayerOptions()}
            onChange={changePlayerB}
            selectedKey={playerB === undefined ? undefined : playerB.player}
          />
        </div>
      </div>
      <div className={"result"}>
        <div className={"input"}>
          <Slider
            label={"Result"}
            min={0}
            max={6}
            value={result}
            showValue={false}
            onChange={setResult}
          />
        </div>
        {resultDisplay()}
      </div>
      <div className={"new-ratings"}>

      </div>
    </div>
  );
};

export default AddNewMatch;