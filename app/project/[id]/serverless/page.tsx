'use client'
import ServerlessComponent from "@/components/dashboard/serverless";
import { RApolloProvider } from "@rocketgraphql/react-apollo";
import { auth } from "@/utils/config";


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
          <ServerlessComponent id={id}/>
        </RApolloProvider>
    </>
  );
}
