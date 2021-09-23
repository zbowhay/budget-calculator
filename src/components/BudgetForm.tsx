import { CardContent, CardHeader, OutlinedInput, InputAdornment, Typography } from '@mui/material';

function BudgetForm(props: { budget: string; handleBudget: any; }) {
    return (
        <>
            <CardHeader title={`Let's Get Started!`}>
            </CardHeader>
            <CardContent>
                <Typography variant="subtitle2" color="text.primary">
                    What's your budget?
                </Typography>
                <OutlinedInput
                    sx={{ marginTop: 1 }}
                    size="small"
                    value={props.budget}
                    type="number"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    onChange={props.handleBudget} />
            </CardContent>
        </>
    );
}

export default BudgetForm;