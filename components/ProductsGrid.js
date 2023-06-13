import { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import Image from "next/image"

import ProductTile from "./ProductsCarousel/ProductTile"
import FilterSideBar from "./FilterSideBar"

import downArrow from "../images/icons/down-arrow.png"

const ProductsGridOuterContainer = styled.section`
    width: 80%;
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    @media (min-width: 768px) {
        width: 90%;
        grid-template-columns: 0.25fr 0.75fr;
    }
`

const ProductsGridContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    @media (min-width: 400px) {
        grid-template-columns: repeat(2, 50%);
    }
    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 33%);
    }
`

const ProductsGridResultsAndSort = styled.div`
    width: 90%;
    max-width: 1000px;
    margin: 40px auto 20px auto;
    padding-right: 2rem;
    display: flex;
    justify-content: space-between;
`

const NumberOfResults = styled.p`
    padding: 1rem 2rem;
    font-size: 0.9rem;
    color: grey;
`

const SortDropDownArea = styled.div`
    padding: 1rem;
    position: relative;
    border: 1px solid var(--main-dark-blue);
    width: 12rem;
    font-size: 0.9rem;
`

const DropdownHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .flipped {
        transform: rotateX(0deg);
        transition: transform 0.3s ease;
    }
    .backFlipped {
        transform: rotateX(180deg);
        transition: transform 0.3s ease;
    }
    img {
        width: 1rem;
        height: auto;
    }
`

const DropdownList = styled.ul`
    padding: 0.5rem;
    outline: none;
    position: absolute;
    background-color: white;
    border: 1px solid var(--main-dark-blue);
    border-top: none;
    width: 101%;
    list-style: none;
    top: 2.5rem;
    left: -0.5%;
    li {
        padding: 0.75rem 0.5rem;
    }
    li:hover {
        border-left: 0.25rem solid var(--main-dark-blue);
        padding-left: 0.25rem;
    }
`

export default function ProductsGrid({products, apiUrl, queryConstraint}) {

    const [filterLabels, setFilterLabels] = useState({productType: [], productSubType: [], sizesAndStock: [], colour: [], brand: []})
    const [expanded, setExpanded] = useState('')
    const [selectedValue, setSelectedValue] = useState({ value: 'recommended', label: 'Recommended' });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [currentProducts, setCurrentProducts] = useState(products)
    const [filters, setFilters] = useState({productType: [], productSubType: [], colour: [], sizesAndStock: [], brand: []})

    const dropdownOptions = [
        { value: 'recommended', label: 'Recommended' },
        { value: 'lowestPrice', label: 'Low to high' },
        { value: 'highestPrice', label: 'High to low' },
        { value: 'newIn', label: 'New in' }
    ]

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const getSortedProducts = async (filters, queryConstraint, sortResults) => {
        let body = {
            filters: filters,
            queryConstraint: queryConstraint,
            sortResults: sortResults
        }
        const response = await axios.post(apiUrl, body)
        return response.data
    }

    const handleOptionSelect = async (valueObject) => {
        setSelectedValue(valueObject)
        setIsDropdownOpen(false)
        let newProducts = await getSortedProducts(filters, queryConstraint, valueObject.value)
        setCurrentProducts(newProducts)
    }

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }

    const generateAvailableFilters = (products) => {
        let newFilterLabels = {productType: [], productSubType: [], colour: [], sizesAndStock: [], brand: []}

        for(let i = 0; i < products.length; i++){
            Object.keys(newFilterLabels).forEach(label => {
                if(label !== "sizesAndStock"){
                    if(!newFilterLabels[label].includes(products[i][label]) && products[i][label] !== undefined){
                        newFilterLabels[label].push(products[i][label])
                    }
                } else {
                    for(let j = 0; j < products[i].sizesAndStock.length; j++){
                        if(!newFilterLabels.sizesAndStock.includes(products[i].sizesAndStock[j].size) && products[i].sizesAndStock[j].size !== undefined){
                            newFilterLabels.sizesAndStock.push(products[i].sizesAndStock[j].size)
                        }
                    }
                }
            })
        }

        setFilterLabels(newFilterLabels)
    }

    useEffect(() => {
        if(products !== undefined){
            generateAvailableFilters(products)
        }
    },[])

    const getFilteredProducts = async (filters, queryConstraint) => {
        let body = {
            filters: filters,
            queryConstraint: queryConstraint,
            sortResults: "recommended"
        }
        const response = await axios.post(apiUrl, body)
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
        
        let newProducts = await getFilteredProducts(filters, queryConstraint)
        setCurrentProducts(newProducts)
    }

    return (
        <>
            <ProductsGridResultsAndSort>
                <NumberOfResults>{currentProducts?.length} Results</NumberOfResults>
                <SortDropDownArea>
                    <DropdownHeader className="dropdown-header" onClick={handleDropdownToggle}>
                        <span>{!isDropdownOpen ? selectedValue.label : 'Sort By'}</span>
                        <Image src={downArrow} className={isDropdownOpen ? 'backFlipped' : 'flipped'} alt="Down arrow"/>
                    </DropdownHeader>
                    {isDropdownOpen ? (
                        <DropdownList className="dropdown-options">
                            {dropdownOptions.map((option) => (
                                <li
                                key={option.value}
                                className="dropdown-option"
                                onClick={() => handleOptionSelect({value: option.value, label: option.label})}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </DropdownList>
                    ) : null}
                </SortDropDownArea>
            </ProductsGridResultsAndSort>
            <ProductsGridOuterContainer>
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