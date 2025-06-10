'use client';

import { useEffect, useState } from 'react';
import { getUserHitlist } from '../lib/hitlistUtils';

export default function HitlistClient() {
  const [hitlist, setHitlist] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await getUserHitlist();
      setHitlist(list);
    })();
  }, []);

  return (
    <div className="hitlist">
          <div className="text">
            Here&apos;s my current hit list (in no particular order):
          </div>
          <ul>
            {hitlist.map((hit) => (
              <li key={hit.id}>{hit.name}</li>
            ))}
          </ul>
          <br />
          <div className="text">
            Please suggest Sandies to try and I&apos;ll try to get to them as
            soon as I can!
          </div>
        </div>
  );
}