import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const FirebaseAnalytics = () => {
    let location = useLocation();

    useEffect(() => {
        const analytics = window.firebase && window.firebase.analytics;
    })
}