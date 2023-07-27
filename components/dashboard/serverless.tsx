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
'use client';

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import moment from "moment";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// apollo
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
  useSubscription,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://hasura-endpoint.rocketgraph.io/v1/graphql",
});

const GET_TODOS = (pid: String) => gql`
  subscription {
    instances(where: {id: {_eq: "${pid}"}}) {
      id
      created_at
      name
      state
      aws_rds_state
      serverless
      lambda_endpoint
    }
  }
`;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  // const token = localStorage.getItem("jwt");

  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      "X-Hasura-Role": "admin",
      "X-Hasura-Admin-Secret": "myadminsecretkey",
    },
  };
});


const NewFunctionURLDisplay = (project: any) => {
  return (
    <div className="grid grid-cols-1 justify-between text-scale-1200 pt-20 gap-2">
    <div className="col project-auth-urls">
        <div className='text pb-4'>
            <p className='pb-4 text'>
              Functions URL
            </p>
            <div className='project-pane-code'>
              <pre className="m-0">
                <code className="WHnkZwe1S6bYhZVXiN93 select-all" data-cursor="$">
                  {project.lambda_endpoint}
                </code>
              </pre>
            </div>
        </div>
    </div>
  </div>
  )
}

const NewCommitsTable = (commits: any, project: any) => {
  return (
    <>

      <div className="bg-dark-mode-bg min-h-screen project-home">
        <p className="text-xl text-scale-1200">Deployments</p>
        {NewFunctionURLDisplay(project)}
        <div className="relative overflow-x-auto rounded-md pt-20">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                    <tr className="commits-table-bg border-b">
                        <th scope="col" className="px-6 py-3">
                            Commit Message
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Commit Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Author
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Time
                        </th>
                    </tr>
                </thead>
                <tbody className="commits-table-bg">
                  {
                    commits.map((commit: any) => {
                      const date = moment(commit.timestamp).fromNow();
                      return (
                        <>
                          <tr key={commit.id} className="border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {commit.message}
                            </th>
                            <td className="px-6 py-4">
                              {/* <GitHubIcon className="px-1" />{" "} */}
                              {commit.commit_id.substring(0, 7)}                        
                            </td>
                            <td className="px-6 py-4">
                              <img className="w-6 h-6 rounded-full inline-block" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" /> {commit.author}
                            </td>
                            <td className="px-6 py-4">
                              {date}
                            </td>
                          </tr>
                        </>
                      )
                    })
                  }
                </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

const installNewApp = (project: any) => {
  console.log("project_id: ", project.id);
  Cookies.set("pid", project.id);
  Cookies.set("serverless_pane_back", window.location.href);
  window.location.href =
    "https://github.com/apps/codetoawslambda/installations/new";
};

const ConnectGithub = (project: any) => {
  return (
    <div className="h-full align-middle">
      <div className="flex justify-center github-connect-button place-content-evenly">
        <button
          onClick={() => installNewApp(project)}
          className="bg-white absolute top-10 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Connect to Github
        </button>
      </div>
    </div>
  );
};

export default function Project({id} : { id: String}) {
  let project_id = id;

  const { data, loading } = useSubscription(GET_TODOS(project_id));
  let project = data?.instances[0];

  console.log(project, project_id);
  const [commits, setCommits] = useState([]);
  useEffect(() => {
    if (project == undefined) return;
    const name = project.serverless;
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql`      
          query MyQuery {
              commits(where: {name: {_eq: "${name}"}}) {
                author
                email
                message
                timestamp
                username
                commit_id
              }
          }
        `,
      })
      .then((result) => {
        console.log(result);
        setCommits(result.data.commits);
      });
  }, [project]);
  return (
    <>
      <div className="h-full bg-dark-mode-bg">
        {project
          ? project.serverless && project.serverless !== ""
            ? NewCommitsTable(commits, project)
            : ConnectGithub(project)
          : null}
      </div>
    </>
  );
}
