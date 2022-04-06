"use strict";
import { getCookie } from "./LandingPage.jsx";
import { app } from "../../firebase.js";
import { useEffect, useState, memo } from "react";
import { SignalCellularConnectedNoInternet4BarTwoTone } from "@material-ui/icons";

const AdminVerification = memo((): JSX.Element => {
    const [users, setUsers] = useState([]);
    let adminUser = false;
    const [isUserAdmin, setCurrentUserAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    let userInfo: UserInformation = JSON.parse(getCookie('userCredential')).user;

    interface UserInformation {
        email: string
    }

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function getAdmins() {
        const dbRef = await app.firestore().collection('Admin Users');

        await dbRef.onSnapshot((qSnapshot) => {
            const items: Array<Object> = [];

            qSnapshot.forEach((doc) => {
                let data = doc.data()
                let email = data.email;

                if (email === userInfo.email) {
                    console.log(`User found`)
                    setCurrentUserAdmin(true)
                    adminUser = true
                    console.log(adminUser)
                    return null;
                } else {
                    items.push(email);
                }
            })
            setUsers(items);
            setLoading(false)
            console.log(`Going to end`)
        });

    }

    useEffect(() => {
        getAdmins();
        sleep(3000).then(() => {
            if (adminUser) {
                alert(`HEY YOU'RE A USER`)
            } else {
                alert(`not a user`)
                window.history.back()
            }
        })
    }, [])

    loading ? (<h1>Loading document</h1>) : console.log();


    return null;
})

export { AdminVerification }