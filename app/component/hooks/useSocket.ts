import { useLoaderData } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { getSocket } from "~/services/socket";

function useSocket(jobID, output) {
  const [isConnected, setIsConnected] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user, fileUploadUrl } = useLoaderData();
  const socket = useMemo(() => {
    if (!output) return getSocket(fileUploadUrl);
    return null;
  }, [fileUploadUrl]);

  useEffect(() => {
    if (!socket) return;
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    function onProgressUpdate(data) {
      if (data.jobId == jobID) {
        setProgress(data);
      }
    }

    socket.on("connect", function (data) {
      onConnect();
      socket.emit("storeClientInfo", {
        customId: user ? user?.emails[0]?.value : "default",
      });
    });
    socket.on("disconnect", onDisconnect);
    socket.on("progressUpdate", onProgressUpdate);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("progressUpdate", onProgressUpdate);
    };
  }, [socket]);
  return { isConnected, socket, progress };
}

export default useSocket;
