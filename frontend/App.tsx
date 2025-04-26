// site/frontend/App.tsx

import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
//import { BASE_API_URL } from './config';

const App: React.FC = () => {
    //const [activeTab, setActiveTab] = useState<string>('dashboard');

    return (
        <div className="min-h-screen background-primary text-text">
            <HomePage />
        </div>
        //            <PrivacyAgreement isFixed={false}/>
    );
};

export default App;
