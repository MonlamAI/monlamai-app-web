import { instructors } from "~/routes/about/data/instructors";
import uselitteraTranlation from "../../../component/hooks/useLitteraTranslation";

function Instructor() {
  let { translation } = uselitteraTranlation();
  return (
    <div className="my-20">
      <h2 className="lg:text-3xl text-xl font-bold  my-10 md:my-20 flex justify-center">
        {translation.advisors}
      </h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {instructors.map((instructor) => {
          return (
            <div
              className="h-fit w-24  md:w-28  md:my-4 font-poppins"
              key={instructor.name}
            >
              <img
                src={instructor.image}
                alt={instructor.name}
                className="rounded-full h-24 w-24 object-cover shadow-md p-1 "
              />
              <p className="text-center text-[14px] pt-2 ">{instructor.name}</p>
              <p className="text-center text-[10px] md:text-[12px] ">
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
