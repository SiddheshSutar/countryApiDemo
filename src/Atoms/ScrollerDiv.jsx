import React from 'react';
import styled from "styled-components";

const StyledDiv = styled.div`
    max-width: 150px;
    max-height: ${props => props.maxHeight};
    overflow-y: scroll;
    overflow-x: hidden;
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
    maxHeight: '400px'
}