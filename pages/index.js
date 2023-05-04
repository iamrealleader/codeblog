import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import img from "../public/blog.jpg";
import coding from "../public/coding.png";
import front from "../public/front.png";
import back from "../public/back.png";
import web from "../public/web.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }) { 
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
    <Head>
      <title>CodeBlog - Your Ultimate Destination for Expert Web Development Solutions</title>
      <meta name="description" content="Discover expert solutions to your toughest web development challenges with CodeBlog. Our community-driven platform offers a vast library of user-generated content, including tutorials, code snippets, and Q&A forums, all designed to help you take your web development skills to the next level. Whether you're a beginner or an experienced pro, CodeBlog is the ultimate destination for finding solutions to complex coding problems. Join our community and start building amazing websites today!" />
      <meta name="keywords" content="Codeblog, web development, coding problems, solutions, web developer"/>
    </Head>
    <Image  priority className="relative w-full h-[25rem] bg-top object-cover" src={img} alt="this is home blog image">
       </Image>
      <div className="absolute top-[13rem] left-[22vw] md:left-[40vw]">
        <h1 className="font-bold text-5xl">Welcome</h1>
        <p className="text-xl text-blue-600 m-2 ">to Code-blog</p>
        <button className=" bg-green-600 text-white font-bold font-serif radiu rounded-xl px-5 py-2 hover:bg-green-400">
          <Link href="/blogs/all"> Explore</Link>
        </button>
        <button className=" bg-blue-700 hover:bg-blue-400 text-white font-bold font-serif radiu rounded-xl px-5 py-2 m-1">
          <Link href="/about"> Learn more</Link>
        </button>
      </div>
      <div className="crousal w-[95vw] mx-auto my-10 trasition-all">
        <h1 className="text-3xl text-blue-700 font-bold font-serif my-5 ">
          Latest Blogs
        </h1>
        <Carousel
          removeArrowOnDeviceType={["tablet", "mobile"]}
          autoPlay={true}
          infinite={true}
          responsive={responsive}
        >
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => {
              return (
                <Link key={blog._id} href={`/getBlog?id=${blog._id}`}>
                  <div className="w-[20rem] mx-auto" id={blog._id}>
                   
                     <Image unoptimized width={100} height={100} className="w-[20rem] h-[13rem] object-cover" src={blog.url} alt={blog.title}></Image>
                    <h4 id={blog.catagorie} className="catagorie">
                      {blog.catagorie}
                    </h4>
                    <h1 className="title font-bold text-xl">
                      {blog.title.length > 20
                        ? blog.title.substring(0, 20) + "..."
                        : blog.title}
                    </h1>
                    <p className="break-words description font-semibold">
                      {blog.description.length > 25
                        ? blog.description.substring(0, 25) + "..."
                        : blog.description}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="error text-red-600 font-serif font-bold">
              No blog Aviable
            </div>
          )}
        </Carousel>
      </div>
      <div className="catagories py-5 bg-slate-100">
        <h1 className="text-4xl font-bold font-serif my-10 text-center">
           Catagories
        </h1>
        <div className=" w-full flex flex-row gap-5 flex-wrap justify-center">
          <Link className="w-[15rem] flex flex-col items-center" href="/blogs/coding">
            <Image src={coding} className="w-[10rem] h-[10rem] hover:scale-110 transition-transform" alt="image"></Image>
            <h1 className="font-bold text-center text-xl my-2"> Coding</h1>
          </Link>
          <Link className="w-[15rem] flex flex-col items-center" href="/blogs/web-development">
            <Image src={web} className="w-[10rem] h-[10rem] hover:scale-110 transition-transform" alt="image"></Image>
            <h1 className="font-bold text-center text-xl my-2"> Web development </h1>
          </Link>
          <Link className="w-[15rem] flex flex-col items-center" href="/blogs/front-end">
            <Image src={front} className="w-[10rem] h-[10rem] hover:scale-110 transition-transform" alt="image"></Image>
            <h1 className="font-bold text-center text-xl my-2"> Front-end web development </h1>
          </Link>
          <Link className="w-[15rem] flex flex-col items-center" href="/blogs/back-end">
            <Image src={back} className="w-[10rem] h-[10rem] hover:scale-110 transition-transform" alt="image"></Image>
            <h1 className="font-bold text-center text-xl my-2"> Back-end web development </h1>
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  let res = await fetch(
    process.env.NEXT_PUBLIC_URL+"/getblogs?catagorie=all&page=1",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        limit: 15,
      },
    }
  );
  let blogs = await res.json();
  return { props: { blogs } };
}
