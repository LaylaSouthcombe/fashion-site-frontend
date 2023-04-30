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

export default function HomePage({featuredProducts}) {
  // console.log(featuredProducts)
  return (
    <div>
      <Header/>
      <HomeHero/>
      <BrandsCarousel/>
      <CustomerExperience/>
      <CurratedPicks/>
      <FeaturedProducts featuredProducts={featuredProducts}/>
      <BannerAd/>
      <NewsletterSubscribe/>
      <Footer/>
    </div>
  )
}

export async function getServerSideProps() {
  // const productId = '644d4e13e87daf05bfe2effd'
  await mongooseConnect()
  // const product = await Product.findById(productId)
  const featuredProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 4})
  return {
    props: {
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
      //product
    }
  }
}