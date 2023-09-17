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
      const parsedData = data.inputs.edges.slice(4).map((edge) => {
        const payloadString = Web3.utils.hexToAscii(edge.node.payload)
        console.log('Payload String:', payloadString)

        // Split the string into an array of key-value pairs
        const keyValuePairs = payloadString.split(',')

        // Initialize an empty object to store the parsed data
        const parsedData = {}

        // Iterate over the key-value pairs and add them to the object
        for (const pair of keyValuePairs) {
          const [key, value] = pair.split(':')
          parsedData[key] = value
        }

        console.log(parsedData)

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
    <main className='flex justify-center bg-gradient-to-t from-red-300 to-blue-700 '>
      <div className='h-full'>
        {data?.inputs.edges.slice(4).map((edge, index) => {
          const payloadString = Web3.utils.hexToAscii(edge.node.payload)

          // Split the string by commas to get an array of key-value pairs
          const keyValuePairs = payloadString.split(',')

          // Initialize an empty object to store the parsed data
          const parsedData = {}

          // Iterate over the key-value pairs and add them to the object
          for (const pair of keyValuePairs) {
            const [key, value] = pair.split(':')
            // Remove any leading or trailing spaces from the key and value
            parsedData[key.trim()] = value.trim()
          }

          return (
            <div key={index} className='container mx-auto p-4 h-full'>
              <div className='bg-white p-8 rounded-lg shadow-md w-[500px]'>
                <img
                  src='https://via.placeholder.com/150'
                  alt='Profile Picture'
                  className='w-32 h-32 rounded-full mx-auto'
                />
                <h2 className='text-2xl font-semibold text-center mt-4'>
                  {parsedData?.name}
                </h2>
                <p className='text-gray-600 text-center'>{parsedData?.role}</p>
                <div className='mt-4'>
                  <p className='mt-2 text-center'>{parsedData?.bio}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
