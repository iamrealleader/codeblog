import {useState , useEffect} from 'react'
import Head from 'next/head';
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import User from '../components/Context'
import NextNProgress from "nextjs-progressbar";

  

export default function App({ Component, pageProps }) {
  const [login,setLogin] = useState(false);
  useEffect( () =>{
   setLogin( localStorage.getItem("token") ? true : false);
  },[]);
  return<>
      <>
      <Head>
        <style>{`
                #nprogress .spinner-icon {
                  position: fixed;
                  z-index: 9999;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 148px;
                  height: 148px;
                }
      
                /* Blur the background */
                #nprogress:after {
                  content: '';
                  background: rgba(0, 0, 0, 0.3);
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  z-index: 998;
                  backdrop-filter: blur(2px);
                }
        `}</style>
      </Head>
      <User.Provider value= {{login,setLogin}}>
        <Navbar/>
        <NextNProgress
        color="red"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
          <Component {...pageProps} />
        <Footer/>
      </User.Provider>
      </>
   </>
}
