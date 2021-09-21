import { Card, CardActionArea, CardContent, Container, Grid, MobileStepper, OutlinedInput, TextField, Typography, useTheme } from '@mui/material';
import { Button, InputAdornment, Box } from '@mui/material';
import { useState } from 'react';
import { Counter } from './features/counter/Counter';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


interface Form1 {
    budget: number;
}

function App() {
    const theme = useTheme();

    const [activeStep, setActiveStep] = useState(0);
    const [form1, setForm1] = useState<Form1>({
        budget: 0
    });

    const handleNext = () => {
        console.log(form1.budget);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (prop: keyof Form1) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm1({ ...form1, [prop]: parseInt(event.target.value) || 0 });
    };

    return (
        <Container maxWidth="xl" sx={{ height: '100vh' }}>
            <Grid container maxWidth="md" sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', margin: 'auto' }}>
                <Grid item xs={12}>
                    <Card sx={{ margin: 'auto', width: '100%', boxShadow: 5, border: 1, textAlign: 'center', padding: 1 }}>
                        <CardContent>
                            <Typography variant="h4" paddingBottom={2}>
                                Let's Get Started!
                            </Typography>
                            <Typography variant="subtitle1" paddingBottom={2}>
                                What's your budget?
                            </Typography>
                            <OutlinedInput
                                size="small"
                                value={form1.budget}
                                type="number"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                onChange={handleChange('budget')}
                            />
                            <MobileStepper
                                sx={{ margin: 'auto', marginTop: 5, bgcolor: 'background.paper', maxWidth: '250px' }}
                                variant="dots"
                                steps={3}
                                position="static"
                                activeStep={activeStep}
                                nextButton={
                                    <Button size="small" onClick={handleNext} disabled={activeStep === 2}>
                                        Next
                                        {theme.direction === 'rtl' ? ( <KeyboardArrowLeft /> ) : ( <KeyboardArrowRight /> )}
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                        {theme.direction === 'rtl' ? ( <KeyboardArrowRight /> ) : ( <KeyboardArrowLeft /> )}
                                        Back
                                    </Button>
                                }
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* <Counter /> */}
        </Container>
    );
}

export default App;
