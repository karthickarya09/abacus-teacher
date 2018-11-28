import config from './config'
import firebase from 'firebase'

firebase.initializeApp(config)
let db = firebase.firestore()

export default async function initializeData(){
    let collection = db.collection('teachers')
    let a={};
    await collection.get().then(snapshot=>{
        return snapshot.forEach(doc=>{
            a = doc.data()
        })
    })
    return a
}

