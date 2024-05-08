'use client';
import React, { useEffect, useState } from 'react';
import Name from './Name';

const Page = () => {
  const [name, setName] = useState('1');
  const [res, setRes] = useState('');

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${name}`)
      .then((response) => response.json())
      .then((json) => setRes(json.title));
  }, [name]);
  return (
    <div>
      <select
        className="rounded border border-gray-600 px-4 py-2 text-gray-800"
        onChange={(e) => setName(e.target.value)}
      >
        <option value="2">Ronak</option>
        <option value="3">Shah</option>
      </select>
      <Name name={res} />
    </div>
  );
};

export default Page;
