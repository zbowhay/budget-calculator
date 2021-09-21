import { Card, CardActionArea, CardContent, Container, Grid, MobileStepper, OutlinedInput, TextField, Typography, useTheme } from '@mui/material';
import { Button, InputAdornment, Box } from '@mui/material';
import { useState } from 'react';
import { Counter } from './features/counter/Counter';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Item } from './features/firebase/firebase';


interface State {
    activeStep: number;
    items: Item;
    form: Form
}

interface Form {
    budget: string;
    selections: {
        [key: string]: Item
    }
}

function App() {
    const theme = useTheme();

    const [state, setState] = useState({
        activeStep: 0,
        items: [],
        form: {
            budget: '',
            selections: {
                // Item.type: Item // that way we can see if key exists in selections for disabling
            }
        }
    })

    const handleNext = () => {
        console.log(state);
        setState((prev) => ({ ...prev, activeStep: prev.activeStep + 1}));
    };

    const handleBack = () => {
        setState((prev) => ({ ...prev, activeStep: prev.activeStep - 1}));
    };

    const handleChange = (prop: keyof Form) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            form: {
                ...state.form,
                ...{ [prop]: event.target.value }
            }
        });
    };

    return (
        <Container maxWidth="xl" sx={{ height: '100vh' }}>
            <Grid container maxWidth="md" sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', margin: 'auto' }}>
                <Grid item xs={12}>
                    <Card sx={{ margin: 'auto', width: '100%', boxShadow: 5, border: 1, textAlign: 'center' }}>
                        <CardContent>
                            <Typography variant="h4" paddingBottom={2}>
                                Let's Get Started!
                            </Typography>
                            <Typography variant="subtitle1" paddingBottom={2}>
                                What's your budget?
                            </Typography>
                            <OutlinedInput
                                size="small"
                                value={state.form.budget}
                                type="number"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                onChange={handleChange('budget')}
                            />
                            <MobileStepper
                                sx={{ margin: 'auto', marginTop: 5, bgcolor: 'background.paper', maxWidth: '250px' }}
                                variant="dots"
                                steps={3}
                                position="static"
                                activeStep={state.activeStep}
                                nextButton={
                                    <Button size="small" onClick={handleNext} disabled={state.activeStep === 2}>
                                        {state.activeStep > 0 ? 'Submit' : 'Next'}
                                        {theme.direction === 'rtl' ? ( <KeyboardArrowLeft /> ) : ( <KeyboardArrowRight /> )}
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" onClick={handleBack} disabled={state.activeStep === 0}>
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
