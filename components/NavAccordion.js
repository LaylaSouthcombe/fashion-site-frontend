import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import styled from 'styled-components';

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
                    padding: '0 0.75rem'
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
    text-decoration: none;
`

export default function NavAccordion({accordionNumber, label, childLinks, expanded, handleChange}) {

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Accordion expanded={expanded === `panel${accordionNumber}`} onChange={handleChange(`panel${accordionNumber}`)}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                        <Typography>{label}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {childLinks.map((link, i) => {
                            return (
                                <li key={"childLink" + i}>
                                    <ChildNavLink href={link.link}>
                                        <Typography>{link.label}</Typography>
                                    </ChildNavLink>
                                </li>
                            )
                        })}
                    </AccordionDetails>
                </Accordion>
            </ThemeProvider>
        </div>
      );
}