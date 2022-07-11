import Head from "next/head";
import Image from "next/image";
import { Footer } from "../components/Footer";
import { GetServerSideProps } from "next";
import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import { getSession, useSession } from "next-auth/react";
import { Header } from "../components/Header";
import { ArrowRight } from "phosphor-react";
import Link from "next/link";

interface HomeProps {
  data: {
    lessons: {
      id: string;
      lessonType: 'class' | 'live';
      availableAt: Date;
      title: string;
      slug: string;
    }[];
  };
}

export default function Home({ data }: HomeProps) {
  const { data: session } = useSession();
  const mostRecentLesson = data.lessons.length - 1;

  return (
    <>
      <Head>
        <title>Ignite Lab | Home</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="max-w-[1200px] mx-auto flex-1 mt-20 w-full px-4">
          <div className="flex justify-between w-full bg-gray-700 rounded-lg p-8 items-center 
          flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2 md:gap-8">
              <div className="w-16 h-16 relative md:w-28 md:h-28">
                <Image 
                  src={session.user.image} 
                  layout='fill'
                  alt={'User profile picture'} 
                  quality={90}
                  priority
                  className="rounded-full"
                />
              </div>

              <div className="flex flex-col">
                <h2 className="font-bold text-xl md:text-3xl">{session.user.name}</h2>
                <p className="text-gray-300 text-sm md:text-base">{session.user.email}</p>
              </div>
            </div>

            <Link href={`/event/${data.lessons[mostRecentLesson].slug}`} passHref>
              <a 
                className="font-bold uppercase flex items-center gap-4 p-4 rounded-lg 
                bg-green-500 hover:bg-green-700 transition-colors w-full justify-center
                md:w-auto md:justify-start"
              >
                Aula mais recente 
                <ArrowRight />
              </a>
            </Link>
          </div>

          <div className="grid mt-12 lg:grid-cols-4 gap-4 md:grid-cols-2 mb-8">
            { data.lessons.map((lesson) => (
              <Link href={`/event/${lesson.slug}`} key={lesson.id} passHref>
                <a className="border border-green-500 px-6 py-4 text-center rounded-lg
                hover:bg-green-500 font-bold transition-colors">
                  {lesson.title}
                </a>
              </Link>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const { data } = await client.query({
    query: gql`
      query GetLessons {
        lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
          id
          lessonType
          availableAt
          title
          slug
        }
      }
    `
  });

  return {
    props: {
      data,
      session
    }
  }
}