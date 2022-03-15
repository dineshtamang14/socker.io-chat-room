import React, { useContext } from 'react';
import {UserContext} from "../../UserContext";
import { Link } from "react-router-dom";

function Chat() {
    const { user, setUser } = useContext(UserContext);

  return (
    <div>
        <h1>Chat {JSON.stringify(user)}</h1>
        <Link to={'/'}>
            <button>goto home</button>
        </Link>
    </div>
  )
}

export default Chat