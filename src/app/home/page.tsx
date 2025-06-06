'use client';

import { withAuth } from "../lib/withAuth";

function HomePage() {
  return <div>HOME</div>;
}

export default withAuth(HomePage);
