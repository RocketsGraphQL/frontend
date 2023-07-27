import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";


const GET_PROJECTS = (pid: String) => gql`
  subscription {
    instances(where: {id: {_eq: "${pid}"}}) {
      id
      created_at
      name
      state
      aws_rds_state
      hasura_endpoint
      postgres_password
      postgresql_endpoint
      hasura_secret
    }
  }
`;

export default function HasuraPaneComponent({id} : { id: String}) {

  let project_id = id;

  const { data, loading } = useSubscription(GET_PROJECTS(project_id));

  let project = data?.instances[0];
  console.log("Project: ", project);
  return (
    <>
      {
        project && project.hasura_endpoint ?
        <>
          <div className="bg-dark-mode-bg min-h-screen project-home">
            <div className="project-home-heading">
              <p className="text-xl text-scale-1200">Hasura Console</p>
              <div className="grid grid-cols-1 justify-between text-scale-1200 pt-20 gap-2">
                <div className="col project-auth-urls">
                    <div className='text pb-4'>
                        <p className='pb-4 text'>
                          Hasura console URL
                        </p>
                        <div className='project-pane-code'>
                          <pre className="m-0">
                            <code className="WHnkZwe1S6bYhZVXiN93 select-all" data-cursor="$">
                              {project.hasura_endpoint}
                            </code>
                          </pre>
                        </div>
                        <p className='pb-4 text pt-8'>
                          Hasura secret
                        </p>
                        <div className='project-pane-code'>
                          <pre className="m-0">
                            <code className="WHnkZwe1S6bYhZVXiN93 select-all" data-cursor="$">
                              {project.hasura_secret}
                            </code>
                          </pre>
                        </div>
                    </div>
                    <a target="_blank"  rel="noreferrer" href={project.hasura_endpoint} className="w-full nav-button signup-button btn btn-success btn-sm text-white open-hasura-console-button">
                      Open Hasura Console
                    </a>
                </div>
              </div>
            </div>
          </div>
        </> : null
      }
    </>
  );
}
