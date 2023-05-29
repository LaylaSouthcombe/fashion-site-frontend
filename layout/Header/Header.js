import Link from "next/link";
import styled from "styled-components"
import NavDropDown from "@/layout/Header/NavDropDown";
import { useContext, useState } from "react";
import { CheckoutContext } from "@/components/CheckoutContext";
import NavAccordion from "@/components/NavAccordion";
import {shortNavData} from './NavData'
import Image from "next/image";

import menuBars from '../../images/icons/menuBars.png'
import menuCross from '../../images/icons/menuCross.png'
import RuneLogo from '../../images/logos/runeLogo.png'
import cart from '../../images/icons/cart.png'

const MainHeader = styled.header`
  background-color: white;
`

const LargeLogo = styled.a`
    max-width: 100px;
    padding: 1rem;
    img {
        width: 100%;
        height: auto;
    }
`

const SmallLogo = styled.a`
    width: 20%;
    img {
        width: 100%;
        height: auto;
    }
    margin: 1.25rem 0 0.5rem 1.25rem;
`

const NavLink = styled(Link)`
    text-decoration: none;
    @media (min-width: 768px) {
        font-size: 0.85rem;
    }
    @media (min-width: 900px) {
        font-size: 0.9rem;
    }
`

const CartLink = styled(Link)`
    text-decoration: none;
    display: flex;
    gap: 2px;
`

const StyledNav = styled.nav`
    display: none;
    gap: 15px;
    justify-content: space-between;
    position: relative;
    @media (min-width: 768px) {
        display: flex;
    }
`

const SubscribeBanner = styled.div`
    text-align: center;
    color: white;
    padding: 10px;
    width: 100%;
    background-color: var(--main-dark-blue);
    font-size: 0.85rem;
`

const SideNavArea = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    @media (min-width: 768px) {
        display: none;
    }
`

const SideNavPlusOverlay = styled.div`
    width: 100%;
    position: absolute;
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
    @media (min-width: 420px) {
        grid-template-columns: 0.5fr 1fr;
    }
    @media (min-width: 520px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 620px) {
        grid-template-columns: 1.5fr 1fr;
    }
`

const SideNavOverlay = styled.div`
    background-color: var(--main-dark-blue);
    opacity: 0.75;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 100;
`

const SideNav = styled.nav`
    z-index: 100;
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        display: none;
    }
    background-color: var(--main-light-blue);
    width: 100%;
    height: 100vh;
    overflow: scroll;
`

const SideNavButton = styled.div`
    display: block;
    z-index: 101;
    @media (min-width: 768px) {
        display: none;
    }
    img {
        width: 100%;
        height: auto;
    }
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 20px;
`

const SideNavLinks = styled.ul`
    padding: 1rem 0rem;
    li {
        list-style: none;
        padding: 0.5rem 0rem;
    }
    li.checkoutLink {
        margin: 0rem 1rem;
    }
`

const DesktopNavLinks = styled.ul`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    font-size: 0.9rem;
    li {
        list-style: none;
        padding: 0.5rem 0.5rem;
    }
    li.checkoutLink {
        margin: 0rem 1rem;
    }
`

const CartImage = styled.div`
    width: 20px;
    img {
        width: 100%;
        height: auto;
    }
`

const CartNumber = styled.div`
    width: 7.5px;
    height: 7.5px;
    border-radius: 15px;
    background-color: var(--main-dark-blue);
`

export default function Header() {
    const {checkoutProducts} = useContext(CheckoutContext)
    
    const [showNavbar, setShowNavbar] = useState(false);
    
    const handleShowNavbar = () => {
        const body = document.querySelector('body')
        setShowNavbar(!showNavbar)
        if(showNavbar){
            body.style.overflow = 'visible'
        } else {
            body.style.overflow = 'hidden'
        }
        
    }

    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [navDropDownSection, setNavDropDownSection] = useState()

    return (
        <MainHeader>
            <SubscribeBanner>
                Sign up and GET 20% OFF for your first order
            </SubscribeBanner>
            <StyledNav>
                <LargeLogo href="/">
                    <Image src={RuneLogo} alt="Rune logo"/>
                </LargeLogo>
                <DesktopNavLinks> 
                    {shortNavData.map((navItem, i) => {
                        return (
                            <li key={"mainNav" + i} 
                            onMouseEnter={() => setNavDropDownSection(navItem.label)}
                            onMouseLeave={() => setNavDropDownSection()}
                            ><NavLink href={navItem.link}>{navItem.label}</NavLink></li>
                        )
                    })}
                    <li>
                        <CartLink href="/checkout">
                            <CartImage>
                                <Image src={cart}/>  
                            </CartImage>
                        {checkoutProducts?.length > 0 ? 
                            <CartNumber>
                            </CartNumber>
                        :
                        null}
                        </CartLink>
                    </li>
                </DesktopNavLinks>
                <NavDropDown section={navDropDownSection}/>
            </StyledNav>
            <SideNavArea>
                <LargeLogo href="/">
                    <Image src={RuneLogo} alt="Rune logo"/>
                </LargeLogo>
                {showNavbar ? 
                <>
                    <SideNavPlusOverlay>
                        <SideNavOverlay></SideNavOverlay>
                        <SideNav>
                        <SmallLogo href="/">
                            <Image src={RuneLogo} alt="Rune logo"/>
                        </SmallLogo>
                        <SideNavLinks>
                            {shortNavData.map((navItem, i) => {
                                if(navItem.childLinks.length === 0){
                                    return (
                                        <>
                                            <li key={"sideNav" + i}><NavLink href={navItem.link}>{navItem.label}</NavLink></li>
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <li key={"sideNav" + i}><NavAccordion label={navItem.label} childLinks={navItem.childLinks} accordionNumber={i+1} expanded={expanded} handleChange={handleChange}/></li>
                                            
                                        </>
                                    )
                                }
                                }) }
                                <li className="checkoutLink">
                                    <NavLink href="/checkout">Checkout ({checkoutProducts?.length})</NavLink>
                                </li>
                            </SideNavLinks>
                        </SideNav>
                    </SideNavPlusOverlay>
                </>
                : null}
                <SideNavButton>
                    <Image src={showNavbar ? menuCross : menuBars} alt="hamburger menu icon" onClick={() => handleShowNavbar()}/>
                </SideNavButton>
            </SideNavArea>
        </MainHeader>
    )
}