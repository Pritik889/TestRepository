//Import all tabs 
import * as React from 'react';
import { RecruitmentAndHiring } from './components/Recruitment-And-Hiring/RecruitmentAndHiring';
import {RequisitionForm  } from './components/Requisition-Form/RequisitionForm';
import { DescriptionForm } from './components/Description-Form/DescriptionForm';
import { HrUi } from './components/HR-UI/HrUi';
import { Dashboard } from './components/Dashboard/Dashboard';

import {DataEntry } from './components/Data-Entry/DataEntry';



import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



export const App: React.FunctionComponent = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/RecruitmentAndHiring" component={RecruitmentAndHiring} />                
                <Route path="/RequisitionForm" component={RequisitionForm} />
                <Route path="/DescriptionForm" component={DescriptionForm} />
                <Route path="/HrUi" component={HrUi} />
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/DataEntry" component={DataEntry} />
            </Switch>
        </Router>
    );
};



export default App