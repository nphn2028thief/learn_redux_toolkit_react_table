import { Box, Modal } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppSelector } from '../redux_store/store';

interface IModal {
    children: React.ReactNode;
    width: string;
    modalId: string;
}

function ModalGeneral(props: IModal) {
    const { status, modalId } = useAppSelector((state) => state.modalSlice);

    return (
        <div>
            <Modal
                open={status && Boolean(props.modalId) && modalId === props.modalId}
                aria-labelledby="modal-modal-title"
            >
                <Box
                    sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: props.width,
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                >
                    {props.children}
                </Box>
            </Modal>
        </div>
    );
}

export default ModalGeneral;
