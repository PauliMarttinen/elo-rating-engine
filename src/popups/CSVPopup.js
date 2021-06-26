import React, {useState} from "react";
import {
  PrimaryButton,
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  TextField
} from "@fluentui/react";
import csvParser from "./../utilities/csvParser";
import alphabetizeObjects from "./../utilities/alphabetizeObjects";

const CSVPopup = ({onDismiss, onSave, open}) => {
  const [CSVData, setCSVData] = useState("");

  const EVENT_TYPES = {
    GROUP: "group",
    PLAYER: "player",
    MATCH: "match"
  };

  const changeCSVData = (event, data) => {
    setCSVData(data);
  };

  const getGroups = (data) => {
    const COLUMNS = {
      DATE: 0,
      EVENT_TYPE: 1,
      ID: 2,
      NAME: 3
    };
    const groupEvents = data.filter(row => row[COLUMNS.EVENT_TYPE] === EVENT_TYPES.GROUP);
    const finalGroups = [];
    groupEvents.forEach(event => {
      const index = finalGroups.findIndex(group => group.id === event[COLUMNS.ID]);
      //If a group with this ID doesn't exist yet, create new group.
      if (index === -1)
      {
        finalGroups.push({
          id: event[COLUMNS.ID],
          name: [{
            date: event[COLUMNS.DATE],
            name: event[COLUMNS.NAME]
          }]
        });
      }
      //If it exists, interpret this as a name change for the group and add it to the name history.
      else
      {
        finalGroups[index].name.push({
          date: event[COLUMNS.DATE],
          name: event[COLUMNS.NAME]
        });
      }
    });
    return finalGroups;
  };

  const getPlayers = (data) => {
    const COLUMNS = {
      DATE: 0,
      EVENT_TYPE: 1,
      ID: 2,
      NAME:  3,
      GROUP: 4
    };
    const playerEvents = data.filter(row => row[COLUMNS.EVENT_TYPE] === EVENT_TYPES.PLAYER);
    const finalPlayers = [];
    playerEvents.forEach(event => {
      const index = finalPlayers.findIndex(player => player.id === event[COLUMNS.ID]);
      //If a player of this ID doesn't exist yet, create new player.
      if (index === -1)
      {
        finalPlayers.push({
          id: event[COLUMNS.ID],
          name: [{
            date: event[COLUMNS.DATE],
            name: event[COLUMNS.NAME]
          }],
          group: [{
            date: event[COLUMNS.DATE],
            group: event[COLUMNS.GROUP]
          }]
        });
      }
      //If it exists, interpret this as a name or group change and add it to history
      else
      {
        //If the name column is non-empty and different from the most recent name, add new
        //name to name history.
        const nameHistory = finalPlayers[index].name;
        const mostRecentName = nameHistory[nameHistory.length - 1].name;
        if (event[COLUMNS.NAME] !== "" && event[COLUMNS.NAME] !== mostRecentName)
        {
          finalPlayers[index].name.push({
            date: event[COLUMNS.DATE],
            name: event[COLUMNS.NAME]
          });
        }
        //If the group column is non-empty and different from the most recent group, add new
        //group to group history.
        const groupHistory = finalPlayers[index].group;
        const mostRecentGroup = groupHistory[groupHistory.length - 1].group;
        if (event[COLUMNS.GROUP] !== "" && event[COLUMNS.GROUP] !== mostRecentGroup)
        {
          finalPlayers[index].group.push({
            date: event[COLUMNS.DATE],
            group: event[COLUMNS.GROUP]
          });
        }
      }
    });
    return finalPlayers;
  };

  const getMatches = (data) => {
    const COLUMNS = {
      DATE: 0,
      EVENT_TYPE: 1,
      PLAYER_A: 2,
      PLAYER_B: 3,
      RESULT: 4
    };
    const matchEvents = data.filter(row => row[COLUMNS.EVENT_TYPE] === EVENT_TYPES.MATCH);
    return matchEvents.map(event => {
      return {
        date: event[COLUMNS.DATE],
        playerA: event[COLUMNS.PLAYER_A],
        playerB: event[COLUMNS.PLAYER_B],
        result: event[COLUMNS.RESULT],
      };
    });
  };

  const save = () => {
    console.log("kokkelis");
    const parsedCSV = alphabetizeObjects(csvParser(CSVData), 0);
    const groups = getGroups(parsedCSV);
    const players = getPlayers(parsedCSV);
    const matches = getMatches(parsedCSV);
    onSave(groups, players, matches);
  };

  const dialogProps = {
    type: DialogType.largeHeader,
    title: "Import/Export CSV"
  };

  return (
    <div className={"csv-popup"}>
      {
        open &&
        <Dialog
          hidden={false}
          onDismiss={onDismiss}
          dialogContentProps={dialogProps}>
          <TextField
            label="CSV"
            multiline={true}
            rows={25}
            onChange={changeCSVData}
            value={CSVData}
          />
          <DialogFooter>
            <PrimaryButton
              onClick={save}>
              Save
            </PrimaryButton>
            <DefaultButton
              onClick={onDismiss}>
              Cancel
            </DefaultButton>
          </DialogFooter>
        </Dialog>
      }
    </div>
  )
};

export default CSVPopup;