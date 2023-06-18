import React, { useState } from "react";

import style from "./Custom_select.module.css";

export default function Custom_select(props: any) {
  const [selected_position, setSelectedPosition] = useState("Select");

  const select_position = (ev: any) => {
    let position = ev.target.getAttribute("for");
    setSelectedPosition(position);
    props.func(position);
  };
  return (
    <>
      <details className={style.custom_select}>
        <summary className="radios">
          <input
            type="radio"
            name="item"
            id="default"
            title={selected_position}
            checked
          />
          <input type="radio" name="item" id="Center Forward" title="Item 1" />
          <input type="radio" name="item" id="Guard Forward" title="Item 2" />
          <input type="radio" name="item" id="Forward" title="Item 3" />
          <input type="radio" name="item" id="Center" title="Item 4" />
          <input type="radio" name="item" id="Guard" title="Item 5" />
        </summary>
        <ul className={style.list} onClick={select_position}>
          <li>
            <label htmlFor="Center Forward" className={style.select_label}>
              Center Forward<span></span>
            </label>
          </li>
          <li>
            <label className={style.select_label} htmlFor="Guard Forward">
              Guard Forward
            </label>
          </li>
          <li>
            <label className={style.select_label} htmlFor="Forward">
              Forward
            </label>
          </li>
          <li>
            <label className={style.select_label} htmlFor="Center">
              Center
            </label>
          </li>
          <li>
            <label className={style.select_label} htmlFor="Guard">
              Guard
            </label>
          </li>
        </ul>
      </details>
    </>
  );
}
