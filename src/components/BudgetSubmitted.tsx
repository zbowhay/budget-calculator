import { CardContent, CardHeader, Typography } from '@mui/material';
import EasterEgg from './EasterEgg';

function BudgetSubmitted() {
    return (
        <>
        <CardHeader title={'Thanks!'}>
        </CardHeader>
        <CardContent>
            <Typography variant="body2">Have you heard of the Konami Code?</Typography>
        </CardContent>
        <EasterEgg></EasterEgg>
        </>
    );
}

export default BudgetSubmitted;