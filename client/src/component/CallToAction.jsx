import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 md:flex-row p-4 border border-slate-600 rounded-tr-2xl rounded-bl-2xl'>
<div>
<h2 className='text-xl font-medium text-center mb-4'>Want to learn more about javascript and want to watch funny meme?</h2>
<p className='tracking-wide text-center capitalize mb-3'>check out my Instagram profile</p>
<button className='btn w-full bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-tr-2xl rounded-bl-2xl mb-3 '>Follow me on Instagram</button>
</div>
<div className='p-2 '>
    <img className="rounded-tr-2xl rounded-bl-2xl max-h-80 w-full object-cover" src="https://gtecvirtualuniversity.com/wp-content/uploads/2020/05/javascript.jpg" alt="" />
</div>

    </div>
  )
}

export default CallToAction