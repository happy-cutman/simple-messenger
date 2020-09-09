import React from 'react';
import './Modal.css';
import {IconButton, InputBase} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';


const Modal = ({setUsername, setIsModal}) => {

    const closeModal = (event) => {
        event.preventDefault();
        setIsModal(false)
    };

    return (
        <div className='modalWrapper'>
            <div className='modal'>
                <h1 className='title'>Welcome to the chat</h1>
                <form className='modalForm'>
                    <InputBase
                        className='input'
                        onChange={event => setUsername(event.target.value)}
                        placeholder='Enter a username...'
                    />
                    <IconButton className='iconButton'
                                variant='contained'
                                type='submit'
                                onClick={closeModal}>
                        <SendIcon/>
                    </IconButton>
                </form>
             </div>
        </div>
    );
};

export default Modal;