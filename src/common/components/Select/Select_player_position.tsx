import React, { useEffect, useState } from "react";

import style from "./Custom_select.module.css";

export default function Select_player_position(props: any) {
  const [selected_position, setSelectedPosition] = useState("Select");
  const [list_display, setListDisplay] = useState(false);

  useEffect(() => {
    if (props.position !== null && props.position !== undefined)
      setSelectedPosition(props.position);
  }, []);
  const select_position = (ev: any) => {
    let position = ev.target.getAttribute("title");
    setSelectedPosition(position);
    props.func(position);
    setListDisplay(false);
  };

  const chnage_list_status = (ev: any) => {
    ev.preventDefault();
    list_display === false ? setListDisplay(true) : setListDisplay(false);
  };

  return (
    <div className={style.dropdown}>
      <button onClick={chnage_list_status}>{selected_position}</button>
      {list_display && (
        <ul className={style.menu_list} onClick={select_position}>
          <li title="Center Forward">Center Forward</li>
          <li title="Guard Forward">Guard Forward</li>
          <li title="Forward">Forward</li>
          <li title="Center">Center</li>
          <li title="Guard">Guard</li>
        </ul>
      )}
    </div>
  );
}
