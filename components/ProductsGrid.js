import styled from "styled-components"
import ProductTile from "./ProductsCarousel/ProductTile"
import FilterSideBar from "./FilterSideBar"
import { useEffect, useState } from "react"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import axios from "axios"

const ProductsGridOuterContainer = styled.section`
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 0.25fr 0.75fr;
`

const ProductsGridContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto 1fr;
`

const ProductsGridResultsAndSort = styled.div`

`

const NumberOfResults = styled.p`

`

const SortDropDownArea = styled.div`

`

export default function ProductsGrid({products, apiUrl, queryConstraint}) {

    const [productTypes, setProductTypes] = useState([])
    const [productSubTypes, setProductSubTypes] = useState([])
    const [sizes, setSizes] = useState([])
    const [colours, setColours] = useState([])
    const [brands, setBrands] = useState([])

    const [filterLabels, setFilterLabels] = useState({productType: [], productSubType: [], sizesAndStock: [], colour: [], brand: []})

    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [currentProducts, setCurrentProducts] = useState(products)
    const [filters, setFilters] = useState({productType: [], productSubType: [], colour: [], sizesAndStock: [], brand: []})
    // const [sortResults, setSortResults] = useState("recommended")
    
    const generateQueryFromFilters = (filters) => {
        //TODO: fix it for sizes
        let queryArray = []
        for(let i = 0; i < Object.keys(filters).length; i++){
            let filterKey = Object.keys(filters)[i]
            console.log("filters[filterKey]", filters[filterKey])
            if(filters[filterKey].length > 0){
                    queryArray.push({
                    text: {
                        query: filters[filterKey],
                        path: filterKey
                    }
                })
            }
        }
        return queryArray
    }

    const generateAvailableFilters = (products) => {
        let newFilterLabels = {productType: [], productSubType: [], colour: [], sizesAndStock: [], brand: []}
        for(let i = 0; i < products.length; i++){
            if(!newFilterLabels.productType.includes(products[i].productType)){
                newFilterLabels.productType.push(products[i].productType)
            }
            if(!newFilterLabels.productSubType.includes(products[i].productSubType)){
                newFilterLabels.productSubType.push(products[i].productSubType)
            }
            if(!newFilterLabels.colour.includes(products[i].colour)){
                newFilterLabels.colour.push(products[i].colour)
            }
            if(!newFilterLabels.brand.includes(products[i].brand)){
                newFilterLabels.brand.push(products[i].brand)
            }
            for(let j = 0; j < products[i].sizesAndStock.length; j++){
                if(!newFilterLabels.sizesAndStock.includes(products[i].sizesAndStock[j].size)){
                    newFilterLabels.sizesAndStock.push(products[i].sizesAndStock[j].size)
                }
            }
        }
        setFilterLabels(newFilterLabels)
    }

    useEffect(() => {
        if(products !== undefined){
            generateAvailableFilters(products)
        }
    },[])

    const getFilteredProducts = async (queryArray, queryConstraint) => {
        let body = {
            queryArray: queryArray,
            queryConstraint: queryConstraint,
            sortResults: "recommended"
        }
        const response = await axios.post(apiUrl, body)
        console.log(response)
        return response.data
    }

    const updateFilteredProducts = async (filter) => {
        let filterKey = Object.keys(filter)[0]
        let filterValue = Object.values(filter)[0]

        if(!filters[filterKey].includes(filterValue)){
            filters[filterKey].push(filterValue)
        } else {
            let filterIndex = filters[filterKey].indexOf(filterValue)
            filters[filterKey].splice(filterIndex, 1)
        }
        
        console.log(filters[filterKey])
        console.log(filters)
        // let queryArray = generateQueryFromFilters(filters)
        let queryArray = filters
        console.log("queryArray", queryArray)
        let newProducts = await getFilteredProducts(queryArray, queryConstraint)
        setCurrentProducts(newProducts)
    }
    //uselayouteffect

    return (
        <>
            <ProductsGridResultsAndSort>
                <NumberOfResults>{products?.length} Results</NumberOfResults>
                <SortDropDownArea>Sort</SortDropDownArea>
            </ProductsGridResultsAndSort>
            <ProductsGridOuterContainer>
                {/* useref? */}
                <FilterSideBar filterLabels={filterLabels} handleChange={handleChange} expanded={expanded} updateFilteredProducts={updateFilteredProducts}/>
                <ProductsGridContainer>
                    {currentProducts?.length > 0 ? 
                        currentProducts.map((product, i) => (
                            <ProductTile key={i} product={product}/>
                        ))
                    : null}
                </ProductsGridContainer>
            </ProductsGridOuterContainer>
        </>
    )
}