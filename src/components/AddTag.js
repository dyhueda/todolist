"use client";
import { useState } from "react";
import CancelIcon from "./icons/CancelIcon";
import CheckIcon from "./icons/CheckIcon";

export default function AddTag(props) {
  const [Title, setTitle] = useState("");

  const handleNewTag = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/tag", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: Title }),
    });
    const response = await res.json();
    if (res.ok) {
      console.log(response.tag)
      props.setTagsList([... props.TagsList, response.tag])
      setTitle("")
      props.SetEnable(false)
    } else {
      console.log(response);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center p-1">
        <h2>New Tag</h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.SetEnable(false);
          }}
          className="bg-red-800 p-1"
        >
          <CancelIcon />
        </button>
      </div>
      <div className="flex flex-row justify-between items-center p-1">
        <input
          className="p-1 text-black"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={Title}
        />
        <button onClick={handleNewTag} className="bg-green-800 p-1">
          <CheckIcon></CheckIcon>
        </button>
      </div>
    </div>
  );
}
