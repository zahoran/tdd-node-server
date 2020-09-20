import {MongoClient} from "mongodb";

export const setDatabaseData = async (collectionName, data) => {
    const client = await MongoClient.connect('mongodb://localhost:27017/TEST_DB',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    const db = client.db('TEST_DB');
    await db.collection(collectionName).insertMany(data);
    await client.close();
};

export const getDatabaseData = async collectionName => {
    const client = await MongoClient.connect('mongodb://localhost:27017/TEST_DB',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    const db = client.db('TEST_DB');
    const result = await db.collection(collectionName).find().toArray();
    await client.close();
    return result;
};

export const resetDatabase = async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017/TEST_DB',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    const db = client.db('TEST_DB');
    await db.dropDatabase();
    await client.close();
}