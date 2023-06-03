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
`

const ProductsGridResultsAndSort = styled.div`

`

const NumberOfResults = styled.p`

`

const SortDropDownArea = styled.div`

`

export default function ProductsGrid({products}) {

    const [productTypes, setProductTypes] = useState([])
    const [productSubTypes, setProductSubTypes] = useState([])
    const [sizes, setSizes] = useState([])
    const [colours, setColours] = useState([])
    const [brands, setBrands] = useState([])

    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [currentProducts, setCurrentProducts] = useState(products)
    const [filters, setFilters] = useState({productType: [], productSubType: [], colour: [], sizeAndStock: [], brand: []})

    
    const generateQuery = (filters) => {
        let queryArray = []
        for(let i = 0; i < Object.keys(filters).length; i++){
            let filterKey = Object.keys(filters)[i]
            console.log(filterKey)
            console.log(filters[filterKey])

            if(filters[filterKey].length > 0){
                queryArray.push({
                    text: {
                        query: filters[filterKey][0],
                        path: filterKey
                    }
                })
            }
        }
        return queryArray
    }

    const generateAvailableFilters = (products) => {
        let newProductTypes = []
        let newProductSubTypes = []
        let newColours = []
        let newSizes = []
        let newBrands = []
        for(let i = 0; i < products.length; i++){
            if(!newProductTypes.includes(products[i].productType)){
                newProductTypes.push(products[i].productType)
            }
            if(!newProductSubTypes.includes(products[i].productSubType)){
                newProductSubTypes.push(products[i].productSubType)
            }
            if(!newColours.includes(products[i].colour)){
                newColours.push(products[i].colour)
            }
            if(!newBrands.includes(products[i].brands)){
                newBrands.push(products[i].brands)
            }
            for(let j = 0; j < products[i].sizesAndStock.length; j++){
                if(!newSizes.includes(products[i].sizesAndStock[j].size)){
                    newSizes.push(products[i].sizesAndStock[j].size)
                }
            }
        }
        setProductTypes(newProductTypes)
        setProductSubTypes(newProductSubTypes)
        setColours(newColours)
        setSizes(newSizes)
        setBrands(newBrands)
    }

    useEffect(() => {
        if(products !== undefined){
            generateAvailableFilters(products)
        }
    },[])

    const getFilteredProducts = async (queryArray) => {
        const response = await axios.post('/api/filtered-products', queryArray)
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
        let queryArray = generateQuery(filters)
        console.log("queryArray", queryArray)
        let newProducts = await getFilteredProducts(queryArray)
        setCurrentProducts(newProducts)
    }

    return (
        <>
            <ProductsGridResultsAndSort>
                <NumberOfResults>{products?.length} Results</NumberOfResults>
                <SortDropDownArea>Sort</SortDropDownArea>
            </ProductsGridResultsAndSort>
            <ProductsGridOuterContainer>
                <FilterSideBar colours={colours} sizes={sizes} productTypes={productTypes} productSubTypes={productSubTypes} handleChange={handleChange} brands={brands} expanded={expanded} updateFilteredProducts={updateFilteredProducts}/>
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