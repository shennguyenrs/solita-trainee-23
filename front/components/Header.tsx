import type { ReactElement } from 'react';
import Head from 'next/head';

export default function Header({ title }: { title: string }): ReactElement {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Solution created by An Nguyen" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
