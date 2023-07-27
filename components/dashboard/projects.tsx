'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";
import { useAdminState } from "context/admin";


/* This example requires Tailwind CSS v2.0+ */

const priceId = process.env.NEXT_PUBLIC_STANDARD_PRICE_ID;
const API_URL_CHECKOUT = `${process.env.NEXT_PUBLIC_API_BASE_URL}/create-checkout-session`;


const GET_TODOS = gql`
  subscription {
    instances {
      id
      created_at
      name
    }
  }
`;


export default function ProjectsList() {
  const router = useRouter()
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, showError] = useState("");
  const { data, loading } = useSubscription(GET_TODOS);
  console.log("data, loading: ", data, loading);

  useEffect(() => {
    if (data && data.instances) {
      setProjects(data.instances)
    }
  }, [data])

  useEffect(() => {
    const email = Cookies.get("email")
    if (email) {
      createCustomer(email)
    }
  }, [])

  const createCustomer = async (email: string) => {
    const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/create-customer/`;
    const jwt = Cookies.get("jwt");
    const response = await axios.post(
      API_URL,
      {
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    if (response.status === 200 && response.data) {
      const { customer } = response.data;
      Cookies.set("customer", customer.id);
    }
  };


  const createSubscription = async (priceId: string | undefined) => {
    const jwt = Cookies.get("jwt");
    const customer = Cookies.get("customer");
    const email = Cookies.get("email")
    const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/create-subscription`;
    const values = {
      priceId: priceId,
      Email: email,
    };
    setIsLoading(true);
    axios
      .post(
        API_URL,
        {
          ...values,
        },
        {
          headers: {
            // 'application/json' is the modern content-type for JSON, but some
            // older servers may use 'text/json'.
            // See: http://bit.ly/text-json
            // 'Content-Type': 'text/plain',
            Authorization: `Bearer ${jwt}`,
            customer: `${customer}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.type === "free_trail") {
          // do nothing
          // just Close payment card
          // closePaymentCard();
        }
        setIsLoading(false);
      })
      .catch((error) => {
        showError("Oops something went wrong");
        setTimeout(() => {
          showError("");
        }, 3000);
      });
  };

  return (
    <div className="h-full flex flex-col bg-scale-300">
      {error && error !== "" && (
        <div className="p-3 bg-red-600 rounded-b-lg break-words text-white">
          {error}
        </div>
      )}
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        {projects && projects.length ? (
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-scale-900 sm:rounded-lg">
              <table className="min-w-full divide-y divide-scale-900">
                <thead className="bg-scale-900">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-scale-900">
                  {projects.map((project: any) => (
                    <tr
                      key={project.name}
                      onClick={() => {
                        router.push(`/project/${project.id}/home`);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {project.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {project.backend_endpoint}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-brand-900 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
      {!projects || projects.length === 0 ? (
        <>
          <p className="text-base dark:text-white text-center">
            You dont have any projects yet click here 👇 to start one
          </p>
          <div className="flex justify-center">
            <button
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white inline-block w-96 font-bold py-2 sm:px-6 lg:px-8 mt-4 sm:-mx-6 lg:-mx-8 rounded align-middle"
              onClick={() => createSubscription(priceId)}
            >
              {isLoading ? (
                <>
                  <svg
                    role="status"
                    className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                <>New Project</>
              )}
            </button>
          </div>
        </>
      ) : (
        <div className="p-6 mt-6 w-full bg-white rounded-lg border border-brand shadow-md border-gray-700">
          <form
            className="w-full max-w-sm"
            action={API_URL_CHECKOUT}
            method="POST"
          >
            <input type="hidden" name="lookup_key" value="STANDARD_AMERICA" />
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3"></div>
              <label className="md:w-2/3 block text-gray-500 font-bold">
                <input className="mr-2 leading-tight" type="checkbox" />
                <span className="text-sm">Bill me for $50/mo!</span>
              </label>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-brand-900 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  id="checkout-and-portal-button"
                >
                  Pay with Stripe
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
