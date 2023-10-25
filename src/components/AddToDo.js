"use client"

import { useEffect, useState } from "react";
import CheckIcon from "./icons/CheckIcon";
import CancelIcon from "./icons/CancelIcon";

export default function AddToDo(props){
  const propsTitle = props.title || ""
  const [Tags , setTags] = useState(props.tags)
  const [AddTag , setAddTag] = useState([])
  const [Title, setTitle] = useState(propsTitle)
  const ToDoList = props.ToDoList
   
  useEffect(()=>{
    if(props.filteredTag !== undefined){
      handleAddTag(props.filteredTag)
    }
  },[])

    const handleAddNewTodo = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: Title , tags : AddTag }),
    });
    const response = await res.json();
    if(res.ok){
      props.setToDoList([...ToDoList, response.newTodo]);
      props.setAddInput(false);
    }else{
      console.log(response)
    }
  };
    
  const handleAddTag = (tag) =>{
    setAddTag([...AddTag, tag]);
    const newArray = Tags.filter(Tags => Tags._id !== tag._id);
    setTags(newArray)
  }
  const handleDeleteTag = (tag) =>{
    setTags([...Tags, tag]);
    const newArray = AddTag.filter(AddTag => AddTag._id !== tag._id);
    setAddTag(newArray)
  }

  return(
      <form name="ToDo" onSubmit={handleAddNewTodo} className="flex flex-col ">
      <div className="flex gap-1">
        {AddTag?.map((tag) => (
          <div key={tag._id} className="flex gap-1">
            <button
              className="px-1 py-0.5 rounded-lg text-xs text-black bg-red-500"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteTag(tag)}}
            >
              [x] {tag.title}
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center gap-1">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="disabled:bg-transparent bg-slate-900 p-1 w-full"
          value={Title}
        />
        <button type="submit" className="p-1 bg-green-800 rounded">
          <CheckIcon />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.setAddInput(false);
          }}
          className="p-1 bg-red-800 rounded"
        >
          <CancelIcon />
        </button>
      </div>
      <div className="flex p-1 gap-1">
        {Tags?.map((tag) => (
          <div key={tag._id} className="flex gap-1">
            <button
              className="px-1 py-0.5 rounded-lg text-xs text-black bg-green-500"
              onClick={(e)=>{
                e.preventDefault();
                handleAddTag(tag);}}
            >
              [+] {tag.title}
            </button>
          </div>
        ))}
      </div>
    </form>
    )
}
