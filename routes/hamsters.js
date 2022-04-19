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

const colRef = collection(db, 'hamsters')

// Routes
// RESTful == har GET, POST, PUT och DELETE

router.get('/cutest', async (req, res) => {
  let allHamsters = []
  let score = []
  const snapshot = await getDocs(colRef)

  snapshot.docs.forEach((docSnapshot) => {
    allHamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
  })

  //skapa en nyckel sum = wins - defeats
  allHamsters.forEach((h) => {
    const sum = h.wins - h.defeats
    return score.push({ ...h, sum: sum })
  })

  //iterate and check which hamster/hamsters have biggest sum
  let biggestVal = Math.max.apply(
    Math,
    score.map((o) => o.sum)
  )
  //pick cutest hamster with biggest sum
  let bestHamsters = score.filter((i) => i.sum === biggestVal)
  // then remove sum key
  bestHamsters.filter((i) => delete i.sum)

  return res.status(200).send(bestHamsters)
})

router.get('/', async (req, res) => {
  let hamsters = []
  const snapshot = await getDocs(colRef)
  snapshot.docs.forEach((docSnapshot) => {
    hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
  })
  res.send(hamsters)
})

router.get('/random', async (req, res) => {
  let hamsters = []
  const snapshot = await getDocs(colRef)
  snapshot.docs.forEach((docSnapshot) => {
    hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
  })
  res.send(hamsters[Math.floor(Math.random() * hamsters.length)])
})

router.get('/:id', async (req, res) => {
  let id = req.params.id
  // Referens till den specifika hamstern
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

  const hamsterObj = {
    name: req.body.name,
    age: req.body.age,
    favFood: req.body.favFood,
    loves: req.body.loves,
    imgName: req.body.imgName,
    wins: req.body.wins,
    defeats: req.body.defeats,
    games: req.body.games
  }

  if (Object.keys(newObject).length === 0) {
    res.sendStatus(400)
    return
  }

  const newDocRef = await addDoc(colRef, hamsterObj)
  res.status(200).send({ hamsterObj, id: newDocRef.id })
})

router.put('/:id', async (req, res) => {
  // Vilket objekt ska ändras?
  let oldDocId = req.params.id
  // ny data som ska in
  let newData = req.body
  //hitta document som ska uppdateras
  const oldDocRef = doc(colRef, oldDocId)
  // om inte id kan hittas så ändras oldDocId variabeln till 'id-does-does-not-exist'

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log('Object missing')
    res.sendStatus(400)
    return
  }

  if (oldDocId === 'id-does-not-exist') {
    res.sendStatus(404)
    return
  }
  await updateDoc(oldDocRef, newData)
  res.sendStatus(200)
})

router.delete('/:id', async (req, res) => {
  // ID som ska tas bort
  let idToRemove = req.params.id
  const docRef = doc(colRef, idToRemove)
  if (idToRemove === 'id-does-not-exist') {
    res.sendStatus(404)
    return
  } else await deleteDoc(docRef)
  res.sendStatus(200)
})

export default router
