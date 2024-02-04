import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faDatabase, faTable, faCode, faCog, faArrowLeft, faFlask, faCloud } from '@fortawesome/free-solid-svg-icons'
import { faStripeS } from '@fortawesome/free-brands-svg-icons'

export default function Sidebar(props: any) {
    console.log("PID: ", props.pid);
    const projectId = props.pid;
    // used for checking current route
    const router = useRouter();
    const current_url = usePathname()
    const isHomeActive = current_url.includes('/home');
    const isHasuraActive = current_url.includes('/hasura');
    const isAuthActive = current_url.includes('/auth');
    const isServerlessActive = current_url.includes('/serverless');
    const isAiActive = current_url.includes('/ai');
    const isStripeActive = current_url.includes('/stripe');
    const isSettingsActive = current_url.includes('/settings');
    return (
        <div className="min-h-screen fixed-width-for-sidebar bg-dark-mode-bg border-right-light-gray float-left absolute">
            <div className="sidebar-back-button pt-30 sidebar-button sidebar-button-active">
                <a className="mx-4 mt-30" href="/dashboard">
                    <FontAwesomeIcon className="sidebar-icon" icon={faArrowLeft} />
                </a>
            </div>

            <ul className="sidebar-navigation-menu">
                <a href={`/project/${projectId}/home`}>
                    <li className={isHomeActive ? "sidebar-button sidebar-button-active" : "sidebar-button sidebar-button-inactive"}>
                        <FontAwesomeIcon className="sidebar-icon" icon={faHome} />
                    </li>
                </a>

                <a href={`/project/${projectId}/hasura`}>
                    <li className={isHasuraActive ? "sidebar-button sidebar-button-active" : "sidebar-button sidebar-button-inactive"}>
                        <FontAwesomeIcon className="sidebar-icon" icon={faCloud} />
                    </li>
                </a>
                <a href={`/project/${projectId}/auth`}>
                    <li className={isAuthActive ? "sidebar-button sidebar-button-active" : "sidebar-button sidebar-button-inactive"}>
                        <FontAwesomeIcon className="sidebar-icon" icon={faDatabase} />
                    </li>
                </a>

                <a href={`/project/${projectId}/serverless`}>
                    <li className={isServerlessActive? "sidebar-button sidebar-button-active" : "sidebar-button sidebar-button-inactive"}>
                        <FontAwesomeIcon className="sidebar-icon" icon={faCode} />
                    </li>
                </a>

                <a href={`/project/${projectId}/ai`}>
                    <li className={isAiActive ? "sidebar-button sidebar-button-active" : "sidebar-button sidebar-button-inactive"}>
                        <FontAwesomeIcon className="sidebar-icon" icon={faFlask} />
                    </li>
                </a>

                <a href={`/project/${projectId}/stripe`}>
                    <li className={isStripeActive ? "sidebar-button sidebar-button-active" : "sidebar-button sidebar-button-inactive"}>
                        <FontAwesomeIcon className="sidebar-icon" icon={faStripeS} />
                    </li>
                </a>

                <a href={`/project/${projectId}/settings`}>
                    <li className={isSettingsActive ? "sidebar-button sidebar-button-active" : "sidebar-button sidebar-button-inactive"}>
                        <FontAwesomeIcon className="sidebar-icon" icon={faCog} />
                    </li>
                </a>

            </ul>
        </div>
    )

}