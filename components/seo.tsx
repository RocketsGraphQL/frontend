import React from 'react';
import Head from 'next/head';

export default function SEO({
  description = 'Rocketgraph provides built-in authentication with Email, Social, passwordless and MFA. It also provides GraphQL, Kafak, Stripe support and much more',
  author = 'Kaushik Varanasi',
  meta,
  title = 'Rocketgraph: A complete backend that comes with auth, GraphQL, Kafka and much more',
}: {
    description: string,
    author: string,
    meta: any,
    title: string
}) {
  const metaData = [
    {
      name: `description`,
      content: description,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: description,
    },
  ].concat(meta);
  return (
    <Head>
      <title>{title}</title>
      {metaData.map(({ name, content }, i) => (
        <meta key={i} name={name} content={content} />
      ))}
    </Head>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
};
