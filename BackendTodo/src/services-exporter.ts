import admin from 'firebase-admin'

const serviceAccount = require("../firebase-service-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://my-auth-project-8bdef.firebaseio.com"
  });

// firebase collection ref
const todoCollection = admin.firestore().collection('todo');


// gets all the todo's from the firebase database
export async function getTodo() {
    return new Promise(async (resolve, reject) => {
        try {
            await todoCollection.get().then(snapshot => {
                const services = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        title: doc.data().title,
                        completed: doc.data().completed,
                        timestamp: doc.data().timestamp
                    }
                })
                resolve(services);
            })
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

// create a tode item on the firebase database
export async function createTodo(data:String) {
    return new Promise(async (resolve, reject) => {
        try {
          let x = todoCollection.add({
                title: data,
                timestamp: Date.now(),
                completed: false
              })
                resolve(`todo created ${x}`);
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

// deletes firebase item with the id of the collection
export async function deleteTodo(id:any) {
    return new Promise(async (resolve, reject) => {
        try {
            todoCollection.doc(id).delete() 
                resolve("services");
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

// Update firebase database with id, title and completed status
export async function updatTodo(id:any,title:string,completed:boolean) {
return new Promise(async (resolve, reject) => {
        try {
            todoCollection.doc(id).update({
                title:title,
                completed: completed
            })
                resolve("services");
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}



