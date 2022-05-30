import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container } from 'reactstrap';
// import { Button, Form, FormGroup, Label, Input, Alert, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown  } from 'reactstrap';
//import "./events.css"

//orderPage is for create order

export default function SourcesPage({history}){

    // const [sourceName, setSourceName] = useState("")
    // const [siteAddress, setSiteAddress] = useState("")
    // const [rssURL, setRssURL] = useState("")
    // const [tagClassName, setTagClassName] = useState("")
    // const [secondTag, setSecondTag] = useState("")
    // const [isLocalImg, setIsLocalImg] = useState("")
    // const [isCategorized, setIsCategorized] = useState(true)
    // const [category, setCategory] = useState("")
    // const [error, setError]  = useState(false)
    // const [success, setSuccess] = useState(false)
    // const [dropdownOpen, setOpen] = useState(false); // check if neccesory
    const [sources, setSources] = useState([]);
    const user = localStorage.getItem('user');

    useEffect(()=>{
        if(!user) history.push('./login')
        getSources();
    },[])

    
    const getSources = async(filter) => {
        try {
            const url = `/getAllSources`
            const response = await api.get(url, { headers: { user: user }})
            console.log("response:", response.data);
            setSources(response.data.sources)
        } catch (error) {
            history.push('/login');
        }
        
    };

    return(
        <Container>
            <h2>all sources:</h2>
            
            <ul className="source-list">
                    {sources.map(s => (
                        <li key={s._id}>
                            
                            <span className="news-source">  {s.sourceName} </span>
                            <span className="news-source">  {s.siteAddress} </span>
                            <span className="news-source">  {s.rssURL} </span>
                            <span className="news-source">  {s.secondTag} </span>
                            <span className="news-source">  {s.isLocalImg} </span>
                            <span className="news-source">  {s.isCategorized} </span>
                            <span className="news-source">  {s.category} </span>

                        </li>
                    ))}
                </ul>
        </Container>
    );

}
