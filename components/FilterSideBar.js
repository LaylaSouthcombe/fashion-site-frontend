import styled from "styled-components"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';

const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    backgroundColor: 'var(--main-light-blue)'
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
                    backgroundColor: 'var(--main-lightish-blue)'
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
        }
    },
});

const ChildNavLink = styled(Link)`
`

const FilterBarArea = styled.div`

`

export default function FilterSideBar({colours, sizes, productTypes, productSubTypes, expanded, handleChange}){
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
                            {productTypes.map((type, i) => {
                                return (
                                    <li key={"childLink" + i}>
                                        <Typography>{type}</Typography>
                                    </li>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === `panel2`} onChange={handleChange(`panel2`)}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
                            <Typography>Product subtype</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {productSubTypes.map((subType, i) => {
                                return (
                                    <li key={"childLink" + i}>
                                        <Typography>{subType}</Typography>
                                    </li>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === `panel3`} onChange={handleChange(`panel3`)}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
                            <Typography>Colour</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {colours.map((colour, i) => {
                                return (
                                    <li key={"childLink" + i}>
                                        <Typography>{colour}</Typography>
                                    </li>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === `panel4`} onChange={handleChange(`panel4`)}>
                        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header" expandIcon={<ExpandMoreIcon />}>
                            <Typography>Size</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {sizes.map((size, i) => {
                                return (
                                    <li key={"childLink" + i}>
                                            <Typography>{size}</Typography>
                                    </li>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>
                </FilterBarArea>
            </ThemeProvider>
        </div>
        </>
    )
}