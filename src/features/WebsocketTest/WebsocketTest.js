import { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import SockJsClient from "react-stomp";
import proptypes from 'prop-types';
import client from "react-stomp";

const WebsocketTest = () => {
    var clientRef = null;
    var [to, setTo] = useState();
    var [message, setMessage] = useState();
    var [recMessages, setRecMessages] = useState([]);
    const username = /websocket\/(.+)/g.exec(window.location.href)[1];
    const checkEnter = (e) => {if(e.key === 'Enter') sendMessage({from: username, to, message}, clientRef);};

    return (<>
        <TextField
            variant="outlined"
            onKeyDown={(e) => checkEnter(e)}
            label="from"
            value={username}
        />
        <TextField
            variant="outlined"
            onChange={(e) => setTo(e.target.value)}
            onKeyDown={(e) => checkEnter(e)}
            label="to"
            value={to}
        />
        <TextField
            variant="outlined"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => checkEnter(e)}
            label="message"
            value={message}
        />
        <Button
            variant="contained"
            onClick={() => sendMessage(username, message, clientRef)}
        >
            Submit
        </Button>
        <SockJsClient url='http://74.102.204.78:8080/websocket-chat/'
            topics={[`/topic/message`, `/user/queue/newMember`, `/user/${username}/message`]}
            onConnect={() => {console.log("Connected"); clientRef.sendMessage("/app/register", username);}}
            onDisconnect={() => console.log("Disconnected")}
            ref={(client) => clientRef = client}
            
            onMessage={(msg, dst) => recMessage(msg, dst)}
        />
        <ul>
            {
                recMessages.map(({from, text}) => <div><b>{from}</b>: {text}</div>)
            }
        </ul>
    </>);
}

const recMessage = (msg, dst) => {
    console.log(msg, dst);
}

const sendMessage = (msgObj, clientRef) => {
    console.log(`Sending message: "${JSON.stringify(msgObj)}"`);
    clientRef.sendMessage("/app/message", JSON.stringify(msgObj));
}

export default WebsocketTest;