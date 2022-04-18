import express from 'express'
const router = express.Router()

import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from '../database/firebase.js'
// Data hämtas från Firestore

const colRef = collection(db, 'matches')

router.get('/', async (req, res) => {
  let matches = []
  const snapshot = await getDocs(colRef)
  snapshot.docs.forEach((docSnapshot) => {
    matches.push({ ...docSnapshot.data(), id: docSnapshot.id })
  })
  res.send(matches)
})

router.get('/:id', async (req, res) => {
  let id = req.params.id
  // Referens till den specifika matchen
  const docRef = doc(colRef, id)
  // Get-funktionen är asynkron. Den hämtar datan från databasen och lägger inuti snapshot-objektet
  const snapshot = await getDoc(docRef)

  // Hämta datan - data är ett vanligt JavaScript-objekt
  const data = snapshot.data()

  if (snapshot.exists()) {
    console.log(data)
    res.status(200).send(data)
    return
  } else res.sendStatus(404)
})

router.post('/', async (req, res) => {
  let newObject = req.body

  const newDocRef = await addDoc(colRef, newObject)
  let matchId = { id: newDocRef.id }
  // console.log('la till nytt dokument med id = ', newDocRef.id)
  res.status(200).send(matchId)
})

router.delete('/:id', async (req, res) => {
  // ID som ska tas bort
  let idToRemove = req.params.id

  const docRef = doc(colRef, idToRemove)

  //check if id exist
  const snapshot = await getDoc(docRef)
  const data = snapshot.data()

  if (snapshot.exists()) {
    await deleteDoc(docRef)
    console.log('detta id togs bort')
    res.status(200).send(data)
    return
  } else console.log('detta id fanns inte')
  res.sendStatus(404)
})

export default router
