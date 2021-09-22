import { CardContent, CardHeader, Typography, List, ListItem, ListSubheader } from '@mui/material';
import { ListItemButton, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import { titleCase } from '../common';
import { Selection } from './BudgetCalculator';


function BudgetSelections(props: {
    items: Selection[]
    selections: Selection[];
    itemSelected: any;
    budget: string;
}) {

    // get unique types
    const types = [ ...new Set(props.items.map(i => i.type)) ];
    // create a dictionary of selections with type as key
    const list: { [key: string]: Selection[] } = {};
    types.forEach(type => {
        const selections = props.items.filter(i => i.type === type);
        list[type] = selections;
    });
    // gather information for summary
    const low = props.selections.reduce((prev, curr) => prev + curr.lowPrice, 0) / 100;
    const high = props.selections.reduce((prev, curr) => prev + curr.highPrice, 0) / 100;
    const budget = parseInt(props.budget);
    const status = (budget >= low && budget <= high) ? 'Gucci' :
                    budget > high ? 'Over Budget!' :
                    budget < low ? 'Under Budget!' : '';

    return (
        <>
            <CardHeader title={`What Are You Interested In?`}>
            </CardHeader>
            <CardContent>
                <List
                    subheader={<li />}
                >
                    {Object.keys(list).map((type, i) => (
                        <>
                            <ListSubheader key={i}>{titleCase(type.split('_').join(' '))}</ListSubheader>
                            {list[type].map((item, j) => (
                                <ListItem key={`${i}-${j}`}>
                                    <ListItemButton
                                        disabled={item.disabled}
                                        role={undefined}
                                        onClick={props.itemSelected(item)}
                                        dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={item.checked}
                                                tabIndex={-1}
                                                disableRipple
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} secondary={`$${item.lowPrice / 100} - $${item.highPrice / 100}`} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </>
                    ))}
                </List>
                <Typography variant="subtitle1">
                    Summary
                </Typography>
                <ul>
                    <li>Budget = {props.budget}</li>
                    <li>Estimate = {`$${low / 100} - $${high / 100}`}</li>
                    <li>Status = {status}</li>
                </ul>
            </CardContent>
        </>
    );
}

export default BudgetSelections;