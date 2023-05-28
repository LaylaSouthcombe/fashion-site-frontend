import styled, {css} from "styled-components"

const StyledArrow = styled.svg`
    width: 30px;
  height: 30px;
  /* position: absolute;
  top: 40%;
  transform: translateY(-40%);
  -webkit-transform: translateY(-40%); */
  fill: var(--main-dark-blue);
  cursor: pointer;
  ${props => props.direction === 'left' && css`
    left: -10px;
  `}
  ${props => props.direction === 'right' && css`
    left: auto;
    right: -10px;
  `}
`


export default function Arrow(props) {
    return (
      <StyledArrow
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        direction={props.left ? 'left' : 'right'}
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </StyledArrow>
    )
  }