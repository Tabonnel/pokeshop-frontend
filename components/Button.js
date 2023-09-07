import styled from "styled-components"

const colors = {
    black: "#000000",
    white: "#FFFFFF",
    offwhite: "#FAF9F6",
}

const Button = styled.button `
border-radius: 3px;
padding: 10px 40 px;
font-size: 18px;
border: none;
outline: none;
font-weight:700;
box-shadow: 3px 3px 3px black ;
color: white; 
background-color: ${({ type}) => (type ? colors[type] : "#000000" )};
cursor: pointer`

const OutlineButton = styled(Button)`
  border: 1px solid #000000;
  color: #000000;
  background-color: #FFFFFF;
`;


export default Button
export {OutlineButton}