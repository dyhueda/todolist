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
  if(req.method === "DELETE"){
    try{
      const {id} = req.body
      await connectMongoDb();
      await Tags.findByIdAndDelete(id)
      res.status(200).send({message: "Deleted"})
    }catch (error) {
      console.error(error);
      res.status(500).send({ message: "Api error" });
    }
  }
  if(req.method === "PUT"){
    try{
      await connectMongoDb();
      const {id , title} = req.body
      const tag = await Tags.findByIdAndUpdate(id, {title : title})
      res.status(200).send({tag})
    }catch (error) {
      console.error(error);
      res.status(500).send({ message: "Api error" });
    }
  }
}
