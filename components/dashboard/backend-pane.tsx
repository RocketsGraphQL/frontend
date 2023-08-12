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
import moment from 'moment';


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

const constructTableHeaderFromFirstRow =  (row: any) => {
  return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
          <tr>
              {
                row.map((cell: any, index: number) => {
                  const columnName = cell["Field"].replace("@", "")
                  return (
                    <th key={index} scope="col" className="px-6 py-3">
                      {columnName}
                    </th>
                  )
                })
              }
              {/* <th key={row.length + 1} scope="col" className="px-6 py-3">
                  user
              </th>
              <th key={row.length + 2} scope="col" className="px-6 py-3">
                  ip
              </th> */}
              {/* <th scope="col" className="px-6 py-3">
                  Price
              </th> */}
          </tr>
      </thead>
  )
}

const TimeFrameSelectionRadioGroup = (timeframe: string, setTimeframe: Function) => {
  return (
    <>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-10">
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                  <input id="horizontal-list-radio-license" type="radio" value="5min" onChange={(e) => {setTimeframe(e.target.value)}} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">5 min </label>
              </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                  <input id="horizontal-list-radio-id" type="radio" value="30min" onChange={(e) => {setTimeframe(e.target.value)}} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">30 min</label>
              </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                  <input id="horizontal-list-radio-millitary" type="radio" value="1day" onChange={(e) => {setTimeframe(e.target.value)}} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="horizontal-list-radio-millitary" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1 day</label>
              </div>
          </li>
          <li className="w-full dark:border-gray-600">
              <div className="flex items-center pl-3">
                  <input id="horizontal-list-radio-passport" type="radio" value="1week" onChange={(e) => {setTimeframe(e.target.value)}} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="horizontal-list-radio-passport" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1 week</label>
              </div>
          </li>
      </ul>

    </>
  )
}
export function PostgresLoggingComponent(project: any) {
  const defaultQuery = "fields @timestamp, @message | limit 200"
  const [query, setQuery] = useState(defaultQuery)
  const [logs, setLogs] = useState([])
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(false)
  const [timeframe, setTimeframe] = useState("5min")
  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    setQuery(value);
  }, []);
  const runQuery = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const jwt = Cookies.get("jwt")
    setProcessing(true);
    let startTimeframe, endTimeframe;
    endTimeframe = moment().unix();
    console.log("Timeframe: ", timeframe);
    switch(timeframe) {
      case "5min":
        startTimeframe = moment().subtract(5, 'minutes').unix()
        break;
      case "30min":
        startTimeframe = moment().subtract(30, 'minutes').unix()
        break;
      case "1day":
        endTimeframe = moment().subtract(1, 'days').unix()
        startTimeframe = moment().subtract(2, 'days').unix()
        break;
      case "1week":
        endTimeframe = moment().subtract(5, 'days').unix()
        startTimeframe = moment().subtract(7, 'days').unix()
        break;
      default:
        startTimeframe = moment().subtract(5, 'minutes').unix()
        break;
    }
    const logsResult = await axios.post(`${API_URL}/logs`, 
    {
      Query: query,
      ProjectName: project.name,
      StartTimestamp: startTimeframe,
      EndTimestamp: endTimeframe,
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
      {TimeFrameSelectionRadioGroup(timeframe, setTimeframe)}
      <CodeMirror
        className='pb-20'
        value={defaultQuery}
        height="200px"
        theme="dark"
        // extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
      {LogsTableNew(logs) }

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

const LogsTableNew = (logs: any) => {
  if (!logs.length) {
    return;
  }
  return (
    <>

<div className="relative overflow-x-auto table-container">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
        {constructTableHeaderFromFirstRow(logs[0])}
        <tbody>
            {
              logs.map((record: any, index: number) => {
                let value;
                if (record["Field"] == "@message") {
                  const message = record["Value"].split(":LOG:")
                  value = message[1]
                } else {
                  value = record["Value"]
                }
                return (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        {
                          record.map((cell: any) => {
                            if (cell["Field"] == "@timestamp") {
                              const dateObj = new Date(cell["Value"]);
                              const humanReadable = dateObj.toUTCString();
                              return (
                                <th scope="row" className="px-6 py-4 font-medium overflow-hidden text-gray-900 whitespace-nowrap dark:text-white">
                                  {humanReadable}
                                </th>
                              )
                            } else if (cell["Field"] == "@message") {
                              const messageSplit = cell["Value"].split(":LOG:")
                              const value = messageSplit[1]
                              return (
                                <td className="px-6 py-4 overflow-hidden">
                                  {value}
                                </td>
                              )
                            } 
                            else {
                              return (
                                <td className="px-6 py-4 overflow-hidden">
                                  {cell["Value"]}
                                </td>
                              )
                            }
                          })
                        }
                  </tr>
                )
              })
            }
        </tbody>
    </table>
</div>

    </>
  )
}

const LogsTableTest = (logs: any) => {
  return (
    <>

<div className="relative overflow-x-auto table-container">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4 overflow-hidden">
                CngKOwo3NTY5NzI1MDk3MTY5Oi9hd3MvcmRzL2luc3RhbmNlL3dpdGhlcmVkLWZyb2cvcG9zdGdyZXNxbBADEjUaGAIGSjSx9AAAAAHIMJ4iAAZNSjigAAAAQiABKPiq                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                    Accessories
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
</div>

    </>
  )
}
const LogsTable = (logs: any) => {
  if (typeof logs == undefined || logs.length == 0) {
    return;
  }
  return (
    <>
      <div className="bg-dark-mode-bg min-h-screen pt-20">
        <div className="relative overflow-x-auto rounded-md pt-20 overflow-y-scroll table-container">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
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
                                if (record["Field"] == "@ptr") {
                                  return (
                                    <td className="px-6 py-4">
                                      {record["Value"].substring(0, 7)}
                                    </td>
                                  )                                    
                                } 
                                else if (record["Field"] == "@message") {
                                  const main_message = record["Value"].split(":LOG:")[1]
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
              {PostgresLoggingComponent(project)}
            </div>
        </div>
        </>
    )
}