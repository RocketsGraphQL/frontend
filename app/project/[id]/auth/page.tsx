'use client'
import ProjectStatesComponent from "@/components/dashboard/project-home";
import Cookies from "js-cookie";
import axios from "axios";
import { inDevEnvironment } from "utils/dev";
import { RApolloProvider } from "@rocketgraphql/react-apollo";
import { auth } from "@/utils/config";
import BackendPaneComponent from "@/components/dashboard/backend-pane";


// const auth  = {
//   isAuthenticated: () => {
//     return true;
//   },
//   getJWTToken: () => {
//     console.log("Fetching JWT: ", Cookies.get("jwt"));
//     return Cookies.get("jwt")
//     // return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImZhbHNlIiwiZXhwIjoxNjgxMTMzNzA3LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IlgtSGFzdXJhLVVzZXItSWQiOiIxYjE5NDk2OS01ZDhmLTQ1ZDAtODFkOS1hMmM0OGE1YzRhMjMiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIm1hbmFnZXIiLCJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIifSwic3ViIjoiNjQzNDBiZGIifQ.Ss0uPROg3RcZTy1-r8JhWDSApkTAC3acaSIEEhDhjmc`
//   },
//   getUserId: () => {
//     return ""
//   },
//   refresh: async () => {
//     let AUTH_URL;
//     if (inDevEnvironment) {
//       // In dev environment we have hasura batteries running separately
//       // but in prod we run them on the same server
//       AUTH_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
//     } else {
//       AUTH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;
//     }
//     const refreshResp = await axios.post(`${AUTH_URL}/refresh-token`, {
//       access: Cookies.get("jwt"),
//       refresh: Cookies.get("refresh"),
//     })
//     const {access, refresh} = refreshResp.data;
//     console.log(access, refresh);
//     Cookies.set("jwt", access, { expires: 7 });
//     Cookies.set("refresh", refresh, { expires: 7 });
//     return true;
//   }
// }

export default function ProjectHome({ params }: {
  params: { id: String }
}) {
  const id = params.id;
  setTimeout(() => {
    auth.refresh()
  }, 60 * 1000);
  return (
    <>
        <RApolloProvider auth={auth} gqlEndpoint="https://hasura-endpoint.rocketgraph.io/v1/graphql">
          <BackendPaneComponent id={id}/>
        </RApolloProvider>
    </>
  );
}
