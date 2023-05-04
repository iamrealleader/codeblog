import {useEffect , useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import moment from 'moment';

const GetBlog = () => {
   const router = useRouter();
  //  const {id} = router.query; 

   let [blog,setBlog] = useState({}); 
   let [token,setToken] = useState(''); 
   let [user,setUser] = useState(''); 
   let [loading,setLoading] = useState(false);

   useEffect( () =>{
  // router is ready keep avoid to undefined value on refresh
   if(router.isReady){
    const {id} = router.query;
    if(!id){return null}
    fetchdata(id);
    }
    setToken(localStorage.getItem("token"));
    setUser(localStorage.getItem("user"));
        // Note : use must use an async function or callback function inside funtion of useEffect function
        // cal it immidiately to get the data
      },[router.isReady]);

      async function fetchdata (id) {
        let req = await fetch(process.env.NEXT_PUBLIC_URL+`/getblogs?id=${id}`,{
         method : "GET",
         headers :{
           "Content-Type" : "application/json",
          }
        })
        let res = await req.json();
       setBlog(res[0]);
       }

     const click = async (id) => {
        setLoading(true);
        let req = await fetch(process.env.NEXT_PUBLIC_URL+`/deleteblog`,{
         method : "DELETE",
         headers :{
           "Content-Type" : "application/json",
           "token" : token,
           "id" : `${id}`
          }
        })
        let res = await req.json();
        setLoading(false);
        if(res.success){
          toast.success(res.msg, {
            position: toast.POSITION.TOP_RIGHT
           });  
            setTimeout(() => {
              router.push('/');
            }, 1000);
           }
      else{
        toast.error(res.msg, {
          position: toast.POSITION.TOP_RIGHT
      });
         }
       }

       

  return (
    <>
    <Head>
      <title>{blog.title}</title>
      <meta name="description" content={blog.description} />
      <meta name="robots" content="index,follow" />
      <meta name="keywords" content="CodeBlog, web development, login, account, community, tutorials, code snippets, Q&A forums" />
    </Head>
    {
      blog && <div className="container w-[95vw] mx-auto pt-20">
      <div className="information my-5 flex">
      <svg viewBox="0 0 24 24" fill="currentColor" height="3.5rem" width="3.5rem">
        <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
      </svg>
      <div className="flex flex-col mx-2 my-1">
       <p className="font-bold mx-1 text-blue-600"> By {blog.auther}</p>
      <p className="">{moment(blog.createdAt).format('MMM D, YYYY')}</p>
      </div>
      </div>
      <h1 className=" my-5 md:my-8 font-bold font-serif text-2xl mx-3">{blog.title}</h1>
      <div className="w-[95vw] h-[22rem] md:h-[70vh]">
        <Image unoptimized width={100} height={100}  className="w-full h-full object-cover"src={blog.url}  alt={blog.title}></Image>
      </div>
      <div className=" my-2 mx-2 item flex justify-between">
        <h2 className="font-bold font-sans text-green-600">
            Last Update : {moment(blog.updatedAt).format('MMM D, YYYY')}
           </h2>
           { 
           user === blog.email &&
            <div className="icons flex gap-2">
                <Link href={`/editblog?id=${blog._id}`} >
                    <svg className="text-yellow-600" viewBox="0 0 24 24" fill="currentColor" height="1.5rem" width="1.5rem" >
                    <path d="M16 2.012l3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z" />
                    </svg>
                </Link>
                <button onClick={ () => click(blog._id)}>
                    {
                      loading ? loading && <span className='loading'> <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                      </svg>
                      </span>
                      :
                      <svg className="text-red-500" viewBox="0 0 24 24" fill="currentColor" height="1.5rem" width="1.5rem">
                      <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" />
                      </svg>
                    }
                  </button>
                  <ToastContainer />
              </div>
            }
      </div> 
      <div className="content my-5">
        <h4 className="email my-1"> Email : <span className="font-bold text-blue-600">{blog.email}</span></h4>
         <h3 className="font-sans my-1">Catagory : <span className="font-serif font-bold">{blog.catagorie}</span></h3>
          <p className=" my-5 font-light font-sans indent-10 text-lg">
            {blog.description}
          </p>
      </div>
    </div>
     }
    </>
  )
}

export default GetBlog
