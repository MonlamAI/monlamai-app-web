import React, { useState, useEffect } from "react";
import { Button, Card, TextInput } from "flowbite-react";
import { FaFacebook, FaShare, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import CopyToClipboard from "./CopyToClipboard";

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

function SocialShareButton({ icon, onClick }) {
  return (
    <Button color="gray" onClick={onClick}>
      {icon}
    </Button>
  );
}

function ShareLink({ link }) {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="relative z-20">
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)}>
          <FaShare />
        </Button>
      )}
      <dialog open={isOpen} className="absolute z-20 left-[-20vw] top-full">
        <Card className="w-[50vw] md:max-w-[20vw]">
          <div className="flex gap-2">
            <TextInput
              type="text"
              value={window.location.origin + link}
              readOnly
            />
            <CopyToClipboard textToCopy={window.location.origin + link} />
          </div>
          <div className="flex justify-around">
            <SocialShareButton
              icon={<FaFacebook />}
              onClick={() => openShareWindow(facebookUrl)}
            />
            <SocialShareButton
              icon={<FaTwitter />}
              onClick={() => openShareWindow(twitterUrl)}
            />
            <SocialShareButton
              icon={<FaWhatsapp />}
              onClick={() => openShareWindow(whatsappUrl)}
            />
          </div>
        </Card>
      </dialog>
    </div>
  );
}

export default ShareLink;
