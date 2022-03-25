import { app } from "../../firebase.js"
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid'

const CollectionsComponent = () => {
    const [analytics, setAnalytics] = useState();
    const [suggestions, setSuggestions] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getPts()
        // if (!loading) console.log(analytics)
    }, []);


    async function getPts() {
        let collection_ref = await app.firestore().collection('Auto Suggestions').orderBy('drType', 'asc')
        collection_ref.onSnapshot((qs) => {
            const items = [];
            qs.forEach((doc) => {
                items.push(doc.data())
            });
            setSuggestions(items);
            setLoading(false);
        })

        let analytics_ref = await app.firestore().collection('Analytics')
        analytics_ref.onSnapshot((qs) => {
            const items = [];
            qs.forEach((doc) => {
                items.push(doc.data())
            });
            setAnalytics(items);
            setLoading(false);
        })
        return true;
    }

    const anal_columns = [
        // { field: 'id', headerName: 'id', width: 300 },
        { field: 'ip_addr', headerName: 'IP Address', width: 150 },
        { field: 'pages_visited', headerName: 'Amount', width: 70 },
        { field: 'access_time', headerName: 'Timestamp', width: 275 },
        { field: 'paths', headerName: 'Pages Visited', width: '100vw' }
    ]
    if (loading) {
        return (
            <>Loading...</>
        )
    }
    return (
        <div id='collection-container' style={{ height: '100vh', width: '300vw' }}>
            <DataGrid
                // id='analytics'
                rows={analytics}
                // rowsPerPageOptions={[5]}
                columns={anal_columns}
                autoPageSize
            />
        </div>
    )
}

export default CollectionsComponent