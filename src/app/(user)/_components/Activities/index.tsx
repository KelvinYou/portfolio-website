import PageTitle from '@/components/PageTitle';
import ProgressTimeline, { ProgressTimelineElementType } from '@/components/ProgressTimeline';
import { activities, certifications } from '@/constants/data';
import { SectionWrapper } from '@/hoc'
import { sortByKey } from '@/utils/arrayUtils';
import { formatDate } from '@/utils/dateUtil';
import React from 'react'


const Activities: React.FC = () => {
  const formattedActivities: ProgressTimelineElementType[] = sortByKey(activities, 'startDate', 'desc').map((activity) => {
    const title = activity.title;
    const description = activity.description;
    const date = formatDate(activity.startDate);

    return {
      title,
      description,
      date,
    };
  });

  return (
    <SectionWrapper
      idName='activities'
    >
      <PageTitle
        title='Activities.'
        subtitle='My Co-Curricular Activities'
        description={[
          'This section included all the talks / workshop / activities / services I participated',
          `I participated in a total of ${activities.length} activities`
        ]}
        highLightedTexts={[`${activities.length}`]}
        className="mt-10"
      />
      <div className='mt-10'>
        <ProgressTimeline 
          elements={formattedActivities}
        />
      </div>

    </SectionWrapper>
  )
}

export default Activities