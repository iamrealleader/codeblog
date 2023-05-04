import {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Editblog = () => {
  const router = useRouter();
  let [loading,setLoading] = useState(false);
  let [data,setData] = useState({
    url : '',
    catagorie : "all",
    title : "",
    description : ""
  })
  
  useEffect(  () =>{
    // Note : use must use an async function or callback function inside funtion of useEffect function
    // cal it immidiately to get the data
    // router is ready keep avoid to undefined value on refresh router query
    if(router.isReady){
      const {id} = router.query;
      if(!id){return null}
      fetchdata(id);
      }
  },[router.isReady]);


  async function fetchdata (id) {
    let res = await fetch(process.env.NEXT_PUBLIC_URL+`/getblogs?id=${id}`,{
     method : "GET",
     headers :{
       "Content-Type" : "application/json",
      }
    })
    let blog = await res.json();
    setData({ url : blog[0].url , catagorie : blog[0].catagorie , title : blog[0].title , description : blog[0].description});
   }
 
  

  const submit =  async (e) =>{
    e.preventDefault();
    setLoading(true);
    const {id} = router.query;
    let req = await fetch(process.env.NEXT_PUBLIC_URL+`/editblog?id=${id}`,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        "token" : localStorage.getItem("token")
      },
      body : JSON.stringify(data)
    })
    let res = await req.json();
    setLoading(false);
      if(res.success){
        toast.success(res.msg, {
          position: toast.POSITION.TOP_RIGHT
      });
      
      setData({
        url : '',
        title : "",
        description : ""
      });
        router.push('/');
    }
    else{
      toast.error(res.msg, {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  }

  const change = (e) =>{
    setData({...data,[e.target.name] : e.target.value});
  }

  const deleteDescription = () => {
    setData({ ...data,
    description : ""});
  }


  return (
    <>
    <Head>
      <title>Edit Blog - CodeBlog | Update your blog post and reach more readers</title>
      <meta name="description" content="Edit your blog post on CodeBlog and update your content to reach more readers. Our platform offers a user-friendly editor and a supportive community of web developers, helping you improve your writing and coding skills and attract more readers to your blog." />
      <meta name="robots" content="noindex,nofollow" />
      <meta name="keywords" content="CodeBlog, web development, blog post, update your content, user-friendly editor, supportive community" />
    </Head>

    <div className = "container mx-auto pt-16">
      <form onSubmit={(e) => submit(e)} className="w-[90vw] mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input onChange={change} value={data.title}  name="title" type="text" id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter Title of your blog"/>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
              <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an Catagories</label>
              <select name="catagorie" onChange={change} value={data.catagorie} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="all">All</option>
                <option value="coding">Coding</option>
                <option value="web-development">Web development</option>
                <option value="front-end">Front-end web development</option>
                <option value="back-end">Back-end web development</option>
              </select>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                <div className="mt-2">
                  <textarea onChange={change} value={data.description}  name="description" id="about"   rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:px-1" placeholder = "Enter a breif description"></textarea>
                </div>
                <div className="operations my-3 mx-2 flex justify-between gap-2">
                    <p className=" text-sm leading-6 text-gray-600">Explain about that topic in detail....</p>
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1.5rem"
                      width="1.5rem"
                      onClick={deleteDescription}
                      className='text-red-600'
                    >
                      <path d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-.3 1.5-.4 3-.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-.1 4.4-.4 14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390zm468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z" />
                    </svg>
                  </div>
              </div>
            </div>
          <div className="mt-2">
          <label htmlFor="url" className="block  mt-10 text-sm font-medium leading-6 text-gray-900">Enter url</label>
            <input onChange={change} value={data.url}  name="url" type="text"  id="first-name" autoComplete="given-name" className="block w-[50vw] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:px-1" placeholder='Enter Url here'/>
          </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button  onClick={() =>{router.push("/blogs/all")}} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {
                      loading ? loading && <span className='loading'> <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                      </svg>
                      Loading...
                      </span>
                      :
                     "Save"
                    }
            </button>
          <ToastContainer />
        </div>
      </form>
    </div>
    </>
  )
}



export default Editblog

