import styled from "styled-components"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    backgroundColor: 'white',
                    padding: '1rem 0rem',
                    '&.Mui-expanded': {
                        '&:before': {
                            position: 'absolute',
                            left: 0,
                            top: '-1px',
                            right: 0,
                            height: '1px',
                            content: '""',
                            opacity: '1 !important',
                            backgroundColor: 'rgba(0, 0, 0, 0.12)'
                        },
                        margin: '0 !important'
                    }
                    
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    padding: 0,
                    height: 'fit-content',
                    minHeight: 0,
                    '&.Mui-expanded': {
                        minHeight: 0,
                    }
                },
                content: {
                    margin: 0,
                    "&.Mui-expanded": {
                        margin: 0
                    }
                },
                expandIconWrapper: {
                    marginRight: '2rem',
                    "&.Mui-expanded": {
                        marginRight: '2rem'
                    }
                }
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    padding: 0,
                    margin: '0.75rem 0rem 0rem 0rem'
                },
            },
        },
        MuiCollapse: {
            styleOverrides: {
                root: {
                    marginTop: '5px'
                },
            },
        },
        MuiTypography : {
            styleOverrides: {
                root: {
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '1',
                    padding: '0rem 1rem'
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    padding: '0.5rem 0.25rem 0.5rem 0.5rem'
                }
            }
        }
    },
})

const FilterBarArea = styled.div`
    padding-top: 1.25rem;
`

const FilterArea = styled.ul`
    overflow: scroll;
    max-height: 15rem;
    overflow-x: hidden;
    ::-webkit-scrollbar {
        display: ${props => props.filtersLength > 6 ? 'block' : 'none'};
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        background-color: var(--main-light-blue);
    }
    ::-webkit-scrollbar-thumb {
        background-color: var(--main-dark-blue);
    }
`

const Filter = styled.li`
    list-style-type: none;
    padding: '0.75rem 0.5rem';
    display: flex;
    align-items: center;
    p {
        padding-left: 0;
        margin-left: '0.25rem';
    }
`

export default function FilterSideBar({filterLabels, expanded, handleChange, updateFilteredProducts}){

    return (
        <>
            <div>
                <ThemeProvider theme={theme}>
                    <FilterBarArea>
                        <Accordion expanded={expanded === `panel1`} onChange={handleChange(`panel1`)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                                <Typography>Product type</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FilterArea filtersLength={filterLabels.productType.length}>
                                    {filterLabels.productType.map((type, i) => {
                                        return (
                                            <Filter key={"childLink" + i} >
                                                <Checkbox onChange={() => updateFilteredProducts({productType: type})}/><Typography>{type}</Typography>
                                            </Filter>
                                        )
                                    })}
                                </FilterArea>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === `panel2`} onChange={handleChange(`panel2`)}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
                                <Typography>Product subtype</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FilterArea filtersLength={filterLabels.productSubType.length}>
                                    {filterLabels.productSubType.map((subType, i) => {
                                        return (
                                            <Filter key={"childLink" + i}>
                                                <Checkbox onChange={() => updateFilteredProducts({productSubType: subType})}/>
                                                <Typography>{subType}</Typography>
                                            </Filter>
                                        )
                                    })}
                                </FilterArea>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === `panel3`} onChange={handleChange(`panel3`)}>
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
                                <Typography>Brand</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FilterArea filtersLength={filterLabels.brand.length}>
                                    {filterLabels.brand.map((brand, i) => {
                                        return (
                                            <Filter key={"childLink" + i}>
                                                <Checkbox onChange={() => updateFilteredProducts({brand: brand})}/>
                                                <Typography>{brand}</Typography>
                                            </Filter>
                                        )
                                    })}
                                </FilterArea>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === `panel4`} onChange={handleChange(`panel4`)}>
                            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header" expandIcon={<ExpandMoreIcon />}>
                                <Typography>Colour</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FilterArea filtersLength={filterLabels.colour.length}>
                                    {filterLabels.colour.map((colour, i) => {
                                        return (
                                            <Filter key={"childLink" + i}>
                                                <Checkbox onChange={() => updateFilteredProducts({colour: colour})}/>
                                                <Typography>{colour}</Typography>
                                            </Filter>
                                        )
                                    })}
                                </FilterArea>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === `panel5`} onChange={handleChange(`panel5`)}>
                            <AccordionSummary aria-controls="panel5d-content" id="panel5d-header" expandIcon={<ExpandMoreIcon />}>
                                <Typography>Size</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FilterArea filtersLength={filterLabels.sizesAndStock.length}>
                                    {filterLabels.sizesAndStock.map((size, i) => {
                                        return (
                                            <Filter key={"childLink" + i}>
                                                <Checkbox onChange={() => updateFilteredProducts({sizesAndStock: size})}/>
                                                <Typography>{size}</Typography>
                                            </Filter>
                                        )
                                    })}
                                </FilterArea>
                            </AccordionDetails>
                        </Accordion>
                    </FilterBarArea>
                </ThemeProvider>
            </div>
        </>
    )
}