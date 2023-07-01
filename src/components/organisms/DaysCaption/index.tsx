import { FlexBox, Typography } from "../../styled";
import { DAYS } from "../../../data/consts";

const DaysCaption = () => {
    return (
        <FlexBox>
            {
                DAYS.map((day, index) => {
                    return (
                        <FlexBox 
                            key={index}
                            justifycontent="center" 
                            fullwidth={+true}
                            py={'0.95rem'} 
                            bordercolor={'secondary'} 
                            borderstyle={'solid'} 
                            borderwidth={'1px'}
                        >
                            <Typography>{day}</Typography>
                        </FlexBox>
                    )
                })
            }
        </FlexBox>
    );
}

export default DaysCaption;