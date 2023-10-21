import connectMongoDb from "@/libs/mongodb";
import mongoose from "mongoose";
import ToDo from "@/models/todo";
import Tags from "@/models/tag";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, tags } = req.body;
      await connectMongoDb();
      const todo = await ToDo.create({ title });
      let newTodo
      for(let i=0 ; i<tags.length; i++) {
        newTodo = await ToDo.findByIdAndUpdate(todo._id,{$push : {tags : tags[i]._id}},{new : true}).populate('tags');
      }
      res.status(201).send({ newTodo });
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
      const {title, id, tags, checked} = req.body
      if(checked != undefined){
        await connectMongoDb();
        await ToDo.findByIdAndUpdate(id, {checked : checked})
        res.status(200).send({message : "Updated"})
      }else{
        await connectMongoDb();
        await ToDo.findByIdAndUpdate(id,{title : title})
        await ToDo.findByIdAndUpdate(id, {$set: {tags : []}})
        let newTodo
        for(let i=0 ; i<tags.length; i++) {
          newTodo = await ToDo.findByIdAndUpdate(id,{$push : {tags : tags[i]._id}},{new : true}).populate('tags');
        }
        res.status(201).send({ newTodo });
      }
      }catch(error){
      console.error(error)
      res.status(500).send({message: "Api error"})
    }
  }
  if(req.method === 'DELETE'){
    try{
    await connectMongoDb();
    const {id} = req.body
    await ToDo.findByIdAndDelete(id)
    res.status(200).send({message: "Deleted"})
    }catch(error){
      console.error(error)
      res.status(500).send({message: "Api error"})
    }
  }
}
