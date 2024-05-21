import React from 'react'

const Fotter = () => {
  return (
    <footer className="bg-blue-100 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-lg font-bold mb-4">Shop Matcha</h2>
            <ul>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Just the Matcha
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  The Trial Kit
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Wholesale & Bulk
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Teaware
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-lg font-bold mb-4">Learn</h2>
            <ul>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Matcha Recipes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Caffeine Content
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Health Benefits
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-lg font-bold mb-4">More from Tenzo</h2>
            <ul>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Affiliate
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  FAQ's
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Sign In
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-lg font-bold mb-4">Let's Stay Connected</h2>
            <p className="text-gray-700 mb-4">
              Enter your email to unlock 10% OFF.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border border-gray-400 rounded-l"
              />
              <button
                type="submit"
                className="p-2 bg-gray-800 text-white rounded-r"
              >
                SUBMIT
              </button>
            </form>
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-4">Follow us</h2>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  <i className="fab fa-pinterest"></i>
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          &copy; {new Date().getFullYear()} MERN Blog.com |{' '}
          <a href="#" className="hover:underline">
            Terms of Service
          </a>{' '}
          |{' '}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="#" className="hover:underline">
            Refund Policy
          </a>{' '}
          |{' '}
          <a href="#" className="hover:underline">
            Accessibility Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Fotter
