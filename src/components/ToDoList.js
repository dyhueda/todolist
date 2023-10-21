"use client";

import { tagFilter } from "@/utils/tagFilter";
import { useEffect, useState } from "react";
import ToDoInput from "./ToDoInput";
import AddIcon from "./icons/AddIcon";
import AddToDo from "./AddToDo";
import { useRouter } from "next/navigation";

export default function ToDoList() {
  const [IsLoading, setIsLoading] = useState(true);
  const [ToDoList, setToDoList] = useState();
  const [TagsList, setTagsList] = useState();
  const [TagFilter, setTagFilter] = useState();
  const [FilteredList, setFilteredList] = useState();
  const [AddInput, setAddInput] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    if (ToDoList !== undefined && TagFilter !== undefined)
      setFilteredList(tagFilter(TagFilter, ToDoList));
  }, [TagFilter]);

  function handleSetFilter(tag) {
    if (tag === TagFilter) {
      setFilteredList(undefined);
      setTagFilter(undefined);
    } else {
      setTagFilter(tag);
    }
  }
  return (
    <div className="relative mx-2">
      {IsLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="pb-24">
          <div className="flex flex-row gap-1 overflow-x-auto py-2">
            {TagsList?.map((tag) => (
              <button
                className="px-1 py-0.5 rounded-lg text-base min-w-fit bg-blue-800 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  handleSetFilter(tag.title);
                }}
                key={tag._id}
              >
                {tag.title}
              </button>
            ))}
            <button
              className="p-1 rounded-full text-base bg-blue-800 text-white"
              onClick={(e) => {
                e.preventDefault();
                router.push("/tags");
              }}
              >
              <AddIcon />
            </button>
          </div>
          {TagFilter && (
            <h1 className="p-1 ">Showing all items with {TagFilter} :</h1>
          )}
          <div className="flex flex-col gap-1 text-xl font-medium">
            {FilteredList ? (
              <div>
                {FilteredList?.map((todo) => (
                  <ToDoInput key={todo._id} todo={todo} tags={TagsList} filter={TagFilter} />
                ))}
              </div>
            ) : (
              <div className="">
                {ToDoList?.map((todo) => (
                  <ToDoInput
                    key={todo._id}
                    todo={todo}
                    tags={TagsList}
                    setTodoList={setToDoList}
                    todoList={ToDoList}
                  />
                ))}
              </div>
            )}
            {AddInput && (
              <AddToDo
                tags={TagsList}
                setToDoList={setToDoList}
                ToDoList={ToDoList}
                setAddInput={setAddInput}
              />
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => {
          setAddInput(true);
        }}
        className="absolute bottom-10 right-5 p-2 rounded bg-blue-950"
      >
        <AddIcon />
      </button>
    </div>
  );
}
