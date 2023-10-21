"use Client";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { useState } from "react";
import CheckIcon from "./icons/CheckIcon";
export default function TagInput(props) {
  const tag = props.tag;
  const [Title, setTitle] = useState(tag.title);
  const [InputDisabled, setInputDisabled] = useState(true);

  const handleDeleteTag = async (e) => {
    e.preventDefault();
    const res = await fetch("api/tag", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: tag._id }),
    });
    if (res.ok) {
      const newArray = props.TagsList.filter((Tag) => Tag._id !== tag._id);
      props.setTagsList(newArray);
      console.log("ok");
    } else alert(response.message);
  };
  const handleUpdateTag = async (e) => {
    e.preventDefault()
    const res = await fetch("api/tag", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: tag._id , title: Title}),
    });
    if (res.ok) {
      console.log("ok");
      setInputDisabled(true)
    } else alert(response.message);
  };
  return (
    <div className="flex justify-between mx-2 bg-blue-950 p-2 gap-2">
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="disabled:bg-transparent bg-slate-900"
        disabled={InputDisabled}
        value={Title}
      />
      {InputDisabled ? (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              setInputDisabled(false);
            }}
          >
            <EditIcon />
          </button>
          <button onClick={handleDeleteTag}>
            <DeleteIcon />
          </button>
        </>
      ):
      <button onClick={handleUpdateTag}><CheckIcon/></button>
      }
    </div>
  );
}
