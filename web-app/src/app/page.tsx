import QouteSelector from './components/qoute_selector';
import { getChapterIndex } from '@/ports';

export default async function Home() {
  const chapterIndex = await getChapterIndex();
  console.log(chapterIndex)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-neutral-900">
      <QouteSelector index={chapterIndex} />
    </div>
  );
}
