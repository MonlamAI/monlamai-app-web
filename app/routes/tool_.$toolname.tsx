import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request, params }) => {
  let toolname = params.toolname;
  return { toolname };
};

function tool() {
  let { toolname } = useLoaderData();
  let navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col h-screen">
      <button onClick={handleBack}>back</button>
      <div className="bg-blue-200 flex-1">{toolname}</div>
      <Link to="/form">Need Access!</Link>
    </div>
  );
}

export default tool;
