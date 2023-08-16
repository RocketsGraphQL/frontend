'use client'
  
import { gql, useSubscription } from '@apollo/client';
import { useState } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { faClipboard, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';

import dropdown from "@/components/ui/dropdown"


const QueriesDropdown = () => {
  return (
  <>

    <button id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown header <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
      </svg></button>

    <div id="dropdownInformation" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Bonnie Green</div>
          <div className="font-medium truncate">name@flowbite.com</div>
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
          </li>
        </ul>
        <div className="py-2">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
        </div>
    </div>

  </>


  )
}

const constructTableHeaderFromFirstRow =  (row: any) => {
  return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
          <tr>
              {
                row.map((cell: any, index: number) => {
                  const columnName = cell["Field"].replace("@", "")
                  if (columnName !== "ptr") {
                    return (
                      <th key={index} scope="col" className="px-6 py-3">
                        {columnName}
                      </th>
                    )
                  }

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
                  <input id="horizontal-list-radio-license" type="radio" value="2min" onChange={(e) => {setTimeframe(e.target.value)}} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">2 min </label>
              </div>
          </li>
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
  const dropQuery = `fields @timestamp, @message
  | filter @message like "DROP"
  | sort @timestamp desc
  | limit 100`
  const createQuery = `fields @timestamp, @message
  | filter @message like "CREATE"
  | sort @timestamp desc
  | limit 100`
  const defaultQuery = `fields @timestamp, @message
  | sort @timestamp desc
  | limit 200`
  const [query, setQuery] = useState(defaultQuery)
  const [logs, setLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState(logs)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(false)
  const [timeframe, setTimeframe] = useState("5min")
  const [search, setSearch] = useState("")
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
      case "2min":
        startTimeframe = moment().subtract(2, 'minutes').unix()
        break;
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
      setFilteredLogs(logsResult.data.Output.Results)
    } else {
      setError(true)
    }
    console.log("logs: ", logsResult.data.Output.Results);
  }
  return (
    <div>
      <div className='flex flex-row justify-between'>
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
        {dropdown(setQuery)}
      </div>

      {TimeFrameSelectionRadioGroup(timeframe, setTimeframe)}

      <CodeMirror
        className='pb-20'
        value={query}
        height="200px"
        theme="dark"
        // extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />

      <div className='grid grid-cols-12 gap-2'>
        <div className='col col-span-8'>
          <input id="email" className="form-input w-full" type="email" required onChange={
            (e) => {
              const search = e.target.value;
              setSearch(e.target.value)
              const filtered = logs.filter((log: any)=> {
                let found = false;
                log.map((field: any) => {
                  if (field["Value"].includes(search)) {
                    found = true;
                    console.log("log, search: ", log, search)
                    return true;
                  }
                })
                return found;
              })
              setFilteredLogs(filtered)
            }
          }/>          
        </div>
        <div className='col col-span-2'>
          <button className="p-2 bg-forest-green hover:bg-lighter-green mb-6" onClick={() => {}}>
            {
              processing ?
              "Processing  "
              : "Search"
            }
            {
              processing ?
              <FontAwesomeIcon icon={faSpinner} spin />
              : null
            }
          </button>
        </div>
      </div>

      {LogsTable(filteredLogs) }

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
                              let istDate = moment(humanReadable).local().format('YYYY-MMM-DD h:mm A');;
                              return (
                                <th scope="row" className="px-6 py-4 font-medium overflow-hidden text-gray-900 whitespace-nowrap dark:text-white">
                                  {istDate}
                                </th>
                              )
                            } else if (cell["Field"] == "@message") {
                              // const messageSplit = cell["Value"].split(":LOG:")
                              // const value = messageSplit[1]
                              const value = cell["Value"]
                              return (
                                <td className="px-6 py-4 overflow-hidden">
                                  {value}
                                </td>
                              )
                            } else if (cell["Field"] == "@ptr") {
                              return (null)
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
          <div className="min-h-screen project-home">
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