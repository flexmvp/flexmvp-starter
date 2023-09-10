"use client";
import {
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
  UrqlProvider,
} from "@urql/next";
import { Auth } from "aws-amplify";
import { useEffect, useMemo, useState } from "react";
export function UrqlWrapper({ children }: { children: React.ReactNode }) {
  // Run this after the sign-in
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || "/graphql";
  const ssr = ssrExchange();
  const [cognitoJwt, setCognitoJwt] = useState<string | null>(null);

  useEffect(() => {
    const getJwtToken = async () => {
      const currentSession = await Auth.currentSession();
      const jwtToken = currentSession?.getAccessToken().getJwtToken();
      if (jwtToken) setCognitoJwt(jwtToken);
    };
    getJwtToken();
  }, []);

  const client = useMemo(() => {
    const urqlClient = createClient({
      url: graphqlUrl,
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: false,
      fetchOptions: {
        // headers: {
        //   Authorization: cognitoJwt ? `Bearer ${cognitoJwt}` : "",
        // },
        headers: {
          Authorization: cognitoJwt ? `Bearer ${cognitoJwt}` : "",
          Custom: "flex",
        },
      },
    });

    return urqlClient;
  }, [cognitoJwt, graphqlUrl, ssr]);

  return (
    <>
      {client ? (
        <UrqlProvider client={client} ssr={ssr}>
          {children}
        </UrqlProvider>
      ) : (
        children
      )}
    </>
  );
}
