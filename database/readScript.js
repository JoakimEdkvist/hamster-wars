// Självständigt skript som hämtar data från databasen
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'

import { db } from './firebase.js'

// referens till animals collection
const collectionRef = collection(db, 'animals')

//referns till gorilla dokumentet
const docRef = doc(collectionRef, 'Dhff9QB2Z5ZsUB7eZbkB')

//Get funktionen är asynkron. Den hämtar datan från databasen och lägger inuti snapshot objektet
const snapshot = await getDoc(docRef)

//Hämta datan, detta är ett vanligt JS objekt
const data = snapshot.data()

console.log(data)
