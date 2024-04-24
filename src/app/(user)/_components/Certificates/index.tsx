import ProgressTimeline, { ProgressTimelineElementType } from '@/components/ProgressTimeline';
import { certifications } from '@/constants/data';
import { SectionWrapper } from '@/hoc'
import { sortByKey } from '@/utils/arrayUtils';
import { formatDate } from '@/utils/dateUtil';
import React from 'react'


const Certificates: React.FC = () => {
  const formattedCerts: ProgressTimelineElementType[] = sortByKey(certifications, 'issueDate', 'desc').map((cert) => {
    const title = cert.name;
    const description = cert.issuingOrganization;
    const date = formatDate(cert.issueDate);
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