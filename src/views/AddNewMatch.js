import React, {useState} from "react";
import {
  DatePicker,
  DayOfWeek
} from "@fluentui/react";
import formatDate from "../utilities/formatDate";

const AddNewMatch = ({groupsData, playersData}) => {
  const [date, setDate] = useState(undefined);

  return (
    <div>
      <h2>Add new match</h2>
      <DatePicker
        label={"Match date"}
        firstDayOfWeek={DayOfWeek.Monday}
        formatDate={formatDate}
        placeholder={"Match date"}
        onSelectDate={date => setDate(date)}
        value={date}
      />
    </div>
  );
};

export default AddNewMatch;