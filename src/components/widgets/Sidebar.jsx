import React from "react";
import Avatar from '/avatar.png'
import Hooks from '/hooks.png'
import Logout from '/logout.png'
import { FiSearch } from 'react-icons/fi'
import { CiGrid42 } from 'react-icons/ci'
import { RxHamburgerMenu } from 'react-icons/rx'

export default function Sidebar() {
  return (
    <React.Fragment>
      <div className="w-full p-4 mt-4 mb-16 min-h-screen lg:w-56">

        <div className="flex items-center gap-2">
          <img src={Avatar} alt="avatar" className="w-10 h-10" />
          <div className="flex flex-col">
            <p className="text-sm">Welcome back,</p>
            <h3 className="font-bold text-xl">Drax</h3>
          </div>
        </div>

        <div className="min-h-screen my-12 flex flex-col justify-between text-slate-600 text-sm">

          <div className="mt-8" id="satu">

            <div className="flex items-center justify-between mb-16 py-3">

              <div className="flex gap-3 items-center ml-2">
                <FiSearch />
                <label htmlFor="#">Search</label>
              </div>

              <RxHamburgerMenu className="mr-2"/>

            </div>

            <div className="flex items-center justify-between mb-16 bg-white py-3">

              <div className="flex gap-3 items-center ml-2">
                <CiGrid42 />
                <label htmlFor="#">Data Table</label>
              </div>

              <RxHamburgerMenu className="mr-2"/>

            </div>
          </div>

          <div className="mt-12" id="dua">

            <div className="flex items-center justify-between mb-8">

              <div className="flex gap-3 items-center py-3">
                <img src={Hooks} alt="support" className="w-3 h-3 ml-2" />
                <label htmlFor="#">Support</label>
              </div>
            </div>

            <div className="flex items-center justify-between mb-5">

              <div className="flex gap-3 items-center py-3">
                <img src={Logout} alt="logout" className="w-3 h-3 ml-2" />
                <label htmlFor="#">Sign Out</label>
              </div>
            </div>
          </div>


        </div>
      </div>
    </React.Fragment>
  )
}