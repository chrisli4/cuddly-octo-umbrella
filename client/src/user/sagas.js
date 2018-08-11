import { userUpdateSuccess, userUpdateError } from './actions'

import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchAPI, options } from '../lib/api' 
import { USER_UPDATE_SUBMIT } from './constants'

function* userUpdateFlow(action) {
	try {
		const { user } = action
		const URL = `/users/${user.username}/`
		const updated = yield call(fetchAPI, URL, options('PUT', user, {}))
		yield put(userUpdateSuccess(updated))
	} catch(e) {
		yield put(userUpdateError(e))
	}
}

function* userWatcher() {
	yield takeLatest(USER_UPDATE_SUBMIT, userUpdateFlow)
}

export default userWatcher