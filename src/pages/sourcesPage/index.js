import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Input, Alert, Row, Col, Label, 
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';
// import {Label, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown} from 'reactstrap';
//import "./events.css"

//orderPage is for create order

export default function SourcesPage({history}){

    const [sourceName, setSourceName] = useState("");
    const [sourceNameEn, setSourceNameEn] = useState("");
    const [siteAddress, setSiteAddress] = useState("");
    const [rssURL, setRssURL] = useState("");
    const [tagClassName, setTagClassName] = useState("");
    const [secondTag, setSecondTag] = useState("");
    const [isLocalImg, setIsLocalImg] = useState("");
    const [isCategorized, setIsCategorized] = useState(true);
    const [categoryPr, setCategoryPr] = useState("");
    const [categoryEn, setCategoryEn] = useState("");
    const [isSubCategorized, setIsSubCategorized] = useState(true);
    const [subCategoryPr, setSubCategoryPr] = useState("");
    const [subCategoryEn, setSubCategoryEn] = useState("");
    const [categoryCode, setCategoryCode] = useState('');
    const [error, setError]  = useState(false);
    const [success, setSuccess] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // check if neccesory
    const [dropdownOpen2, setDropdownOpen2] = useState(false);

    const categories = [
        { code: '1', categoryEn: 'politic', categoryPr: 'سیاسی' },
        { code: '2', categoryEn: 'economic', categoryPr: 'اقتصادی' },
        { code: '3', categoryEn: 'sport', categoryPr: 'ورزشی' },
        { code: '4', categoryEn: 'social', categoryPr: 'اجتماعی' },
        { code: '5', categoryEn: 'culture and art', categoryPr: 'فرهنگی هنری' },
        { code: '6', categoryEn: 'international', categoryPr: 'جهان' },
        { code: '7', categoryEn: 'sience', categoryPr: 'علمی' },
        { code: '8', categoryEn: 'tech', categoryPr: 'فناوری' },
        { code: '9', categoryEn: 'province', categoryPr: 'استان' },
      ];
    
      const subs = [
        ///////politic
        {
          code: '11',
          subCategoryEn: 'internal',
          subCategoryPr: 'داخلی',
          surCode: '1',
        },
        {
          code: '12',
          subCategoryEn: 'paries and character',
          subCategoryPr: 'احزاب و شخصیت ها',
          surCode: '1',
        },
        {
          code: '13',
          subCategoryEn: 'Military-Defensive-Security',
          subCategoryPr: 'نظامی-دفاعی-امنیتی',
          surCode: '1',
        },
        {
          code: '14',
          subCategoryEn: 'Government',
          subCategoryPr: 'دولت و مجلس ها',
          surCode: '1',
        },
        {
          code: '15',
          subCategoryEn: 'Foreign policy',
          subCategoryPr: 'سیاست خارجی',
          surCode: '1',
        },
        ///////economic
        {
          code: '21',
          subCategoryEn: 'Macroeconomics',
          subCategoryPr: 'اقتصاد کلان',
          surCode: '2',
        },
        {
          code: '22',
          subCategoryEn: 'banks',
          subCategoryPr: 'بانک و بیمه',
          surCode: '2',
        },
        {
          code: '23',
          subCategoryEn: 'finance',
          subCategoryPr: 'بازار مالی',
          surCode: '2',
        },
        {
          code: '24',
          subCategoryEn: 'industry',
          subCategoryPr: 'صنعت معدن تجارت',
          surCode: '2',
        },
        {
          code: '25',
          subCategoryEn: 'energy',
          subCategoryPr: 'انرژی',
          surCode: '2',
        },
        ///////sports
        {
          code: '31',
          subCategoryEn: 'football',
          subCategoryPr: 'فوتبال',
          surCode: '3',
        },
        {
          code: '32',
          subCategoryEn: 'vollyball',
          subCategoryPr: 'والیبال',
          surCode: '3',
        },
        {
          code: '33',
          subCategoryEn: 'basketball',
          subCategoryPr: 'بسکتبال',
          surCode: '3',
        },
        {
          code: '34',
          subCategoryEn: 'razmi',
          subCategoryPr: 'رزمی',
          surCode: '3',
        },
    
        ///////social
        {
          code: '4',
          subCategoryEn: 'education',
          subCategoryPr: 'آموزش',
          surCode: '4',
        },
        {
          code: '4',
          subCategoryEn: 'to complete',
          subCategoryPr: 'محیط زیست',
          surCode: '4',
        },
        {
          code: '4',
          subCategoryEn: 'to complete',
          subCategoryPr: 'شهری',
          surCode: '4',
        },
        {
          code: '4',
          subCategoryEn: 'to complete',
          subCategoryPr: 'سلامت',
          surCode: '4',
        },
        {
          code: '4',
          subCategoryEn: 'to complete',
          subCategoryPr: 'آسیب ها',
          surCode: '4',
        },
        {
          code: '4',
          subCategoryEn: 'to complete',
          subCategoryPr: 'خانواده',
          surCode: '4',
        },
        {
          code: '4',
          subCategoryEn: 'to complete',
          subCategoryPr: 'فرهنگی گردشگری',
          surCode: '4',
        },
        {
          code: '4',
          subCategoryEn: 'to complete',
          subCategoryPr: 'قضایی و حقوقی',
          surCode: '4',
        },
        { code: '4', subCategoryEn: '', subCategoryPr: 'حوادث', surCode: '4' },
        {
          code: '4',
          subCategoryEn: 'to complete',
          subCategoryPr: 'رفاه و خدمات اجتماعی',
          surCode: '4',
        },
        {
          code: '4',
          subCategoryEn: 'to complete',
          subCategoryPr: 'سربازی و نظام وظیفه',
          surCode: '4',
        },
      ];

      const toggle1 = () => setDropdownOpen((prevState) => !prevState);
      const toggle2 = () => setDropdownOpen2((prevState2) => !prevState2);

    
    const user = localStorage.getItem('user');

    useEffect(()=>{
        if(!user) history.push('./login')
    },[])

    function changeCategory(e) {
        console.log('changeQuantity-start');
        console.log('changeQuantity - ', e.target.value);
        setCategoryPr(e.target.value);
        setCategoryEn(
          categories.filter((opt) => opt.categoryPr == e.target.value)[0].categoryEn
        );
        setCategoryCode(
          categories.filter((ca) => ca.categoryPr == e.target.value)[0].code
        );
    }
    
    function changeSubCategory(e) {
        setSubCategoryPr(e.target.value);
        setSubCategoryEn(
        subs.filter((opt) => opt.subCategoryPr == e.target.value)[0].subCategoryEn
        );
    }

    const submitHandler = async (src) =>{
        src.preventDefault()
        const sourceData = new FormData();

        sourceData.append("sourceName", sourceName);
        sourceData.append("sourceNameEn",sourceNameEn);
        sourceData.append("siteAddress", siteAddress);
        sourceData.append("rssURL", rssURL);
        sourceData.append("tagClassName", tagClassName);
        sourceData.append("secondTag", secondTag);
        sourceData.append("isLocalImg", isLocalImg);
        sourceData.append("isCategorized", isCategorized);
        sourceData.append("category", categoryPr);
        sourceData.append("categoryEn", categoryEn);
        sourceData.append("isSubCategorized", isSubCategorized);
        sourceData.append("subCategory", subCategoryPr);
        sourceData.append("subCategoryEn", subCategoryEn);
        
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
                    <Row>
                        <Col md={6}>
                            <FormGroup>   
                                <Input id="sourceName" type="text" value={sourceName} placeholder={'sourceName'} 
                                    onChange={(src) => setSourceName(src.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>   
                                <Input id="sourceNameEn" type="text" value={sourceNameEn} placeholder={'sourceNameEn'} 
                                    onChange={(src) => setSourceNameEn(src.target.value)} />
                            </FormGroup>
                        </Col>
                    </Row>
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
                    
                    <Row>
                        
                        <Col md={6}>
                            <FormGroup check>
                                <Input id="isLocalImg" type="checkbox" value={isLocalImg} placeholder={'isLocalImg'} 
                                    onChange={(src) => setIsLocalImg(src.target.value)} />
                                <Label check for="exampleCheck" >isLocalImg</Label>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Input id="secondTag" type="text" value={secondTag} placeholder={'secondTag'} 
                                    onChange={(src) => setSecondTag(src.target.value)} />
                            </FormGroup>
                        </Col>
                        
                    </Row>
                    
                    <Row>
                        <Col md={4}>
                            <FormGroup check>
                                <Input id="isCategorized" type="checkbox" value={isCategorized} placeholder={'isCategorized'} 
                                    onChange={(src) => setIsCategorized(src.target.value)} />
                                <Label check for="isCategorized" >isCategorized</Label>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Input id="category" type="text" value={categoryPr} placeholder={'category'} 
                                    onChange={(src) => setCategoryPr(src.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <div className="d-flex ">
                              <Label> category : </Label>
                              <Dropdown
                                isOpen={dropdownOpen}
                                toggle={toggle1}
                                // direction={direction}
                              >
                                <DropdownToggle caret color="primary">
                                  {categoryPr}
                                </DropdownToggle>
                                <DropdownMenu>
                                  {categories.map((c) => (
                                    <DropdownItem
                                      key={c.categoryPr}
                                      value={c.categoryPr}
                                      onClick={changeCategory}
                                    >
                                      {c.categoryPr}
                                    </DropdownItem>
                                  ))}
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <FormGroup check>
                                <Input id="isSubCategorized" type="checkbox" value={isCategorized} placeholder={'isSubCategorized'} 
                                    onChange={(src) => setIsSubCategorized(src.target.value)} />
                                <Label check for="isSubCategorized" >isSubCategorized</Label>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Input id="subCategory" type="text" value={subCategoryPr} placeholder={'subCategory'} 
                                    onChange={(src) => setSubCategoryPr(src.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <div className="d-flex ">
                              <Label> subCategory: </Label>
                              <Dropdown
                                isOpen={dropdownOpen2}
                                toggle={toggle2}
                                // direction={direction}
                              >
                                <DropdownToggle caret color="primary">
                                  {subCategoryPr}
                                </DropdownToggle>

                                <DropdownMenu>
                                  {subs
                                    .filter((su) => su.surCode == categoryCode)
                                    .map((ss) => (
                                      <DropdownItem
                                        key={ss.subCategoryPr}
                                        value={ss.subCategoryPr}
                                        onClick={changeSubCategory}
                                      >
                                        {ss.subCategoryPr}
                                      </DropdownItem>
                                    ))}
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </FormGroup>
                        </Col>
                    </Row>
                    
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
