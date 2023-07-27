/* This example requires Tailwind CSS v2.0+ */
'use client'

import Cookies from "js-cookie";
import React from "react";

import ProjectsList from "@/components/dashboard/projects";
import { RApolloProvider } from "@rocketgraphql/react-apollo";
import { useState, useEffect } from "react";
import axios from "axios";
import { inDevEnvironment } from "utils/dev";

import { auth } from "@/utils/config";

const API_URL_BILLING_PORTAL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/create-customer-portal-session`;

// const auth  = {
//   isAuthenticated: () => {
//     return true;
//   },
//   getJWTToken: () => {
//     console.log("Fet5ching JWT: ", Cookies.get("jwt"));
//     return Cookies.get("jwt")
//     // return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImZhbHNlIiwiZXhwIjoxNjgxMTMzNzA3LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IlgtSGFzdXJhLVVzZXItSWQiOiIxYjE5NDk2OS01ZDhmLTQ1ZDAtODFkOS1hMmM0OGE1YzRhMjMiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIm1hbmFnZXIiLCJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIifSwic3ViIjoiNjQzNDBiZGIifQ.Ss0uPROg3RcZTy1-r8JhWDSApkTAC3acaSIEEhDhjmc`
//   },
//   getUserId: () => {
//     return ""
//   },
//   refresh: async () => {
//     let AUTH_URL;
//     if (inDevEnvironment) {
//       // In dev environment we have hasura batteries running separately
//       // but in prod we run them on the same server
//       AUTH_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
//     } else {
//       AUTH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;
//     }
//     const refreshResp = await axios.post(`${AUTH_URL}/refresh-token`, {
//       access: Cookies.get("jwt"),
//       refresh: Cookies.get("refresh"),
//     })
//     const {access, refresh} = refreshResp.data;
//     console.log(access, refresh);
//     Cookies.set("jwt", access, { expires: 7 });
//     Cookies.set("refresh", refresh, { expires: 7 });
//     return true;
//   }
// }

export default function Dashboard() {

  useEffect(() => {
    auth.refresh();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-scale-300">
        <header className="bg-white shadow h-30">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-30s flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <form action={API_URL_BILLING_PORTAL} method="POST">
              <button className="rounded-full bg-brand-900 mb-30 h-6 pl-2 text-sm text-white">
                update billing information
              </button>
            </form>
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full ">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col">
                <RApolloProvider auth={auth} gqlEndpoint="https://hasura-endpoint.rocketgraph.io/v1/graphql">
                  <ProjectsList />
                </RApolloProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
