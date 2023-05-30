import Header from "@/layout/Header/Header"
import Footer from "@/layout/Footer/Footer"
import CuratedPicks from "@/components/CuratedPicks"
import HomeHero from "@/components/HomeHero"
import BrandsCarousel from "@/components/BrandsBanner"
import CustomerExperience from "@/components/CustomerExperience"
import FeaturedProducts from "@/components/FeaturedProducts"
import BannerAd from "@/components/BannerAd"
import NewsletterSubscribe from "@/components/NewsletterSubscribe"

// import {Product} from "@/models/Product"
import {Featured} from "@/models/Featured"


import { mongooseConnect } from "@/lib/mongoose"

export default function HomePage({featuredProducts}) {
  // console.log(featuredProducts)
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
  // const productId = '644d4e13e87daf05bfe2effd'
  await mongooseConnect()
  // const product = await Product.findById(productId)
  // const featuredProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 4})
  const featuredProducts = await Featured.find({})
  return {
    props: {
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
      //product
    }
  }
}