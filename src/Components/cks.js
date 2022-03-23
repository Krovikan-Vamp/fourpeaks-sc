import { app } from "../firebase.js";
import { v4 as uid } from 'uuid';

export default function tracker() {
    async function getIP() {
        await fetch(`https://api.ipify.org?format=json`)
            .then(res => res.json())
            .then((data) => {
                sessionStorage.setItem('UserIP', data.ip)
            })
            .catch((err) => console.log(`No data provided...`, err))
    }
    if (!sessionStorage.UserProviderID) sessionStorage.setItem('UserProviderID', uid())
    if (!sessionStorage.CollectedPaths) sessionStorage.setItem('CollectedPaths', '')
    if (!sessionStorage.UserIP) getIP();

    var splitDecision = sessionStorage.CollectedPaths.split(', ')
    if (splitDecision[splitDecision.length - 1] !== window.location.pathname) {
        sessionStorage.CollectedPaths += `, ${window.location.pathname}`;
    }
    async function addToFS(id, paths, ip) {
        if (!(await app.firestore().collection('Analytics').doc(ip).get()).exists) {
            // With a server timestamp
            await app.firestore().collection('Analytics').doc(ip).set({
                id: id,
                paths: paths.split(', '),
                ip_addr: ip,
                pages_visited: paths.split(', ').length - 1,
                access_time: new Date().toLocaleString(),
                created: new Date()
            });
        } else {
            // Has no server timestamp
            await app.firestore().collection('Analytics').doc(ip).update({
                id: id,
                paths: paths.split(', '),
                ip_addr: ip,
                pages_visited: paths.split(', ').length - 1,
                access_time: new Date().toLocaleString()
            });
        }
        return true;
    }
    window.onbeforeunload = addToFS(sessionStorage.UserProviderID, sessionStorage.CollectedPaths, sessionStorage.UserIP)
    return true;
}