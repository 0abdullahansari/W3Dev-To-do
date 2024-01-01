import React from 'react';
import loading from './loading.svg';

function Loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-black mb-4">To Do List...</h1>
        <img src={loading} alt="Loading animation" />
      </div>
    </>
  );
}

export default Loading;
