"use client";

import { tagFilter } from "@/utils/tagFilter";
import { useEffect, useState } from "react";

export default function ToDoListComponent() {
  const [IsLoading, setIsLoading] = useState(true);
  const [ToDoList, setToDoList] = useState();
  const [TagsList, setTagsList] = useState();
  const [TagFilter, setTagFilter] = useState();
  const [FilteredList, setFilteredList] = useState();

  useEffect(() => {
    fetch(`/api/todo`, {
      cache: "force-cache",
      next: { revalidate: 10 },
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setToDoList(response.todo))
      .then(() => setIsLoading(false))
      .catch((error) => console.error(error));

    fetch(`/api/tag`, {
      cache: "force-cache",
      next: { revalidate: 10 },
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setTagsList(response.tags))
      .then(() => setIsLoading(false))
      .catch((error) => console.error(error));
  }, []);

  useEffect(()=>{
    if(ToDoList !== undefined && TagFilter !== undefined)
      setFilteredList(tagFilter(TagFilter, ToDoList));
  },[TagFilter])

  function handleSetFilter(tag) {
    if(tag === TagFilter){
      setFilteredList(undefined)
    }else{
      setTagFilter(tag)
    }
  }

  return (
    <div>
      {IsLoading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          {TagsList?.map((tag) => (
            <button
              className="p-2"
              onClick={()=>{handleSetFilter(tag.title)}}
              key={tag._id}
            >
              {tag.title}
            </button>
          ))}
          {FilteredList ? (
            <div>
              {FilteredList?.map((todo) => (
                <div key={todo._id} >{todo.title}</div>
              ))}
            </div>
          ) : (
            <div>
              {ToDoList?.map((todo) => (
                <div key={todo._id}>
                  <h1>{todo.title}</h1>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
