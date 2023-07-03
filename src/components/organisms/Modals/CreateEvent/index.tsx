import { useState } from "react";
import Select from 'react-select';
import { Button, Typography, FlexBox, Card, Container, Delimiter, Wrapper, Modal, Absolute, Label, TextField } from "../../../styled";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Moment } from "moment";
import { theme } from "../../../styled";
import { EventLabel } from "../../Calendar";
export type LabelId = string;

export type OptionType = {
    value: string;
    label: string;
};

interface ModalWindowProps {
    isOpen?: boolean;
    date: Moment | null;
    labels: EventLabel[];
    onClose: () => void;
    onCreate: (newEventName: string, labels: LabelId[]) => void;
}

export const optionStyles = (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.data.color || 'transparent',
    color: state.data.color ? '#ffffff' : '#000000',
});

const ModalWindow = ({ isOpen = false, onClose, onCreate, date, labels }: ModalWindowProps) => {
    const [selectedItems, setSelectedItems] = useState<LabelId[]>([]);
    const [eventName, setEventName] = useState<string>('');
    const selectOptions: any = labels.map(({ id, color, text }) => ({
        value: id,
        label: text,
        color: theme.colors[color]
    }));

    const handleClose = () => {
        onClose();
    };

    const handleSelectChange = (selectedOptions: any) => {
        const selectedValues = (selectedOptions).map((option: OptionType) => option.value);
        setSelectedItems(selectedValues);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!date) {
            return;
        }
        if (eventName.trim().length) {
            onCreate(eventName, selectedItems);
            setEventName('');
            setSelectedItems([])
        }
    };

    
    return (
        <>
            {isOpen && (
                <Modal>
                    <Absolute iscenter={+true} top="50%" left="50%" w="100%">
                        <Container size="sm" autox={+true}>
                            <Card px="2rem" py="2rem" radius="SM">
                                <form onSubmit={(e) => submit(e)}>
                                    <FlexBox mb="1.45rem" justifycontent="space-between" alignitems="center">
                                        <Typography>Create a new event</Typography>
                                        <Typography onClick={handleClose}>
                                            <XMarkIcon style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                                        </Typography>
                                    </FlexBox>
                                    <Delimiter bg="secondary" />
                                    <Wrapper mt="0rem">
                                        <Label required={+true}>Event name</Label>
                                        <TextField
                                            value={eventName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEventName(e.target.value) }}
                                        />
                                    </Wrapper>
                                    <Wrapper my={'1rem'} style={{ overflow: 'visible' }} h="250px">
                                        <Select
                                            options={selectOptions}
                                            isMulti
                                            placeholder="Select labels"
                                            styles={{ option: optionStyles }}
                                            maxMenuHeight={250}
                                            menuPlacement="auto"
                                            onChange={handleSelectChange}
                                        />
                                    </Wrapper>
                                    <Delimiter bg="secondary" />
                                    <FlexBox justifycontent="center" mt="2rem">
                                        <Button type="submit" bg="info" px="2.2rem" mx="0.5rem">
                                            <Typography>Add</Typography>
                                        </Button>
                                        <Button bg="danger" mx="0.5rem" px="1.8rem" onClick={handleClose}>
                                            <Typography>Cancel</Typography>
                                        </Button>
                                    </FlexBox>
                                </form>
                            </Card>
                        </Container>
                    </Absolute>
                </Modal>
            )}
        </>
    );
};

export default ModalWindow;
