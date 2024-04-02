import React from 'react';

interface SideCardProps {
  header?: React.ReactNode | string;
  body: React.ReactNode;
}

const isString = (value: React.ReactNode | string): value is string => {
  return typeof value === 'string';
};

const ArticleSideCard: React.FC<SideCardProps> = ({ header, body }) => {
  return (
    <div className="w-full">
      <div className="bg-gray-dark mb-10 rounded-sm shadow-none">
        {header && isString(header) ?         
          <h3 className="border-b px-8 py-4 text-lg font-semibold border-white border-opacity-10 text-white">
            {header}
          </h3>
          :
          <>
            {header}
          </>
        }

        <div className='px-8 py-6 text-body-color'>
          {body}
        </div>
      </div>
    </div>
  );
};

export default ArticleSideCard;
