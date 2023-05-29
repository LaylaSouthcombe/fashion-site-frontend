import Link from "next/link";
import styled from "styled-components"
import HeaderCentre from "@/layout/Header/HeaderCentre";
import { useContext, useState } from "react";
import { CheckoutContext } from "@/components/CheckoutContext";
import NavAccordion from "@/components/NavAccordion";
import Image from "next/image";

import menuBars from '../../images/icons/menuBars.png'
import menuCross from '../../images/icons/menuCross.png'
import RuneLogo from '../../images/logos/runeLogo.png'


const MainHeader = styled.header`
  background-color: white;
  height: 20vh;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
`

const LargeLogo = styled.div`
    img {
        width: 100%;
        height: auto;
    }
`

const SmallLogo = styled.div`
    width: 20%;
    img {
        width: 100%;
        height: auto;
    }
    margin: 1.25rem 0 0.5rem 1.25rem;
`

const NavLink = styled(Link)`
    text-decoration: none;
`

const StyledNav = styled.nav`
    display: none;
    gap: 15px;
    @media (min-width: 768px) {
        display: flex;
    }
`

const CenteredDiv = styled.div`
    text-align: center;
    color: white;
    padding: 10px;
    width: 100%;
    background-color: var(--main-dark-blue);
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
    grid-template-columns: 1.5fr 1fr;

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
    li.homeLink {
        margin: 0rem 1rem 0.5rem 1rem;
    }
    li.checkoutLink {
        margin: 0rem 1rem;
    }
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
        console.log(panel)
        console.log(expanded)
        setExpanded(newExpanded ? panel : false);
    };

    const navigationOptions = [
        { link: "/brands", label: "Brands", childLinks: [
            {link: "/clothing", label: "All clothing"}, 
            {link: "/clothing/jackets", label: "Jackets"}, 
            {link: "/clothing/trousers", label: "Trousers"}
        ]},
        { link: "/clothing", label: "Clothing", childLinks: [
            {link: "/clothing", label: "All clothing"}, 
            {link: "/clothing/jackets", label: "Jackets"}, 
            {link: "/clothing/trousers", label: "Trousers"}
        ]},
        { link: "/shoes", label: "Shoes", childLinks: [
            {link: "/clothing", label: "All clothing"}, 
            {link: "/clothing/jackets", label: "Jackets"}, 
            {link: "/clothing/trousers", label: "Trousers"}
        ]},
        { link: "/bags", label: "Bags", childLinks: [
            {link: "/clothing", label: "All clothing"}, 
            {link: "/clothing/jackets", label: "Jackets"}, 
            {link: "/clothing/trousers", label: "Trousers"}
        ]},
        { link: "/jewellery-watches", label: "Jewellry and Watches", childLinks: [
            {link: "/clothing", label: "All clothing"}, 
            {link: "/clothing/jackets", label: "Jackets"}, 
            {link: "/clothing/trousers", label: "Trousers"}
        ]},
        { link: "/accessories", label: "Accessories", childLinks: [
            {link: "/clothing", label: "All clothing"}, 
            {link: "/clothing/jackets", label: "Jackets"}, 
            {link: "/clothing/trousers", label: "Trousers"}
        ]},
    ]

    return (
        <MainHeader>
            <CenteredDiv>
                Sign up and GET 20% OFF for your first order
            </CenteredDiv>
            <StyledNav>
                <Wrapper>
                    <HeaderCentre>
                        <LargeLogo>
                            <Image src={RuneLogo} alt="Rune logo"/>
                        </LargeLogo>
                        <li><NavLink href="/" className="homeLink">Home</NavLink> </li>            
                        {navigationOptions.map((navItem, i) => {
                            return (
                                <NavLink href={navItem.link} key={"mainNav" + i}>{navItem.label}</NavLink>
                            )
                        })}
                        <NavLink href="/checkout">Checkout ({checkoutProducts?.length})</NavLink>
                    </HeaderCentre>
                    </Wrapper>
                    </StyledNav>
                    <SideNavArea>
                        <LargeLogo>
                            <Image src={RuneLogo} alt="Rune logo"/>
                        </LargeLogo>
                    
                        {showNavbar ? 
                        <>
                            <SideNavPlusOverlay>
                                <SideNavOverlay></SideNavOverlay>
                                <SideNav>
                                <SmallLogo>
                            <Image src={RuneLogo} alt="Rune logo"/>
                        </SmallLogo>
                        <SideNavLinks>
                        <li className="homeLink"><NavLink href="/">Home</NavLink> </li>
                            {navigationOptions.map((navItem, i) => {
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