import styled from "styled-components"
import {navData} from './NavData'

const DropdownContainer = styled.div`
    width: 100%;
    position: absolute;
    background-color: var(--main-light-blue);
    top: 100%;
    left: 0;
    z-index: 100;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 1rem 3rem;

    ul:nth-child(2) {
        border-right: 2px solid var(--main-lightish-blue);
        border-left: 2px solid var(--main-lightish-blue);
    }

`

const DropDownColumn = styled.ul`
    padding: 1rem 2rem;
`

const ColumnTitle = styled.h3`
    color: var(--main-dark-blue);
    font-size: 1rem;
`

const ColumnItem = styled.li`
    list-style: none;
    font-size: 0.8rem;
    margin: 0.75rem 0rem;

    a {
        text-decoration: none;
    }
`

export default function NavDropDown({section}) {

    return (
        <>
            {section !== undefined ? 
                <DropdownContainer>
                    {navData[section].childLinks.map((column, i) => {
                        return (
                            <>
                                <DropDownColumn>
                                    <ColumnTitle >{column.title}</ColumnTitle>
                                    {column.listItems.map((item, i) => {
                                        return (
                                            <>
                                                <ColumnItem><a href={item.link}>{item.label}</a></ColumnItem>
                                            </>
                                        )
                                    })}
                                </DropDownColumn>
                            </>
                        )
                    })}
                </DropdownContainer>
            : null}
        </>
    )
}