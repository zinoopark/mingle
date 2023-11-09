// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import {MongoClient} from "mongodb"

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const username = encodeURIComponent(process.env.MONGODB_USERNAME as string);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD as string);

const uri = `mongodb+srv://${username}:${password}@mingle.phdoik0.mongodb.net/?retryWrites=true&w=majority`;

const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export default clientPromise