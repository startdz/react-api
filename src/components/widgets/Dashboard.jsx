import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import Sidebar from "./Sidebar"
import Avatar from '/avatar.png'
import { FiSearch } from 'react-icons/fi'
import { BsTrash3 } from 'react-icons/bs'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import axios from "axios"


export default function Dashboard() {

  const [cari, setCari] = useState("")
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0)
  const [colorHair, setFilterColorHair] = useState("")
  const [hapus, setHapus] = useState(false)

  const currentDate = new Date();
  const date = currentDate.getDate();
  const day = currentDate.getDay();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const tampilDataPerHalaman = 7
  const semuaDataYangAda = total //100
  const halamanSaatIni = currentPage
  const totalHalaman = Math.ceil(semuaDataYangAda / tampilDataPerHalaman)

  const hari = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    "Jum'at",
    'Sabtu'
  ];

  const hairColors = [
    "Black",
    "Brown",
    "Blond",
    "Chestnut",
    "Auburn"
  ]

  const nows = hari[day]

  const results = async () => {
    const res = await axios.get(`https://dummyjson.com/users`, {
      params: {
        page: halamanSaatIni,
        limit: 7,
        skip: skip
      }
    })
    // console.log(res.data.users)
    return setUsers(res.data.users)
  }

  const handleChangeFilterColorHair = async (color) => {
    const res = await axios.get(`https://dummyjson.com/users/filter?key=hair.color&value=${color}`, {
      params: {
        page: halamanSaatIni,
        limit: 7,
        skip: skip
      }
    })
    return setUsers(res.data.users)
  }

  const totalRows = async () => {
    const res = await axios.get(`https://dummyjson.com/users`)
    return setTotal(res.data.total)
  }

  const next = () => {
    setCurrentPage(currentPage === totalHalaman ? currentPage : currentPage + 1)
    setSkip(skip + 7)
  }
  const prev = () => {
    setCurrentPage(currentPage <= 1 ? currentPage : currentPage - 1)
    setSkip(skip - 7)
  }

  const handleChangeFilterColor = (e) => {
    setFilterColorHair(e.target.value)
    const data = e.target.value
    return handleChangeFilterColorHair(data)
  }


  const handleDropUser = async (id) => {
    try {
      const res = await axios.delete(`https://dummyjson.com/users/${id}`)
      setHapus(res.data.isDeleted)
      console.log(res.data.isDeleted)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    results()
    totalRows()
  }, [halamanSaatIni])

  return (
    <React.Fragment>
      <div className="flex gap-1 shadow-lg p-2">

        <div className="w-1/3 lg:w-56 h-full bg-zinc-100 hidden md:block rounded-tl-lg rounded-bl-lg">
          <Sidebar />
        </div>

        <div className="w-full h-full grid grid-cols-1 gap-4">
          <div className="">
            <div className="w-full h-14 p-1">
              <div className="flex justify-between items-center sm:p-4">
                <img src={Avatar} alt="avatar" className="w-12 h-12 sm:hidden" />
                <div>
                  <p className="font-bold text-xl opacity-80">Data Table</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <input type="text" id="search" placeholder="Search..." className="py-2 px-3 outline-indigo-500 focus:drop-shadow-md border-2  rounded border-indigo-400 focus:shadow-blue-500 focus:border-none md:w-80" onChange={e => setCari(e.target.value)} value={cari} />
                  <label htmlFor="search" className="sm:hidden"><FiSearch /></label>
                  <label htmlFor="search" className="hidden sm:block">
                    <button className="py-2 px-5 bg-[#5B6AD0] text-white rounded hover:bg-indigo-700">Search</button>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-full min-h-screen p-1">
              <div className="flex justify-between items-center gap-2 flex-wrap">
                <div className="ml-4">
                  <h3 className="font-semibold text-xl">Users</h3>
                  <p className="text-sm text-slate-600">{total} Results found</p>
                </div>

                <div className="flex flex-col gap-3 items-end sm:flex-row-reverse sm:gap-8">
                  <div>
                    <input type="text" placeholder={`${nows}, ${date}/${month}/${year}`} className="px-2 py-1 block  w-36 border rounded placeholder:text-end sm:w-44" readOnly />
                  </div>
                  <div>
                    <select value={colorHair} onChange={handleChangeFilterColor} className="px-5 py-2 border rounded w-48">
                      <option value={"Hair Filter"}>Hair Filter</option>
                      {hairColors.map(color => {
                        return (
                          <option key={color} defaultValue value={color}>{color}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {hapus && (
                <div className="text-center mt-8 font-bold uppercase bg-white text-red-600 border mx-auto w-96">
                  baris berhasil di hapus!
                </div>
              )}


              <div className="overflow-x-auto mt-4 py-6">
                <table className="min-w-full divide-y divide-gray-200 table-fixed text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hair Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hair Color
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.filter((item) => {
                      return cari.toLocaleLowerCase() === ''
                        ? item
                        : item.firstName.toLocaleLowerCase().includes(cari)
                    }).
                      map(user => {
                        return (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <img src={user.image} alt="avatar" className="w-10 h-10" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.firstName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.hair.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-bold">
                              {user.hair.color}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-between gap-2 items-center">
                                <Link to={`/users/${user.id}`}><HiOutlinePencilSquare /></Link>
                                <button onClick={() => handleDropUser(user.id)}><BsTrash3 /></button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}

                  </tbody>
                </table>
              </div>
              <div className="py-2 w-56 mx-auto flex justify-between text-slate-600">

                <div>
                  <button onClick={prev} className="py-2 px-3 rounded font-bold text-sm">Previous</button>
                </div>

                <div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="py-2 px-4 bg-indigo-500 rounded text-white font-semibold">
                      {currentPage}
                    </div>
                    <div className="py-2 px-4 bg-white rounded text-slate-500 font-semibold">{"/"}</div>
                    <div className="py-2 px-4 bg-indigo-500 rounded text-white font-semibold">
                      {totalHalaman}
                    </div>
                  </div>
                </div>

                <div>
                  <button onClick={next} className="py-2 px-3 rounded font-bold text-sm">Next</button>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}