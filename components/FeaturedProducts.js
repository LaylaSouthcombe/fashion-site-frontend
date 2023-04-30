import FeaturedProductTile from "@/components/FeaturedProductTile"

export default function FeaturedProducts({featuredProducts}) {
    console.log(featuredProducts)
    return (
        <div>Featured products
            {featuredProducts?.length > 0 ? 
            featuredProducts.map((product, i) => (
                <FeaturedProductTile key={i} {...product}/>
            ))
            : null}
            {/* <div>{products.name}</div> */}
        </div>
    )
}