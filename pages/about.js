import React from 'react'
import about from "../public/about.png"
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

const About = () => {
  return (
      <>
      <Head>
        <title>About - CodeBlog | Expert solutions for web developers</title>
        <meta name="description" content="Codeblog provides step-by-step solutions to common web development problems. Learn how to solve issues in frontend technologies like HTML, CSS, JavaScript, and React, as well as backend technologies like the MERN stack."/>
        <meta name="robots" content="index,follow" />
        <meta name="keywords" content="CodeBlog, web development, coding challenges, community-driven platform" />
     </Head>
    <div className='mx-5 mt-16'>
        <div className='about'>
          <div className="flex flex-col-reverse md:flex-row justify-center items-center">
            <div className="aboutContent mx-2 md:mx-5">
              <h1 className='text-3xl md:text-5xl font-bold my-2'>About us</h1> 
              <p>CodeBlog is the ultimate resource for web developers seeking expert guidance and practical solutions to common coding challenges. Our community-powered platform features a vast library of user-generated content, including detailed tutorials, code snippets, and Q&A forums, all aimed at helping developers overcome the toughest obstacles in web development. Whether you are a beginner or an experienced pro, CodeBlog is the go-to destination for finding solutions to complex coding problems. Join our community and take your web development skills to the next level today!</p>
              <Link href='/blogs/all'><button className="py-2 px-7 rounded-lg my-3 mx-1 text-lg font-bold  bg-green-600 text-white hover:bg-green-400">Explore</button></Link>
              <div className="links flex my-2 gap-2 items-center transition-transform">
                <Link href="/">
                  <svg viewBox="0 0 960 1000" fill="currentColor" height="1.8rem" width="1.8rem" className=" hover:scale-110 text-blue-500">
                    <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980c-132 0-245-47-339-141S0 632 0 500c0-133.333 47-246.667 141-340S348 20 480 20M362 698V386h-96v312h96m-48-352c34.667 0 52-16 52-48s-17.333-48-52-48c-14.667 0-27 4.667-37 14s-15 20.667-15 34c0 32 17.333 48 52 48m404 352V514c0-44-10.333-77.667-31-101s-47.667-35-81-35c-44 0-76 16.667-96 50h-2l-6-42h-84c1.333 18.667 2 52 2 100v212h98V518c0-12 1.333-20 4-24 8-25.333 24.667-38 50-38 32 0 48 22.667 48 68v174h98" />
                  </svg>
                </Link>

                <Link href="https://www.facebook.com/?_rdc=1&_rdr" target='_blank'>
                  <svg fill="currentColor" viewBox="0 0 16 16" height="1.7rem" width="1.7rem" className=" hover:scale-110 text-blue-700">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </Link>

                <Link href="https://www.instagram.com/iamrealsabir" target="_blank">
                  <svg viewBox="0 0 1024 1024" fill="currentColor" height="2rem" width="2rem" className=" hover:scale-110 text-pink-500">
                    <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 01-47.9 47.9z" />
                  </svg>
                </Link>

                <Link href="https://wa.me/+923416419195" target="_blank">
                  <svg viewBox="0 0 24 24" fill="currentColor" height="2rem" width="2rem" className=" hover:scale-110 text-green-500">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M2.004 22l1.352-4.968A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 00-.371.1 1.293 1.293 0 00-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 006.9 9.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.448 9.448 0 003.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 00.833-.231 4.83 4.83 0 00.383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 00-.177-.041.482.482 0 00-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 01-.368.13 1.416 1.416 0 01-.191-.066c-.124-.052-.167-.072-.252-.109l-.005-.002a6.01 6.01 0 01-1.57-1c-.126-.11-.243-.23-.363-.346a6.296 6.296 0 01-1.02-1.268l-.059-.095a.923.923 0 01-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41a4.38 4.38 0 00.263-.373c.118-.19.155-.385.093-.536-.28-.684-.57-1.365-.868-2.041-.059-.134-.234-.23-.393-.249-.054-.006-.108-.012-.162-.016a3.385 3.385 0 00-.403.004z" />
                  </svg>
                </Link>

              </div>
            </div>
            <Image alt='About image' className=" w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] " src={about}></Image>
          </div>
        </div>
        <div className="abouts mx-2 md:mx-5">
        <div className="mt-5">
          <h2 className="text-xl font-bold mb-4">What kind of problems can Codeblog solve?</h2>
          <p>
            Codeblog can help you solve a wide range of problems related to web development. Whether you are having issues with frontend technologies like HTML, CSS, or JavaScript, or you are working on a project using the MERN stack, we have solutions that can help.
          </p>
        </div>
        <div className="mt-5">
          <h2 className="text-xl font-bold mb-4">How does Codeblog work?</h2>
          <p>
            Codeblog provides step-by-step solutions to common web development problems. Our blog posts are written in a clear and concise manner, with code snippets and examples to help you understand the solution. We also include screenshots and other visual aids to make the process even easier.
          </p>
        </div>
        <div className="mt-5">
          <h2 className="text-xl font-bold mb-4">Who is Codeblog for?</h2>
          <p>
            Codeblog is for web developers of all levels. Whether you are a beginner just starting out or an experienced developer looking to solve a specific problem, our blog posts can help you. We aim to provide solutions that are easy to follow and understand, regardless of your experience level.
          </p>
        </div>
        </div>
        <div className="blogs pt-10 md:my-1 mx-1 md:mx-4">
          <h1 className='text-3xl font-bold my-2'>About Auther</h1>
            <p>I am front-end Devlpoer that can create a static website for you with free HTTPs certifcate with help of pure Html,Css,Scss,Js,React so, that the work fast and efficently 24/7.</p>
            <p>Our goal is to give more value to a user than the user pay to us. we deploy website for a user for free and also fix any type of error for free!</p>
        </div>
      </div></>
  )
}

export default About
