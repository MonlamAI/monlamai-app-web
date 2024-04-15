import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function useSocket(url: string, user: any) {
  const [isConnected, setIsConnected] = useState(false);
  const [completed, setCompleted] = useState({});
  const socket = useMemo(() => {
    return io(url);
  }, [url]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", function (data) {
      onConnect();
      socket.emit("storeClientInfo", {
        customId: user ? user?.emails[0]?.value : "default",
      });
    });
    socket.on("disconnect", onDisconnect);
    socket.on("progressUpdate", (data) => {
      let newdata = completed;
      newdata[data.jobId] = data;
      setCompleted(newdata);
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return { isConnected, socket, completed };
}

export default useSocket;
