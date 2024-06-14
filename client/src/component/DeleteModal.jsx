import React from 'react'

const DeleteModal = ({onClose,btnText,heading}) => {
  return (<>
    <button type='button' className='capitalize text-sky-500 hover:text-sky-700' onClick={()=>document.getElementById('my_modal_1').showModal()}>{btnText}</button>
    <dialog id="my_modal_1" className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Delete {heading}</h3>
      <p className="py-4">Are you sure to delete this {heading}</p>
      <div className="modal-action">
        <form method="dialog" className='gap-4 flex'>
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">No I am not sure</button>
          <button onClick={onClose} className="btn bg-rose-800 text-white">Yes I am sure</button>
        </form>
      </div>
    </div>
  </dialog>
  </>
  )
}

export default DeleteModal