import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRandomGreeting } from '../redux/greetings/greetingsSlice';

const Greeting = () => {
    const dispatch = useDispatch();
    const greeting = useSelector(state => state.greetings.greeting);
    const isLoading = useSelector(state => state.greetings.isLoading);
    const error = useSelector(state => state.greetings.error);

    useEffect(() => {
        console.log('Dispatching fetchRandomGreeting...');
        dispatch(fetchRandomGreeting());
    }, [dispatch]);

    console.log('isLoading:', isLoading);
    console.log('error:', error);
    console.log('greeting:', greeting);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Random Greeting</h1>
            <p>{greeting}</p>
        </div>
    );
};

export default Greeting;
