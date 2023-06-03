import styled from "styled-components"
import ProductTile from "./ProductsCarousel/ProductTile"
import FilterSideBar from "./FilterSideBar"
import { useEffect, useState } from "react"

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
    console.log(products[0])

    const [productTypes, setProductTypes] = useState([])
    const [productSubTypes, setProductSubTypes] = useState([])
    const [sizes, setSizes] = useState([])
    const [colours, setColours] = useState([])

    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        if(products !== undefined){
            let newProductTypes = []
            let newProductSubTypes = []
            let newColours = []
            let newSizes = []
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
            console.log(newProductTypes)
            console.log(newProductSubTypes)
            console.log(newColours)
            console.log(newSizes)

        }

    },[])


    return (
        <>
            <ProductsGridResultsAndSort>
                <NumberOfResults>{products?.length} Results</NumberOfResults>
                <SortDropDownArea>Sort</SortDropDownArea>
            </ProductsGridResultsAndSort>
            <ProductsGridOuterContainer>
                <FilterSideBar colours={colours} sizes={sizes} productTypes={productTypes} productSubTypes={productSubTypes} handleChange={handleChange} expanded={expanded}/>
                <ProductsGridContainer>
                    {products?.length > 0 ? 
                        products.map((product, i) => (
                            <ProductTile key={i} product={product}/>
                        ))
                    : null}
                </ProductsGridContainer>
            </ProductsGridOuterContainer>
        </>
    )
}