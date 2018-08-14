import {
	TEAM_SHOW,
	TEAM_SEND,
	TEAM_SEND_SUCCESS,
	TEAM_SEND_ERROR,
	TEAM_SEND_CANCEL,
	TEAM_SEND_CANCEL_ERROR,
	TEAM_SEND_CANCEL_SUCCESS,
	TEAM_ACCEPT,
	TEAM_ACCEPT_SUCCESS,
	TEAM_ACCEPT_ERROR,
	TEAM_DECLINE,
	TEAM_DECLINE_SUCCESS,
	TEAM_DECLINE_ERROR,
	TEAM_REMOVE,
	TEAM_REMOVE_SUCCESS,
	TEAM_REMOVE_ERROR,
	INVITE_RECEIVE,
	INVITE_CANCEL,
	INVITE_DECLINE,
	INVITE_ACCEPT,
} from './constants'

import { DATA_REQUEST_SUCCESS } from '../dashboard/constants'

import { deleteById } from '../lib/reducers'

const initialState = {
	userId: '',
	team: [],
	teamSend: [],
	teamReceived: [],
	messages: [],
	errors: [],
	show: '',
	sendRequesting: false,
	sendSuccessful: false,
	cancelRequesting: false,
	cancelSuccessful: false,
	acceptRequesting: false,
	acceptSuccessful: false,
	removeRequesting: false,
	removeSuccessful: false,
	declineRequesing: false,
	declineSuccessful: false,
}

function isEmpty(state, action, func) {
	if(action === null) {
		return [...state] 
	}
	else
		return func(state, action)
}

function concat(state, action) {
	return [...state, action]
}


const reducer = function(state = initialState, action) {
	switch(action.type) {

		case DATA_REQUEST_SUCCESS: 
			return {
				...state,
				...action.data.team
			}

		case TEAM_SHOW:
			return {
				...state,
				show: action.status
			}

		case TEAM_SEND:
			return {
				...state,
				show: '',
				sendRequesting: true,
				sendSuccessful: false,
				messages: [{
					body: `Sending team invite to ${action.userToSend}...`,
					time: Date.now()
				}],
			}

		case TEAM_SEND_SUCCESS:
			return {
				...state,
				sendRequesting: false,
				sendSuccessful: true,
				show: 'send',
				teamSend: isEmpty(state.teamSend, action.user, concat),
				messages: [{
					body: `Team invite to ${action.user} successfully sent.`,
					time: Date.now()
				}],
			}

		case TEAM_SEND_ERROR:
			return {
				...state,
				sendRequesting: false,
				sendSuccessful: false,
				show: 'send',
				errors: [{
					body: `Error sending invite to team member.`,
					error: action.error.toString(),
					time: Date.now()
				}],
			}

		case TEAM_SEND_CANCEL:
			return {
				...state,
				show: '',
				cancelRequesting: true,
				cancelSuccessful: false,
				messages: [{
					body: `Cancelling team invite to ${action.userToCancel}...`,
					time: Date.now()
				}],
			}

		case TEAM_SEND_CANCEL_SUCCESS:
			return {
				...state,
				teamSend: isEmpty(state.teamSend, action.user, deleteById),
				cancelRequesting: false,
				cancelSuccessful: true,
				show: 'cancel',
				messages: [{
					body: `Invite to ${action.user} successfully cancelled.`,
					time: Date.now()
				}],
			}

		case TEAM_SEND_CANCEL_ERROR:
			return {
				...state,
				cancelRequesting: false,
				cancelSuccessful: false,
				show: 'cancel',
				errors: [{
					body: `Error cancelling invite to team member.`,
					error: action.error.toString(),
					time: Date.now()
				}],
			}

		case TEAM_ACCEPT:
			return {
				...state,
				show: '',
				acceptRequesting: true,
				acceptSuccessful: false,
				messages: [{
					body: `Accepting invite from ${action.userToAccept}...`,
					time: Date.now()
				}],
			}

		case TEAM_ACCEPT_SUCCESS:
			return {
				...state,
				team: isEmpty(state.team, action.user, concat),
				teamSend: deleteById(state.teamSend, action.user),
				teamReceived: deleteById(state.teamReceived, action.user),
				acceptRequesting: false,
				acceptSuccessful: true,
				show: 'accept',
				messages: [{
					body: `Successfully accepted invite from ${action.user}.`,
					time: Date.now()
				}],
			}

		case TEAM_ACCEPT_ERROR:
			return {
				...state,
				acceptRequesting: false,
				acceptSuccessful: false,
				show: 'accept',
				errors: [{
					body: `Error accepting invite from team member.`,
					error: action.error.toString(),
					time: Date.now()
				}],
			}

		case TEAM_DECLINE:
			return {
				...state,
				show: '',
				declineRequesing: true,
				declineSuccessful: false,
				messages: [{
					body: `Declining invite from ${action.userToDecline}...`,
					time: Date.now()
				}],
			}

		case TEAM_DECLINE_SUCCESS:
			return {
				...state,
				teamReceived: isEmpty(state.teamReceived, action.user, deleteById),
				declineRequesing: false,
				declineSuccessful: true,
				show: 'decline',
				messages: [{
					body: `Successfully declined invite from ${action.user}`,
					time: Date.now()
				}],
			}

		case TEAM_DECLINE_ERROR:
			return {
				...state,
				declineRequesing: false,
				declineSuccessful: false,
				show: 'decline',
				errors: [{
					body: `Error declining invite from team member.`,
					error: action.error.toString(),
					time: Date.now()
				}],
			}

		case TEAM_REMOVE:
			return {
				...state,
				show: '',
				removeRequesting: true,
				removeSuccessful: false,
				messages: [{
					body: `Removing ${action.userToRemove} from team...`,
					time: Date.now()
				}],
			}

		case TEAM_REMOVE_SUCCESS:
			return {
				...state,
				removeRequesting: false,
				removeSuccessful: true,
				show: 'remove',
				team: deleteById(state.team, action.user),
				messages: [{
					body: `Successfully removed ${action.user} from your team.`,
					time: Date.now()
				}],
			}

		case TEAM_REMOVE_ERROR:
			return {
				...state,
				removeRequesting: false,
				removeSuccessful: false,
				show: 'remove',
				errors: [{
					body: `Error removing team member.`,
					error: action.error.toString(),
					time: Date.now()
				}],
			}

		case INVITE_RECEIVE:
			return {
				...state,
				teamReceived: [...state.teamReceived, action.user ]
			}

		case INVITE_CANCEL:
			return {
				...state,
				teamReceived: deleteById(state.teamSend, action.user)
			}

		case INVITE_ACCEPT:
			return {
				...state,
				team: [...state.team, action.user],
				teamSend: deleteById(state.teamSend, action.user)
			}

		case INVITE_DECLINE:
			return {
				...state,
				teamSend: deleteById(state.teamSend, action.user)
			}

		default:
			return state
	}
}

export default reducer