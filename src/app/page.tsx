import {use} from 'react';
import getLocalData from '../api/ParseLog'


const getData = async () => {
  getLocalData.then(res=>res)
}

export default function Home() {
  const test = use(getData())
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  )
}
