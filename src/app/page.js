"use client"
import Head from 'next/head';
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Canvas from '../components/Canvas';
import Footer from '@/components/Footer';

export default function Home() {
  const [text, helper1] = useTypewriter({
    words: ['Convex Hull Generator'],
    typeSpeed: 100,
    loop: 1,
  });
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-700">
        <Head>
          <title>Convex Hull Generator</title>
          <meta name="description" content="Generate Convex Hull from Points" />
          <link rel="icon" href="/favicon.png" />
        </Head>

          <div className="container border-b w-full mb-4 text-center">
          <span className=''>
            <h1 className="text-4xl font-bold my-2 text-green-400">{text}<Cursor cursorStyle="." /></h1>
          </span>
          </div>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <Canvas />
        </main>
      </div>
      <Footer />
    </div>
  );
}
