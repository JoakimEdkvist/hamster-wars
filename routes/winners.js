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

router.get('/', async (req, res) => {
  let allHamsters = []
  const snapshot = await getDocs(colRef)

  snapshot.docs.forEach((docSnapshot) => {
    allHamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
  })

  //sortera dem efter flest wins
  let winningHamsters = allHamsters
    .sort(function (a, b) {
      return b.wins - a.wins
    })
    .slice(0, 5)
  // ta ut de 5 första
  try {
    res.send(winningHamsters)
  } catch (error) {
    console.log(error)
  }
})

export default router
