import { app } from "../firebase.js";
import { v4 as uid } from 'uuid';

export default function tracker() {
    async function getIP() {
        await fetch(`https://api.ipify.org?format=json`)
            .then(res => res.json())
            .then((data) => {
                sessionStorage.setItem('UserIP', window.btoa(data.ip))
            })
            .catch((err) => console.log(`No data provided...`, err))
    }
    if (!sessionStorage.UserProviderID) sessionStorage.setItem('UserProviderID', uid())
    if (!sessionStorage.CollectedPaths) sessionStorage.setItem('CollectedPaths', '')
    if (!sessionStorage.UserIP) getIP();

    var splitDecision = sessionStorage.CollectedPaths.split(', ')
    if (splitDecision[splitDecision.length - 1] !== window.location.pathname) {
        sessionStorage.CollectedPaths += window.btoa(`, ${window.location.pathname}`);
    }
    async function addToFS(id, paths, ip) {
        if (!(await app.firestore().collection('Analytics').doc(window.atob(ip)).get()).exists) {
            // With a server timestamp
            await app.firestore().collection('Analytics').doc(window.atob(ip)).set({
                id: id,
                paths: window.atob(paths).split(', '),
                ip_addr: window.atob(ip),
                pages_visited: paths.split(', ').length - 1,
                access_time: new Date().toLocaleString(),
                created: new Date()
            });
        } else {
            // Has no server timestamp
            await app.firestore().collection('Analytics').doc(window.atob(ip)).update({
                id: id,
                paths: window.atob(paths).split(', '),
                ip_addr: window.atob(ip),
                pages_visited: paths.split(', ').length - 1,
                access_time: new Date().toLocaleString()
            });
        }
        return true;
    }
    return true;
}