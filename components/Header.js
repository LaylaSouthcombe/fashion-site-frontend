import Link from "next/link";

export default function Header() {
    return (
        <header>
            <Link href="/">Home</Link>
            <Link href="/brands">Brands</Link>
            <Link href="/clothing">Clothing</Link>
            <Link href="/shoes">Shoes</Link>
            <Link href="/accessories">Accessories</Link>
            <Link href="/jewellry-watches">Jewellry and Watches</Link>
            <Link href="/bags">Bags</Link>
            <Link href="/account">Account</Link>

            <Link href="/cart">Cart</Link>
        </header>
    )
}