const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
export default async function handler(req, res) {
    const id = req.query;
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v6ue1.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const run = async () => {
        await client.connect()
        const email = req.query.email;
        const todoAppCollection = client.db('Note').collection('TodoNote')
        const result = await todoAppCollection.find({ email: email }).toArray()

        res.send(result)
    }
    run().catch(console.dir)
}
