import { useSession, getSession, signIn, signOut } from "next-auth/react"
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Todo from "../component/todo";
import Link from 'next/link'
import axios, { } from 'axios'
export default function Home({ note }) {
  const { data: session } = useSession();
  // console.log(session)
  if (session) {
    return (
      <div className="p-4" data-theme="dark">
     
        <div className="min-h-screen bg-base-200 max-w-[600px] rounded-md shadow-lg m-auto pt-10">
          <div className="text-right p-4 flex gap-2 justify-end items-center">
            <h1 className="text-xs md:text-xl p-1">
              Welcome {session?.user?.name}
            </h1>
            <button className="btn btn-xs btn-outline" onClick={() => signOut()}>Sign out</button>
          </div>
          <div className="text-center ">
            <input type="hidden" className='flex mt-2 m-auto max-w-[350px] justify-between items-center border-2 border-[#ffffff] border-solid pl-2 pr-2' />
            <Todo note={note} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-4" data-theme="dark">
      <div className="min-h-screen bg-base-200 max-w-[600px] rounded-md shadow-lg m-auto pt-10">
        <div className="text-right p-4 flex gap-2 justify-end items-center">
          <h1 className="text-xs md:text-xl">
            Welcome Guest
          </h1>
          <button className="btn btn-xs btn-outline" onClick={() => signIn()}>Sign in</button>
        </div>
        <div className="text-center ">
          <div className="text-2xl md:text-3xl text-error ">
            If you add a note , please Sign in
          </div>
        </div>
      </div>
    </div>
  );
}


export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { data } = await axios.get(`https://next-js-practice-srakib17.vercel.app/api/todo/${session?.user?.email}`)

  return { props: { note: data } }
}
