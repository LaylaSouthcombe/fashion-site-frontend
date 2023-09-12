import { mongooseConnect } from "@/lib/mongoose"
import styled from "styled-components"
import Link from "next/link"

import BannerAd from "@/components/BannerAd"
import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"

export default function LoginPage({}){

    return (
        <>
            <Header/>
            <BannerAd/>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(){
    await mongooseConnect()

    return {
        props:{
            
    }}
}