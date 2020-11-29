import React, { useEffect, useState } from 'react';
import { getData } from './services';
import { Constants } from './Constants';
import ScrollerDiv from './Atoms/ScrollerDiv';
import styled from "styled-components";

const StyledRegion = styled.div`
    
`;

const StyledContainer = styled.div`
    display: flex;
`;

const StyledButton = styled.button`
    max-width: 100px;
    font-size: 18px;
    background-color: ${props => props.backgroundColor};
    margin: 10px;
    border: 1px solid black;
    border-radius: 1px
`;

const StyledCard = styled.div`
    .country-container{
        display: flex;
        flex-wrap: wrap;
        max-width: 300px;
    }

    .country-container > div{
        border: 1px solid #4d4d4f;
        border-radius: 4px;
        margin: 5px;
        padding: 2px 3px 0px 1px;
    }

    .country-container .tag{
        margin-right: 75%;
    }

    .country-container .country-info{
        margin-right: 32%;
        text-align: left;
    }
`;

const regionList = [
    {
        name: 'asia',
        color: '#02b6d6'
    },
    {
        name: 'europe',
        color: '#b493e6'
    }
]

const Page = () => {
    const [res, setRes] = useState({});
    const [viewFlag, setViewFlag] = useState(false);

    const [region, setRegion] = useState('');
    const [countryRes, setCountryRes] = useState([]);
    const [isCountry, showCountryDiv] = useState(false);

    const [country, setCountry] = useState('');
    const [isCountryDetails, showCountryDetailsDiv] = useState(false);

    const [regionColor, setRegionColor] = useState('');


    useEffect(() => {

        getData(`${Constants.main_api}${Constants.fetch_region}${region}`).then(res => {
            setRes(res);
            setRegionColor(regionList.filter(ele => ele.name === region)[0].color)
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
                        <StyledButton backgroundColor={element.color} key = {index} className="country" onClick={() => setRegion(element.name)} >
                            {element.name}
                        </StyledButton>
                    ))}
                </div>
            </ScrollerDiv>
            {isCountry ? <ScrollerDiv maxHeight = {'200px'}>
                <div className="country-container">
                    {res.map((element, index) => (
                        <StyledButton backgroundColor={regionColor} style={{opacity: 0.67}} key={index} className="country" onClick={() => setCountry(element.name)}>
                            {element.name}
                        </StyledButton>
                    ))}
                </div>
            </ScrollerDiv> : 
            <div className="no-data">
                No country Data
            </div>
            }
            {isCountryDetails ? <StyledCard>
                
                <div className="country-container">
                    <div className="tag">{`${countryRes.region}/${countryRes.name}`}</div>
                    <div className="image" style={{backgroundImage: `url(${countryRes.flag})`, width: '50px', height: '40px', backgroundSize: '100% 100%'}}></div>
                    <div className="country-info">
                        <div className="name">{`${countryRes.name}(${countryRes.alpha3Code})`}</div>
                        <div className="capital">{countryRes.capital}</div>
                    </div>
                    <div className="denonym">{countryRes.demonym}</div>
                    <div className="calling-codes">
                    {
                        <>
                            {countryRes.callingCodes.map(code => 
                                <div style={{backgroundColor: '#e5fc92'}} className = 'calling-code'> {code}</div>
                            )}
                        </>
                    }
                    </div>
                    <div className="currencies">
                    {
                        <>
                            {countryRes.currencies.map(currencyObj => 
                                <div style={{backgroundColor: '#ffc9da'}} className = 'currency'> {currencyObj.code}</div>
                            )}
                        </>
                    }
                    </div>
                    <div className="population">{countryRes.population}</div>
                    
                    </div>
                 </StyledCard>: 
            <div className="no-data">
                No country details Data
            </div>}
        </StyledContainer>
     );
}
 
export default Page;