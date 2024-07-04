import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export function AppInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      const lastPromptTime = localStorage.getItem("lastPromptTime");
      if (!lastPromptTime || Date.now() - lastPromptTime > 3600000) {
        // 1 hour = 3600000 ms
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if the app is already installed
    const checkInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      }
    };

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
    });

    checkInstalled();

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", () => {
        setIsInstalled(true);
      });
    };
  }, []);

  useEffect(() => {
    let interval;
    if (showPrompt) {
      let timeLeft = 10;
      interval = setInterval(() => {
        setProgress((prev) => prev + 10);
        timeLeft -= 1;
        if (timeLeft <= 0) {
          clearInterval(interval);
          setShowPrompt(false);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showPrompt]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
          localStorage.setItem("lastPromptTime", Date.now());
        }
        setDeferredPrompt(null);
        setShowPrompt(false);
      });
    }
  };

  return (
    <>
      {!isInstalled && (
        <div>
          {showPrompt && (
            <div className="flex items-center gap-2 fixed bottom-[60px] right-4 bg-white dark:bg-secondary-800 border border-gray-300 px-4 py-2 shadow-lg rounded-lg z-50">
              <p>Install our app for a smoother experience!</p>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <button
                onClick={handleInstallClick}
                className="px-2 py-1 bg-secondary-500 dark:bg-primary-500  text-neutral-200 dark:text-neutral-900 rounded"
              >
                Install
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="text-neutral-800 dark:text-white hover:dark:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-400 hover:text-neutral-800 rounded"
              >
                <AiOutlineClose />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
