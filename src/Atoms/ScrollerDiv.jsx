import React from 'react';
import styled from "styled-components";

const StyledDiv = styled.div`
    max-width: ${props => props.maxWidth};
    max-height: ${props => props.maxHeight};
    overflow: auto;
`
const ScrollerDiv = (props) => {
    return ( 
        <div className="scroller-container">
            <StyledDiv maxHeight={props.maxHeight}>
                {props.children}
            </StyledDiv>
        </div>
     );
}
 
export default ScrollerDiv;

StyledDiv.defaultProps = {
    maxHeight: '400px',
    maxWidth: '150px'
}