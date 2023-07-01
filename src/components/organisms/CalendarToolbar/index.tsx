import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Button, Typography, FlexBox, Wrapper } from "../../styled";
import { CalendarView } from "../Calendar";
import moment, { Moment } from "moment";


export interface CalendarToolbarProps {
    view: CalendarView;
    currentDateTime: Moment;
    onViewUpdate: (view: CalendarView) => void;
    onIncreaseDateTime: () => void;
    onReduceDateTime: () => void;
    setDefault: () => void;
}

const CalendarToolbar = ({
    view,
    onViewUpdate,
    currentDateTime,
    onIncreaseDateTime,
    onReduceDateTime,
    setDefault,
}: CalendarToolbarProps) => {

    const handleChangeView = (newView: CalendarView) => {
        onViewUpdate(newView);
    }
    
    return (
        <FlexBox px="2rem" py={'2.5rem'}>
            <FlexBox>
                <Wrapper>
                    <Button group={"first"} py={'0.8rem'} bg={'black'} onClick={onReduceDateTime}>
                        <FlexBox>
                            <ChevronLeftIcon style={{ width: '16px', height: '16px' }} />
                        </FlexBox>
                    </Button>
                    <Button group={"last"} py={'0.8rem'} bg={'black'} onClick={onIncreaseDateTime}>
                        <FlexBox><ChevronRightIcon style={{ width: '16px', height: '16px' }} /></FlexBox>
                    </Button>
                </Wrapper>
                <Wrapper mx={'1rem'}>
                    <Button py={'0.8rem'} bg={'black'} disabled={currentDateTime.isSame(moment(), 'month')} onClick={setDefault}>
                        <Typography alpha={currentDateTime.isSame(moment(), 'month') ? 0.5 : 1}>Today</Typography>
                    </Button>
                </Wrapper>
            </FlexBox>
            {view === 'month' && <Typography>{currentDateTime.format('MMMM YYYY')}</Typography>}
            {view === 'week' && <Typography>{currentDateTime.clone().startOf('week').format('MMM D')} – {currentDateTime.clone().endOf('week').format('MMM D, YYYY')}</Typography>}
            {view === 'day' && <Typography>{currentDateTime.format('MMMM D, YYYY')}</Typography>}
            {/* ========== CHANGE VIEW (day, month, week) ========== */}
            <Typography>
                <Wrapper>
                    <Button 
                        group={"first"} 
                        py={'0.8rem'} 
                        px={'1rem'} 
                        bg={'black'} 
                        disabled={view === 'month'} 
                        onClick={() => handleChangeView('month')}
                    >
                        <Typography alpha={view === 'month' ? 0.5 : 1}>Month</Typography>
                    </Button>
                    <Button 
                        group={"between"} 
                        py={'0.8rem'} 
                        px={'1rem'} 
                        bg={'black'} 
                        disabled={view === 'week'} 
                        onClick={() => handleChangeView('week')}
                    >
                        <Typography alpha={view === 'week' ? 0.5 : 1}>Week</Typography>
                    </Button>
                    <Button 
                        group={"last"} 
                        py={'0.8rem'} 
                        px={'1rem'} 
                        bg={'black'} 
                        disabled={view === 'day'} 
                        onClick={() => handleChangeView('day')}
                    >
                        <Typography alpha={view === 'day' ? 0.5 : 1}>Day</Typography>
                    </Button>
                </Wrapper>
            </Typography>
            {/* ========== END OF CHANGE VIEW  ========== */}
        </FlexBox>
    )
}

export default CalendarToolbar;