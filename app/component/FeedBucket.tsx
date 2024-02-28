import { useRouteLoaderData } from "@remix-run/react";
import { useState } from "react";
import { MdFeedback } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function FeedBucket() {
  let { show_feed_bucket, user, feedBucketAccess } = useRouteLoaderData("root");
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
    })("ym4vwOa3unzDSASQ2o5f");
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
  if (esukhia_user || JSON.parse(feedBucketAccess).includes(user?.email)) {
    return (
      <div
        className={`fixed right-2 ${
          !show ? "bottom-1 md:top-[50%]" : "top-[58%] md:top-[65%]"
        } `}
        hidden={!show_feed_bucket}
      >
        {!show ? (
          <button
            onClick={feedFunction}
            className="shadow-md bg-white rounded-full p-2"
          >
            <MdFeedback size={24} color={"#d73449"} />
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
