'use client'

import { gql, useQuery } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

const cartesiQuery = gql`
  query inputs {
    inputs {
      edges {
        node {
          payload
        }
      }
    }
  }
`

export default function Home() {
  // const { data, loading } = useQuery(cartesiQuery
  const { data } = useSuspenseQuery(cartesiQuery)

  console.log(data)

  return <main className='flex min-h-screen text-white'>{data.parse()}</main>
}
