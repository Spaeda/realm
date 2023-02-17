const { MongoClient, ObjectId, Decimal128} = require("mongodb");
const { randomUUID } = require('crypto');
const faker = require('faker/locale/ru');

// Connection URI
const uri = "mongodb+srv://api:aiHtoWNLIBJe6DKc@rainbowcluster.6s2jb.mongodb.net/rainbow?retryWrites=true&w=majority";

function fakeDecimal() {
    return Decimal128.fromString(faker.datatype.number(100).toString());
}

function fakeScene() {
    return {
        _id : new ObjectId(),
        _partition : 'PerfTest',
        anchor : faker.datatype.uuid(),
        geo_location : [fakeDecimal(), fakeDecimal()],
        name : faker.name.firstName(),
        type : 'Empty',
        created : Date.now(),
        assets : [
            {
                id : faker.datatype.uuid(),
                type : '.boo',
                name : faker.name.firstName() + '.boo',
                provider : 'test',
                online : false,
                scale : [fakeDecimal(), fakeDecimal(), fakeDecimal()]
            }
        ]
    }
}

const count = 2;

// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
    try {
        // Connect the client to the server
        await client.connect();

        console.log('connected to ' + uri);

        // Establish and verify connection
        const Scenes = client.db("rainbow").collection("Scene");

        const inserts = [];
        inserts.length = count;

        for (let i = 0; i < count; i++) {
            inserts[i] = fakeScene();
        }

        console.log('created ' + count + ' scenes, inserting...');

        await Scenes.insertMany(inserts);

        console.log('done');

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);