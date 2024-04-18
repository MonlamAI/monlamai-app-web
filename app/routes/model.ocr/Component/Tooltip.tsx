import React from "react";
import { BiQuestionMark } from "react-icons/bi";
import { Tooltip } from "flowbite-react";

function TooltipComponent() {
  return (
    <>
      <div className="absolute  top-2 left-2 cursor-pointer hover:text-orange-400  bg-gray-200 p-1 rounded-full">
        <Tooltip
          content="Please ensure that the image is of high quality and that it includes a lengthy text that is easily readable."
          animation="duration-500"
          placement="left"
          className="w-[200px] md:w-[400px] font-poppins text-xs"
          style="light"
        >
          <BiQuestionMark />
        </Tooltip>
      </div>
    </>
  );
}
export default TooltipComponent;
