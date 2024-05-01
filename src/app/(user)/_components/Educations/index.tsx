"use client";

import React from 'react';
import "react-vertical-timeline-component/style.min.css";

import { SectionWrapper } from '@/hoc';
import { educations } from "@/constants/data";

import VerticalTimelineRenderer, { VerticalTimelineElementType } from '@/components/VerticalTimelineRenderer';
import { formatDate } from '@/utils/dateUtils';
import { sortByKey } from '@/utils/arrayUtils';

const Educations: React.FC = () => {
  const formattedEducations: VerticalTimelineElementType[] = sortByKey(educations, 'startDate', 'desc').map((education, index) => {
    const title = education.title;
    const icon = education.icon;
    const iconBackgroundColor = education.iconBg;
    const subtitle = education.universityName;
    const subtitleLink = education.universityUrl;
    const points = education.points;
    const date = `${formatDate(education.startDate)} - ${education.endDate ? formatDate(education.endDate) : "Present"}`;
    const subContainer = (
      <div
        className="text-sm inline-flex items-center justify-center rounded-md bg-gray-700 px-4 py-0.5
        text-secondary mt-2"
      >
        CGPA: {education.cgpa}
      </div>
    );
    const link = `/experience/${education.id}`;

    return {
      title,
      icon,
      iconBackgroundColor,
      subtitle,
      subtitleLink,
      subContainer,
      points,
      date,
      link,
    }
  });

  return (
    <>
      <SectionWrapper
        idName='educations'
        title="Educations."
        subtitle='My study journey'
      >
      </SectionWrapper>

      <SectionWrapper
        idName='render-educations'
      > 
        <div className="empty-20 flex flex-col mt-10">
          {/* <VerticalTimeline>
            {
              sortedEducations.map((experience, i) => {
                return (
                  <EducationCard key={i} education={experience} />
                )
              })
            }
          </VerticalTimeline> */}

          <VerticalTimelineRenderer
            elements={formattedEducations}
          />
        </div>
      </SectionWrapper>
    </>
  )
}

export default Educations