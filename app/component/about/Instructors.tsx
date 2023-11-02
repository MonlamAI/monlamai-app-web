import { Card } from "flowbite-react";
import React from "react";
import { instructors } from "~/helper/instructors";

function Instructor() {
  return (
    <div className="my-20">
      <h2 className="lg:text-3xl text-xl font-bold font-monlam my-10 md:my-20 flex justify-center">
        ཆེད་ལས་སློབ་སྟོན་པ།
      </h2>

      <div className="flex flex-wrap gap-2 justify-center">
        {instructors.map((instructor) => {
          return (
            <div
              className="h-fit w-24  md:w-28  md:my-4 font-Elsie"
              key={instructor.name}
            >
              <img
                src={instructor.image}
                alt={instructor.name}
                className="rounded-full h-24 w-24 object-cover shadow-md p-1 "
              />
              <p className="text-center text-[14px] pt-2 font-Elsie">
                {instructor.name}
              </p>
              <p className="text-center text-[10px] md:text-[12px] font-Elsie">
                {instructor.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Instructor;
