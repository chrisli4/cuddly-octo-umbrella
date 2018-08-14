import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'mdbreact'
import { teamShow, teamSend, teamSendCancel, teamAccept, teamDecline, teamRemove } from './actions'
import { ListGroup, ListGroupItem, Row, Col } from 'mdbreact'

import Header from '../components/header'
import CustomListGroup from '../components/group'
import CustomCard from '../components/card'
import Span from '../components/span'
import Messages from '../notifications/message'
import Errors from '../notifications/error'


class Team extends Component {

	constructor() {
		super();
		this.state = {
			member: '',
		}
	}

	componentDidMount() {
		this.props.teamShow('')
	}

	onChange = (e) =>
	this.setState({
		[e.target.name]: e.target.value
	})

	onTeamSend = (e) => {
		this.props.teamSend(this.props.user, this.state.member)
		this.setState({
			member: '',
		})
	}

	onClose = () =>
	this.props.teamShow('')

	onTeamSendCancel = (member) =>
	this.props.teamSendCancel(this.props.user, member)

	onTeamAccept = (member) =>
	this.props.teamAccept(this.props.user, member)

	onTeamDecline = (member) =>
	this.props.teamDecline(this.props.user, member)

	onTeamRemove = (member) =>
	this.props.teamRemove(this.props.user, member)


	render() {

		return (
			<Container>
				<Header title='Team Management' description='Add and remove users from your team'/>
				<hr />
				<Row className='justify-content-center' style={{height: '70px'}}>
					{ !this.props.team.sendRequesting && this.props.team.sendSuccessful && this.props.team.show === 'send' && ( <Messages messages={this.props.team.messages} onClick={this.onClose} />)}
					{ !this.props.team.sendRequesting && !this.props.team.sendSuccessful && this.props.team.show === 'send' && ( <Errors errors={this.props.team.errors} onClick={this.onClose} />)}
					{ !this.props.team.removeRequesting && this.props.team.removeSuccessful && this.props.team.show === 'remove' && ( <Messages messages={this.props.team.messages} onClick={this.onClose} />)}
					{ !this.props.team.removeRequesting && !this.props.team.removeSuccessful && this.props.team.show === 'remove' && ( <Errors errors={this.props.team.errors} onClick={this.onClose} />)}
					{ !this.props.team.cancelRequesting && this.props.team.cancelSuccessful && this.props.team.show === 'cancel' && ( <Messages messages={this.props.team.messages} onClick={this.onClose} />)}
					{ !this.props.team.cancelRequesting && !this.props.team.cancelSuccessful && this.props.team.show === 'cancel' && ( <Errors errors={this.props.team.errors} onClick={this.onClose} />)}
					{ !this.props.team.declineRequesting && this.props.team.declineSuccessful && this.props.team.show === 'decline' && ( <Messages messages={this.props.team.messages} onClick={this.onClose} />)}
					{ !this.props.team.declineRequesting && !this.props.team.declineSuccessful && this.props.team.show === 'decline' && ( <Errors errors={this.props.team.errors} onClick={this.onClose} />)}
					{ !this.props.team.acceptRequesting && this.props.team.acceptSuccessful && this.props.team.show === 'accept' && ( <Messages messages={this.props.team.messages} onClick={this.onClose} />)}
					{ !this.props.team.acceptRequesting && !this.props.team.acceptSuccessful && this.props.team.show === 'accept' && ( <Errors errors={this.props.team.errors} onClick={this.onClose} />)}
				</Row>
				<Row>
					<Col className='col-6'>
						<CustomCard text='Add Member' color="primary-color" tag='h4' className="m-3 w-100"
							compA={
								<div>
									<label htmlFor="member" className="grey-text">Username:</label>
									<input type="text" name='member' className="form-control" onChange={this.onChange} value={this.state.member}/>
								</div>
							}
							compB={
								<Row className='justify-content-center'>
									<button onClick={this.onTeamSend} className='btn btn-default mx-auto'>Submit</button>
								</Row>
							} 
						/>
					</Col>
					<Col className='col-6'>
						<CustomCard text='Team Members' color="primary-color" tag='h4' className="m-3 w-100"
							compA={
								<CustomListGroup
									array={this.props.team.team}
									onClick={this.onTeamRemove}
							/>
							} 
						/>
					</Col>
					<Col className='col-6'>
						<CustomCard text='Invites Sent' color="primary-color" tag='h4' className="m-3 w-100"
							compA={
								<CustomListGroup
									array={this.props.team.teamSend}
									onClick={this.onTeamSendCancel}
								/>} 
						/>
					</Col>
					<Col className='col-6'>
						<CustomCard text='Pending Requests' color="primary-color" tag='h4' className="m-3 w-100"
							compA={
								<ListGroup>
									{ this.props.team.teamReceived.map(received => (
										<ListGroupItem className='align-items-end' key={received}>
											<span>{ received }</span>
											<Span text='Decline' className='p-1 small border border-light float-right rounded-right h-100' onClick={() => this.onTeamDecline(received)}>{ received }</Span>
											<Span text='Accept' className='p-1 small border border-light float-right rounded-left h-100' onClick={() => this.onTeamAccept(received)}>{ received }</Span>
										</ListGroupItem>
									))}
								</ListGroup>} 
						/>
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
	team: state.team
})

const mapDispatchToProps = {
	teamShow,
	teamSend,
	teamSendCancel,
	teamAccept,
	teamDecline,
	teamRemove,
}

export default connect(mapStateToProps, mapDispatchToProps)(Team)