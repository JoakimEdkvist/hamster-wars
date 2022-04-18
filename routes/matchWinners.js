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

const colRef = collection(db, 'matches')

router.get('/:id', async (req, res) => {
  let winner = req.params.id

  let theWinnerMatches = []
  const snapshot = await getDocs(colRef)

  snapshot.docs.forEach((docSnapshot) => {
    const data = docSnapshot.data()
    if (data.winnerId === winner) {
      theWinnerMatches.push({ ...docSnapshot.data(), id: docSnapshot.id })
    }
  })

  if (theWinnerMatches.length === 0) {
    //denna hamster vann inga matcher
    res.sendStatus(404)
    return
  } else res.status(200).send(theWinnerMatches)
  // if (snapshot.exists()) {
  //   console.log(data)
  //   res.status(200).send(data)
  //   return
  // } else res.sendStatus(404)
})

export default router
