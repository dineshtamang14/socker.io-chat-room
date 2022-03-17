import React, { useContext, useState, useEffect } from 'react';
import {UserContext} from "../../UserContext";
import { Link } from "react-router-dom";
import RoomList from './RoomList';
import io from "socket.io-client";

let socket;

function Home() {
    const ENDPOINT = "localhost:5000";
    useEffect(() => {
        socket = io(ENDPOINT);
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT])
    const { user, setUser } = useContext(UserContext);
    const [room, setRoom] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        socket.emit("create-room", room);
        console.log(room);
        setRoom('');
    }

    const rooms = [
        {
            name: 'room1',
            _id: '123'
        },
        {
            name: 'room2',
            _id: '456'
        }
    ]

    const setAsDinesh = () => {
        const dinesh = {
            name: "Dinesh Tamang",
            email: "dinesh@gmail.com",
            password: "dinesh",
            id: "123"
        }
        setUser(dinesh);
    }

    const setAsSelena = () => {
        const selena = {
            name: "Selena Gomez",
            email: "selena@gmail.com",
            password: "selena",
            id: "123"
        }
        setUser(selena);
    }
  return (
    <div>
    <div className="row">
        <div className="col s12 m6">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Welcome {user && user.name }</span>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    placeholder="Enter a room name"
                                    value={room}
                                    onChange={e=> setRoom(e.target.value)}
                                    id="room" type="text" className="validate" />
                                <label htmlFor="room">Room</label>
                            </div>
                        </div>
                        <button className="btn">Create Room</button>
                    </form>
                </div>
                <div className="card-action">
                    <a href="#" onClick={setAsDinesh}>set as Dinesh</a>
                    <a href="#" onClick={setAsSelena}>set as Selena</a>
                </div>
            </div>
        </div>
        <div className="col s6 m5 offset-1">
            <RoomList rooms={rooms} />
        </div>
    </div>

    <Link to={'/chat'}>
        <button>go to chat</button>
    </Link>
</div>
  )
}

export default Home