import { useLoaderData } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { getSocket } from "~/services/socket";

function useSocket(inferenceId) {
  const [isConnected, setIsConnected] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user, fileUploadUrl } = useLoaderData();
  const socket = useMemo(() => getSocket(fileUploadUrl), [fileUploadUrl]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    function onProgressUpdate(data) {
      setProgress(data);
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
  }, []);
  return { isConnected, socket, progress };
}

export default useSocket;
