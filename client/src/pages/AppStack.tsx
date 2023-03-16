import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';

import ARViewer from './ARViewer';
import Chat from './Chat';


export default function AppRouter() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navigate to='/chat' />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='/arviewer' element={<ARViewer />} />
            </Routes>

        </Router>
    )

}
