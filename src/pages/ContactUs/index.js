import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container } from 'reactstrap';

export default function ContactUsPage({history}){

    // const [sourceName, setSourceName] = useState("")
    // const [error, setError]  = useState(false)
    // const [success, setSuccess] = useState(false)
    // const [dropdownOpen, setOpen] = useState(false); // check if neccesory
    const [sources, setSources] = useState([]);
    const [contactus, setContactus] = useState([]);
    const user = localStorage.getItem('user');

    useEffect(()=>{
        if(!user) history.push('./login')
        getContacts();
    },[])

    
    const getContacts = async(filter) => {
        try {
            const url = `/getContacts`
            const response = await api.get(url, { headers: { user: user }})
            console.log("response:", response.data);
            setContactus(response.data.contactUses)
        } catch (error) {
            history.push('/login');
        }
        
    };

    return(
        <Container>
            <h2>all contactus:</h2>
            
            <ul className="source-list">
                    {contactus.map(s => (
                        <li key={s._id}>
                            <span className="news-source">  {s.mail} </span>
                            <span className="news-source">  {s.category} </span>
                            <span className="news-source">  {s.passage} </span>
                            <span className="news-source">  {s.date} </span>
                            <span className="news-source">  {s.read} </span>
                            

                        </li>
                    ))}
                </ul>
        </Container>
    );

}
