import Link from "next/link";
import styled from "styled-components"
import HeaderCentre from "@/layout/Header/HeaderCentre";
import { useContext } from "react";
import { CheckoutContext } from "@/components/CheckoutContext";

const MainHeader = styled.header`
  background-color: #222;
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

export default function Header() {

    const {checkoutProducts} = useContext(CheckoutContext)

    return (
        <MainHeader>
            <HeaderCentre>
                <Wrapper>
                    <div className="logo">Logo</div>
                    <StyledNav>
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/brands">Brands</NavLink>
                        <NavLink href="/clothing">Clothing</NavLink>
                        <NavLink href="/shoes">Shoes</NavLink>
                        <NavLink href="/bags">Bags</NavLink>
                        <NavLink href="/jewellry-watches">Jewellry and Watches</NavLink>
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