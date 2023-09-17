'use client'

import { gql, useQuery } from '@apollo/client'

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
  const { data, loading } = useQuery(cartesiQuery)

  console.log(data)

  return <main className='flex min-h-screen text-white'>hello</main>
}
