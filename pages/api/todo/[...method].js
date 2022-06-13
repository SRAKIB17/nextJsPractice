const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


export default async function handler(req, res) {
    const { method: getAll } = req.query;
    const method = req.method;
    const email = getAll[0];
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v6ue1.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


    await client.connect();
    // const query = 
    const todoAppCollection = client.db('Note').collection('TodoNote');
    switch (method) {
        case 'GET':
            const result = await todoAppCollection.find({ email: email }).toArray();
            res.send(result)
            break;

        case 'POST':
            const body = req.body;
            const resultPost = await todoAppCollection.insertOne(body)
            res.send(resultPost)
            break
        case "PUT":
            const id = getAll[1]
            console.log(id)
            const doc = {
                $set: req.body
            }
            const option = { upsert: true }
            const query = { _id: ObjectId(id) }

            const resultUpdate = await todoAppCollection.updateOne(query, doc, option);
            res.send(resultUpdate)
            break

        case 'DELETE':
            const DeleteId = getAll[1]
            const queryDelete = { _id: ObjectId(DeleteId) }
            const resultDelete = await todoAppCollection.deleteOne(queryDelete);

            res.send(resultDelete)

            break;
        default:
            break;
    }

}
