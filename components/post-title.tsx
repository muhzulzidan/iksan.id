import React from 'react';

export default function PostTitle({ children }: { children: React.ReactNode }) {
  const html = typeof children === 'string' ? children : '';
  
  return (
    <h1
      className="text-xl md:text-2xl lg:text-4xl font-bold tracking-tighter leading-tight md:leading-none mb-4 "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
