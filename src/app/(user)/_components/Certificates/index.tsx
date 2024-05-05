import ProgressTimeline, { ProgressTimelineElementType } from '@/components/ProgressTimeline';
import { certifications } from '@/constants/data';
import { SectionWrapper } from '@/hoc'
import { sortByKey } from '@/utils/arrayUtils';
import { formatDate } from '@/utils/dateUtils';
import React from 'react'


const Certificates: React.FC = () => {
  const formattedCerts: ProgressTimelineElementType[] = sortByKey(certifications, 'issueDate', 'desc').map((cert) => {
    const title = cert.name;
    const description = cert.issuingOrganization;
    const date = formatDate(cert.issueDate, 'D MMM YYYY');
    const link = cert.link;

    return {
      title,
      description,
      date,
      link,
      linkTarget: '_blank',
    };
  });

  return (
    <SectionWrapper
      idName='certificates'
      title='Cert.'
      subtitle='My certificates'
      description={[
        `I participated in a total of ${certifications.length} activities`
      ]}
      highLightedTexts={[`${certifications.length}`]}
    >
      <div className='mt-10'>
        <ProgressTimeline 
          elements={formattedCerts}
        />
      </div>
    </SectionWrapper>
  )
}

export default Certificates