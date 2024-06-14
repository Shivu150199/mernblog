import React from 'react'

const About = () => {
  return (
  <>
  <div className="carousel w-full h-1/2">
  <div id="item1" className="carousel-item w-full h-1/2">
    <img src="https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?t=st=1718349956~exp=1718353556~hmac=76a700a7d214f39f95178fd3a042b867cbc42d46ba905077782bb4f55dc7322f&w=740" className="w-full h-[50vh] object-cover" />
  </div> 
  <div id="item2" className="carousel-item w-full ">
    <img src="https://img.freepik.com/free-vector/cloud-warehouse-data-copy-storage-server-room-connection-with-cloud_39422-568.jpg?t=st=1718349985~exp=1718353585~hmac=bb16316c51b48ce4984d4f6fa94ecba7e5d5aecceab265e2675d54f2102d47b5&w=740" className="w-full h-[50vh] object-cover" />
  </div> 
  <div id="item3" className="carousel-item w-full">
    <img src="https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg?t=st=1718350008~exp=1718353608~hmac=7d3c6a80eb44ab29c6c250809eb2024f7ff778b5dbab7dafcb0934e7b6fa2145&w=740" className="w-full h-[50vh] object-cover" />
  </div> 
  <div id="item4" className="carousel-item w-full">
    <img src="https://img.freepik.com/free-vector/day-programmer-poster_1308-114247.jpg?t=st=1718350065~exp=1718353665~hmac=288178b25ea45fa49c07f56a7dc11d40569cf9e611cf3ad3c3bb2db03b095c76&w=740" className="w-full h-[50vh] object-cover" />
  </div>
</div> 
<div className="flex justify-center w-full py-2 gap-2">
  <a href="#item1" className="btn btn-xs">1</a> 
  <a href="#item2" className="btn btn-xs">2</a> 
  <a href="#item3" className="btn btn-xs">3</a> 
  <a href="#item4" className="btn btn-xs">4</a>
</div>
  <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen flex items-center justify-center p-6">
      <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg transform transition duration-500 hover:scale-105">
        <h1 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">About Us</h1>
        <p className="text-gray-700 mb-8 text-center">
          Welcome to <span className="text-secondary font-semibold">Code Crafter</span>!
        </p>
        <div className="space-y-12">
          <section className="flex flex-col md:flex-row items-center">
            <img src='https://static.vecteezy.com/system/resources/previews/002/099/443/non_2x/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-vector.jpg' alt="Mission" className="w-full md:w-1/2 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4" />
            <div>
              <h2 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">Our Mission</h2>
              <p className="text-gray-600 mb-3">
                Our goal is to build a collaborative space for developers to:
              </p>
              <ul className="list-disc list-inside ml-4 text-gray-600">
                <li>Share Knowledge</li>
                <li>Learn and Grow</li>
                <li>Connect and Collaborate</li>
              </ul>
            </div>
          </section>
          <section className="flex flex-col md:flex-row items-center">
            <img src='https://img.freepik.com/free-vector/day-programmer-poster_1308-114247.jpg?t=st=1718350065~exp=1718353665~hmac=288178b25ea45fa49c07f56a7dc11d40569cf9e611cf3ad3c3bb2db03b095c76&w=740' alt="Team" className="w-full md:w-1/2 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4" />
            <div>
              <h2 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">Who We Are</h2>
              <p className="text-gray-600">
                <span className="text-secondary font-semibold">Welcome Code Creafter's</span> was founded by <span className="text-secondary font-semibold">Shivam singh gautam</span>, a passionate developer with a vision to create a hub for developers to come together and share their expertise.
              </p>
            </div>
          </section>
          <section className="flex flex-col md:flex-row items-center">
            <img src='https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?t=st=1718349956~exp=1718353556~hmac=76a700a7d214f39f95178fd3a042b867cbc42d46ba905077782bb4f55dc7322f&w=740' alt="What We Offer" className="w-full md:w-1/2 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4" />
            <div>
              <h2 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">What We Offer</h2>
              <ul className="list-disc list-inside ml-4 text-gray-600">
                <li>Expert Articles</li>
                <li>User Contributions</li>
                <li>Resources and Tutorials</li>
                <li>Community Support</li>
              </ul>
            </div>
          </section>
          <section className="text-center">
            <h2 className="text-3xl font-semibold mb-3 text-accent">Join Us</h2>
            <p className="text-gray-600 mb-4">
              We invite you to be a part of our community. Whether you’re here to read the latest articles, share your own knowledge, or connect with fellow developers, we’re glad to have you with us.
            </p>
      
          </section>
        </div>
      </div>
    </div>
  </>
  )
}

export default About
