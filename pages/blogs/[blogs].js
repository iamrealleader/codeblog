import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect , useContext } from 'react'
import User from '../../components/Context';
import Link from 'next/link';
import blogHome from "../../public/blogHome.jpg";
import loadinggif from "../../public/loading.gif";

const Blogs = ({initialBlog}) => {
    const {login} = useContext(User);
    const [blogs, setBlogs] = useState(initialBlog);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        function handleScroll() {
            if ((window.innerHeight + window.scrollY+300) >= document.body.scrollHeight && !isLoading && hasMore) {
                setIsLoading(true);
                setPage(page => page + 1);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore]);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_URL+`/getblogs?catagorie=${blogs[0].catagorie}&page=${page}`);
                const newBlogs = await res.json();
                setBlogs(prevBlogs => [...prevBlogs, ...newBlogs]);
                setHasMore(newBlogs.length > 0);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBlogs();
    }, [page]);

  return (
    <>
    <Head>
      <title>CodeBlog | Latest articles and tutorials on web development</title>
      <meta name="description" content="Discover the latest articles and tutorials on web development from CodeBlog. Our community-driven platform offers a wealth of user-generated content on topics like HTML, CSS, JavaScript, and more, all designed to help you take your web development skills to the next level." />
      <meta name="robots" content="index,follow" />
      <meta name="keywords" content="CodeBlog, web development, coding challenges, community-driven platform, tutorials, articles" />
    </Head>

     <Image  priority className="relative w-full h-[22rem] bg-top object-cover" src={blogHome} alt="this is home blog image">
       </Image>
       <div className="absolute top-[13rem] left-[15vw] md:left-[35vw]">
        <h1 className="font-bold text-5xl text-white">Welcome</h1>
        <button className=" bg-green-500 hover:bg-green-400 text-white font-bold font-serif radiu rounded-xl px-5 py-2" ><Link href={login ? "/createblog" : "/login"}> Create Blog</Link></button>
        <button className=" bg-blue-700 hover:bg-blue-400 text-white font-bold font-serif radiu rounded-xl px-5 py-2 m-2" ><Link href="/about"> Learn more</Link></button>
       </div>
 
  <div className="w-full">
  <h1 className="font-bold text-3xl font-serif text-center py-5">Latest Blogs</h1>
            <div className="navbar boder-5 border-black my-5">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-bold font-mono text-2xl my-3">Catagories</h1>
                  <div className="links mx-7">
                    <Link className="my-1 text-[1.1rem] mx-3" href="/blogs/all">All</Link>
                    <Link className="my-1 text-[1.1rem] mx-3" href="/blogs/coding">Coding</Link>
                    <Link className="my-1 text-[1.1rem] mx-3" href="/blogs/web-development">Web development</Link>
                    <Link className="my-1 text-[1.1rem] mx-3" href="/blogs/front-end">Front-end</Link>
                    <Link className="my-1 text-[1.1rem] mx-3" href="/blogs/back-end">Back-end</Link>
                  </div>
                </div>
            </div>
            <div className=" w-[95vw] mx-auto flex justify-center flex-wrap gap-5 transition-transform">
            {
         blogs && blogs.length > 0 ? blogs.map( (blog) =>{
            return(
                  <Link key={blog._id} href={`/getBlog?id=${blog._id}`}>
                    <article className="w-[20rem]">
                    <img className="w-[20rem] h-[13rem] object-cover hover:scale-105" src={blog.url} alt={blog.title}/>
                      <h4 id={blog.catagorie} className="catagorie">{(blog.catagorie)}</h4>
                      <h1 className="title font-bold text-xl">{blog.title.length > 25 ? (blog.title).substring(0,25) + '...' : blog.title}</h1>
                      <p className="break-words description font-semibold">{blog.description.length > 80 ? (blog.description).substring(0,80) + '...' : blog.description}</p>
                    </article>
                   </Link>
                    )
                  })
                  : <div className="error text-red-600 font-serif font-bold">No blog Aviable</div>
                }
            </div>
          {isLoading && <div className='my-10 flex justify-center items-center'>
            {/* <svg className='text-5xl bg-blue-500 text-red-600' aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
            </svg> */}
            <Image src={loadinggif} width={70} height={70}></Image>
            </div>
            }
  </div>
  </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { blogs: 'all' } },
      { params: { blogs: 'coding' } },
      { params: { blogs: 'web-development' } },
      { params: { blogs: 'front-end' } },
      { params: { blogs: 'backend-end' } } 
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(process.env.NEXT_PUBLIC_URL+`/getblogs?catagorie=${params.blogs}&page=1`);
  const initialBlog = await res.json();
  return {
    props: { initialBlog },
  }
}

  

export default Blogs
