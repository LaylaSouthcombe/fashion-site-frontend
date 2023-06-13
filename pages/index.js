import { mongooseConnect } from "@/lib/mongoose"
import {Featured} from "@/models/Featured"

import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"

import BannerAd from "@/components/BannerAd"
import BrandsCarousel from "@/components/BrandsBanner"
import CuratedPicks from "@/components/CuratedPicks"
import CustomerExperience from "@/components/CustomerExperience"
import FeaturedProducts from "@/components/FeaturedProducts"
import HomeHero from "@/components/HomeHero"
import NewsletterSubscribe from "@/components/NewsletterSubscribe"

export default function HomePage({featuredProducts}) {

  return (
    <div>
      <Header/>
      <HomeHero/>
      <BrandsCarousel/>
      <CustomerExperience/>
      <CuratedPicks/>
      <FeaturedProducts featuredProducts={featuredProducts}/>
      <BannerAd/>
      <NewsletterSubscribe/>
      <Footer/>
    </div>
  )
}

export async function getServerSideProps() {

  await mongooseConnect()

  const featuredProducts = await Featured.find({})
  return {
    props: {
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts))
    }
  }
}