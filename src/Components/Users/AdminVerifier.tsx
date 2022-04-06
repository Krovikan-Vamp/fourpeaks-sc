"use strict";
import { getCookie } from "./LandingPage.jsx";
import { app } from "../../firebase.js";
import { useEffect, useState, memo } from "react";


function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


const AdminVerification = memo((): JSX.Element => {
    const [users, setUsers] = useState([]);
    let adminUser: Boolean = false;
    const [loading, setLoading] = useState(true)

    let userInfo: UserInformation = JSON.parse(getCookie('userCredential')).user;

    interface UserInformation {
        email: string
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

    useEffect((): void => {
        getAdmins();
        sleep(1000).then(() => {
            if (adminUser) {
                alert(`HEY YOU'RE A USER`)
            } else {
                // alert(`not a user`)
                window.history.back()
            }
        })
    }, [])

    loading ? (<h1>Loading document</h1>) : console.log();


    return null;
})

export { AdminVerification, sleep }