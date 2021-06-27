import React from "react";

const Graph = ({players, matches}) => {
  const data = [];

  data.push([null, ...matches.map(match => match.date)]);

  let highest = 2000;
  let lowest = 2000;

  players.forEach(player => {
    let rating = 2000;

    data.push([player.id, ...matches.map(match => {
      if (match.playerA === player.id)
      {
        rating = match.playerARatingAfter;
      }
      else if (match.playerB === player.id)
      {
        rating = match.playerBRatingAfter;
      }

      lowest = Math.min(lowest, rating);
      highest = Math.max(highest, rating);

      return rating;
    })]);
  });

  const getGraphPathForPlayer = (player) => {
    let graphPath = "M 50,325";
    const playerRatingHistory = data.find(datum => datum[0] === player);
    
    playerRatingHistory.forEach((dataPoint, index) => {
      if (index === 0)
      {
        return;
      }
      
      const x = (900 / playerRatingHistory.length) * index + 50;
      
      const y = 325 - (dataPoint - 2000);
      
      graphPath += " L " + x +","+y;
    });
    
    return graphPath;
  }

  return (
    <div className={"ratings-graph"}>
      <h2>Ratings Graph</h2>
      <svg viewBox={"0 0 1000 750"} xmlns={"http://www.w3.org/2000/svg"} stroke={"red"} fill={"grey"}>
        <path
          fill={"none"}
          stroke={"black"}
          d={"M 50,50 L 50,700 L 950,700"}
        />
        {
          players.map((player, index) => 
            <path
              key={index}
              fill={"none"}
              stroke={"blue"}
              d={getGraphPathForPlayer(player.id)}
            />
          )
        }
      </svg>
    </div>
  );
};

export default Graph;