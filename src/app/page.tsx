import Head from "next/head";

export default function Home() {
  return (
    <>
    <Head>
      <title>Buy Me A Coffee</title>
      <meta name="cryptomus" content="42ffbc26" />
    </Head>
      <section className="max-w-lg mx-auto text-center mt-16">
        <h1 className="text-6xl font-bold">
          Fund your <br /> creative work
        </h1>
        <h2 className="mt-4 mb-8">
          Accept support for your work.
          <br /> It&apos;s easier than you think.
        </h2>
        <button className="bg-yellow-300 px-8 py-4 font-bold rounded-full">
          Start my page
        </button>
      </section>
    </>
  );
}
