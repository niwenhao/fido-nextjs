'use client'

import { initRegisterData } from "./fido-module";

export default function Home() {
  const fidoInit = async () => {
    const challenge = await initRegisterData();
    console.log(challenge);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => fidoInit()}>Fido Init</button>
    </div>
  );
}
