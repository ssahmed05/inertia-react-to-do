import React, { Fragment, useCallback } from 'react'

const Modal = ({ show, onClose, title, children }) => {

    const handleInputChange = useCallback((event) => {

        onClose(event);

      }, [onClose])
    return (
        <Fragment>

      {show ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200  bg-indigo-400 text-white rounded-t">
                  <h3 className="text-2xl font-semibold">
                    {title ?? ""}
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleInputChange(false)}
                  >
                    <span className="text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="w-full my-4 max-h-full text-blueGray-500 text-lg leading-relaxed">
                  {children}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center bg-indigo-400 justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleInputChange(false)}
                  >
                    Close
                  </button> */}
                  {/* <button
                    className="bg-indigo-500 text-white hover:bg-indigo-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleInputChange(false)}
                  >
                    Save Changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

        </Fragment>
    )
}

export default Modal
