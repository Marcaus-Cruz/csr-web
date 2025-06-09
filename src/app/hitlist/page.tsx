"use client";

import PocketBase from "pocketbase";
import { useState } from "react";
import "./hitlist.css";

const pb = new PocketBase("http://127.0.0.1:8090"); // TODO: Make this an exportable const

export default function HitListEdit() {
  const ownerHitlist = pb.authStore.record?.hitlist ?? [];
  console.log(`[Hitlist]`, { ownerHitlist });

  const [hitlist, setHitlist] = useState(ownerHitlist);
  const [isAdding, setIsAdding] = useState(false);
  const [newHitlistItem, setNewHitlistItem] = useState("");

  return (
    <div className="hitlist edit">
      <h1>Hitlist</h1>
      <ul>
        {hitlist.map((placeToHit) => (
          <div key={`item-${placeToHit}`} className="hitlist-item">
            <div key={placeToHit}>{placeToHit}</div>
            <button className="btn">Mark as Hit</button>
          </div>
        ))}
        {isAdding && (
          <div className="hitlist-item new">
            <input
              type="text"
              placeholder="Add to hitlist"
              className="typewriter"
              value={newHitlistItem}
              onChange={(event) => setNewHitlistItem(event.target.value)}
            />
            <button
              className="btn"
              onClick={() => {
                // TODO: Save to PocketBase

                setHitlist([...hitlist, newHitlistItem]);
                setIsAdding(false);
                setNewHitlistItem("");
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
