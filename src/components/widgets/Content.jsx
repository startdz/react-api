import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from '/avatar.png'
import { useParams, Link } from 'react-router-dom'

export default function Content() {

  const { id } = useParams()
  const [img, setImg] = useState("")
  const [namaDepan, setNamaDepan] = useState("")
  const [emailUser, setEmailUser] = useState("")
  const [phoneUser, setPhoneUser] = useState("")
  const [typeRambut, setTypeRambut] = useState()
  const [warnaRambut, setWarnaRambut] = useState("")


  useEffect(() => {

    const singleData = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/users/${id}`);

        setImg(res.data.image)
        setNamaDepan(res.data.firstName)
        setEmailUser(res.data.email)
        setPhoneUser(res.data.phone)
        setTypeRambut(res.data.hair.type)
        setWarnaRambut(res.data.hair.color)

        // console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    singleData()
  }, [])



  const updateForm = async (e) => {
    e.preventDefault();

    fetch(`https://dummyjson.com/users/${id}`, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: namaDepan,
        email: emailUser,
        phone: phoneUser,
        hair : {
          type: typeRambut,
          color: warnaRambut
        }
      })
    })
      .then(res => res.json())
      .then(error => console.log(error));

  }

  return (
    <React.Fragment>
      <div className="w-full p-4 bg-gray-200 fixed border-b border-slate-200">
        <nav className="flex justify-between items-center">
          <div id="kiri" className="flex gap-3 items-center">
            <img src={Avatar} alt="avatar" className="w-10 h-10" />
            <div className="flex flex-col text-zinc-700">
              <small className="font-semibold">Welcome back,</small>
              <h3 className="font-bold text-lg">Drax</h3>
            </div>
          </div>
          <div id="kanan">
            <Link to={'/'} className="px-4 py-2 bg-indigo-600 text-zinc-50 rounded font-bold hover:bg-indigo-700">Back to Home</Link>
          </div>
        </nav>
      </div>

      <React.Fragment>

        <div className="w-full bg-white pt-24">
          <div className="container mx-auto p-4">
            <div className="p-2">
              <img src={img} alt="avatar" className="w-32 h-32 mx-auto border border-indigo-100 opacity-95  rounded-full shadow-2xl" />
            </div>
            <div>
              <form onSubmit={updateForm} className="grid grid-cols-2 gap-2">
                <div className=" py-2 px-4 shadow-md">
                  <label htmlFor="namaDepan" className="font-semibold tracking-wide text-slate-700 mb-2 block w-44">First Name</label>
                  <input type="text" defaultValue={namaDepan} className="block outline-none w-44 border-b border-indigo-500 font-bold tracking-widest uppercase text-slate-800 truncate focus:outline focus:outline-indigo-200 focus:border-none rounded" onChange={e => setNamaDepan(e.target.value)} id="namaDepan" />
                </div>
                <div className=" py-2 px-4 shadow-md">
                  <label htmlFor="email" className="font-semibold tracking-wide text-slate-700 mb-2 block w-44">Email</label>
                  <input type="text" defaultValue={emailUser} className="block outline-none w-44 border-b border-indigo-500 font-bold tracking-widest text-slate-800 truncate focus:outline focus:outline-indigo-200 focus:border-none rounded" onChange={e => setEmailUser(e.target.value)} id="email" />
                </div>
                <div className=" py-2 px-4 shadow-md">
                  <label htmlFor="phone" className="font-semibold tracking-wide text-slate-700 mb-2 block w-44">Phone</label>
                  <input type="text" defaultValue={phoneUser} className="block outline-none w-44 border-b border-indigo-500 font-bold tracking-widest  text-slate-800 truncate focus:outline focus:outline-indigo-200 focus:border-none rounded" onChange={e => setPhoneUser(e.target.value)} id="phone" />
                </div>
                <div className=" py-2 px-4 shadow-md">
                  <label htmlFor="gayarambut" className="font-semibold tracking-wide text-slate-700 mb-2 block w-44">Hair Type</label>
                  <input type="text" defaultValue={typeRambut} className="block outline-none w-44 border-b border-indigo-500 font-bold tracking-widest  text-slate-800 truncate focus:outline focus:outline-indigo-200 focus:border-none rounded" onChange={e => setTypeRambut(e.target.value)} id="gayarambut" />
                </div>
                <div className=" py-2 px-4 shadow-md">
                  <label htmlFor="warna" className="font-semibold tracking-wide text-slate-700 mb-2 block w-44">Hair Color</label>
                  <input type="text" defaultValue={warnaRambut} className="block outline-none w-44 border-b border-indigo-500 font-bold tracking-widest  text-slate-800 truncate focus:outline focus:outline-indigo-200 focus:border-none rounded" onChange={e => setWarnaRambut(e.target.value)} id="warna" />
                </div>
                <div className="flex items-center justify-center">
                  <button className="px-6 py-2 border w-32 font-bold text-slate-100 bg-indigo-600 rounded tracking-wide uppercase hover:bg-indigo-700 hover:w-44 transition-all duration-300 ease-in-out">Edit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </React.Fragment>

    </React.Fragment>
  )
}