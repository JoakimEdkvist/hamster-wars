import { collection, getDocs, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../database/firebase.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const newData = require('../files/data.json')
const colRef = collection(db, 'hamsters')

async function deleteAndReplace() {
  const snapshot = await getDocs(colRef)
  snapshot.docs.forEach(async (snapshot) => {
    const docRef = doc(colRef, snapshot.id)
    await deleteDoc(docRef)
  })
  newData.forEach(async (data) => {
    await addDoc(colRef, data)
  })
}
deleteAndReplace()
