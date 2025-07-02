"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import type { CSRUser } from "../api/auth/[...nextauth]/options";
import { removeDuplicateHits } from "../lib/hitlistUtils";
import type { Hit, Hitlist } from "../types/hitlist.types";
import "./hitlist.css";

async function writeToHitlist(userId: string, statefulHitlist: Hitlist) {
  console.log(`[Hitlist][${writeToHitlist.name}]`, { statefulHitlist });

  if (userId) {
    const updatedHitlist = removeDuplicateHits(statefulHitlist);

    const res = await fetch("/api/update-hitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hitlist: updatedHitlist }),
    });

    const result = await res.json();
    if (!res.ok) {
      console.error("Update failed:", result.error);
    } else {
      console.log("Hitlist updated");
    }
  } else {
    console.warn("No user is logged in...");
    return Promise.resolve();
  }
}

export default function HitListEdit() {
  const session = useSession();
  const user = session.data?.user as CSRUser;

  const ownerHitlist = user?.hitlist || [];

  const [hitlist, setHitlist] = useState<Hitlist>(ownerHitlist);
  const [isAdding, setIsAdding] = useState(false);
  const [newHitlistItem, setNewHitlistItem] = useState<Hit>({
    id: uuid(),
    name: "",
  });

  return (
    <div className="hitlist edit">
      <h1>Hitlist</h1>
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
      <ul>
        {isAdding && (
          <div className="hitlist-item new">
            <input
              name="new-hitlist-item"
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
                if (newHitlistItem.name) {
                  const newHitlist = [...hitlist, newHitlistItem];

                  setHitlist(newHitlist);
                  session.update({ hitlist: newHitlist });

                  await writeToHitlist(user.id, newHitlist);
                }
                setIsAdding(false);
                setNewHitlistItem({ id: uuid(), name: "" });
              }}
            >
              Confirm
            </button>
          </div>
        )}
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
                await writeToHitlist(user.id, newHitlist);
              }}
            >
              Mark as Hit
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}
