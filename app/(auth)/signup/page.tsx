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
  if (typeof username == typeof undefined || username.trim() == "") {
    loading(false);
    return;
  }
  if (typeof password == typeof undefined || password.trim() == "") {
    loading(false);
    return;
  }
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
              Sign Up <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
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
