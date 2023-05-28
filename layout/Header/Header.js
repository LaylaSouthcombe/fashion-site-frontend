import Link from "next/link";
import styled from "styled-components"
import HeaderCentre from "@/layout/Header/HeaderCentre";
import { useContext } from "react";
import { CheckoutContext } from "@/components/CheckoutContext";

const MainHeader = styled.header`
  background-color: white;
  height: 20vh;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const NavLink = styled(Link)`
    color: aquamarine;
    text-decoration: none;
`

const StyledNav = styled.nav`
    display: flex;
    gap: 15px;
`

const CenteredDiv = styled.div`
    text-align: center;
    color: white;
    padding: 10px;
    width: 100%;
    background-color: var(--main-dark-blue);
`

export default function Header() {

    const {checkoutProducts} = useContext(CheckoutContext)

    return (
        <MainHeader>
                    <CenteredDiv>
                        Sign up and GET 20% OFF for your first order
                    </CenteredDiv>
            <HeaderCentre>
                <Wrapper>
                    <div className="logo">Logo</div>
                    <StyledNav>
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/brands">Brands</NavLink>
                        <NavLink href="/clothing">Clothing</NavLink>
                        <NavLink href="/shoes">Shoes</NavLink>
                        <NavLink href="/bags">Bags</NavLink>
                        <NavLink href="/jewellery-watches">Jewellry and Watches</NavLink>
                        <NavLink href="/accessories">Accessories</NavLink>
                    </StyledNav>
                    <Wrapper>
                        <NavLink href="/account">Account</NavLink>
                        <NavLink href="/checkout">Checkout ({checkoutProducts?.length})</NavLink>
                    </Wrapper>
                </Wrapper>
            </HeaderCentre>
        </MainHeader>
    )
}