import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Button, Typography, FlexBox, Card, Container, Delimiter, Wrapper } from "../../styled";

const Calendar = () => {
    return (
        <>
            <Container xl={true} my={'4rem'} mx={'auto'}>
                <Card>
                    <FlexBox px={'2rem'} py={'1.3rem'}>
                        <Typography>Calendar</Typography>
                        <Button>
                            <Typography>Add event</Typography>
                        </Button>
                    </FlexBox>
                    <Delimiter />
                    <FlexBox px="2rem" py={'2.5rem'}>
                        <FlexBox>
                            <Wrapper>
                                <Button first py={'0.8rem'} bg={'black'}>
                                    <FlexBox>
                                        <ChevronLeftIcon style={{ width: '16px', height: '16px' }} />
                                    </FlexBox>
                                </Button>
                                <Button last py={'0.8rem'} bg={'black'}>
                                    <FlexBox><ChevronRightIcon style={{ width: '16px', height: '16px' }} /></FlexBox>
                                </Button>
                            </Wrapper>
                            <Wrapper mx={'1rem'}>
                                <Button py={'0.8rem'} bg={'black'}>
                                    <Typography>Today</Typography>
                                </Button>
                            </Wrapper>
                        </FlexBox>
                        <Typography>August 2023</Typography>
                        <Typography>
                            <Wrapper>
                                <Button first py={'0.8rem'} px={'1rem'} bg={'black'}>
                                    <Typography>Month</Typography>
                                </Button>
                                <Button between py={'0.8rem'}px={'1rem'}  bg={'black'}>
                                     <Typography>Week</Typography>
                                </Button>
                                <Button last py={'0.8rem'} px={'1rem'} bg={'black'}>
                                    <Typography>Day</Typography>
                                </Button>
                            </Wrapper>
                        </Typography>
                    </FlexBox>
                </Card>
            </Container>
        </>
    );
}

export default Calendar;