
export default function handler(req, res) {
    const id = req.query;
    console.log(id)
    res.json(id)
}
  