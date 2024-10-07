import { useRouteLoaderData } from "@remix-run/react";
import { useState } from "react";
import { MdFeedback } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function FeedBucket() {
  let { user, feedBucketAccess, feedbucketToken } = useRouteLoaderData("root");
  let [show, setShow] = useState(false);
  
  if(!user) return null;
  const display_name=user.displayName
  const email=user.emails[0].value
  let feedFunction = () => {
    setShow(true);
    const feedbucket = document.querySelector("feedbucket-app");
    feedbucket?.classList.remove("hidden");
    setTimeout(() => {
      if (feedbucket) {
        feedbucket.style.display = "block";
      }
    }, 0);
    (function (k) {
      const s = document.createElement("script");
      s.module = true;
      s.defer = true;
      s.id = "feedbucket_data";
      s.src = "https://cdn.feedbucket.app/assets/feedbucket.js";
      s.dataset.feedbucket = k;
      document.head.appendChild(s);
    })(feedbucketToken);
    window.feedbucketConfig = {
      reporter: {
        name: display_name,
        email: email,
      },
    };
  };
  let hideFeedBucket = () => {
    const feedbucket = document.querySelector("feedbucket-app");
    setShow(false);
    feedbucket?.classList.add("hidden");
    setTimeout(() => {
      if (feedbucket) {
        feedbucket.style.display = "none";
      }
    }, 0);
  };
  let esukhia_user = email?.includes("@esukhia.org");
  let monlam_user = email?.includes("@monlam.ai");
  const show_feedbucket= monlam_user ||
  esukhia_user ||
  JSON.parse(feedBucketAccess).includes(email)
  if (
   show_feedbucket
  ) {
    return (
      <div
        className={`fixed right-2 ${
          !show ? "bottom-1 md:bottom-[10%]" : " bottom-1  md:top-[65%]"
        } `}
      >
        {!show ? (
          <button
            onClick={feedFunction}
            className="shadow-md bg-white rounded-full p-2 text-neutral-600"
          >
            <MdFeedback size={24} />
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
