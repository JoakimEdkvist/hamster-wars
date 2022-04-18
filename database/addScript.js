// Självständigt skript som hämtar data från databasen
import { collection, addDoc } from 'firebase/firestore'

import { db } from './firebase.js'

let newObject = {
  name: 'Sven',
  age: 5,
  favFood: 'morot',
  loves: 'springa i hamsterhjulet',
  imgName: 'hamster-2.jpg',
  wins: 2,
  defeats: 4,
  games: 6
}

const colRef = collection(db, 'hamsters')

// lägg till object som ett dokument i en collection
// add Doc returnerar Promise<DocumentReference>
const newDocRef = await addDoc(colRef, newObject)

console.log('la till nytt dokument med id = ', newDocRef.id)
