'use client';

import { createClient } from "@rocketgraphql/rocketgraph-js-sdk";

const config = {
  baseURL: "https://rocketgraph.io/auth",
};

const { auth } = createClient(config);

export { auth };