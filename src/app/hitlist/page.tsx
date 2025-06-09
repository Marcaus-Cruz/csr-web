"use client";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090"); // TODO: Make this an exportable const

export default function Hitlist() {
  const ownerHitlist = pb.authStore.record?.hitlist ?? [];
  console.log(`[Hitlist]`, { ownerHitlist });

  return (
    <div>
      <h1>Hitlist</h1>
      <ul>
        {ownerHitlist.map((placeToHit) => (
          <li key={placeToHit.id}>{placeToHit.restName}</li>
        ))}
      </ul>
      <button className="btn add" onClick={() => {}}>
        Add to hitlist
      </button>
    </div>
  );
}
