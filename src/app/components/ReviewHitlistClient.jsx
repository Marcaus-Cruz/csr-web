'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function HitlistClient() {
  const [hitlist, setHitlist] = useState([]);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.id) return;
    
    (async () => {
      try {
        const response = await fetch('/api/hitlist');
        if (response.ok) {
          const data = await response.json();
          setHitlist(data.hitlist || []);
        } else {
          console.error("Failed to load hitlist");
        }
      } catch (error) {
        console.error("Failed to load hitlist:", error);
      }
    })();
  }, [user?.id]);

  return (
    <div className="hitlist">
          <div className="text">
            Here&apos;s my current hit list (in no particular order):
          </div>
          <ul>
            {hitlist.map((hit) => (
              <li key={hit.id}>- {hit.name}</li>
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