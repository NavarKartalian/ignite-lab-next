import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";

export default function Home() {
  const { data: session } = useSession();
  
  return (
    <>
      <Head>
        <title>Ignite Lab | Login</title>
      </Head>

      <div className="w-full min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
        <div className="w-full flex items-center justify-between mt-10 lg:mt-20 mx-auto flex-col lg:flex-row lg:max-w-[1116px] lg:px-4">
          <div className="max-w-[640px] flex flex-col items-center lg:block text-center lg:text-left">
            <Logo />

            <h1 className="mt-8 text-[1.85rem] lg:text-[2.5rem] lg:leading-tight px-10 lg:px-0">
              Construa uma <strong className="text-blue-500">aplicação completa</strong>, 
              do zero, com <strong className="text-blue-500">React JS</strong>
            </h1>

            <p className="mt-4 text-gray-200 leading-relaxed text-sm lg:text-base px-10 lg:px-0">
              Em apenas uma semana você vai dominar na prática uma das tecnologias mais 
              utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
            </p>
          </div>

          <div className="p-8 mt-8 bg-gray-700 border border-gray-500 rounded w-full md:w-auto lg:mt-0">
            <strong className="text-2xl mb-6 block">
              Inscreva-se gratuitamente
            </strong>

            <div className="flex flex-col gap-2">
              {!session ? <button onClick={() => signIn('github')}>Github</button> : <button onClick={() => signOut()}>sign Out</button>}
            </div>
          </div>
        </div>

        <div className="mt-4 px-4 lg:mt-10 max-w-[1248px] w-full relative">
          <Image 
            src="/assets/code-mockup.png" 
            alt="code image" layout="responsive" 
            width={1248} 
            height={650} 
            quality={100} 
            priority 
          />    
        </div>

        <Footer />
      </div>
    </>
  );
}
