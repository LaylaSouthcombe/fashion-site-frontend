import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function NavAccordion({label, childLinks}) {
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
                        lineHeight: '1'
                    },
                },
            },
        },
      });
      
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>{label}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {childLinks.map((link, i) => {
                            return (
                                <li key={"childLink" + i}>
                                    <Typography>
                                        {link.label}
                                    </Typography>
                                </li>
                                
                            )
                        })}
                    
                    </AccordionDetails>
                </Accordion>

            </ThemeProvider>
        </div>
      );
}