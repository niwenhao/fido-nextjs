'use client'

import { initRegisterData } from "./fido-module";

function base64UrlToUint8Array(base64UrlString: string): Uint8Array {
  const padding = '='.repeat((4 - base64UrlString.length % 4) % 4);
  const base64 = (base64UrlString + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function Home() {
  const fidoInit = async () => {
    const challenge = await initRegisterData();
    console.log(challenge);
    // Assuming `challenge` is a base64url encoded string from your server
    const challengeUint8Array = base64UrlToUint8Array(challenge);
    const publicKeyCredential = await navigator.credentials.create({
      publicKey: {
        challenge: challengeUint8Array,
        rp: { name: 'Example'},
        user: {
          id: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
          name: 'example',
          displayName: 'Example User'
        },
        pubKeyCredParams: [
          { type: 'public-key', alg: -7 }
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform'
        },
        attestation: 'direct',
        excludeCredentials: [],
        extensions: {}  
      }
    });
    console.log(JSON.stringify(publicKeyCredential));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => fidoInit()}>Fido Init</button>
    </div>
  );
}
