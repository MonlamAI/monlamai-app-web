import { useRouteLoaderData } from "@remix-run/react";
import { useState } from "react";
import { MdFeedback } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function FeedBucket() {
  let { user, feedBucketAccess, feedbucketToken } = useRouteLoaderData("root");
  let [show, setShow] = useState(false);
  let feedFunction = () => {
    setShow(true);
    const feedbucket = document.querySelector("feedbucket-app");
    feedbucket?.classList.remove("hidden");

    (function (k) {
      const s = document.createElement("script");
      s.module = true;
      s.defer = true;
      s.src = "https://cdn.feedbucket.app/assets/feedbucket.js";
      s.dataset.feedbucket = k;
      document.head.appendChild(s);
    })(feedbucketToken);
    window.feedbucketConfig = {
      reporter: {
        name: user.username,
        email: user.email,
      },
    };
  };
  let hideFeedBucket = () => {
    setShow(false);
    const feedbucket = document.querySelector("feedbucket-app");
    feedbucket?.classList.add("hidden");
  };
  let esukhia_user = user?.email?.includes("@esukhia.org");
  let monlam_user = user?.email?.includes("@monlam.ai");
  if (
    monlam_user ||
    esukhia_user ||
    JSON.parse(feedBucketAccess).includes(user?.email)
  ) {
    return (
      <div
        className={`fixed right-3 ${
          !show ? "md:bottom-[10%]" : "   md:top-[65%]"
        } `}
      >
        {!show ? (
          <button
            onClick={feedFunction}
            className="shadow-md bg-white rounded-full p-2"
          >
            <MdFeedback size={24} className="text-neutral-500" />
          </button>
        ) : (
          <button
            className="shadow-md rounded-full bg-white p-2"
            onClick={hideFeedBucket}
          >
            <RxCross2 size={24} color={"#d73449"} />
          </button>
        )}
      </div>
    );
  }
  return null;
}

export default FeedBucket;
