import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import ReduxSagaFirebase from 'redux-saga-firebase'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

class Firebase {
  constructor() {
    const firebaseApp = firebase.initializeApp(config)
    this.rsf = new ReduxSagaFirebase(firebaseApp)
    this.auth = this.rsf.auth
    this.db = this.rsf.firestore
  }

  // Auth API
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password => this.auth.updatePassword(password)

  doGetCurrentUser = () => firebase.auth().currentUser

  doOnAuthStateChange = () => firebase.auth().onAuthStateChanged

  doDeleteUser = () => firebase.auth().currentUser.delete()

  doReauthenticateWithCredential = (credential, next, onError) => {
    const user = this.auth.currentUser
    user
      .reauthenticateWithCredential(credential)
      .then(next())
      .catch(err => onError(err))
  }

  onAuthUserListener = (next, fallback) => {
    this.doOnAuthStateChange(authUser => {
      if (authUser) {
        next(authUser)
      } else {
        fallback()
      }
    })
  }

  // Firestore API
  addDocument = (collectionName, document) =>
    this.db.addDocument(collectionName, document)

  removeDocument = docRef => this.db.deleteDocument(docRef)

  getCollection = collectionName => this.db.getCollection(collectionName)

  getChannel = ref => this.db.channel(ref)

  syncCollection = (ref, options) => this.db.syncCollection(ref, options)

  syncCollectionRef = () => this.db.syncCollection

  getCollectionRef = () => this.db.getCollection

  getFirestoreCollectionOrder = (collectionName, prop) =>
    firebase.firestore().collection(collectionName).orderBy(prop)

  setDocument = (docRef, data, options) =>
    this.db.setDocument(docRef, data, options)

  updateDocument = (docRef, prop, value) =>
    this.db.updateDocument(docRef, prop, value)

  // Utils API
  transformFirebaseUserToStateUser = firebaseUser => {
    const userProperties = [
      'displayName',
      'email',
      'emailVerified',
      'isAnonymous',
      'photoURL',
      'providerId',
      'refreshToken',
      'uid',
      'isAdmin'
    ]

    return userProperties.reduce((obj, prop) => {
      return prop in firebaseUser ? { ...obj, [prop]: firebaseUser[prop] } : obj
    }, Object.create(null))
  }

  transformStateUserToSafeUser = firebaseUser => {
    const userProperties = ['displayName', 'email', 'photoURL', 'uid']

    return userProperties.reduce((obj, prop) => {
      return prop in firebaseUser ? { ...obj, [prop]: firebaseUser[prop] } : obj
    }, Object.create(null))
  }
}

export default new Firebase()
