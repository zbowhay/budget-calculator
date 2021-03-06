import { useState, useEffect } from 'react';
import { Card, MobileStepper, Button, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import firebase, { Item, BudgetSubmission } from '../features/firebase/firebase';
import BudgetForm from './BudgetForm';
import BudgetSelections from './BudgetSelections';
import BudgetSubmitted from './BudgetSubmitted';

export interface Selection extends Item {
    index: number;
    checked: boolean;
    disabled: boolean;
}

interface State {
    activeStep: number;
    items: Selection[];
    form: {
        budget: string;
        selections: Selection[]
    }
}


function BudgetCalculator() {
    const theme = useTheme();

    const [state, setState] = useState<State>({
        activeStep: 0,
        items: [],
        form: {
            budget: '',
            selections: []
        }
    });


    useEffect(() => {
        (async () => {
            // query the database for items
            const items = await firebase.getItems();
            setState((prev) => ({
                ...prev,
                items: items.map((item, index) => ({
                    ...item,
                    checked: false,
                    disabled: false,
                    index
                }))
            }));
        })();
    }, []);

    const handleNext = () => {
        setState((prev) => {
            const activeStep = prev.activeStep + 1;
            if (activeStep === 2) {
                handleSubmit();
            }
            
            return { ...prev, activeStep };
        });
    };

    const handleBack = () => {
        setState((prev) => ({ ...prev, activeStep: prev.activeStep - 1}));
    };

    const handleBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            form: {
                ...state.form,
                budget: event.target.value
            }
        });
    };

    const itemSelected = (selection: Selection) => () => {
        setState((prev) => {
            // toggle checkbox
            let { items } = prev;
            items[selection.index].checked = !items[selection.index].checked;

            // update selections to be the checked items
            const selections = items.filter(i => i.checked);
            const disabledTypes = selections.map(s => s.type);

            // disable all items whose type already exists in selections BUT is not in selections
            items = items.map(item => ({
                ...item,
                disabled: disabledTypes.includes(item.type) && selections.findIndex(s => s.index === item.index) === -1
            }));
            return {
                ...state,
                items,
                form: {
                    budget: state.form.budget,
                    selections
                }
            }
        });
    };

    const handleSubmit = () => {
        const submission: BudgetSubmission = {
            budget: state.form.budget,
            items: state.form.selections.map(s => ({
                type: s.type,
                name: s.name,
                lowPrice: s.lowPrice,
                highPrice: s.highPrice
            }))
        }

        firebase.submitBudget(submission)
            .catch(err => console.error('Failed to submit budget!', err));
    };

    const renderFormStep = (activeStep: number) => {
        switch (activeStep) {
            case 0:
                return <BudgetForm budget={state.form.budget} handleBudget={handleBudget}></BudgetForm>
            case 1:
                return <BudgetSelections items={state.items} selections={state.form.selections} itemSelected={itemSelected} budget={state.form.budget}></BudgetSelections>
            case 2:
                return <BudgetSubmitted></BudgetSubmitted>
            default:
                return <></>;
        }
    }

    return (
        <Card sx={{ margin: 'auto', width: '100%', border: 1, textAlign: 'center' }} elevation={5}>

            { renderFormStep(state.activeStep) }

            <MobileStepper
                sx={{ margin: 'auto', marginTop: 3, bgcolor: 'background.paper', maxWidth: '250px' }}
                variant="dots"
                position="static"
                steps={3}
                activeStep={state.activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={state.activeStep === 2}>
                        {state.activeStep > 0 ? 'Submit' : 'Next'}
                        {theme.direction === 'rtl' ? ( <KeyboardArrowLeft /> ) : ( <KeyboardArrowRight /> )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={state.activeStep % 2 === 0}>
                        {theme.direction === 'rtl' ? ( <KeyboardArrowRight /> ) : ( <KeyboardArrowLeft /> )}
                        Back
                    </Button>
                }
            />
        </Card>
    )
}

export default BudgetCalculator;
