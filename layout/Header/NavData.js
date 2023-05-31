const shortNavData = [
    { link: "/brands", label: "Brands", childLinks: [
        {link: "/brands", label: "All brands"}, 
        {link: "/brands/off-white", label: "Off White"}, 
        {link: "/brands/nike", label: "Nike"}
    ]},
    { link: "/clothing", label: "Clothing", childLinks: [
        {link: "/clothing", label: "All clothing"}, 
        {link: "/clothing/jackets", label: "Jackets"}, 
        {link: "/clothing/trousers", label: "Trousers"}
    ]},
    { link: "/shoes", label: "Shoes", childLinks: [
        {link: "/shoes", label: "All shoes"}, 
        {link: "/shoes/trainers", label: "Trainers"}, 
        {link: "/shoes/sandals", label: "Sandals"}
    ]},
    { link: "/bags", label: "Bags", childLinks: [
        {link: "/bags", label: "All bags"}, 
        {link: "/bags/rucksack", label: "Rucksacks"}, 
        {link: "/bags/handbags", label: "Handbags"}
    ]},
    { link: "/jewellery-watches", label: "Jewellry and Watches", childLinks: [
        {link: "/jewellery-watches", label: "All clothing"}, 
        {link: "/jewellery-watches/jewellery", label: "Jewellery"}, 
        {link: "/jewellery-watches/watches", label: "Watches"}
    ]},
    { link: "/accessories", label: "Accessories", childLinks: [
        {link: "/accessories", label: "All accessories"}, 
        {link: "/accessories/hats", label: "Hats"}, 
        {link: "/accessories/belts", label: "Belts"}
    ]},
]

const navData = {
    Brands: { link: "/brands", label: "Brands", childLinks: [
        {title: 'title', listItems: [
            {link: "/brands", label: "All brands"}, 
            {link: "/brands/off-white", label: "Off White"}, 
            {link: "/brands/nike", label: "Nike"}
        ]},
        {title: 'title', listItems: [
            {link: "/brands", label: "All brands"}, 
            {link: "/brands/off-white", label: "Off White"}, 
            {link: "/brands/nike", label: "Nike"}
        ]},
        {title: 'title', listItems: [
            {link: "/brands", label: "All brands"}, 
            {link: "/brands/off-white", label: "Off White"}, 
            {link: "/brands/nike", label: "Nike"}
        ]}
    ]
    },
    Clothing: { link: "/clothing", label: "Clothing", childLinks: [
        {title: 'title', listItems: [
            {link: "/clothing", label: "All clothing"}, 
            {link: "/clothing/jackets", label: "Jackets"}, 
            {link: "/clothing/trousers", label: "Trousers"}
        ]},
        {title: 'title', listItems: [
            {link: "/clothing", label: "All clothing"}, 
            {link: "/clothing/jackets", label: "Jackets"}, 
            {link: "/clothing/trousers", label: "Trousers"}
        ]},
        {title: 'title', listItems: [
            {link: "/clothing", label: "All clothing"}, 
            {link: "/clothing/jackets", label: "Jackets"}, 
            {link: "/clothing/trousers", label: "Trousers"}
        ]}
    ]
    },
    Shoes: { link: "/shoes", label: "Shoes", childLinks: [
        {title: 'title', listItems: [
            {link: "/shoes", label: "All shoes"}, 
            {link: "/shoes/trainers", label: "Trainers"}, 
            {link: "/shoes/sandals", label: "Sandals"}
        ]},
        {title: 'title', listItems: [
            {link: "/shoes", label: "All shoes"}, 
            {link: "/shoes/trainers", label: "Trainers"}, 
            {link: "/shoes/sandals", label: "Sandals"}
        ]},
        {title: 'title', listItems: [
            {link: "/shoes", label: "All shoes"}, 
            {link: "/shoes/trainers", label: "Trainers"}, 
            {link: "/shoes/sandals", label: "Sandals"}
        ]}
    ]
    },
    Bags: { link: "/bags", label: "Bags", childLinks: [
        {title: 'title', listItems: [
            {link: "/bags", label: "All bags"}, 
            {link: "/bags/rucksack", label: "Rucksacks"}, 
            {link: "/bags/handbags", label: "Handbags"}
        ]},
        {title: 'title', listItems: [
            {link: "/bags", label: "All bags"}, 
            {link: "/bags/rucksack", label: "Rucksacks"}, 
            {link: "/bags/handbags", label: "Handbags"}
        ]},
        {title: 'title', listItems: [
            {link: "/bags", label: "All bags"}, 
            {link: "/bags/rucksack", label: "Rucksacks"}, 
            {link: "/bags/handbags", label: "Handbags"}
        ]}
    ]
    },
    "Jewellry and Watches": { link: "/jewellery-watches", label: "Jewellry and Watches", childLinks: [
        {title: 'title', listItems: [
            {link: "/jewellery-watches", label: "All clothing"}, 
            {link: "/jewellery-watches/jewellery", label: "Jewellery"}, 
            {link: "/jewellery-watches/watches", label: "Watches"}
        ]},
        {title: 'title', listItems: [
            {link: "/jewellery-watches", label: "All clothing"}, 
            {link: "/jewellery-watches/jewellery", label: "Jewellery"}, 
            {link: "/jewellery-watches/watches", label: "Watches"}
        ]},
        {title: 'title', listItems: [
            {link: "/jewellery-watches", label: "All clothing"}, 
            {link: "/jewellery-watches/jewellery", label: "Jewellery"}, 
            {link: "/jewellery-watches/watches", label: "Watches"}
        ]}
    ]
    },
    "Accessories": { link: "/accessories", label: "Accessories", childLinks: [
        {title: 'title', listItems: [
            {link: "/accessories", label: "All accessories"}, 
            {link: "/accessories/hats", label: "Hats"}, 
            {link: "/accessories/belts", label: "Belts"}
        ]},
        {title: 'title', listItems: [
            {link: "/accessories", label: "All accessories"}, 
            {link: "/accessories/hats", label: "Hats"}, 
            {link: "/accessories/belts", label: "Belts"}
        ]},
        {title: 'title', listItems: [
            {link: "/accessories", label: "All accessories"}, 
            {link: "/accessories/hats", label: "Hats"}, 
            {link: "/accessories/belts", label: "Belts"}
        ]}
    ]
    }
}

module.exports = {shortNavData, navData}