import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user from local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Get the API URL
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

        // Initialize socket
        const newSocket = io(API_URL, {
            transports: ["websocket", "polling"],
            reconnection: true,
        });

        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
            setIsConnected(true);

            // Join room with user ID if user exists
            if (storedUser) {
                const u = JSON.parse(storedUser);
                newSocket.emit("join_room", u.id || u._id);
                console.log("Joined room:", u.id || u._id);
            }
        });

        newSocket.on("disconnect", () => {
            console.log("Socket disconnected");
            setIsConnected(false);
        });

        setSocket(newSocket);

        return () => {
            if (newSocket) newSocket.disconnect();
        };
    }, []);

    const value = {
        socket,
        isConnected,
        user
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};
