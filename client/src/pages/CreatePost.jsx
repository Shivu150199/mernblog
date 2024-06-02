import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    return (
        <div className='p-3 min-h-screen max-w-3xl mx-auto gap-4'>
            <h2 className='text-center text-3xl font-bold text-slate-700 tracking-wider mb-4'>Create Post</h2>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col md:flex-row md:justify-between gap-4 '>
                    <TextInput type='text' placeholder='Title required' className='w-full' />
                    <Select>
                        <option value="uncategorised">Select a category</option>
                        <option value="Javascript">Javascript</option>
                        <option value="Reactjs">React JS</option>
                        <option value="TypeScript">TypeScript</option>
                    </Select>

                </div>
            

            </form>
            <div className='flex justify-between mt-4 p-4 border-2 border-dashed border-sky-800 items-center gap-6'>
<FileInput accept='image/*' type='file' className='w-full'/>
<button className='btn btn-primary'>Upload image</button>

            </div>
            <div className='mt-6'>
            <ReactQuill theme="snow" placeholder='Write something' className='h-72 mb-4' required />
            <Button type='submit' className='btn w-full mt-20'>Publish</Button>
            </div>


        </div>
    )
}

export default CreatePost