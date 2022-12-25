import React, {useEffect, useState} from 'react';
import axios from "axios";

const LongPulling = () => {

    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");

    async function sendMessage() {
        await axios.post('http://localhost:5000/post-message', {
            messages: value,
            id: Date.now()
        })
    }

    useEffect(() => {
        subscribe()
    }, [])

    console.log(messages)

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-message');
            console.log(data);
            setMessages(perv => [data, ...perv]);
            await subscribe();
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
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
                        {message.messages}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LongPulling;