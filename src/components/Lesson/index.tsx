import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import { useRouter } from 'next/router';


interface LessonProps {
  title: string;
  lessonSlug: string;
  availableAt: Date;
  type: 'live' | 'class';
  setIsSidebarOpen: (value: boolean) => void;
}

export function Lesson({ availableAt, lessonSlug, title, type, setIsSidebarOpen }: LessonProps) {
  const router = useRouter();
  const { slug } = router.query;
  const isAvailable = isPast(availableAt);
  const availableDateFormat = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  });

  const isActiveLesson = slug === lessonSlug;

  return (
    <Link href={`/event/${lessonSlug}`} passHref>
      <a className='group' onClick={() => setIsSidebarOpen(false)}>
        <span className="text-gray-300">
          {availableDateFormat}
        </span>

        <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActiveLesson && 'bg-green-500'}`}>
          <header className="flex items-center justify-between">
            {isAvailable ? (
              <span className={`text-sm text-blue-500 font-medium flex gap-2 items-center ${isActiveLesson && 'text-white'}`}>
                <CheckCircle size={20} />
                Conteúdo liberado
            </span>
            ) : (
              <span className={`text-sm text-orange-500 font-medium flex gap-2 items-center ${isActiveLesson && 'text-white'}`}>
                <Lock size={20} />
                Em breve
            </span>
            )}

            <span className={`text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold
            ${isActiveLesson && 'border-white'}`}>
              {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
            </span>
          </header>

          <strong className={`mt-5 block ${isActiveLesson ? 'text-white' : 'text-gray-200'}`}>
            {title}
          </strong>
        </div>
      </a>
    </Link>
  );
}