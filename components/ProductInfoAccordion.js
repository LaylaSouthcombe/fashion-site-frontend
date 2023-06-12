import styled from "styled-components"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
});

const ProductInfoArea = styled.div`
    padding-top: 1.25rem;
    width: 80%;
    margin: 0 auto;
`

const ProductInfoDetailArea = styled.div`
    width: 80%;
    margin-left: 1.5rem;
`

const SizeAndFitInfo = styled.ul`
    li {
        margin-left: 1rem;
    }
`

export default function ProductInfoAccordion({productInfo, expanded,  handleChange}){
    return (
        <>
        <div>
            <ThemeProvider theme={theme}>
                <ProductInfoArea>
                    <Accordion expanded={expanded === `panel1`} onChange={handleChange(`panel1`)}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                            <Typography>Product Summary</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ProductInfoDetailArea>
                                {productInfo.productSummary}
                            </ProductInfoDetailArea>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === `panel2`} onChange={handleChange(`panel2`)}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
                            <Typography>Product Size & Fit</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ProductInfoDetailArea>
                            <SizeAndFitInfo>
                                {productInfo.sizeAndFit.map(bullet => (
                                    <li>{bullet}</li>
                                ))}
                            </SizeAndFitInfo>

                            </ProductInfoDetailArea>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === `panel3`} onChange={handleChange(`panel3`)}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
                            <Typography>Delivery</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ProductInfoDetailArea>

                            </ProductInfoDetailArea>
                        </AccordionDetails>
                    </Accordion>
                </ProductInfoArea>
            </ThemeProvider>
        </div>
        </>
    )
}