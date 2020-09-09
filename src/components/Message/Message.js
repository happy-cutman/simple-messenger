import React, {forwardRef} from 'react';
import {Card, CardContent} from '@material-ui/core';
import './Message.css'

const Message = forwardRef(({message, username}, ref) => {
    const isUser = username === message.username; // если пользователь залогинен то меняем стиль его сообщения

    return (
        <div ref={ref} className={`message ${isUser && 'messageUser'}`}>
            <Card className={isUser ? 'messageUserCard' : 'messageGuestCard'}>
                <CardContent>
                    <div className='messageContent'>
                        <span className='username'>{!isUser && `${message.username || 'Unknown user'}: `}</span>
                        {message.message}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
});

export default Message;

