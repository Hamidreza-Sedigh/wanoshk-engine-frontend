import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Table } from 'reactstrap';
// import { Button, Form, FormGroup, Label, Input, Alert, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown  } from 'reactstrap';

export default function SourcesPage({history}){

    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedSource, setSelectedSource] = useState('');
    const [sources, setSources] = useState([]);
    const user = localStorage.getItem('user');

    useEffect(()=>{
        getSources();
        getDistinct();
    },[]);

    useEffect(()=>{
        // وقتی selectedSource تغییر کرد:
        if (selectedSource) {
            getOneSource(selectedSource);
        } else {
            getSources();
        }
    },[selectedSource]);

    const toggleSourceStatus = async (sourceId, currentStatus) => {
        try {
            const url = `/api/sources/toggle-status`
            const response = await api.put(url,{id: sourceId,enable: !currentStatus}, { headers: { user: user }});
            console.log("**response in toggle:", response);
            if (response.status === 200) {
                console.log("**if ejra shod");
                
                // به روزرسانی تنها منبع تغییر کرده در لیست sources
                setSources(prevSources => 
                    prevSources.map(source => 
                    source._id === sourceId 
                        ? { ...source, enable: response.data.enable } 
                        : source
                    )
                )
            } else {
                console.log("**else ejra shod");
                console.error('خطا در تغییر وضعیت');
            }
        } catch (error) {
            console.error('خطا در ارتباط با سرور:', error);
        }
        };
    const getSources = async(filter) => {
        try {
            const url = `/getAllSources`
            const response = await api.get(url, { headers: { user: user }})
            //console.log("response:", response.data);
            setSources(response.data.sources)
        } catch (error) {
            // history.push('/login');
            console.error('خطا در دریافت منابع:', error);

        }
    };

    const getDistinct = async(filter) => {
        try {
            const url = `/getDistinctSources`
            const response = await api.get(url, { headers: { user: user }})
            // console.log("response:", response.data);
            setDropdownOptions(response.data.sources)
        } catch (error) {
            console.error('خطا در دریافت منابع:', error);
        }
    };

    const getOneSource = async() => {
        try {
            const url = `/getOneSource/${encodeURIComponent(selectedSource)}`;
            console.log("selectedSource:", selectedSource);
            const response = await api.get(url, { headers: { user: user }})
            console.log("response:", response.data);
            setSources(response.data.sources)
        } catch (error) {
            //history.push('/login');
            console.error('خطا در دریافت منابع:', error);
        }
    };

    
    return(
        // <Container>
        <div>
            <div className="mb-4">
            <label className="block mb-1 font-medium">انتخاب منبع:</label>
            <select
                className="w-full p-2 border rounded"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                >
                <option value="">همه منابع</option>
                {dropdownOptions.map((name, index) => (
                    <option key={index} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
            <h2>all sources:</h2>
            <div className="table">
                {/* <Table striped hover responsive bordered borderless  size="sm"> */}
                <Table striped hover responsive size="sm">
                <thead>
                    <tr className="table-dark">
                    
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
                    <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {sources.map((s) => (
                    <tr key={s._id}>
                        <td className="news-source"> {s.sourceName} </td>
                        <td className="news-source"> {s.sourceNameEn} </td>
                        <td onClick={() => toggleSourceStatus(s._id, s.enable)} style={{cursor: 'pointer'}} className="news-source"> {s.enable?'yep':'no'} </td>
                        <td className="news-source"> {s.siteAddress} </td>
                        <td className="news-source"> {s.rssURL} </td>
                        <td className="news-source"> {s.category} </td>
                        <td className="news-source"> {s.subCategory} </td>
                        <td className="news-source"> {s.lastTimeFetch} </td>
                        <td className="news-source"> {s.status} </td>
                        <td className="news-source"> {s._id} </td>
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
