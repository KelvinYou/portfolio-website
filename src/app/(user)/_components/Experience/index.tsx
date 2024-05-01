"use client";

import React from 'react';
import "react-vertical-timeline-component/style.min.css";

import { SectionWrapper } from '@/hoc';
import { workExperiences } from "@/constants/data";

import "./Experience.scss";
import { formatDate } from '@/utils/dateUtils';
import VerticalTimelineRenderer, { VerticalTimelineElementType } from '@/components/VerticalTimelineRenderer';
import { sortByKey } from '@/utils/arrayUtils';

const Experience: React.FC = () => {
  const formattedExperiences: VerticalTimelineElementType[] = sortByKey(workExperiences, 'startDate', 'desc').map((experience) => {
    const title = experience.title;
    const icon = experience.icon;
    const iconBackgroundColor = experience.iconBg;
    const subtitle = experience.companyName;
    const subtitleLink = experience.companyUrl;
    const points = experience.points;
    const tags = experience.techStacks;
    const date = `${formatDate(experience.startDate)} - ${experience.endDate ? formatDate(experience.endDate) : "Present"}`;
    const link = `/experience/${experience.id}`;

    return {
      title,
      icon,
      iconBackgroundColor,
      subtitle,
      subtitleLink,
      points,
      tags,
      date,
      // link,
    }
  });



  const options = [
    { id: 'all', label: 'All' },
    { id: 'work', label: 'Works' },
    { id: 'education', label: 'Educations' },
  ];

  return (
    <>
      <SectionWrapper
        idName='experience'
        title="Work Experience and Education."
        subtitle='What I have done so far'
      >
      </SectionWrapper>

      <SectionWrapper
        idName='render-experiences'
      > 
        {/* <motion.div 
          initial="hidden"
          animate="show"
          variants={fadeIn("", "", 0.1, 1)}
          className='flex items-center justify-center -mt-20'
        >
          <SelectableButtonGroup
            options={options}
            onOptionChange={handleOptionChange}
          />
        </motion.div> */}

        {/* Experience Card */}
        <div className="empty-20 flex flex-col mt-10">
          {/* <VerticalTimeline>
            {sortedExperiences
              .filter((experience) => {
                if (experienceCategory === 'all') return true;
                return experience.experienceCategory === experienceCategory;
              })
              .map((experience, i) => {
                if (experience.experienceCategory === "education") {
                  return (
                    <EducationCard key={i} education={experience} />
                  )
                } else {
                  return (
                    <ExperienceCard key={i} experience={experience} />
                  )
                }
              }

              )}
          </VerticalTimeline> */}

          <VerticalTimelineRenderer 
            elements={formattedExperiences}
          />
        </div>
      </SectionWrapper>
    </>
  );
}

export default Experience;
