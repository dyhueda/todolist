"use client";

import { useState } from "react";
import CheckIcon from "./icons/CheckIcon";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";
import UncheckedBoxIcon from "./icons/UncheckedBoxIcon";
import CheckedBoxIcon from "./icons/CheckedBoxIcon";

export default function ToDoInput(props) {
  const todo = props.todo || [];
  const AllTags = props.tags || [];
  const newArray = AllTags.filter((tag) => {
    return !todo.tags.some((todoTag) => todoTag._id === tag._id);
  });
  const filter = props.filter
  const [Title, setTitle] = useState(todo.title);
  const [Disabled, setDisabled] = useState(true);
  const [Tags, setTags] = useState(props.todo.tags);
  const [AddTags, setAddTags] = useState(newArray);
  const [Checked, setChecked] = useState(props.todo.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/todo", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ tags: Tags, title: Title, id: todo._id }),
    });
    const response = await res.json();
    if (res.ok) {
      console.log("ok");
    } else {
      console.log(response);
    }
    setDisabled(true);
  };

  const handleAddTag = (e, tag) => {
    e.preventDefault();
    setTags([...Tags, tag]);
    const newArray = AddTags.filter((AddTag) => AddTag._id !== tag._id);
    setAddTags(newArray);
  };
  const handleDeleteTag = (e, tag) => {
    e.preventDefault();
    setAddTags([...AddTags, tag]);
    const newArray = Tags.filter((Tags) => Tags._id !== tag._id);
    setTags(newArray);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/todo", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: todo._id }),
    });
    const response = await res.json();
    if (res.ok) {
      const newArray = props.todoList.filter((ToDo) => ToDo._id !== todo._id);
      props.setTodoList(newArray);
      console.log("ok");
    } else alert(response.message);
  };

  const handleChecked = async () => {
    setChecked(!Checked);
    const res = await fetch("/api/todo", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ checked: !Checked, id: todo._id }),
    });
    const response = await res.json();
    if (res.ok) {
      console.log(response.message);
      setChecked(!Checked);
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="flex flex-col py-1">
      {Disabled ? (
        (!filter && (

        <div className="flex gap-1">
          {Tags.map((tag) => (
            <div
              key={tag._id}
              className="px-1 py-0.5 rounded-lg text-xs text-black bg-blue-500"
            >
              {tag.title}
            </div>
          ))}
        </div>
        ))
      ) : (
        <div className="flex gap-1">
          {Tags.map((tag) => (
            <button
              onClick={(e) => {
                handleDeleteTag(e, tag);
              }}
              key={tag._id}
              className="px-1 py-0.5 rounded-lg text-xs text-black bg-red-500"
            >
              [x] {tag.title}
            </button>
          ))}
        </div>
      )}

      <div
        className="flex flex-row items-center"
        key={todo._id}
      >
        {Checked ? (
          <button onClick={handleChecked}>
            <UncheckedBoxIcon />
          </button>
        ) : (
          <button onClick={handleChecked}>
            <CheckedBoxIcon />
          </button>
        )}
        <form name="ToDo" onSubmit={handleSubmit} className="relative ">
          <input
            className={`disabled:bg-transparent bg-slate-900 w-full ${
              Checked ? "" : "line-through"
            }`}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            value={Title}
            disabled={Disabled}
          ></input>
          {!Disabled && (
            <>
              <button type="submit" className="absolute right-0">
                <CheckIcon />
              </button>
              <div className="flex gap-1">
                {AddTags.map((tag) => (
                  <button
                    onClick={(e) => {
                      handleAddTag(e, tag);
                    }}
                    key={tag._id}
                    className="px-1 py-0.5 rounded-lg text-xs text-black bg-blue-500"
                  >
                    [+] {tag.title}
                  </button>
                ))}
              </div>
            </>
          )}
        </form>
        <div className="flex gap-1">
          {Disabled && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDisabled(!Disabled);
                }}
              >
                <EditIcon />
              </button>
              <button onClick={handleDelete}>
                <DeleteIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
