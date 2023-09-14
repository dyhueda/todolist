import connectMongoDb from "@/libs/mongodb";
import mongoose from "mongoose";
import ToDo from "@/models/todo";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title } = req.body;
      await connectMongoDb();
      const todo = await ToDo.create({ title });
      res.status(201).send({ todo });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Api error" });
    }
  }
  if (req.method === "GET") {
    try {
      await connectMongoDb();
      const todo = await ToDo.find().populate('tags');
      res.status(200).send({ todo });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Api error" });
    }
  }
  if(req.method === "PUT") {
    try{
      await connectMongoDb();
      const {todo, tag} = req.body
      const updated = await ToDo.findByIdAndUpdate(todo,{$push : {tags : tag}})
      res.status(200).send({updated})
    }catch(error){
      console.error(error)
      res.status(500).send({message: "Api error"})
    }
  }
}
