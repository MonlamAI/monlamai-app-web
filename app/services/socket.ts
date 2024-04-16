import io, { Socket } from "socket.io-client";

let socket: Socket | null; // This variable will hold the socket instance

export const getSocket = (url: string) => {
  if (!url) console.log("no socket url provided");
  if (!socket) {
    socket = io(url); // Adjust this URL to your server's
  }
  return socket;
};

export const closeSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
