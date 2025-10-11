import {Routes, Route} from 'react-router'


function Dashboard() {

    return <section className="chat-app">
        <Routes>
            <Route index element={<></>} />
            <Route path='/rooms' element={<></>} />
            <Route path='/create-room' element={<></>} />

        </Routes>
        </section>
}

export default Dashboard;