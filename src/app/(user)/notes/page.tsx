import PageTitle from '@/components/PageTitle';
import SectionWrapper from '@/hoc/SectionWrapper';
import React from 'react'

const NotesPage = () => {
  const folderId = '1_jjbyduSZj8KaCC9n91a-VhLxWn0O0TM';

  const embeddedGoogleDriveUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}`;

  return (
    <SectionWrapper
      idName='notes'
    >
      <PageTitle
        title="Notes."
        subtitle='Documentations'
        description='A collection of notes on my journey to study'
      />

      <div 
        className="mt-10 bg-gray-100 h-[600px] p-4 rounded-lg border-on-primary border-[4px]"
      >
        <iframe
          src={embeddedGoogleDriveUrl}
          width="100%"
          height="100%"
          allowFullScreen
        ></iframe>
      </div>

    </SectionWrapper>
  )
}

export default NotesPage