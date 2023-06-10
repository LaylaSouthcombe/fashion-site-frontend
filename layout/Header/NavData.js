import bagImage from "../../images/navImages/bags.jpg"
import clothingImage from "../../images/navImages/clothing.png"
import hatImage from "../../images/navImages/hat.png"
import shoeImage from "../../images/navImages/shoes.png"
import watchImage from "../../images/navImages/watch.png"

const shortNavData = [
    { link: "/brands", label: "Brands", childLinks: [
        {link: "/brands", label: "All brands"}, 
        {link: "/brand/off-white", label: "Off White"}, 
        {link: "/brand/nike", label: "Nike"}
    ]},
    { link: "/clothing/all", label: "Clothing", childLinks: [
        {link: "/clothing/all", label: "All clothing"}, 
        {link: "/clothing/jackets", label: "Jackets"}, 
        {link: "/clothing/trousers", label: "Trousers"}
    ]},
    { link: "/shoes/all", label: "Shoes", childLinks: [
        {link: "/shoes/all", label: "All shoes"}, 
        {link: "/shoes/sneakers", label: "Sneakers"}, 
        {link: "/shoes/sandals", label: "Sandals"}
    ]},
    { link: "/bags/all", label: "Bags", childLinks: [
        {link: "/bags/all", label: "All bags"}, 
        {link: "/bags/rucksack", label: "Rucksacks"}, 
        {link: "/bags/handbags", label: "Handbags"}
    ]},
    { link: "/jewellery-watches/all", label: "Jewellery and Watches", childLinks: [
        {link: "/jewellery-watches/all", label: "All clothing"}, 
        {link: "/jewellery-watches/jewellery", label: "Jewellery"}, 
        {link: "/jewellery-watches/watches", label: "Watches"}
    ]},
    { link: "/accessories/all", label: "Accessories", childLinks: [
        {link: "/accessories/all", label: "All accessories"}, 
        {link: "/accessories/hats", label: "Hats"}, 
        {link: "/accessories/belts", label: "Belts"}
    ]},
]

const navData = {
    Brands: { link: "/brands", label: "Brands", childLinks: [
            {title: 'title', listItems: [
                {link: "/brands", label: "All brands"}, 
                {link: "/brand/off-white", label: "Off White"}, 
                {link: "/brand/nike", label: "Nike"}
            ]},
            {title: 'title', listItems: [
                {link: "/brands", label: "All brands"}, 
                {link: "/brand/off-white", label: "Off White"}, 
                {link: "/brand/nike", label: "Nike"}
            ]}
        ], image: {
            source: "",
            alt: ""
        }
    },
    Clothing: { link: "/clothing/all", label: "Clothing", childLinks: [
            {title: 'title', listItems: [
                {link: "/clothing/all", label: "All clothing"}, 
                {link: "/clothing/jackets", label: "Jackets"}, 
                {link: "/clothing/trousers", label: "Trousers"}
            ]},
            {title: 'title', listItems: [
                {link: "/clothing/all", label: "All clothing"}, 
                {link: "/clothing/jackets", label: "Jackets"}, 
                {link: "/clothing/trousers", label: "Trousers"}
            ]}
        ], image: {
            source: clothingImage,
            alt: ""
        }
    },
    Shoes: { link: "/shoes/all", label: "Shoes", childLinks: [
            {title: 'Shoes', listItems: [
                {link: "/shoes/-t-all", label: "All Shoes"}, 
                {link: "/shoes/-t-boots", label: "Boots"}, 
                {link: "/shoes/-t-sandals", label: "Sandals"}
            ]},
            {title: 'Sneakers', listItems: [
                {link: "/shoes/-t-sneakers", label: "All Sneakers"}, 
                {link: "/shoes/-s-running-shoes", label: "Running Shoes"}, 
                {link: "/shoes/-s-low-top-sneakers", label: "Low Top Sneakers"}
            ]}
        ], image: {
            source: shoeImage,
            alt: ""
        }
    },
    Bags: { link: "/bags/all", label: "Bags", childLinks: [
            {title: 'Bags', listItems: [
                {link: "/bags/all", label: "All bags"}, 
                {link: "/bags/-t-bucket-bags", label: "Bucket Bags"}, 
                {link: "/bags/-t-tote-bags", label: "Handbags"}
            ]},
            {title: '_________', listItems: [
                {link: "/bags/-t-shoulder-bags", label: "Shoulder Bags"}, 
                {link: "/bags/-t-cross-body-bags", label: "Cross-body Bags"}, 
                {link: "/bags/-t-backpacks", label: "Backpacks"}
            ]}
        ], image: {
            source: bagImage,
            alt: ""
        }
    },
    "Jewellery and Watches": { link: "/jewellery-watches/all", label: "Jewellery and Watches", childLinks: [
            {title: 'title', listItems: [
                {link: "/jewellery-watches/all", label: "All clothing"}, 
                {link: "/jewellery-watches/jewellery", label: "Jewellery"}, 
                {link: "/jewellery-watches/watches", label: "Watches"}
            ]},
            {title: 'title', listItems: [
                {link: "/jewellery-watches/all", label: "All clothing"}, 
                {link: "/jewellery-watches/jewellery", label: "Jewellery"}, 
                {link: "/jewellery-watches/watches", label: "Watches"}
            ]}
        ], image: {
            source: watchImage,
            alt: ""
        }
    },
    "Accessories": { link: "/accessories/all", label: "Accessories", childLinks: [
            {title: 'title', listItems: [
                {link: "/accessories/all", label: "All accessories"}, 
                {link: "/accessories/hats", label: "Hats"}, 
                {link: "/accessories/belts", label: "Belts"}
            ]},
            {title: 'title', listItems: [
                {link: "/accessories/all", label: "All accessories"}, 
                {link: "/accessories/hats", label: "Hats"}, 
                {link: "/accessories/belts", label: "Belts"}
            ]}
        ], image: {
            source: hatImage,
            alt: ""
        }
    }
}

module.exports = {shortNavData, navData}