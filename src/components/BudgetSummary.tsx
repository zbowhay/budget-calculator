import { Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Selection } from './BudgetCalculator';

function BudgetSummary(props: {
    selections: Selection[];
    budget: string;
}) {
    // gather information for summary
    const low = props.selections.reduce((prev, curr) => prev + curr.lowPrice, 0) / 100;
    const high = props.selections.reduce((prev, curr) => prev + curr.highPrice, 0) / 100;
    const budget = parseInt(props.budget) || 0;
    const status = (budget >= low && budget <= high) ? 'Within Budget' :
                    budget > high ? 'Under Budget' :
                    budget < low ? 'Over Budget' : '';

    return (
        <Grid container sx={{ textAlign: 'center', paddingTop: 2 }}>
            <Grid item xs={4}>
                <Typography variant="subtitle1">
                    Budget
                </Typography>
                <Typography variant="subtitle2" color={grey[500]}>
                    ${budget}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="subtitle1">
                    Estimate
                </Typography>
                <Typography variant="subtitle2" color={grey[500]}>
                    {`$${low} - $${high}`}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="subtitle1">
                    Status
                </Typography>
                <Typography variant="subtitle2" color={grey[500]}>
                    {status}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default BudgetSummary;