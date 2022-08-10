import styled from 'styled-components';
import PropTypes from 'prop-types';

export const StyledDiv = styled.div`
display: 'flex',
alignTtems: 'center',
justifyContent: 'center'
`;

export const Button = styled.button`
/* Adapt the colors based on primary prop */
background: ${props => props.primary ? "#6eb800" : "white"};
color: ${props => props.primary ? "white" : "#6eb800"};

font-size: 16px;
margin: 1em;
padding: 7px 20px;
border: 2px solid #6eb800;
border-radius: 3px;
font-weight: 600;
&:hover:not(:disabled){
    box-shadow: 0 0.5em 0.5em -0.4em ;
    transform: translateY(-0.25em);
    transition: 0.7s;
}
&:disabled{
        opacity:0,6;
        border: 2px solid #999999;
        background-color: #cccccc;
        color: #666666;
}
`;
Button.PropTypes = {
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
}
