import React from 'react';
import WebsiteForm from './form';
import WebsiteList from './website-list';

const Dashboard = () => (
	<div className="dashboard">
		<WebsiteForm/>
		<WebsiteList/>
	</div>
	)

export default Dashboard;