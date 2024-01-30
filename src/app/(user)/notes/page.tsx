import PageTitle from '@/components/PageTitle';
import SectionWrapper from '@/hoc/SectionWrapper';
import React from 'react'

const NotesPage = () => {
  const folderId = '1_jjbyduSZj8KaCC9n91a-VhLxWn0O0TM';

  const embeddedGoogleDriveUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}`;
  
  const techNotesUrl = `https://kelvinyou-notes.vercel.app/docs/tech-notes/intro`;

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
    // <div className='bg-white mt-[100px]'>
    //   <iframe
    //     src={techNotesUrl}
    //     className='w-[100%] h-[100vh]'
    //     allowFullScreen
    //   ></iframe>
    // </div>
  )
}

export default NotesPage