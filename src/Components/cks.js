import { app } from "../firebase.js";
import { v4 as uid } from 'uuid';

export default function tracker() {
    // console.log(Object.keys(sessionStorage))
    async function getIP() {
        await fetch(`https://api.ipify.org?format=json`)
            .then(res => res.json())
            .then((data) => {
                sessionStorage.setItem('UserIP', data.ip)
            })
            .catch(() => console.log(`No data provided...`))
    }
    if (!sessionStorage.UserProviderID) sessionStorage.setItem('UserProviderID', uid())
    if (!sessionStorage.CollectedPaths) sessionStorage.setItem('CollectedPaths', '')
    if (!sessionStorage.UserIP) getIP();

    var splitDecision = sessionStorage.CollectedPaths.split(', ')
    if (splitDecision[splitDecision.length - 1] !== window.location.pathname) {
        sessionStorage.CollectedPaths += `, ${window.location.pathname}`;
    }
    // console.log(splitDecision)
    console.log(sessionStorage)
    async function addToFS(id, paths, ip) {
        // var testVar;
        // await fetch(`http://api.ipstack.com/${ip}?access_key=186e1fc2a33c2ea3345e5d57782a4c17`)
        //     .then(res => res.json())
        //     .then((data) => {
        //         testVar = data;
        //         console.log(testVar)
        //     })
        let userIP;
        console.log(userIP)
        await app.firestore().collection('Analytics').doc(ip).set({ paths: paths.split(', '), ip_addr: ip, pages_visited: paths.split(', ').length - 1, access_time: new Date().toLocaleString() })
        console.log(`Creating analytics...`)
        return true;
    }
    window.onbeforeunload = addToFS(sessionStorage.UserProviderID, sessionStorage.CollectedPaths, sessionStorage.UserIP)
    return true;
}