import styled from "styled-components"
import {navData} from './NavData'
import Image from "next/image"

const DropdownContainer = styled.div`
    width: 100%;
    position: absolute;
    background-color: var(--main-light-blue);
    top: 100%;
    left: 0;
    z-index: 100;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 1rem 5rem;
    ul:nth-child(2) {
        border-right: 2px solid var(--main-lightish-blue);
        border-left: 2px solid var(--main-lightish-blue);
    }
`

const DropDownColumn = styled.ul`
    padding: 0rem 2rem 1rem 2rem;
`

const ColumnItem = styled.li`
    list-style: none;
    font-size: 0.9rem;
    margin: 0.75rem 0rem;
    a {
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
        text-decoration-color: var(--main-dark-blue);
        text-decoration-thickness: 3px;
        text-underline-offset: 5px;

    }
`

const ColumnImage = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;
    height: fit-content;
    img {
        width: 100%;
        height: auto;
    }
    div {
        background-color: var(--main-dark-blue);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.3;
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
                    <ColumnImage>
                        <Image src={navData[section].image.source} alt={navData[section].image.alt}/>
                        <div></div>
                    </ColumnImage>
                </DropdownContainer>
            : null}
        </>
    )
}