import { useState } from "react";
import { Button, Typography, FlexBox, Card, Container, Delimiter, Wrapper, Modal, Absolute, Label, TextField } from "../../../styled";
import { XMarkIcon } from "@heroicons/react/20/solid";

export interface ModalWindowProps {
    isOpen?: boolean;
    onClose: () => void;
}

const ModalWindow = ({ isOpen = false, onClose }: ModalWindowProps) => {
    const [eventName, setEventName] = useState<string>('');
    const [eventDescription, setEventDescription] = useState<string>('');
    
    const handleClose = () => {
        onClose();
    }
    return (
        <>
            {
                isOpen && (
                    <Modal>
                        <Absolute iscenter={+true} top="50%" left="50%" w="100%" >
                            <Container size="sm" autoX={+true}>
                                <Card px="2rem" py="2rem" radius="SM">
                                    <FlexBox mb="1.45rem" justifycontent="space-between" alignitems="center">
                                        <Typography>Create a new event</Typography>
                                        <Typography onClick={handleClose}>
                                            <XMarkIcon style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                                        </Typography>
                                    </FlexBox>
                                    <Delimiter bg="secondary" />
                                    <Wrapper mt="0rem">
                                        <Label required={+true}>Event name</Label>
                                        <TextField value={eventName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEventName(e.target.value)}}/>
                                    </Wrapper>
                                    <Wrapper mb="1.8rem">
                                        <Label>Event description</Label>
                                        <TextField value={eventDescription} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEventDescription(e.target.value)}}/>
                                    </Wrapper>
                                    <Delimiter bg="secondary" />
                                    <FlexBox justifycontent="center" mt="2rem">
                                        <Button bg="info" px="2.2rem" mx="0.5rem">
                                            <Typography>
                                                Add
                                            </Typography>
                                        </Button>
                                        <Button bg="danger" mx="0.5rem" px="1.8rem" onClick={handleClose}>
                                            <Typography>
                                                Cancel
                                            </Typography>
                                        </Button>
                                    </FlexBox>
                                </Card>
                            </Container>
                        </Absolute>
                    </Modal>
                )
            }
        </>
    );
}

export default ModalWindow;