import { Button, Card, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { FaFacebook, FaShare, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import CopyToClipboard from "./CopyToClipboard";

type ShareProps = {
  link: string;
};

function ShareLink({ link }: ShareProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen)
    return (
      <Button onClick={() => setIsOpen(true)}>
        <FaShare />
      </Button>
    );

  const link_url = "https://monlam.ai";

  return (
    <dialog open={isOpen} className="absolute  bottom-20">
      <Card className="w-[50vw] md:max-w-[20vw]">
        <div className="flex gap-2">
          <TextInput type="text" value="link" readOnly></TextInput>
          <CopyToClipboard textToCopy={link_url} disabled={false} />
        </div>
        <div className="flex justify-around">
          <Button color="gray" onClick={() => shareFacebook(link_url)}>
            <FaFacebook />
          </Button>
          <Button color="gray" onClick={() => shareTwitter(link_url)}>
            <FaTwitter />
          </Button>
          <Button color="gray" onClick={() => shareWhatsapp(link_url)}>
            <FaWhatsapp />
          </Button>
        </div>
      </Card>
    </dialog>
  );
}

export default ShareLink;

function shareWhatsapp(shareUrl: string) {
  const shareText = "visit this link ";
  const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
    shareText
  )}%20${encodeURIComponent(shareUrl)}`;
  // Open WhatsApp with the share URL
  return window.open(whatsappUrl, "_blank");
}

function shareTwitter(shareUrl: string) {
  const shareText = "visit this link ";
  const twitterUrl = `https://twitter.com/share?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(shareText)}`;
  // Open Twitter with the share URL
  return window.open(twitterUrl, "_blank");
}
function shareFacebook(shareUrl: string) {
  const shareText = "visit this link ";
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}&t=${encodeURIComponent(shareText)}`;
  // Open Facebook with the share URL
  return window.open(facebookUrl, "_blank");
}
