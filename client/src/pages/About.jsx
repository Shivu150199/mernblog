import React from 'react'

const About = () => {
  return (<div className="bg-gradient-to-r from-primary to-secondary min-h-screen flex items-center justify-center p-6">
      <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg transform transition duration-500 hover:scale-105">
        <h1 className="text-5xl font-bold mb-6 text-center text-blue-500">About Us</h1>
        <p className="text-gray-700 mb-8 text-center">
          Welcome to <span className="text-secondary font-semibold">Code Crafter</span>!
        </p>
        <div className="space-y-12">
          <section className="flex flex-col md:flex-row items-center">
            <img src='https://static.vecteezy.com/system/resources/previews/002/099/443/non_2x/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-vector.jpg' alt="Mission" className="w-full md:w-1/2 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4" />
            <div>
              <h2 className="text-3xl font-semibold mb-3 text-accent">Our Mission</h2>
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
            <img src='https://static.vecteezy.com/system/resources/previews/002/099/443/non_2x/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-vector.jpg' alt="Team" className="w-full md:w-1/2 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4" />
            <div>
              <h2 className="text-3xl font-semibold mb-3 text-accent">Who We Are</h2>
              <p className="text-gray-600">
                <span className="text-secondary font-semibold">Welcome Code Creafter's</span> was founded by <span className="text-secondary font-semibold">Shivam singh gautam</span>, a passionate developer with a vision to create a hub for developers to come together and share their expertise.
              </p>
            </div>
          </section>
          <section className="flex flex-col md:flex-row items-center">
            <img src='https://static.vecteezy.com/system/resources/previews/002/099/443/non_2x/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-vector.jpg' alt="What We Offer" className="w-full md:w-1/2 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4" />
            <div>
              <h2 className="text-3xl font-semibold mb-3 text-accent">What We Offer</h2>
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
  )
}

export default About
