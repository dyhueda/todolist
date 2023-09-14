import connectMongoDb from "@/libs/mongodb";
import Tags from "@/models/tag";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDb();
      const tags = await Tags.find();
      res.status(200).send({ tags });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Api error" });
    }
  }
  if (req.method === "POST") {
    try {
      await connectMongoDb();
      const { title } = req.body;
      const tag = await Tags.create({ title });
      res.status(200).send({ tag });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Api error" });
    }
  }
}
