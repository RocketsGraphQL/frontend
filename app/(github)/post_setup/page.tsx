/* This example requires Tailwind CSS v2.0+ */

'use client';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'

import axios from "axios";
import Cookies from "js-cookie";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  console.log("params", searchParams.get('installation_id'));
  const [selectedRepo, setSelectedRepo] = useState<any>();
  const [repos, setRepos] = useState([]);
  const [repo, setRepo] = useState();
  const [error, showError] = useState(false);
  const [loading, setLoading] = useState(false);

  // This function will be triggered when a radio button is selected
  const radioHandler = (event: any) => {
    setSelectedRepo(event.target.value);
  };
  useEffect(() => {
    function postInstallationSetup() {
      if (typeof searchParams.get('installation_id') === undefined) return;
      // router.query.lang is defined
      const installation_id = searchParams.get('installation_id')
      const jwt = Cookies.get("jwt");
      const pid = Cookies.get("pid");
      const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/github/repos?installation_id=${installation_id}`;

      axios
        .get(API_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          console.log(response);
          setRepos(response.data.Repos);
        });
    }
    postInstallationSetup();
  }, []);

  const handleChange = (e: any) => {
    console.log("selected", e.target.value);

    repos.map((repo: any) => {
      if (repo.full_name == e.target.value) {
        setSelectedRepo(repo);
        console.log("selected", repo);
      }
    });
  };
  const submitCreateServerless = () => {
    if (selectedRepo != undefined) {
      if (typeof searchParams.get('installation_id') === undefined) return;
      // router.query.lang is defined
      const installation_id = searchParams.get('installation_id')
      const jwt = Cookies.get("jwt");
      const pid = Cookies.get("pid");
      const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/serverless/create/`;

      const values = {
        installation_id: installation_id,
        instance_id: pid,
        owner: {
          login: selectedRepo.owner.login,
          id: JSON.stringify(selectedRepo.owner.id),
        },
        name: selectedRepo.name,
        full_name: selectedRepo.full_name,
      };

      setLoading(true);
      axios
        .post(API_URL, JSON.stringify(values), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          console.log(response);
          setLoading(false);
          // go back
          const back = Cookies.get("serverless_pane_back");
          if (back) {
            router.push(back);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          // go back
          const back = Cookies.get("serverless_pane_back");
          if (back) {
            router.push(back);
          }
        });
    }
  };
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <form>
            <div className="flex justify-center github-connect-button place-content-evenly py-10">
              <fieldset>
                {repos.map((repo: any) => {
                  return (
                    <p key={repo.id}>
                      <input
                        type="radio"
                        id="first"
                        name="repo"
                        value={repo.full_name}
                        onChange={handleChange}
                      />
                      <label htmlFor="first" className="px-2">
                        {repo.full_name}
                      </label>
                    </p>
                  );
                })}
              </fieldset>
            </div>

            {error && <div> Please select a repo and click submit</div>}
          </form>

          {loading ? (
            <div className="flex justify-center github-connect-button items-center py-10">
              <button
                className="bg-brand-900 hover:bg-brand-800 text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={submitCreateServerless}
              >
                <svg
                  className="animate-spin inline-block h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing
              </button>
            </div>
          ) : (
            <div className="flex justify-center github-connect-button items-center py-10">
              <button
                className="bg-brand-900 hover:bg-brand-800 text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={submitCreateServerless}
              >
                Submit
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
