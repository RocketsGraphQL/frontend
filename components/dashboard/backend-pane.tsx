'use client'
  
import { gql, useSubscription } from '@apollo/client';
import Link from 'next/link'
import { useState } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { faClipboard, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import axios from 'axios';
import Cookies from 'js-cookie';


const logs_sample = [
  [
    {
      "Field": "@timestamp",
      "Value": "2023-08-10 08:47:15.000"
    },
    {
      "Field": "@message",
      "Value": "2023-08-10 08:47:15 UTC:172.31.1.50(44986):postgres@postgres:[12726]:LOG:  AUDIT: SESSION,116,1,MISC,COMMIT,,,COMMIT,<not logged>"
    },
    {
      "Field": "@ptr",
      "Value": "CngKOwo3NTY5NzI1MDk3MTY5Oi9hd3MvcmRzL2luc3RhbmNlL3dpdGhlcmVkLWZyb2cvcG9zdGdyZXNxbBADEjUaGAIGSjSx9AAAAAHIMJ4iAAZNSjigAAAAQiABKPiq/PSdMTC41IP1nTE4NUCDZUiyDlDgChgAIAEQNBgB"
    }
  ],
  [
    {
      "Field": "@timestamp",
      "Value": "2023-08-10 08:47:15.000"
    },
    {
      "Field": "@message",
      "Value": "2023-08-10 08:47:15 UTC:172.31.1.50(44986):postgres@postgres:[12726]:LOG:  AUDIT: SESSION,115,1,READ,SELECT,,,\"\n\t       SELECT resource_version from hdb_catalog.hdb_metadata\n\t    \",<not logged>"
    },
    {
      "Field": "@ptr",
      "Value": "CngKOwo3NTY5NzI1MDk3MTY5Oi9hd3MvcmRzL2luc3RhbmNlL3dpdGhlcmVkLWZyb2cvcG9zdGdyZXNxbBADEjUaGAIGSjSx9AAAAAHIMJ4iAAZNSjigAAAAQiABKPiq/PSdMTC41IP1nTE4NUCDZUiyDlDgChgAIAEQMxgB"
    }
  ],
  [
    {
      "Field": "@timestamp",
      "Value": "2023-08-10 08:47:15.000"
    },
    {
      "Field": "@message",
      "Value": "2023-08-10 08:47:15 UTC:172.31.1.50(44986):postgres@postgres:[12726]:LOG:  AUDIT: SESSION,114,1,MISC,BEGIN,,,BEGIN ISOLATION LEVEL REPEATABLE READ ,<not logged>"
    },
    {
      "Field": "@ptr",
      "Value": "CngKOwo3NTY5NzI1MDk3MTY5Oi9hd3MvcmRzL2luc3RhbmNlL3dpdGhlcmVkLWZyb2cvcG9zdGdyZXNxbBADEjUaGAIGSjSx9AAAAAHIMJ4iAAZNSjigAAAAQiABKPiq/PSdMTC41IP1nTE4NUCDZUiyDlDgChgAIAEQMhgB"
    }
  ],
];

export function CodeMirrorComponent() {
  const defaultQuery = "fields @timestamp, @message | limit 200"
  const [query, setQuery] = useState(defaultQuery)
  const [logs, setLogs] = useState([])
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(false)
  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    setQuery(value);
  }, []);
  const runQuery = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const jwt = Cookies.get("jwt")
    setProcessing(true)
    const logsResult = await axios.post(`${API_URL}/logs`, 
    {
      Query: query
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    )
    setProcessing(false)
    if (logsResult.status === 200 && logsResult.data) {
      setLogs(logsResult.data.Output.Results)
    } else {
      setError(true)
    }
    console.log("logs: ", logsResult.data.Output.Results);
  }
  return (
    <div>
      <button className="p-2 bg-forest-green hover:bg-lighter-green mb-6" onClick={() => runQuery()}>
        {
          processing ?
          "Processing  "
          : "RUN Query"
        }
        {
          processing ?
          <FontAwesomeIcon icon={faSpinner} spin />
          : null
        }
      </button>
      <CodeMirror
        value={defaultQuery}
        height="200px"
        theme="dark"
        // extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
      {LogsTable(logs) }
      {/* <CodeMirror
        value="console.log('hello world!');"
        height="200px"
        extensions={[javascript({ jsx: true })]}
        onChange={(value, viewUpdate) => {
          console.log("value:", value);
        }}
      /> */}
    </div>
  );
}

const LogsTable = (logs: any) => {
  if (typeof logs == undefined || logs.length == 0) {
    return;
  }
  return (
    <>
      <div className="bg-dark-mode-bg min-h-screen pt-20">
        <div className="relative overflow-x-auto rounded-md pt-20 overflow-y-scroll table-container">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                    <tr className="commits-table-bg border-b">
                        <th scope="col" className="px-6 py-3">
                            Log Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Log Message
                        </th>
                        <th scope="col" className="px-6 py-3 overflow-hidden">
                            Log Id
                        </th>
                    </tr>
                </thead>
                <tbody className="commits-table-bg height-fixed">
                  {
                    logs.map((records: any) => {
                      // const date = moment(commit.timestamp).fromNow();
                      return (
                        <>

                            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                            {
                              records.map((record: any) => {
                                console.log(record, record["Value"]);
                                if (record["Field"] == "@ptr") {
                                  return (
                                    <td className="px-6 py-4">
                                      {record["Value"].substring(0, 7)}
                                    </td>
                                  )                                    
                                } 
                                else if (record["Field"] == "@message") {
                                  const main_message = record["Value"].split(":LOG:")[1]
                                  console.log("main msg: ", main_message);
                                  return (
                                    <td className="px-6 py-4">
                                      {main_message}
                                    </td>                                    
                                  )
                                } 
                                else {
                                  return (
                                    <td className="px-6 py-4">
                                      {record["Value"]}
                                    </td>
                                  )
                                }


                              })
                            }
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


const GET_PROJECTS = (pid: String) => gql`
  subscription {
    instances(where: {id: {_eq: "${pid}"}}) {
      hasura_endpoint
      aws_rds_state
      name
      postgres_password
      postgresql_endpoint
      hasura_secret
      backend_endpoint
    }
  }
`;

export default function AuthPaneComponent({id} : { id: String}) {
    let project_id = id;

    const { data, loading } = useSubscription(GET_PROJECTS(project_id));
  
    let project = data?.instances[0];
    console.log("Project: ", project);
    const [isBackendURLCopied, setIsBackendURLCopied] = useState(false);
    
    return (
        <>
        {
            BackendDetails(project, isBackendURLCopied, setIsBackendURLCopied)
        }
        </>
    )
}

const BackendDetails = (project: any, isBackendURLCopied: boolean, setIsBackendURLCopied: Function) => {
    return (
        <>
          <div className="bg-dark-mode-bg min-h-screen project-home">
            <div className="project-home-heading">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-scale-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  {project && project.postgresql_endpoint && (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Backend URL
                              </div>
                              <div className="text-sm text-gray-500">
                                {project.backend_endpoint}
                                {isBackendURLCopied ? (
                                  <span>
                                    <FontAwesomeIcon className="project-creation-event-spinner ml-2" size="xl" icon={faCheck} />
                                  </span>
                                ) : ( 
                                  <CopyToClipboard
                                    text={project.backend_endpoint}
                                    onCopy={() => setIsBackendURLCopied(true)}
                                  >
                                    <span>
                                        <FontAwesomeIcon className="project-creation-event-spinner ml-2" size="xl" icon={faClipboard} />
                                    </span>
                                  </CopyToClipboard>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                PostgreSQL connection string
                              </div>
                              <div className="text-sm text-gray-500">
                                {project.postgresql_endpoint}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
            </div>
            <div className='pt-10'>
              <CodeMirrorComponent />
            </div>
        </div>
        </>
    )
}