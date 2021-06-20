import React, {useState} from "react";
import {
  DefaultButton,
  Dialog,
  TextField,
  Dropdown,
  DialogFooter,
  PrimaryButton,
  DialogType,
  ChoiceGroup,
  Text,
  SpinButton
} from "@fluentui/react";

const CreateNewPlayerPopup = ({players}) => {
  const [createNewPlayerPopup, setNewPlayerPopup] = useState(false);
  const [name, setName] = useState("");
  const [group, setGroup] = useState(undefined);
  const [initialRatingInput, setInitialRatingInput] = useState("Automatic");
  const [initialRatingValue, setInitialRatingValue] = useState(0);

  const toggleNewPlayerPopup = () => {
    setName("");
    setGroup(undefined);
    setInitialRatingInput("Automatic");
    setInitialRatingValue(undefined);
    setNewPlayerPopup(!createNewPlayerPopup);
  };

  const storeNewPlayer = () => {

  };

  const newPlayerDialogProps = {
    type: DialogType.largeHeader,
    title: "Create a new player"/* ,
    subText: "If the new player player starts with an undefined rating, the expected result of their first match is assumed to be 0.5. Therefore, if a new player is put against a known player, the new player's initial rating will match the known player's rating. If both players in that match are new, their initial rating is the average rating of their group." */
  };

  const changeNewPlayerName = (event, name) => {
    setName(name);
  };

  const newPlayerNameAlreadyUsed = () => {
    return players.some(player => player.player === name && player.group === group);
  };

  const changeNewPlayerGroup = (event, item) => {
    setGroup(item.key);
  };

  const getGroupOptions = () => {
    const playerGroups = [];
    for (let player = 0; player < players.length; player++)
    {
      if (!playerGroups.some(group => group.text === players[player].group))
      {
        playerGroups.push({
          key: players[player].group,
          text: players[player].group
        });
      }
    }

    return playerGroups;
  };

  const toggleInitialRatingManually = (event, selection) => {
    setInitialRatingInput(selection.key)
  };

  const changeInitialRatingValue = (event, value) => {
    setInitialRatingValue(+value);
  };

  const initialRatingOptions = [
    { key: "Automatic", text: "Automatically" },
    { key: "Manual", text: "Manually" }
  ];

  const isSaveButtonEnabled = () => {
    const isPopupOpen = createNewPlayerPopup;
    const isNameDefined = name !== "";
    const isNameFree = !newPlayerNameAlreadyUsed()
    const isGroupDefined = group !== undefined;
    const isInitialRatingDefined = initialRatingInput === "Automatic" || initialRatingValue !== undefined;

    return isPopupOpen && isNameDefined && isNameFree && isGroupDefined && isInitialRatingDefined;
  };

  return (
    <>
      <DefaultButton
        onClick={() => toggleNewPlayerPopup(!createNewPlayerPopup)}>
        Create new player
      </DefaultButton>
      <Dialog
        hidden={!createNewPlayerPopup}
        onDismiss={toggleNewPlayerPopup}
        dialogContentProps={newPlayerDialogProps}>
        <TextField
          label={"Name for new player"}
          placeholder={"Player name"}
          value={name}
          onChange={changeNewPlayerName}
          errorMessage={newPlayerNameAlreadyUsed() ? "This group already has a player of this name." : ""}
        />
        <Dropdown
          label="Group"
          placeholder="Groups"
          options={getGroupOptions()}
          onChange={changeNewPlayerGroup}
          selectedKey={group}
        />
        <ChoiceGroup
          label="Determine new player rating"
          selectedKey={initialRatingInput}
          options={initialRatingOptions}
          onChange={toggleInitialRatingManually}
        />
        {
          initialRatingInput === "Automatic" &&
          <>
            <Text>
              If the new player is put against a known player, this player's initial rating is matched with the known player to make the expected result 0.5. If two new players are pitched against each other, their initial rating is the average rating of their group.
            </Text>
          </>
        }
        {
          initialRatingInput === "Manual" &&
          <SpinButton
            label={"New player's rating"}
            value={initialRatingValue}
            onChange={changeInitialRatingValue}
            min={0}
            step={1}
          />
        }
        <DialogFooter>
          <PrimaryButton
            disabled={!isSaveButtonEnabled()}
            onClick={toggleNewPlayerPopup}>
            Save
          </PrimaryButton>
          <DefaultButton
            onClick={toggleNewPlayerPopup}>
            Cancel
          </DefaultButton>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CreateNewPlayerPopup;