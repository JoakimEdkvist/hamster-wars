// Självständigt skript som hämtar data från databasen
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'

import { db } from './firebase.js'

//Hämtar alla djur
const colRef = collection(db, 'hamsters')
let hamsters = []

// Man kan antingen använda async/await eller .then
// getDocs(colRef).then((snapshot) => {
//   snapshot.docs.forEach((docSnapshot) => {
//     animals.push({ ...docSnapshot.data(), id: docSnapshot.id })
//   })
//   console.log(animals)
// })

const snapshot = await getDocs(colRef)
snapshot.docs.forEach((docSnapshot) => {
  hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
})
console.log(hamsters)

module.exports = router
