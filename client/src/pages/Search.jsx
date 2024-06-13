import axios from 'axios'
import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PostCard from '../component/PostCard'
import NoitemFound from '../component/NoitemFound'

const Search = () => {
    const navigate=useNavigate()
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'asc',
        category: 'uncategorised'
    })
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(false)
    const [error,setError]=useState(null)
    const [showMore, setShowMore] = useState(false)
    const path = useLocation()
    useEffect(() => {
        const urlParams = new URLSearchParams(path.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        const sortFromUrl = urlParams.get('sort')
        const categoryFromUrl = urlParams.get('category')
        if (urlParams) {
            setSidebarData({ ...sidebarData, searchTerm: searchTermFromUrl, sort: sortFromUrl, category: categoryFromUrl })
        }

const fetchPosts=async()=>{
    const searchQuery=urlParams.toString()
try{
    setLoading(true)
    const {data}=await axios.get(`/api/post/v1/get-post?${searchQuery}`)
  
    setPost(data.posts)
    if(data.post.length>9){
        setShowMore(true)
    }else{setShowMore(false)}
    setLoading(false)
    setError(null)

}
catch(err){
setLoading(false)
setError(err)
}

}
fetchPosts()

    }, [path.search])
  
const handleChange=(e)=>{
    if(e.target.id=='searchTerm'){
        setSidebarData({...sidebarData,searchTerm:e.target.value})
    }
    if(e.target.id=='sort'){
        setSidebarData({...sidebarData,sort:e.target.value})
    }
    if(e.target.id=='category'){
        setSidebarData({...sidebarData,category:e.target.value})
    }
}
const handleSubmit=(e)=>{
e.preventDefault()
const urlParams=new URLSearchParams(path.search)
urlParams.set('searchTerm',sidebarData.searchTerm)
urlParams.set('sort',sidebarData.sort)
urlParams.set('category',sidebarData.category)
let searchQuery=urlParams.toString()
navigate(`/search?${searchQuery}`)
}

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b border-slate-500 md:border-r md:border-slate-500 min-h-screen md:w-30 lg:w-30'>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term :</label>
                    <TextInput className='w-full' placeholder='search...' id='searchTerm' type='text' value={sidebarData.searchTerm} onChange={handleChange} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Sort :</label>
                        <Select className='w-full' id='sort' value={sidebarData.sort} onChange={handleChange}>
                            <option value="desc">Latest</option>
                            <option value="asc">oldest</option>

                        </Select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Category :</label>
                        <Select className='w-full' id='category' value={sidebarData.category} onChange={handleChange}>
                            <option value="uncategorised">Uncategorised</option>
                            <option value="reactjs">React js</option>
                            <option value="nextjs">Next js</option>
                            <option value="javascript">Javascript</option>

                        </Select>
                    </div>
                    <Button type='submit' className=''>Apply Filters</Button>
                </form>
            </div>


            <div className='w-full'>
                <h1 className='text-4xl font-bold text-center py-4 border-b border-slate-500'>Post result</h1>
<div className='flex flex-wrap gap-4 p-6 items-center justify-center'>
{
   !loading&&post.length==0&&<NoitemFound/>
}
{loading&&<span className="loading loading-dots loading-lg"></span>}
{!loading&&post&&post.map((item)=>{
return <PostCard key={item._id} post={item}/>
})}

</div>

            </div>

        </div>
    )
}

export default Search