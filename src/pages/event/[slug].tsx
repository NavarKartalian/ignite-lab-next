import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Video } from "../../components/Video";
import { client } from "../../lib/apollo";

interface EventProps {
  data: {
    lessons: {
      id: string;
      lessonType: 'class' | 'live';
      availableAt: Date;
      title: string;
      slug: string;
    }[];
  };
  response: {
    data: {
      lesson: {
        teacher: {
          name: string;
          bio: string;
          avatarURL: string
        }
        title: string;
        videoId: string;
        description: string;
      }
    }
  }
}

export default function Event({ data, response }: EventProps) {
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>{`Ignite Lab | ${response.data.lesson.title}`}</title>
      </Head>

      <div className="flex flex-col min-h-screen relative">
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} eventHeader />
        <main className="flex-1 lg:flex"> 
          {slug ? 
            <Video response={response} /> 
              : 
            <div className="flex-1 justify-center flex items-center">
              <h1 className="text-2xl font-bold uppercase">
                Selecione a aula ao lado
              </h1>
            </div>
          }
          <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} data={data} />
        </main>  
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.query;
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

  const response = await client.query({
    query: gql`
      query GetLessonBySlug ($slug: String) {
        lesson(where: {slug: $slug}) {
          title
          videoId
          description
          teacher {
            name
            bio
            avatarURL
          }
        }
      }
    `,
    variables: {
      slug: slug
    }
  })

  return {
    props: {
      data,
      response,
      session
    }
  }
}