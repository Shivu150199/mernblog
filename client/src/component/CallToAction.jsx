import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 md:flex-row p-4 border border-slate-600 rounded-tr-2xl rounded-bl-2xl'>
<div>
<h2 className='text-xl font-medium text-center mb-4'>Want to learn more about javascript and want to watch funny meme?</h2>
<p className='tracking-wide text-center capitalize mb-3'>check out my Instagram profile</p>
<a target='_blank' href='https://www.instagram.com/gautamshivamsingh' className='btn w-full bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-tr-2xl rounded-bl-2xl mb-3 '>Follow me on Instagram</a>
</div>
<div className="carousel rounded-box w-96">
  <div className="carousel-item w-1/2">
    <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="w-full" />
  </div> 
  <div className="carousel-item w-1/2">
    <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" className="w-full" />
  </div> 
  <div className="carousel-item w-1/2">
    <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" className="w-full" />
  </div> 
  <div className="carousel-item w-1/2">
    <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" className="w-full" />
  </div> 
  <div className="carousel-item w-1/2">
    <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="w-full" />
  </div> 
  <div className="carousel-item w-1/2">
    <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" className="w-full" />
  </div> 
  <div className="carousel-item w-1/2">
    <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="w-full" />
  </div>
</div>

    </div>
  )
}

export default CallToAction