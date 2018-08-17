import React, { Component } from 'react';
import { connect } from 'react-redux';
import Website from './website';
import { getWebsites } from '../actions';

class WebsiteList extends Component {
	componentDidMount(){
		this.props.getWebsites(this.props.token)
	}

	render(){
		return (
		<div className="website-list">
			<h1>Websites</h1>
			{
					this.props.websites.reverse().map(website => {
					return <Website
							key={website.name}
							name={website.name}
							url={website.url}
							status={website.status}
							/>
				})
			}
		</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		websites: state.userData.websites,
		token: state.userData.token
	}
}

const mapDispatchToProps = {
		getWebsites
}

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteList);
