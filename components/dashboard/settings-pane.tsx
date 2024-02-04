/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client'
import { useState } from "react";
import axios from "axios";
import { inDevEnvironment } from "../../utils/dev";
import { gql, useSubscription } from "@apollo/client";

const GET_TODOS = (pid: String) => gql`
  subscription {
    instances(where: {id: {_eq: "${pid}"}}) {
      id
      created_at
      name
      state
      aws_rds_state
    }
  }
`;


export default function SettingsPane({id} : { id: String}) {
  let project_id = id;

  const { data, loading } = useSubscription(GET_TODOS(project_id));
  let project = data?.project;
  
  console.log("data: ", project);
  const [clientId, setClientIdState] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [callbackURL, setCallbackURL] = useState();
  const [redirectURL, setRedirectURL] = useState();

  const handleClientIdChange = (event: any) => {
    setClientIdState(event.target.value);
  };
  const handleClientSecretChange = (event: any) => {
    setClientSecret(event.target.value);
  };
  const handleCallbackURLChange = (event: any) => {
    setCallbackURL(event.target.value);
  };
  const handleRedirectURLChange = (event: any) => {
    setRedirectURL(event.target.value);
  };

  const submitGithub = () => {
    // In dev mode connect to the loacal
    // hasura-batteries instance
    // In prod connect to hasura-batteries instance
    // at project.BackendURL
    let API_URL = project.BackendURL;
    if (inDevEnvironment) {
      API_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
    }
    axios
      .post(API_URL + "/github/secrets", {
        clientId: clientId,
        clientSecret: clientSecret,
        redirectURL: redirectURL,
      })
      .then((response) => {
        console.log("response: ", response);
      });
  };

  // Google
  const [clientIdGoogle, setClientIdStateGoogle] = useState();
  const [clientSecretGoogle, setClientSecretGoogle] = useState();
  const [callbackURLGoogle, setCallbackURLGoogle] = useState();
  const [redirectURLGoogle, setRedirectURLGoogle] = useState();

  const handleClientIdChangeGoogle = (event: any) => {
    setClientIdStateGoogle(event.target.value);
  };
  const handleClientSecretChangeGoogle = (event: any) => {
    setClientSecretGoogle(event.target.value);
  };
  const handleCallbackURLChangeGoogle = (event: any) => {
    setCallbackURLGoogle(event.target.value);
  };
  const handleRedirectURLChangeGoogle = (event: any) => {
    setRedirectURLGoogle(event.target.value);
  };

  const submitGoogle = () => {
    // In dev mode connect to the loacal
    // hasura-batteries instance
    // In prod connect to hasura-batteries instance
    // at project.BackendURL
    let API_URL = project.BackendURL;
    if (inDevEnvironment) {
      API_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
    }
    axios
      .post(API_URL + "/google/secrets", {
        clientId: clientIdGoogle,
        clientSecret: clientSecretGoogle,
        callbackURL: callbackURLGoogle,
        redirectURL: redirectURLGoogle,
      })
      .then((response) => {
        console.log("response: ", response);
      });
  };
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-8 col-start-2">
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-600">
                  Github secrets
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Enter your GITHUB client id and secret here
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Github CLIENT ID
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="client-id"
                  type="password"
                  placeholder="******************"
                  value={clientId}
                  onChange={handleClientIdChange}
                />
                <p className="text-red-500 text-xs italic">
                  Enter your GITHUB CLIENT ID here.
                </p>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Github CLIENT SECRET
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="client-secret"
                  type="password"
                  placeholder="******************"
                  value={clientSecret}
                  onChange={handleClientSecretChange}
                />
                <p className="text-red-500 text-xs italic">
                  Enter your GITHUB CLIENT SECRET here.
                </p>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Github Redirect URL
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  value={redirectURL}
                  onChange={handleRedirectURLChange}
                />
                <p className="text-red-500 text-xs italic">
                  Enter your GITHUB CLIENT SECRET here.
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 text-right sm:px-6">
            <button
              onClick={submitGithub}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-900 hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-600">
                  Google secrets
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Enter your GOOGLE client id and secret here
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Google CLIENT ID
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="client-id"
                  type="password"
                  placeholder="******************"
                  value={clientIdGoogle}
                  onChange={handleClientIdChangeGoogle}
                />
                <p className="text-red-500 text-xs italic">
                  Enter your GOOGLE CLIENT ID here.
                </p>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Google CLIENT SECRET
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="client-secret"
                  type="password"
                  placeholder="******************"
                  value={clientSecretGoogle}
                  onChange={handleClientSecretChangeGoogle}
                />
                <p className="text-red-500 text-xs italic">
                  Enter your GOOGLE CLIENT SECRET here.
                </p>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Google Callback URL
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  value={callbackURLGoogle}
                  onChange={handleCallbackURLChangeGoogle}
                />
                <p className="text-red-500 text-xs italic">
                  Enter your GOOGLE CALLBACK URL here.
                </p>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Google Redirect URL
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  value={redirectURLGoogle}
                  onChange={handleRedirectURLChangeGoogle}
                />
                <p className="text-red-500 text-xs italic">
                  Enter your GOOGLE REDIRECT URL here.
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 text-right sm:px-6">
            <button
              onClick={submitGoogle}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-900 hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
