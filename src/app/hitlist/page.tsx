"use client";

import PocketBase from "pocketbase";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { isLoggedIn } from "../lib/withAuth";
import "./hitlist.css";

const pb = new PocketBase("http://127.0.0.1:8090"); // TODO: Make this an exportable const

async function writeToHitlist(statefulHitlist: Hit[]) {
  console.log(`[Hitlist][${writeToHitlist.name}]`, { statefulHitlist });

  if (isLoggedIn()) {
    const userId = pb.authStore.record?.id ?? "";
    const user = await pb.collection("users").getOne(userId);
    console.warn({ user });

    // ! need to reliably have most up-to-date hitlist on client and overwrite that in DB
    const updatedHitlist = removeDuplicates(statefulHitlist);

    console.warn(`[Hitlist][${writeToHitlist.name}][ADD]`, {
      user,
      userId,
      updatedHitlist,
    });

    return await pb
      .collection("users")
      .update(userId, { hitlist: updatedHitlist });
  } else {
    console.warn("No user is logged in...");
    return Promise.resolve();
  }
}

function removeDuplicates(anyArray: Hit[]) {
  return anyArray.filter(
    (o, index, arr) =>
      arr.findIndex((item) => JSON.stringify(item) === JSON.stringify(o)) ===
      index
  );
}

type Hit = {
  id: string;
  name: string;
};

export default function HitListEdit() {
  const ownerHitlist = removeDuplicates(pb.authStore.record?.hitlist ?? []);
  console.log(`[Hitlist]`, { ownerHitlist });

  const [hitlist, setHitlist] = useState<Hit[]>(ownerHitlist);
  const [isAdding, setIsAdding] = useState(false);
  const [newHitlistItem, setNewHitlistItem] = useState<Hit>({
    id: uuid(),
    name: "",
  });

  return (
    <div className="hitlist edit">
      <h1>Hitlist</h1>
      <ul>
        {hitlist.map((placeToHit) => (
          <div key={`item-${placeToHit.id}`} className="hitlist-item">
            <div key={placeToHit.id}>{placeToHit.name}</div>
            <button
              className="btn"
              onClick={async () => {
                const newHitlist = hitlist.filter(
                  (item) => item.id !== placeToHit.id
                );
                setHitlist(newHitlist);
                await writeToHitlist(newHitlist);
              }}
            >
              Mark as Hit
            </button>
          </div>
        ))}
        {isAdding && (
          <div className="hitlist-item new">
            <input
              type="text"
              placeholder="Add to hitlist"
              className="typewriter"
              value={newHitlistItem.name}
              onChange={(event) =>
                setNewHitlistItem((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
            />
            <button
              className="btn"
              onClick={async () => {
                const newHitlist = [...hitlist, newHitlistItem];
                setHitlist(newHitlist);

                if (pb.authStore.record) {
                  pb.authStore.record.hitlist = newHitlist;
                }

                await writeToHitlist(newHitlist);
                setIsAdding(false);
                setNewHitlistItem({ id: uuid(), name: "" });
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </ul>
      {!isAdding && (
        <button
          className="btn add"
          onClick={() => {
            setIsAdding(true);
          }}
        >
          Add to hitlist
        </button>
      )}
    </div>
  );
}
