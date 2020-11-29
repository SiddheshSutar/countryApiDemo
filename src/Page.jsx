import React, { useEffect, useState } from 'react';
import { getData } from './services';
import { Constants } from './Constants';
import ScrollerDiv from './Atoms/ScrollerDiv';
import styled from "styled-components";

const StyledRegion = styled.div`
    max-width: 100px;
    font-size: 18px;
    background-color: ${Constants.region_element};
    margin: 10px;
    border: 3px solid black;
    border-radius: 1px
`;

const StyledContainer = styled.div`
    display: flex;
`;

const regionList = [
    'asia',
    'europe'
]

const Page = () => {
    const [res, setRes] = useState({});
    const [viewFlag, setViewFlag] = useState(false);

    const [region, setRegion] = useState('');
    const [countryRes, setCountryRes] = useState([]);
    const [isCountry, showCountryDiv] = useState(false);

    const [country, setCountry] = useState('');
    // const [countryDetailsRes, setCountryDetailsRes] = useState([]);
    const [isCountryDetails, showCountryDetailsDiv] = useState(false);

    // useEffect(() => {
    //     getData(`${Constants.main_api}${Constants.fetch_region}`).then(res => {
    //         setRes(res)
    //         setViewFlag(true)
    //     }).catch(err => {
    //         console.log(`Err in getData : of Page.jsx: ${err}`)
    //     })
    // }, []);


    useEffect(() => {

        getData(`${Constants.main_api}${Constants.fetch_region}${region}`).then(res => {
            setRes(res);

            // enable 2nd div via flag
            showCountryDiv(true);
        }).catch(err => {
            console.log(`Err in getData : of Page.jsx: ${err}`)
        })

    }, [region, setRegion])

    //country fetching
    useEffect(() => {

        getData(`${Constants.main_api}${Constants.fetch_country}${country}?fullText=true`).then(res => {
            setCountryRes(res[0]);

            // enable 2nd div via flag
            showCountryDetailsDiv(true);
        }).catch(err => {
            console.log(`Err in country getData : of Page.jsx: ${err}`)
        })

    }, [country, setCountry])

    return ( 
        <StyledContainer>
            <ScrollerDiv maxHeight = {'400px'}>
                <div className="region-container">
                    {regionList.map((element, index) => (
                        <button key = {index} className="country" onClick={() => setRegion(element)} >
                            <StyledRegion
                                
                            >
                                {element}
                            </StyledRegion>
                        </button>
                    ))}
                </div>
            </ScrollerDiv>
            {isCountry ? <ScrollerDiv maxHeight = {'400px'}>
                <div className="country-container">
                    {res.map((element, index) => (
                        <button key={index} className="country" onClick={() => setCountry(element.name)}>
                            <StyledRegion>
                                {element.name}
                            </StyledRegion>
                        </button>
                    ))}
                </div>
            </ScrollerDiv> : 
            <div className="no-data">
                No country Data
            </div>
            }
            {isCountryDetails ? <ScrollerDiv maxHeight = {'700px'}>
                <div className="country-container" style={{display: 'flex', flexDirection: 'column'}}>
                    <div className="image" style={{backgroundImage: `url(${countryRes.flag})`, width: '100px', height: '70px', backgroundSize: '100% 100%'}}></div>
                    <div className="tag">{`${countryRes.region}/${countryRes.name}`}</div>
                    <div className="name">{countryRes.name}</div>
                    <div className="alpha3Code">{countryRes.alpha3Code}</div>
                    <div className="capital">{countryRes.capital}</div>
                    <div className="denonym">{countryRes.demonym}</div>
                    <div className="calling-codes">
                    {
                        <>
                            {countryRes.callingCodes.map(code => 
                                <div style={{backgroundColor: '#4d4d4f'}} className = 'calling-code'> {code}</div>
                            )}
                        </>
                    }
                    </div>
                    <div className="currencies">
                    {
                        <>
                            {countryRes.currencies.map(currencyObj => 
                                <div style={{backgroundColor: '#03868b'}} className = 'currency'> {currencyObj.code}</div>
                            )}
                        </>
                    }
                    </div>
                    <div className="population">{countryRes.population}</div>
                    
                </div>
            </ScrollerDiv>: 
            <div className="no-data">
                No country details Data
            </div>}
        </StyledContainer>
     );
}
 
export default Page;