import Header from "@/layout/Header/Header"
import CurratedPicks from "@/components/CurratedPicks"
import HomeHero from "@/components/HomeHero"
import BrandsCarousel from "@/components/BrandsBanner"
import CustomerExperience from "@/components/CustomerExperience"
import FeaturedProducts from "@/components/FeaturedProducts"
import BannerAd from "@/components/BannerAd"
import NewsletterSubscribe from "@/layout/NewsletterSubscribe"
import Footer from "@/layout/Footer/Footer"


export default function HomePage() {
  return (
    <div>
      <Header/>
      <HomeHero/>
      <BrandsCarousel/>
      <CustomerExperience/>
      <CurratedPicks/>
      <FeaturedProducts/>
      <BannerAd/>
      <NewsletterSubscribe/>
      <Footer/>
    </div>
  )
}