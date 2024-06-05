import { useState, useEffect, useMemo } from "react";
import { Button, Dropdown, TextInput } from "flowbite-react";
import { FaFacebook, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import CopyToClipboard from "./CopyToClipboard";
import { ReactionButton } from "./ReactionButtons";
import { FaShareAlt } from "react-icons/fa";
import { ICON_SIZE } from "~/helper/const";
// Custom hook for getting share URLs
function useShareUrl(link: string) {
  const baseShareUrl = link;
  const shareText = "Visit this link ";

  const getPlatformShareUrl = (platformUrl: string) =>
    platformUrl
      .replace("{url}", encodeURIComponent(baseShareUrl))
      .replace("{text}", encodeURIComponent(shareText));

  return {
    whatsappUrl: getPlatformShareUrl(`whatsapp://send?text={text}%20{url}`),
    twitterUrl: getPlatformShareUrl(
      `https://twitter.com/share?url={url}&text={text}`
    ),
    facebookUrl: getPlatformShareUrl(
      `https://www.facebook.com/sharer/sharer.php?u={url}&t={text}`
    ),
  };
}

function SocialShareButton({ icon, onClick, color }) {
  return (
    <button
      style={{
        background: color,
        padding: "5px 16px",
        borderRadius: "0.4rem",
      }}
      className="hover:opacity-80 transition-all duration-75"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

function ShareLink({ inferenceId }) {
  const [isOpen, setIsOpen] = useState(false);
  const link = inferenceId
    ? useMemo(
        () => window.location.origin + `/share/${inferenceId}`,
        [inferenceId]
      )
    : "";
  const { whatsappUrl, twitterUrl, facebookUrl } = useShareUrl(link);
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => setIsOpen(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const openShareWindow = (url) => {
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Dropdown
        className=" mt-2 w-52 px-1 z-30"
        label="shareLink"
        placement="bottom"
        dismissOnClick={true}
        renderTrigger={() => (
          <span className="focus:outline-none cursor-pointer text-gray-500 disabled:opacity-20 ">
            <FaShareAlt size={ICON_SIZE} />
          </span>
        )}
        size="md"
      >
        <Dropdown.Header>Share</Dropdown.Header>
        <div className="">
          <div className="flex gap-2 justify-center items-center mb-2 p-2 ">
            <TextInput type="text" value={link} readOnly />
            <CopyToClipboard textToCopy={link} />
          </div>
          <div className="flex justify-around mb-2">
            <SocialShareButton
              icon={<FaFacebook className="fill-[white]" />}
              color="#1877f2"
              onClick={() => openShareWindow(facebookUrl)}
            />
            <SocialShareButton
              color="black"
              icon={<FaXTwitter className="fill-[white]" />}
              onClick={() => openShareWindow(twitterUrl)}
            />
            <SocialShareButton
              color="#075e54"
              icon={<FaWhatsapp className="fill-[white]" />}
              onClick={() => openShareWindow(whatsappUrl)}
            />
          </div>
        </div>
      </Dropdown>
    </div>
  );
}

export default ShareLink;
