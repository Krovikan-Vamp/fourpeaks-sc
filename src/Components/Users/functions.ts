import { app } from '../../firebase.js';

async function isAdminUser(email: string) {
    const db = app.firestore()
    let admin: boolean;
    await db.collection('Users').doc(email).get()
        .then((res) => {
            admin = res.data().isAdmin
        })
    return admin
}


export { isAdminUser }