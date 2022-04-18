import { collection, deleteDoc, doc } from 'firebase/firestore'

import { db } from './firebase.js'

// ID som ska tas bort
const idToRemove = 'HoZ19J4bv83VUwsUK5pN'

//collection reference
const colRef = collection(db, 'hamsters')

const docRef = doc(colRef, idToRemove)

await deleteDoc(docRef)
