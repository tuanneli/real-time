import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

const Websocket = () => {

    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState("");
    const socket = useRef();

    async function sendMessage() {
        const message = {
            username,
            messages: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
        setValue('');
    }

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    if (!connected) {
        return (
            <div className={"flex flex-col justify-center items-center bg-blue-100 w-[100vw] h-[100vh]"}>
                <div
                    className={"border-2 h-[200px] w-[400px] border-cyan-800 rounded-2xl py-4 px-8 flex flex-col align-bottom justify-around"}>
                    <input type="text"
                           value={username}
                           placeholder={'Enter your name'}
                           onChange={e => setUsername(e.target.value)}
                           className={"rounded-md mh-[30px] px-2 py-1.5 focus:outline-none focus:border-cyan-800 focus:ring-2 focus:ring-cyan-800"}/>
                    <button onClick={connect}
                            className={"flex justify-center w-[100px] border-2 border-cyan-800 rounded-md py-1 hover:bg-blue-200 active:bg-blue-300"}>Enter
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={"flex flex-col justify-center items-center bg-blue-100 w-[100vw] h-[100vh]"}>
            <div
                className={"border-2 h-[200px] w-[400px] border-cyan-800 rounded-2xl py-4 px-8 flex flex-col align-bottom justify-around"}>
                <input type="text"
                       value={value}
                       onChange={e => setValue(e.target.value)}
                       className={"rounded-md mh-[30px] px-2 py-1.5 focus:outline-none focus:border-cyan-800 focus:ring-2 focus:ring-cyan-800"}/>
                <button onClick={sendMessage}
                        className={"flex justify-center w-[100px] border-2 border-cyan-800 rounded-md py-1 hover:bg-blue-200 active:bg-blue-300"}>Send
                </button>
            </div>
            <div>
                {messages.map(message =>
                    <div key={message.id}
                         className={'border-2 h-[40px] w-[400px] border-cyan-800 rounded-xl flex items-center justify-start px-8 my-2'}>
                        {message.event === 'connection' ?
                            `User ${message.username} was connected` :
                            message.username + '.' + message.messages}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Websocket;