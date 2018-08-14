import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Container, Card, CardHeader, CardBody, ListGroup, Row } from 'mdbreact'

import TeamCard from './teamcard'
import Header from '../components/header';

class TeamCards extends Component {

	componentDidMount() {

	}

	render() {

		let ownerIds = Object.keys(this.props.teamCards)

		return (
			<Container>
			<Header title='Team Cards' description='Cards shared by team members'/>
			<hr className='my-3' />
			<Row>
			{ ownerIds.map(ownerId => (
				<Col className='col-4' key={ownerId}>
					<Card>
						<CardHeader className='text-center h5-responsive' border="primary" color="primary-color">
						{ownerId}
						</CardHeader>
						<CardBody>
							<ListGroup>
							{ this.props.teamCards[ownerId].map(cardId => 
								<TeamCard key={cardId} _id={cardId}/>
								)}
							</ListGroup>
						</CardBody>
					</Card>
				</Col>
			))}
			</Row>
			</Container>
			)
	}
}

function notOwn(cards, username) {
	let obj = {};

	for(let id in cards) {
		let ownerId = cards[id].userId
		if(ownerId !== username) {
			if(obj[ownerId])
				obj[ownerId] = [...obj[ownerId], cards[id]._id]
			else
				obj[ownerId] = [cards[id]._id]
		}
	}
	return obj
}

const mapStateToProps = (state) => ({
	teamCards: notOwn(state.cards.byId, state.user.username)
})

export default connect(mapStateToProps)(TeamCards)