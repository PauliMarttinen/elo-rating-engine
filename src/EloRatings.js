import React, {useState, useEffect} from "react";
import {
  DefaultButton
} from "@fluentui/react";

import Matches from "./views/Matches";
import Ratings from "./views/Ratings";

import formatDate from "./utilities/formatDate";
import roundToFirstDecimalPoint from "./utilities/roundToFirstDecimalPoint";
import alphabetizeObjects from "./utilities/alphabetizeObjects";

const EloRatings = ({groupsData, playersData, matchesData}) => {
  const VIEWS = {
    TABLE_OF_MATCHES: 0,
    TABLE_OF_RATINGS: 1
  };

  const [matches, setMatches] = useState(matchesData);
  const [players, setPlayers] = useState([]);
  const [view, setView] = useState(VIEWS.TABLE_OF_MATCHES);

  const getGroupNameAtTime = (time, id) => {
    const thisGroup = groupsData.find(group => group.id === id);
    return thisGroup.name[thisGroup.name.length - 1].name;
  };

  const getPlayerGroupAtTime = (time, id) => {
    const thisPlayer = playersData.find(player => player.id === id);
    return getGroupNameAtTime(time, thisPlayer.group[thisPlayer.group.length - 1].group);
  };

  const getPlayerNameAtTime = (time, id) => {
    const thisPlayer = playersData.find(player => player.id === id);
    return thisPlayer.name[thisPlayer.name.length - 1].name;
  };

  useEffect(() => {
    const ratings = [];

    setMatches(matchesData.map(match => {
      const date = formatDate(new Date(match.date * 1000));
      const playerAGroup = getPlayerGroupAtTime(match.date, match.playerA);
      const playerBGroup = getPlayerGroupAtTime(match.date, match.playerB);
      const playerA = match.playerA;
      const playerB = match.playerB;
      const playerAName = getPlayerNameAtTime(match.date, match.playerA);
      const playerBName = getPlayerNameAtTime(match.date, match.playerB);
      const result = {
        1: 1,
        0.75: 3/4,
        0.66: 2/3,
        0.5: 1/2,
        0.33: 1/3,
        0.25: 1/4,
        0: 0
      }[match.result];
      
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
  }, [matchesData]);

  return (
    <div>
      <DefaultButton
        disabled={view === VIEWS.TABLE_OF_MATCHES}
        onClick={() => setView(VIEWS.TABLE_OF_MATCHES)}>
        Table of Matches
      </DefaultButton>
      <DefaultButton
        disabled={view === VIEWS.TABLE_OF_RATINGS}
        onClick={() => setView(VIEWS.TABLE_OF_RATINGS)}>
        Table of Ratings
      </DefaultButton>
      {
        view === VIEWS.TABLE_OF_MATCHES &&
        <Matches
          matches={matches}
        />
      }
      {
        view === VIEWS.TABLE_OF_RATINGS &&
        <Ratings
          ratings={players}
        />
      }
    </div>
  );
}

export default EloRatings;