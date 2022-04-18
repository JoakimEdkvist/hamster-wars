import { collection, doc, updateDoc } from 'firebase/firestore'

import { db } from './firebase.js'

// Uppdaterade ändringar 'lejon äter antiloper iställer'
let newObject = { name: 'lejon', eats: 'antilop' }

// Varning! ID kommer ändras varje gång man tar bort och lägger till lejonet med de andra scripten
const oldDocId = 'jadXLEZgfmBRObvUdoVH'

const collectionRef = collection(db, 'animals')
const oldDocRef = doc(collectionRef, oldDocId)

// updateDoc - ändrar i ett befintligt document
// setDoc - 'ändrar eller lägger till ett document om det inte finns
updateDoc(oldDocRef, newObject)
