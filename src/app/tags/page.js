"use client";

import AddTag from "@/components/AddTag";
import TagInput from "@/components/TagInput";
import AddIcon from "@/components/icons/AddIcon";

import { useEffect, useState } from "react";

export default function tagsPage() {
  const [IsLoading, setIsLoading] = useState(true);
  const [TagsList, setTagsList] = useState([]);
  const [AddTagInput, setAddTagInput] = useState(false);

  useEffect(() => {
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




  return (
    <div>
      {IsLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          {AddTagInput && (
            <div className="absolute bg-gray-800/80 p-2">
              <AddTag
                SetEnable={setAddTagInput}
                TagsList={TagsList}
                setTagsList={setTagsList}
              />
            </div>
          )}
          {TagsList.map((tag) => (
            <TagInput key={tag._id} tag={tag} TagsList={TagsList} setTagsList={setTagsList}/>
          ))}
        </div>
      )}
      <button
        onClick={() => {
          setAddTagInput(true);
        }}
        className="absolute bottom-10 right-5 p-2 rounded bg-blue-950"
      >
        <AddIcon />
      </button>
    </div>
  );
}
