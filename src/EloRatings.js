import React, {useState, useEffect} from "react";
import {
  DefaultButton
} from "@fluentui/react";

import Matches from "./views/Matches";
import Ratings from "./views/Ratings";

const EloRatings = ({groups, players, matches}) => {
  const VIEWS = {
    TABLE_OF_MATCHES: 0,
    TABLE_OF_RATINGS: 1
  };

  const [view, setView] = useState(VIEWS.TABLE_OF_MATCHES);

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