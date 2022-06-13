const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


export default async function handler(req, res) {
    const { id } = req.query;
    const method = req.method;
    const email = id[0];
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v6ue1.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    const run = async () => {
        await client.connect()
        // const query = 
        const todoAppCollection = client.db('Note').collection('TodoNote');

        if (method === 'GET') {
            const result = await todoAppCollection.find({ email: email }).toArray();
            res.send(result)
        }
        else if (method === 'POST') {
            console.log(email)
            // const resulti = await todoAppCollection.insertOne({note: 423234})
        }
        else {

        }
     
    }
    run().catch(console.dir)
}
