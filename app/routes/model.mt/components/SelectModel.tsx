import React from 'react'
import { Select, Tooltip } from "flowbite-react";


export const models= [{
    name:"Matlad",
},{
    name:"Melong"
}]

function SelectModel({setModel,model}) {

    let optionClass =
    "language-options bg-white dark:bg-[--card-bg] text-black dark:text-white  ";

    function handleChange(e, type) {
        const lang = e.target.value;
        setModel(lang);
      }
  return (
    <Select
    onChange={(e) => handleChange(e, "source")}
    value={model }
    className="selectHeader  w-[160px]"
    style={{ cursor: "pointer" }}
  >
    {models.map((lang) => (
      <option key={lang.name} value={lang.name} className={optionClass}>
        {lang.name}
      </option>
    ))}
  </Select>
  )
}

export default SelectModel