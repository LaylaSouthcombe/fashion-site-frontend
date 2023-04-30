import Header from "@/layout/Header/Header"
import CurratedPicks from "@/components/CurratedPicks"
import HomeHero from "@/components/HomeHero"
import BrandsCarousel from "@/components/BrandsBanner"
import CustomerExperience from "@/components/CustomerExperience"
import FeaturedProducts from "@/components/FeaturedProducts"
import BannerAd from "@/components/BannerAd"
import NewsletterSubscribe from "@/layout/NewsletterSubscribe"
import Footer from "@/layout/Footer/Footer"

import {Product} from "@/models/Product"
import { mongooseConnect } from "@/lib/mongoose"

export default function HomePage({products}) {
  console.log(products)
  return (
    <div>
      <Header/>
      <HomeHero/>
      <BrandsCarousel/>
      <CustomerExperience/>
      <CurratedPicks/>
      <FeaturedProducts products={products}/>
      <BannerAd/>
      <NewsletterSubscribe/>
      <Footer/>
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '644d4e13e87daf05bfe2effd'
  await mongooseConnect()
  const products = await Product.findById(featuredProductId)
  return {
    props: {products: JSON.parse(JSON.stringify(products))}
  }
}