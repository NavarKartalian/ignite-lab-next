//import { useGetLessonsQuery } from "../../graphql/generated";
import { Lesson } from "../Lesson";

interface SidebarProps {
  isOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  data: {
    lessons: {
      id: string;
      lessonType: 'class' | 'live';
      availableAt: Date;
      title: string;
      slug: string;
    }[];
  }
}

export function Sidebar({ isOpen, setIsSidebarOpen, data }: SidebarProps) {
  return (
    <aside className={`w-full h-full lg:h-auto lg:w-[348px] bg-gray-700 p-6 border-l border-gray-600 
      lg:block ${isOpen ? 'absolute top-16 z-50' : 'hidden'}`}>
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(lesson => (
          <Lesson 
            key={lesson.id}
            title={lesson.title}
            lessonSlug={lesson.slug}
            type={lesson.lessonType}
            availableAt={new Date(lesson.availableAt)}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        ))}
      </div>
    </aside>
  );
}