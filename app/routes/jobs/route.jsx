import { Button } from "flowbite-react";
import React, { useState } from "react";

function Jobs() {
  const [selectedJob, setSelectedJob] = useState(1);
  const jobList = [
    {
      title: "UI/UX Developer",
      skill: "HTML, CSS, JavaScript, Design Principles, Figma",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSephyFkhDhlt8xXPQobBPNYoApzZSq_TsdrzKuY5Ql0zk25qA/viewform?usp=pp_url&entry.795181689=FrontEnd+/+Javascript&entry.1652784337=UI/UX+Developer",
      description:
        "A UI/UX Developer is responsible for creating visually appealing and user-friendly interfaces for web and mobile applications. They collaborate with designers and front-end developers to ensure a seamless user experience, utilizing their expertise in HTML, CSS, JavaScript, and design principles.",
    },
    {
      title: "Python Developer",
      skill: "Python, Django, Flask, SQL",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSephyFkhDhlt8xXPQobBPNYoApzZSq_TsdrzKuY5Ql0zk25qA/viewform?usp=pp_url&entry.795181689=Python&entry.1652784337=Python+Developer",
      description:
        "A Python Developer specializes in writing server-side applications and software using the Python programming language. They work on various projects, from web development and data analysis to machine learning and automation, utilizing their knowledge of Python libraries, frameworks, and best coding practices.",
    },
    {
      title: "Fullstack Developer",
      skill: "HTML, CSS, JavaScript, Python, Node.js",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSephyFkhDhlt8xXPQobBPNYoApzZSq_TsdrzKuY5Ql0zk25qA/viewform?usp=pp_url&entry.795181689=Full+Stack+(NextJS+/+Remix+Run)&entry.1652784337=FullStack+Developer",
      description:
        "A Fullstack Developer is a versatile professional who can work on both the front-end and back-end aspects of web applications. They are proficient in a variety of programming languages and technologies, including HTML, CSS, JavaScript, and server-side scripting languages like Python or Node.js. Fullstack Developers are responsible for designing, developing, and maintaining the entire web application, ensuring its functionality and user experience.",
    },
  ];

  return (
    <div className="flex flex-1 md:max-w-6xl m-auto mt-16">
      <div className=" flex-1 p-5">
        <h3 className="leading-[24px] font-Inter font-medium text-[24px] my-10">
          Jobs
        </h3>
        <ol>
          {jobList.map((job, index) => (
            <>
              <li
                onClick={() => setSelectedJob(index + 1)}
                className="my-2 flex items-center gap-2 cursor-pointer font-Inter leading-normal"
                style={{
                  transition: "all 0.2s ease-in-out",
                  opacity: selectedJob === index + 1 ? 1 : 0.5,
                }}
              >
                <span className="flex justify-center items-center bg-blue-400 p-2 h-5 text-white w-5 rounded-full text-sm">
                  {index + 1}
                </span>{" "}
                {job.title}
              </li>
              {selectedJob === index + 1 && (
                <p className="text-sm text-gray-500 md:hidden">
                  <h5 className="font-Inter leading-normal">
                    {job.description}
                  </h5>
                  <a href={jobList[selectedJob - 1].link}>
                    <Button className="bg-blue-400 hover:bg-blue-500 mt-4">
                      Apply
                    </Button>
                  </a>
                </p>
              )}
            </>
          ))}
        </ol>
      </div>
      {selectedJob && (
        <div className="flex-1 hidden md:flex flex-col p-5">
          <h3 className="leading-[24px] font-Inter font-medium text-[24px] my-10">
            Description
          </h3>
          <h5 className="font-Inter leading-normal">
            {jobList[selectedJob - 1].description}
          </h5>
          <p className="mt-5">Skills : {jobList[selectedJob - 1].skill}</p>
          <a href={jobList[selectedJob - 1].link}>
            <Button className="bg-blue-400 hover:bg-blue-500 mt-10 w-full">
              Apply
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}

export default Jobs;
