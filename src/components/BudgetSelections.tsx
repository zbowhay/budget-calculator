import { CardContent, CardHeader, Typography, List, ListItem, ListSubheader } from '@mui/material';
import { ListItemButton, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import { titleCase } from '../common';
import { Selection } from './BudgetCalculator';
import BudgetSummary from './BudgetSummary';


function BudgetSelections(props: {
    items: Selection[]
    selections: Selection[];
    itemSelected: any;
    budget: string;
}) {

    // create a dictionary of selections with type as key
    const types = [ ...new Set(props.items.map(i => i.type)) ];
    const list: { [key: string]: Selection[] } = {};
    types.forEach(type => {
        const selections = props.items.filter(i => i.type === type);
        list[type] = selections;
    });

    return (
        <>
        <CardHeader title={`What Are You Interested In?`}>
        </CardHeader>
        { !props.items.length && <Typography>Loading...</Typography> }
        { props.items.length &&
            <CardContent sx={{ textAlign: 'left' }}>
                <List subheader={<li />}>
                    {Object.keys(list).map((type, i) => (
                        <li key={i}>
                        <ul style={{ padding: 0}}>
                        <ListSubheader>{titleCase(type.split('_').join(' '))}</ListSubheader>
                        {list[type].map((item, j) => (
                            <ListItem key={`${i}-${j}`} divider>
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
                                    <ListItemText primary={item.name} secondary={`$${(item.lowPrice / 100).toLocaleString()} - $${(item.highPrice / 100).toLocaleString()}`} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        </ul>
                        </li>
                    ))}
                </List>
                <BudgetSummary budget={props.budget} selections={props.selections}></BudgetSummary>
            </CardContent>
        }
        </>
    );
}

export default BudgetSelections;