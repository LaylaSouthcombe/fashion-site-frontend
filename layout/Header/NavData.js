const shortNavData = [
    { link: "/brands", label: "Brands", childLinks: [
        {link: "/clothing", label: "All clothing"}, 
        {link: "/clothing/jackets", label: "Jackets"}, 
        {link: "/clothing/trousers", label: "Trousers"}
    ]},
    { link: "/clothing", label: "Clothing", childLinks: [
        {link: "/clothing", label: "All clothing"}, 
        {link: "/clothing/jackets", label: "Jackets"}, 
        {link: "/clothing/trousers", label: "Trousers"}
    ]},
    { link: "/shoes", label: "Shoes", childLinks: [
        {link: "/clothing", label: "All clothing"}, 
        {link: "/clothing/jackets", label: "Jackets"}, 
        {link: "/clothing/trousers", label: "Trousers"}
    ]},
    { link: "/bags", label: "Bags", childLinks: [
        {link: "/clothing", label: "All clothing"}, 
        {link: "/clothing/jackets", label: "Jackets"}, 
        {link: "/clothing/trousers", label: "Trousers"}
    ]},
    { link: "/jewellery-watches", label: "Jewellry and Watches", childLinks: [
        {link: "/clothing", label: "All clothing"}, 
        {link: "/clothing/jackets", label: "Jackets"}, 
        {link: "/clothing/trousers", label: "Trousers"}
    ]},
    { link: "/accessories", label: "Accessories", childLinks: [
        {link: "/clothing", label: "All clothing"}, 
        {link: "/clothing/jackets", label: "Jackets"}, 
        {link: "/clothing/trousers", label: "Trousers"}
    ]},
]

const navData = {
    Brands: { link: "/brands", label: "Brands", childLinks: [
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
    Bags: { link: "/bags", label: "Bags", childLinks: [
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
    "Jewellry and Watches": { link: "/jewellery-watches", label: "Jewellry and Watches", childLinks: [
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
    "Accessories": { link: "/accessories", label: "Accessories", childLinks: [
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
    }
}

module.exports = {shortNavData, navData}