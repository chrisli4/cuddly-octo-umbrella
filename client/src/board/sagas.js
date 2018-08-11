import {
	boardCreateSuccess,
	boardCreateError,
	boardUpdateSuccess,
	boardUpdateError,
	boardDeleteSuccess,
	boardDeleteError,
} from './actions'

import { call, put, takeLatest, all } from 'redux-saga/effects'
import { fetchAPI, options } from '../lib/api' 
import { BOARD_CREATE, BOARD_UPDATE_SUBMIT, BOARD_DELETE } from './constants'

function* boardCreateFlow(action) {
	try {
		const { user, board } = action
		const URL = `/users/${user.username}/boards/`
		const created = yield call(fetchAPI, URL, options('POST', { username: user.username, token: user.token }, { board: board }))
		yield put(boardCreateSuccess(created))
	} catch(e) {
		yield put(boardCreateError(e))
	}
}

function* boardUpdateFlow(action) {
	try {
		const { user, board } = action
		const URL = `/users/${user.username}/boards/${board._id}`
		const updated = yield call(fetchAPI, URL, options('PUT', { username: user.username, token: user.token }, { board: board }))
		yield put(boardUpdateSuccess(updated))
	} catch(e) {
		yield put(boardUpdateError(e))
	}
}

function* boardDeleteFlow(action) {
	try {
		const { user, board } = action
		const URL = `/users/${user.username}/boards/${board._id}`
		const deleted = yield call(fetchAPI, URL, options('DELETE', { username: user.username, token: user.token }, { board: board }))
		yield put(boardDeleteSuccess(deleted))
	} catch(e) {
		yield put(boardDeleteError(e))
	}
}

function* boardWatcher() {
	yield all([
		takeLatest(BOARD_CREATE, boardCreateFlow),
		takeLatest(BOARD_UPDATE_SUBMIT, boardUpdateFlow),
		takeLatest(BOARD_DELETE, boardDeleteFlow),
	])
}

export default boardWatcher