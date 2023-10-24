// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import {MongoClient} from "mongodb"

// if (!process.env.MONGODB_URI) {
//     throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
// }

//TODO: MONGODB_URI를 env로 빼기

const username = encodeURIComponent(process.env.MONGODB_USERNAME as string);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD as string);

const uri = `mongodb+srv://${username}:${password}@mingle.phdoik0.mongodb.net/?retryWrites=true&w=majority`;

const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise