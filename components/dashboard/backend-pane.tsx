'use client'
  
import { gql, useSubscription } from '@apollo/client';
import Link from 'next/link'
import { useState } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { faClipboard, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



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
        </div>
        </>
    )
}