import {PermissionsAndroid} from 'react-native';

export const requestPermission = async () => {
	try {
		const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
			title: 'Cool Photo App Camera Permission',
			message: 'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
			buttonNeutral: '나중에',
			buttonNegative: '거부',
			buttonPositive: '허용',
		});
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('Permission Accepted');
		} else {
			console.log('Permission Denied');
		}
	} catch (err) {
		console.warn(err);
	}
};

export const reqeustCameraPermission = async () => {
	try {
		const permissions = [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.CAMERA];

		const granted = await PermissionsAndroid.requestMultiple(permissions);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('Permission Accepted');
		} else {
			console.log('Permission Denied');
		}
	} catch (err) {
		console.warn(err);
	}
};

/*
READ_CALENDAR: 'android.permission.READ_CALENDAR'
WRITE_CALENDAR: 'android.permission.WRITE_CALENDAR'
CAMERA: 'android.permission.CAMERA'
READ_CONTACTS: 'android.permission.READ_CONTACTS'
WRITE_CONTACTS: 'android.permission.WRITE_CONTACTS'
GET_ACCOUNTS: 'android.permission.GET_ACCOUNTS'
ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION'
ACCESS_COARSE_LOCATION: 'android.permission.ACCESS_COARSE_LOCATION'
RECORD_AUDIO: 'android.permission.RECORD_AUDIO'
READ_PHONE_STATE: 'android.permission.READ_PHONE_STATE'
CALL_PHONE: 'android.permission.CALL_PHONE'
READ_CALL_LOG: 'android.permission.READ_CALL_LOG'
WRITE_CALL_LOG: 'android.permission.WRITE_CALL_LOG'
ADD_VOICEMAIL: 'com.android.voicemail.permission.ADD_VOICEMAIL'
USE_SIP: 'android.permission.USE_SIP'
PROCESS_OUTGOING_CALLS: 'android.permission.PROCESS_OUTGOING_CALLS'
BODY_SENSORS: 'android.permission.BODY_SENSORS'
SEND_SMS: 'android.permission.SEND_SMS'
RECEIVE_SMS: 'android.permission.RECEIVE_SMS'
READ_SMS: 'android.permission.READ_SMS'
RECEIVE_WAP_PUSH: 'android.permission.RECEIVE_WAP_PUSH'
RECEIVE_MMS: 'android.permission.RECEIVE_MMS'
READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE'
WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE'
*/
