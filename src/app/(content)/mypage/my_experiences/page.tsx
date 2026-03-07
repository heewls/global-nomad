import NoneItem from '@/components/NoneItem';
import ExperienceCard from './_components/ExperienceCard';
import { getExperiences } from './api';

export default async function MyExperiences() {
  const experiencesResponse = await getExperiences();

  const { activities: experiences, totalCount } = experiencesResponse;

  if (totalCount === 0) {
    return <NoneItem page="my-experiences" />;
  }

  return (
    <div className='flex flex-col lg:gap-7.5 gap-3'>
      <div className="flex flex-col gap-2.5 py-2.5 md:gap-1">
        <h2 className="text-18-b">내 체험 관리</h2>
        <h3 className="text-14-m text-gray500">
          체험을 등록하거나 수정 및 삭제가 가능합니다.
        </h3>
      </div>
      <div className="flex flex-col gap-7.5 lg:gap-6">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
}
