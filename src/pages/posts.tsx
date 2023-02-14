import { atom, useAtom } from "jotai";
import { Suspense } from "react";

const postData = atom(async () => {
  const data = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
  return data as Post[];
});

export default function Posts() {
  const [data] = useAtom(postData);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ul>
          {data.map((p, i) => (
            <li key={i}>{p.title}</li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
