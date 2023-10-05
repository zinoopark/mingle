import { MongoClient, ServerApiVersion } from "mongodb";

const username = encodeURIComponent(process.env.MONGODB_USERNAME as string);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD as string);

const uri = `mongodb+srv://${username}:${password}@mingle.phdoik0.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);

class mongo_class {
  static instance: any = {};
  mongo_host = "";
  client: any = null;
  constructor(mongo_host: string) {
    this.mongo_host = mongo_host;
  }

  static getInstance(mongo_host: string = "") {
    if (!this.instance[mongo_host])
      this.instance[mongo_host] = new mongo_class(mongo_host);
    return this.instance[mongo_host];
  }

  async connect() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await this.client.connect();

    if (this.client) console.log("mongo connected : " + this.mongo_host);
    else console.log("mongo connection failed");
  }

  async disconnect() {
    if (!this.client) {
      console.log("no mongo connected");
      return;
    }
    await this.client.close();
    this.client = null;

    if (this.client === null) console.log("mongo disconnected");
    else console.log("mongo disconnection failed");
  }

  async insertMany(dbName: string, collectionName: string, jsonArray: any[]) {
    if (!this.client) this.connect();

    const database = this.client.db(dbName);
    const collection = database.collection(collectionName);

    try {
      const insertManyResult = await collection.insertMany(jsonArray);
      console.log(
        `${insertManyResult.insertedCount} documents successfully inserted.\n`
      );
      return insertManyResult.insertedCount;
    } catch (err) {
      console.error(
        `Something went wrong trying to insert the new documents: ${err}\n`
      );
      throw err;
    }
  }

  async find(dbName: string, collectionName: string, findQuery: any) {
    if (!this.client) this.connect();

    const database = this.client.db(dbName);
    const collection = database.collection(collectionName);

    try {
      const cursor = await collection.find(findQuery);

      console.log(`find success!`);
      console.dir(cursor);

      return cursor;
    } catch (err) {
      console.error(
        `Something went wrong trying to find the documents: ${err}\n`
      );
      throw err;
    }
  }

  async findOne(dbName: string, collectionName: string, findOneQuery: any) {
    if (!this.client) this.connect();

    const database = this.client.db(dbName);
    const collection = database.collection(collectionName);

    try {
      const findOneResult = await collection.findOne(findOneQuery);
      if (findOneResult === null) {
        console.log(
          "Couldn't find any recipes that contain 'potato' as an ingredient.\n"
        );
      } else {
        console.log(
          `Found a recipe with 'potato' as an ingredient:\n${JSON.stringify(
            findOneResult
          )}\n`
        );
      }
      return findOneResult;
    } catch (err) {
      console.error(
        `Something went wrong trying to find one document: ${err}\n`
      );

      throw err;
    }
  }
}
export default function mongo(mongo_host: string = "") {
  return mongo_class.getInstance(mongo_host);
}
