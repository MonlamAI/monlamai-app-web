import { useLoaderData } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { getSocket } from "~/services/socket";

function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [progress, setProgress] = useState({});
  const { user, fileUploadUrl } = useLoaderData();
  const socket = useMemo(() => {
    return getSocket(fileUploadUrl);
  }, [fileUploadUrl]);

  useEffect(() => {
    if (!socket) return;
    function onConnect() {
      setIsConnected(true);
      console.log("connected to socket");
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    function onProgressUpdate(data) {
      let inferenceId = data.id;
      let newProgress = { ...progress, [inferenceId]: data["progress"] };
      setProgress(newProgress);
    }

    socket.on("connect", function (data) {
      onConnect();
      socket.emit("storeClientInfo", {
        customId: user ? user?.email : "default",
      });
    });
    socket.on("disconnect", onDisconnect);
    socket.on("progressUpdate", onProgressUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("progressUpdate", onProgressUpdate);
    };
  }, [socket, user]);
  return { isConnected, socket, progress };
}

export default useSocket;
