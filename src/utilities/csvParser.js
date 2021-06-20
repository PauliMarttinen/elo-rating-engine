const csvParser = (data) => {
  if (typeof data !== "string")
  {
    throw "CSV data must be a string. Supplied data is " + typeof data;
  }

  //Crap code. Not high priority to rewrite.
  const rows = data.split("\n");
  const array = [];
  for (let row = 0; row < rows.length; row++)
  {
    const partials = [];

    let marker = 0;
    let skipComma = false;
    for (let character = 0; character < rows[row].length; character++)
    {
      switch (rows[row].charAt(character))
      {
        case ",":
          if (skipComma)
          {
            continue;
          }
          let partial;
          if (rows[row].charAt(character - 1) === "\"")
          {
            partial = rows[row].substring(marker, character - 1);
          }
          else
          {
            partial = rows[row].substring(marker, character);
          }

          partials.push(partial === "" || isNaN(partial) ? partial : +partial);
          marker = character+1;
          break;
        case "\"":
          skipComma = !skipComma;
          if (skipComma)
          {
            marker = character+1;
          }
          break;
      }
    }
    let lastPartial = rows[row].substring(marker);
    partials.push(lastPartial === "" || isNaN(lastPartial) ? lastPartial : +lastPartial);

    array.push(partials);
  }
  /* console.log(array); */
  return array;
}

export default csvParser;