import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import VideoPlayer from "../components/VideoPlayer";
import ChatBox from "../components/ChatBox";
import { useSocket } from "../context/SocketContext";

const Room = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const socket = useSocket(); // ⬅️ consume from context

  // Load room data
  useEffect(() => {
    const loadRoom = async () => {
      try {
        const res = await api.get(`/room/${roomId}`);
        setRoom(res.data.room);
      } catch (err) {
        console.error("Failed to load room data:", err);
      }
    };
    loadRoom();
  }, [roomId]);

  // Join room when socket is ready
  useEffect(() => {
    if (!socket || !room) return;

    if (socket.connected) {
      console.log("Already connected:", socket.id);
      socket.emit("room:join", { roomId });
    } else {
      socket.once("connect", () => {
        console.log("Connected to socket", socket.id);
        socket.emit("room:join", { roomId });
      });
    }

    socket.on("connect_error", async (err) => {
      console.error("Socket connect_error:", err.message, err);
      if (
        err.message === "Authentication error" ||
        err.message === "token_expired"
      ) {
        try {
          console.log("Trying to refresh token...");
          await api.post("/users/refresh-token");
          console.log("Refresh successful, reconnecting socket...");
          socket.connect();
        } catch (refreshErr) {
          console.error("Socket refresh failed", refreshErr);
          // window.location.href = "/login";
        }
      } else {
        console.warn("Unhandled connect_error:", err.message);
      }
    });

    return () => {
      socket.off("connect_error");
    };
  }, [socket, room, roomId]);

  if (!room) return <div>Loading room...</div>;

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <VideoPlayer videoUrl={room.videoUrl} roomId={roomId} />
      </div>
      <div className="w-96 border-l">
        {socket && <ChatBox roomId={roomId} />}
      </div>
    </div>
  );
};

export default Room;
