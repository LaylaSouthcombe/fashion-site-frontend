export default function FeaturedProducts({products}) {
    console.log(products)
    return (
        <div>Featured products
            <div>{products.name}</div>
        </div>
    )
}