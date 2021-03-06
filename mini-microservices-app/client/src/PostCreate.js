import React, { useState } from 'react';
import axios from 'axios';

export default () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://posts-srv:4000/posts/create', {
            title
        });

        /*const response = await fetch('http://localhost:4000/posts', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title
            })
        });*/
        // fetch or axios??? I guess axios this time

        setTitle('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className='form-control'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>);
}