import { Container, Grid } from '@mui/material';
import BudgetCalculator from './components/BudgetCalculator';



function App() {
    return (
        <Container maxWidth="xl" sx={{ height: '100vh' }}>
            <Grid container maxWidth="md" sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', margin: 'auto' }}>
                <Grid item xs={12} sx={{ paddingTop: 2, paddingBottom: 2}}>
                    <BudgetCalculator></BudgetCalculator>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
