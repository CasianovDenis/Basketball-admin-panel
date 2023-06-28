import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./react_multi_select.css";
import Get_teams from "../../../api/teams/Get_teams";

export default function Multi_select(props: any) {
  const [teams, setTeams] = useState([]);
  const [selected_teams, setSelectedTeams] = useState([]);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  useEffect(() => {
    Get_teams("", 0, 0, function (result: any) {
      const select_options = result.data.map(
        ({ name, id }: { name: string; id: number }) => ({
          value: name,
          label: name,
          team_id: id,
        })
      );

      setTeams(select_options);
    });
  }, []);

  const select_team = (ev: any) => {
    props.func(ev);
  };
  return (
    <Select
      isMulti
      name="colors"
      options={teams}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={select_team}
    />
  );
}
