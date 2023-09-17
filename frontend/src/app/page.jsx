'use client'

import { gql, useQuery } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useEffect, useState } from 'react'
import Web3 from 'web3'

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
  const [jsonData, setJsonData] = useState([])
  const { data, loading } = useQuery(cartesiQuery)

  console.log(data, 'data')

  useEffect(() => {
    if (!loading && data) {
      const parsedData = data.inputs.edges.map((edge) => {
        const payloadString = Web3.utils.hexToAscii(edge.node.payload)
        console.log('Payload String:', payloadString)

        try {
          return JSON.parse(payloadString)
        } catch (error) {
          console.error('Error parsing JSON:', error)
          return null
        }
      })

      setJsonData(parsedData.filter((item) => item !== null))
    }
  }, [data, loading])

  console.log(data, 'data')

  return (
    <main className='flex justify-center bg-gradient-to-t from-red-300 to- '>
      <div>
        {jsonData.map((jsonObject, index) => (
          <div key={index} className='container mx-auto p-4'>
            <div className='bg-white p-8 rounded-lg shadow-md'>
              <img
                src='https://via.placeholder.com/150'
                alt='Profile Picture'
                className='w-32 h-32 rounded-full mx-auto'
              />
              <h2 className='text-2xl font-semibold text-center mt-4'>
                {jsonObject?.name}
              </h2>
              <p className='text-gray-600 text-center'>{jsonObject?.role}</p>
              <div className='mt-4'>
                <p className='mt-2'>{jsonObject?.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
