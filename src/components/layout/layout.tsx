import Head from 'next/head';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Happi Forecast</title>
        <meta name="description" content="Best possible weather forecast" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500">
        <div className="w-full p-2 mx-auto space-y-2 max-w-screen-md md:mt-5">
          {children}
        </div>
      </div>
    </>
  );
}
