// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

//require funktionen går egentligen inte att använda för att vi använt import tidigare och satt type module i package.json filen
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
// const firebaseConfig = require('./firebaseConfig.json')

let privateKey
if (process.env.PRIVATE_KEY) {
  privateKey = JSON.parse(process.env.PRIVATE_KEY)
} else {
  privateKey = require('./firebaseConfig.json')
}

//OBS! firebaseConfig.json ska INTE finnas med i ditt git-repo.
//lägg till filnamnet i din .gitignore fil. Se "exampleConfig.json" för exempel

// Initialize Firebase
const app = initializeApp(privateKey)
const db = getFirestore(app)

export { db }
