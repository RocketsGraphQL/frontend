'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useState } from 'react';

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

export default function ProjectStatesComponent({id} : { id: String}) {
    let project_id = id;
    
    const { data, loading } = useSubscription(GET_TODOS(project_id));
    const [ projectState, setProjectState ] = useState(-1);
    const [ projectName, setProjectName ] = useState("Project name");

    useEffect(() => {
      if (data && data.instances && data.instances.length) {
        let project = data.instances[0]
        let project_state = project.state;
        setProjectName(project.name)
        console.log(project_state, projectState)
        switch(project_state) {
          case "CREATINGDB":
            setProjectState(1);
            break;
          case "BOOTING":
            setProjectState(2);
            break;
          case "READY_FOR_DEPLOYMENT":
            setProjectState(3);
            break;
          case "FINISHED_SETTING_UP_TABLES_AND_RELATIONSHIPS":
            setProjectState(4);
            break;
          case "FINISHED_SETTING_UP_HASURA_BATTERIES":
            setProjectState(5);
            break;
          default:
            console.log("Unknown project state:", project_state)
        }
      }
    }, [data])

  return (
    <>
      <div className="bg-dark-mode-bg min-h-screen project-home">
        <div className="project-home-heading px-20 pt-20">
          <p className="text-xl text-scale-1200">{projectName} </p>
          <p className='text-scale-1200 pt-10'> Project creation may take some time. In the meantime you can check out some of the developer resources to get started: </p>
          <ol type="1" className='text-scale-1200 pt-4'>
            <li>
              1. How to setup simple todos application without Authentication <div className='popout'> <a href="https://github.com/RocketsGraphQL/example-setups/tree/master/todos" target="_blank" rel="noreferrer" > Read more</a> </div>
            </li>
            <li>
              2. How to setup simple todos application with Authentication <div className='popout'> <a href="https://github.com/RocketsGraphQL/example-setups/tree/master/auth" target="_blank" rel="noreferrer"> Read more</a> </div>
            </li>
          </ol>
          <p className='text-scale-1200 pt-4'>Check out the developer documentation <div className='popout'> <a href="https://docs.rocketgraph.io/" target="_blank" rel="noreferrer"> here </a> </div> and the github resources <div className='popout'> <a target="_blank" rel="noreferrer" href="https://github.com/RocketsGraphQL/rgraph"> here</a> </div>. You can also watch the youtube video of me building a todos application from scratch <div className='popout'> <a href="https://youtu.be/K5TGDapSnQw" target="_blank"  rel="noreferrer"> here</a> </div></p>
          <p className='text-scale-1200 pt-2'>Here is the <div className='popout'> <a href="https://dev.to/kaushik94/how-to-build-a-real-time-movie-voting-system-using-reactjs-3nfa" target="_blank" rel="noreferrer"> dev.to article </a> </div> on how to build a movie voting system in react using Rocketgraph</p>
          <div className="grid grid-cols-3 justify-between text-scale-1200 pt-10 gap-2">
            <div className="col project-creation-event">
              Starting AWS RDS 
              {
                projectState >= 0 ?
                <FontAwesomeIcon className="project-creation-event-spinner" icon={faCircleCheck} />
                : <FontAwesomeIcon className="project-creation-event-spinner" icon={faSpinner} spin />
              }
            </div>
            <div className="col project-creation-event">
              Activating RDS Instance  
              {
                projectState >= 1 ?
                <FontAwesomeIcon className="project-creation-event-spinner" icon={faCircleCheck} />
                : <FontAwesomeIcon className="project-creation-event-spinner" icon={faSpinner} spin />
              }
            </div>
            <div className="col project-creation-event">
              Setting up Databases 
              {
                projectState >= 2 ?
                <FontAwesomeIcon className="project-creation-event-spinner" icon={faCircleCheck} />
                : <FontAwesomeIcon className="project-creation-event-spinner" icon={faSpinner} spin />
              }
            </div>
            <div className="col project-creation-event">
              Booting Hasura 
              {
                projectState >= 3 ?
                <FontAwesomeIcon className="project-creation-event-spinner" icon={faCircleCheck} />
                : <FontAwesomeIcon className="project-creation-event-spinner" icon={faSpinner} spin />
              }
            </div>
            <div className="col project-creation-event">
              Booting Hasura Batteries 
              {
                projectState >= 4 ?
                <FontAwesomeIcon className="project-creation-event-spinner" icon={faCircleCheck} />
                : <FontAwesomeIcon className="project-creation-event-spinner" icon={faSpinner} spin />
              }
            </div>
            <div className="col project-creation-event">
              Finishing up 
              {
                projectState >= 5 ?
                <FontAwesomeIcon className="project-creation-event-spinner" icon={faCircleCheck} />
                : <FontAwesomeIcon className="project-creation-event-spinner" icon={faSpinner} spin />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
