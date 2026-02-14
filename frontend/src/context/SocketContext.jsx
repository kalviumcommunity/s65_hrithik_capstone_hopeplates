import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            const newSocket = io(import.meta.env.VITE_API_URL, {
                withCredentials: true,
            });

            newSocket.on("connect", () => {
                console.log("Socket connected:", newSocket.id);
                newSocket.emit("join_room", parsedUser.id || parsedUser._id);
            });

            setSocket(newSocket);

            return () => newSocket.close();
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket, user }}>
            {children}
        </SocketContext.Provider>
    );
};
