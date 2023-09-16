import bagImage from "../../images/navImages/bags.jpg"
import brandsImage from "../../images/navImages/brands.png"
import clothingImage from "../../images/navImages/clothing.png"
import hatImage from "../../images/navImages/hat.png"
import shoeImage from "../../images/navImages/shoes.png"
import watchImage from "../../images/navImages/watch.png"

const shortNavData = [
    { link: "/brands", label: "Brands", childLinks: [
        {link: "/brands", label: "All brands"}, 
        {link: "/brand/off-white", label: "Off-White"}, 
        {link: "/brand/nike", label: "Nike"}
    ]},
    { link: "/clothing/all", label: "Clothing", childLinks: [
        {link: "/clothing/all", label: "All clothing"}, 
        {link: "/clothing/-t-jackets", label: "Jackets"}, 
        {link: "/clothing/-t-trousers", label: "Trousers"}
    ]},
    { link: "/shoes/all", label: "Shoes", childLinks: [
        {link: "/shoes/all", label: "All shoes"}, 
        {link: "/shoes/-t-sneakers", label: "Sneakers"}, 
        {link: "/shoes/-t-sandals", label: "Sandals"}
    ]},
    { link: "/bags/all", label: "Bags", childLinks: [
        {link: "/bags/all", label: "All bags"}, 
        {link: "/bags/-t-backpacks", label: "Backacks"}, 
        {link: "/bags/-t-shoulder-bags", label: "Shoulder bags"}
    ]},
    { link: "/jewellery-watches/all", label: "Jewellery & Watches", childLinks: [
        {link: "/jewellery-watches/all", label: "All clothing"}, 
        {link: "/jewellery-watches/-t-fashion-jewelry", label: "Fashion jewellery"}, 
        {link: "/jewellery-watches/-t-fine-watches", label: "Fine watches"}
    ]},
    { link: "/accessories/all", label: "Accessories", childLinks: [
        {link: "/accessories/all", label: "All accessories"}, 
        {link: "/accessories/-t-hats", label: "Hats"}, 
        {link: "/accessories/-t-belts", label: "Belts"}
    ]},
]

const navData = {
    Brands: { link: "/brands", label: "Brands", childLinks: [
            {listItems: [
                {link: "/brands", label: "All brands"}, 
                {link: "/brand/off-white", label: "Off-White"}, 
                {link: "/brand/nike", label: "Nike"}
            ]},
            {listItems: [
                {link: "/brand/essentials", label: "Essentials"}, 
                {link: "/brand/carhartt", label: "Carhartt"}, 
                {link: "/brand/acne-studios", label: "Acne Studios"}
            ]}
        ], image: {
            source: brandsImage,
            alt: "Sneakers hanging of ledge"
        }
    },
    Clothing: { link: "/clothing/all", label: "Clothing", childLinks: [
            {listItems: [
                {link: "/clothing/all", label: "All clothing"}, 
                {link: "/clothing/-t-jackets", label: "Jackets"}, 
                {link: "/clothing/-t-trousers", label: "Trousers"}
            ]},
            {listItems: [
                {link: "/clothing/-t-t-shirts", label: "T-shirts"}, 
                {link: "/clothing/-t-outerwear", label: "Outerwear"}, 
                {link: "/clothing/-s-sweatshirts-and-hoodies", label: "Sweatshirts and hoodies"}
            ]}
        ], image: {
            source: clothingImage,
            alt: "Models posing against chainlink fence"
        }
    },
    Shoes: { link: "/shoes/all", label: "Shoes", childLinks: [
            {listItems: [
                {link: "/shoes/-t-all", label: "All shoes"}, 
                {link: "/shoes/-t-boots", label: "Boots"}, 
                {link: "/shoes/-t-sandals", label: "Sandals"}
            ]},
            {listItems: [
                {link: "/shoes/-t-sneakers", label: "Sneakers"}, 
                {link: "/shoes/-s-running-shoes", label: "Running shoes"}, 
                {link: "/shoes/-s-low-top-sneakers", label: "Low top sneakers"}
            ]}
        ], image: {
            source: shoeImage,
            alt: "Sneakers"
        }
    },
    Bags: { link: "/bags/all", label: "Bags", childLinks: [
            {listItems: [
                {link: "/bags/all", label: "All Bags"}, 
                {link: "/bags/-t-bucket-bags", label: "Bucket bags"}, 
                {link: "/bags/-t-tote-bags", label: "Handbags"}
            ]},
            {listItems: [
                {link: "/bags/-t-shoulder-bags", label: "Shoulder bags"}, 
                {link: "/bags/-t-cross-body-bags", label: "Cross-body bags"}, 
                {link: "/bags/-t-backpacks", label: "Backpacks"}
            ]}
        ], image: {
            source: bagImage,
            alt: "Model modelling handbag"
        }
    },
    "Jewellery & Watches": { link: "/jewellery-watches/all", label: "Jewellery & Watches", childLinks: [
            {listItems: [
                {link: "/jewellery-watches/all", label: "All jewellery"}, 
                {link: "/jewellery-watches/-t-fashion-jewelry", label: "Fashion jewellery"}, 
                {link: "/jewellery-watches/-t-fine-watches", label: "Fine watches"}
            ]},
            {listItems: [
                {link: "/jewellery-watches/-s-earrings", label: "Earrings"}, 
                {link: "/jewellery-watches/-s-bracelets", label: "Bracelets"}, 
                {link: "/jewellery-watches/-s-necklaces", label: "Necklaces"}
            ]}
        ], image: {
            source: watchImage,
            alt: "Watch on a wrist"
        }
    },
    "Accessories": { link: "/accessories/all", label: "Accessories", childLinks: [
            {listItems: [
                {link: "/accessories/all", label: "All accessories"}, 
                {link: "/accessories/-t-sunglasses", label: "Sunglasses"}, 
                {link: "/accessories/-t-hats", label: "Hats"}
            ]},
            {listItems: [
                {link: "/accessories/-t-bags", label: "Bags"}, 
                {link: "/accessories/-t-socks", label: "Socks"}, 
                {link: "/accessories/-t-scarves", label: "Scarves"}
            ]}
        ], image: {
            source: hatImage,
            alt: "Model wearing beanie hat and glasses"
        }
    }
}

module.exports = {shortNavData, navData}