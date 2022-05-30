import React, {useEffect, useState, useMemo} from 'react';
import api from '../../services/api';
import moment from 'moment';
import './dashboard.css'
// import { Button, ButtonGroup, Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import socketio from 'socket.io-client';
//import Registration from '../../../../backend/src/models/Registration';


//dashboard will show all the events       
export default function Dashboard({history}){
    const [events, setEvents] = useState([]);
    const user = localStorage.getItem('user');
    const user_id = localStorage.getItem('user_id');
    //const [cSelected, setCSelected] = useState([]); // jean deleted

    // const [rSelected, setRSelected] = useState(null);
    // const [error, setError] = useState(false);
    // const [success, setSuccess] = useState(false);
    // const [messageHandler, setMessageHandler] = useState('');
    const [eventsRequest, setEventsRequest] = useState([]);
    // const [dropdownOpen, setDropdownOpen ] = useState(false);
    // const [eventRequestMessage, setEventRequestMessage ] = useState('');
    // const [eventRequestSuccess, setEventRequestSuccess] =  useState(false);
    const [lastTime, setLastTime] = useState([]);
    const [newsCount, setNewsCount] = useState([]);

    // const toggle = () => setDropdownOpen(!dropdownOpen)

    useEffect(()=>{
        getEvents()
        getLastTime()
        getNewsCount()
    },[]);

    const socket = useMemo( 
        () => 
        socketio('http://localhost:8010/', { query: { user: user_id } }),
        [user_id]
        );

    useEffect(()=>{
        console.log("e10 test");
        //socket.on('hamid', response => console.log(response) )
        socket.on('registration_request', data => ( setEventsRequest([ ...eventsRequest, data]) ) )
    },[eventsRequest, socket]);



    const getEvents = async(filter) => {
        try {
            const url = filter ? `/dashboard/${filter}` : `/dashboard`
            const response = await api.get(url, { headers: { user: user }})
            setEvents(response.data.events)
        } catch (error) {
            history.push('/login');
        }
    };

    const getLastTime = async() => {
        try {
            const response = await api.get('/getLastTime', { headers: { user: user }});
            console.log("TEST:", response.data.lastTime)
            setLastTime(response.data.lastTime[0]);
        } catch (error) {
            console.log("ERROR in getLastTime-dashboard", error);
        }
    }

    const getNewsCount = async() => {
        try {
            const response = await api.get('/getNewsCount', { headers: { user: user }});
            console.log("TEST newCount:", response.data.newsCount)
            setNewsCount(response.data.newsCount);
        } catch (error) {
            console.log("ERROR in getNewsCount-dashboard", error);
        }
    }


    return(
        <>
            <div> Engine Dashboard.</div>
            <div>test:</div>
            <div>
                <p>last time fetch news:
                    { moment(lastTime.lastTimeFetch).format('YYYY-MM-DD h:mm:ss') } 
                </p>
                <p> newsCount:
                    { newsCount }
                </p>
            </div>
            <div>

            </div>
        </>
    );
}