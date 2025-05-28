'use client';

import './pageTitle.css';

export default function PageTitle({ text }: { text: string }) {
  return <div className="page-title">{text}</div>;
}