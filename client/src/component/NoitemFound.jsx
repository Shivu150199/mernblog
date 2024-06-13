import React from 'react'

const NoitemFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="text-center p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">No Items Found</h2>
      <p className="text-gray-600 mb-6">Sorry, we couldn't find any items matching your search.</p>
      <button className="btn btn-primary">Go Back</button>
    </div>
  </div>
  )
}

export default NoitemFound