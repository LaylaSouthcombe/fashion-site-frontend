import Link from "next/link";
import styled from "styled-components"
import HeaderCentre from "@/layout/Header/HeaderCentre";
import { useContext, useState } from "react";
import { CheckoutContext } from "@/components/CheckoutContext";
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
    color: aquamarine;
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
    background-color: grey;
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
    padding: 1rem;
    li {
        list-style: none;
        padding: 0.5rem;
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

    const navigationOptions = [
        { link: "/", label: "Home"},
        { link: "/brands", label: "Brands"},
        { link: "/clothing", label: "Clothing"},
        { link: "/shoes", label: "Shoes"},
        { link: "/bags", label: "Bags"},
        { link: "/jewellery-watches", label: "Jewellry and Watches"},
        { link: "/accessories", label: "Accessories"},
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
                            <Image src={RuneLogo}/>
                        </LargeLogo>                    
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
                            <Image src={RuneLogo}/>
                        </LargeLogo>
                    
                        {showNavbar ? 
                        <>
                            <SideNavPlusOverlay>
                                <SideNavOverlay></SideNavOverlay>
                                <SideNav>
                                <SmallLogo>
                            <Image src={RuneLogo}/>
                        </SmallLogo>
                        <SideNavLinks>

                                    {navigationOptions.map((navItem, i) => {
                                            return (
                                                <li key={"sideNav" + i}><NavLink href={navItem.link}>{navItem.label}</NavLink></li>
                                                
                                            )
                                        }) }
                                        <li>
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