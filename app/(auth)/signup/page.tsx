'use client'

// export const metadata = {
//   title: 'Sign Up - Stellar',
//   description: 'Page description',
// }

import Link from 'next/link'
import AuthLogo from '../auth-logo'
import { useState } from 'react';
import { inDevEnvironment } from '@/utils/dev';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

const signup = async (username: string, password: string, loading: Function, navigate: Function) => {
  let AUTH_URL;
  if (inDevEnvironment) {
    // In dev environment we have hasura batteries running separately
    // but in prod we run them on the same server
    AUTH_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
  } else {
    AUTH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;
  }
  const values = {
    email: username,
    password: password,
  };
  loading(true);
  // if (typeof username == typeof undefined || username.trim() == "") {
  //   loading(false);
  //   return;
  // }
  // if (typeof password == typeof undefined || password.trim() == "") {
  //   loading(false);
  //   return;
  // }
  const signupResp = await axios.post(`${AUTH_URL}/signup`, {
    email: username,
    password: password,
  },
  {headers: {'Content-Type': 'application/json'}, withCredentials : true}
  )
  loading(false);
  console.log(signupResp);
  if (signupResp) {
    const {access, refresh} = signupResp.data;
    Cookies.set("jwt", access, { expires: 7 });
    Cookies.set("refresh", refresh, { expires: 7 });
    Cookies.set("email", username);
    localStorage.setItem("user", JSON.stringify(signupResp));
    navigate("/dashboard");
  }
};

export default function SignUp() {
  const router = useRouter()
  const [ loading, setIsLoading ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  return (
    <>
      {/* Page header */}
      <div className="max-w-3xl mx-auto text-center pb-12">
        {/* Logo */}
        <AuthLogo />
        {/* Page title */}
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">Create your free account</h1>
      </div>

      {/* Form */}
      <div className="max-w-sm mx-auto">

        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="email">Email <span className="text-rose-500">*</span></label>
              <input id="email" className="form-input w-full" type="email" placeholder="markrossi@company.com" required onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="password">Password <span className="text-rose-500">*</span></label>
              <input id="password" className="form-input w-full" type="password" autoComplete="on" required onChange={(e) => setPassword(e.target.value)}/>
            </div>

          </div>
          <div className="mt-6">
            <button className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 w-full shadow-sm group" onClick={() => { signup(email, password, setIsLoading, router.push) }} disabled={loading}>
              Sign Up 
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

              {/* <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span> */}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <div className="text-sm text-slate-400">
            Already have an account? <Link className="font-medium text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out" href="/signin">Sign in</Link>
          </div>
        </div>

      </div>
    </>
  )
}
