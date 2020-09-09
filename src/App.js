import React, {useEffect, useState} from 'react';
import {FormControl, IconButton, InputBase} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import db from './firebase'

import logo from './logo.png';
import './App.css';
import Message from './components/Message/Message';
import Modal from './components/Modal/Modal';


function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [isModal, setIsModal] = useState(true);

    // useEffect(() => {
    //
    // }, []);

    const scrollTo = (ref) => {
        if (ref) {
            ref.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    };

    // отклюение скролла на модальном окне
    useEffect(() => {
        isModal
            ? document.body.classList.add('stopScrolling')
            : document.body.classList.remove('stopScrolling')
    }, [isModal]);

    // следит за изменениями в базе данных
    useEffect(() => {
        db.collection('messages')
            .orderBy('timestamp', 'desc') // сортировка
            .onSnapshot(snapshot => { // snapshot снимок бд
            setMessages(snapshot.docs.map(doc => ({id: doc.id, message:doc.data()})))
        })
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        // отправляет сообщение в бд
        db.collection('messages').add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput('');
        // setMessages([...messages, {username: username, text: input}]); // берёт все сообщения и добавляет объект в конец массива сообщений
    };

    return (
        <>
            {isModal && <Modal setUsername={setUsername} setIsModal={setIsModal}/>}

                <div className={isModal ? 'modalOn' : 'wrapper'}>
                    <div className='container'>
                            <div className='header'>
                                <img className='logo' src={logo} alt='logo'/>
                                <h1>Hello {username}, it's React Chat</h1>
                            </div>

                        <FlipMove>
                            <div className='messagesContainer'>{
                                [...messages].reverse().map(({message, id}) => (
                                    <Message ref={isModal ? null : scrollTo} key={id} username={username}
                                             message={message}/>
                                ))}
                            </div>
                        </FlipMove>
                        {/*обернул в форму чтобы отправка была по нажатию return*/}

                        <form className='form'>
                            <FormControl className='formControl'>
                                <InputBase
                                    className='input'
                                    onChange={event => setInput(event.target.value)}
                                    placeholder='Enter a message...'
                                    value={input}
                                />
                                <IconButton className='iconButton'
                                            disabled={!input}
                                            variant='contained'
                                            type='submit'
                                            onClick={sendMessage}>
                                    <SendIcon/>
                                </IconButton>
                            </FormControl>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default App;
