import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Table } from 'reactstrap';
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
        // <Container>
        <div>
            <h2>all sources:</h2>
            <div className="table">
                {/* <Table striped hover responsive bordered borderless  size="sm"> */}
                <Table striped hover responsive>
                <thead>
                    <tr className="table-dark">
                    <th>#</th>
                    <th>sourceName</th>
                    <th>sourceNameEn</th>
                    <th>enable</th>
                    <th>siteAddress</th>
                    <th>rssURL</th>
                    {/* <th>tagClassName</th>
                    <th>secondTag</th>
                    <th>isLocalImg</th>
                    <th>isCategorized</th> */}
                    <th>category</th>
                    <th>subCategory</th>
                    <th>lastTimeFetch</th>
                    <th>status</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {sources.map((s) => (
                    <tr key={s._id}>
                        <td className="news-source"> {s._id} </td>
                        <td className="news-source"> {s.sourceName} </td>
                        <td className="news-source"> {s.sourceNameEn} </td>
                        <td className="news-source"> {s.enable?'yep':'no'} </td>
                        <td className="news-source"> {s.siteAddress} </td>
                        <td className="news-source"> {s.rssURL} </td>
                        <td className="news-source"> {s.category} </td>
                        <td className="news-source"> {s.subCategory} </td>
                        <td className="news-source"> {s.lastTimeFetch} </td>
                        <td className="news-source"> {s.status} </td>
                        
                    </tr>
                    ))}
                </tbody>
                </Table>
            </div>
            {/* <ul className="source-list">
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
            </ul> */}
        {/* </Container> */}
        </div>
    );

}
