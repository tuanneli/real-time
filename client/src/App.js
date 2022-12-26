import './App.css';
import LongPulling from "./components/LongPulling";
import EventSourcing from "./components/EventSourcing";
import Websocket from "./components/Websocket";

function App() {
    return (
        <div className="App">
            <Websocket/>
        </div>
    );
}

export default App;
