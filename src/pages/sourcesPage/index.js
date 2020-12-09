import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Label, Input, Alert, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown  } from 'reactstrap';
//import "./events.css"

//orderPage is for create order

export default function SourcesPage({history}){

    const [sourceName, setSourceName] = useState("")
    const [siteAddress, setSiteAddress] = useState("")
    const [rssURL, setRssURL] = useState("")
    const [tagClassName, setTagClassName] = useState("")
    const [secondTag, setSecondTag] = useState("")
    const [isLocalImg, setIsLocalImg] = useState("")
    const [isCategorized, setIsCategorized] = useState(true)
    const [category, setCategory] = useState("")
    const [error, setError]  = useState(false)
    const [success, setSuccess] = useState(false)
    const [dropdownOpen, setOpen] = useState(false); // check if neccesory
    const user = localStorage.getItem('user');

    useEffect(()=>{
        if(!user) history.push('./login')
    },[])

    const submitHandler = async (src) =>{
        src.preventDefault()
        const sourceData = new FormData();

        sourceData.append("sourceName", sourceName);
        sourceData.append("siteAddress", siteAddress);
        sourceData.append("rssURL", rssURL);
        sourceData.append("tagClassName", tagClassName);
        sourceData.append("secondTag", secondTag);
        sourceData.append("isLocalImg", isLocalImg);
        sourceData.append("isCategorized", isCategorized);
        sourceData.append("category", category);
        
        console.log("test1")
        try {
            if(sourceName !== "" && siteAddress !== "" && rssURL !== "" && tagClassName){
                    console.log("before post");
                    await api.post("/addSource", sourceData, {headers: {user: user} })
                    console.log("success add");
                    setSuccess(true)
                    setTimeout(()=>{
                        setSuccess(false)
                        history.push("/")
                    }, 2000)
            } else {
                console.log("test else");
                setError(true)
                setTimeout(()=>{
                    setError(false)
                }, 2000)
            }
        } catch (error) {
            console.log("the Error:", error.message);
        }
        return "";
    }

    return(
        <Container>
            <h2>new source:</h2>
            <Form onSubmit={submitHandler}>
                <div className="input-group">
                    <FormGroup>   
                        <Input id="sourceName" type="text" value={sourceName} placeholder={'sourceName'} 
                               onChange={(src) => setSourceName(src.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Input id="siteAddress" type="text" value={siteAddress} placeholder={'siteAddress'} 
                               onChange={(src) => setSiteAddress(src.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Input id="rssURL" type="text" value={rssURL} placeholder={'rssURL'} 
                               onChange={(src) => setRssURL(src.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Input id="tagClassName" type="text" value={tagClassName} placeholder={'tagClassName'} 
                               onChange={(src) => setTagClassName(src.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Input id="secondTag" type="text" value={secondTag} placeholder={'secondTag'} 
                               onChange={(src) => setSecondTag(src.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Input id="isLocalImg" type="text" value={isLocalImg} placeholder={'isLocalImg'} 
                               onChange={(src) => setIsLocalImg(src.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Input id="isCategorized" type="text" value={isCategorized} placeholder={'Event isCategorized'} 
                               onChange={(src) => setIsCategorized(src.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Input id="category" type="text" value={category} placeholder={'Event category'} 
                               onChange={(src) => setCategory(src.target.value)} />
                    </FormGroup>
                    
                </div>
                <FormGroup>
                    <Button className="submit-btn"  type="submit">
                        save source
                    </Button>
                </FormGroup>
                <FormGroup>
                <Button className="secondary-btn" onClick={()=>history.push("/")}>
                        Dashboard
                    </Button>
                </FormGroup>
            </Form>
            { error ? (
                <Alert className="event-validation" color="danger">missing required information</Alert>
            ): "" }
            { success ? (
                <Alert className="event-validation" color="success">suuccess!!</Alert>
            ): "" }
        </Container>
    );

}
