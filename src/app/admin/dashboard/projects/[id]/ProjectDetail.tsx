"use client"

import React, { FC, useState, ChangeEvent } from 'react';
import projects from "@/data/projects.json";
import { Project } from '@/types/data';

interface ProjectDetailProps {
  id: string;
}

const ProjectDetail: FC<ProjectDetailProps> = (props) => {
  const { id } = props;
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState<Project | undefined>(projects.find((project) => project.id === id));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      if (!prevFormData) {
        return prevFormData; // return early if prevFormData is undefined
      }
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      if (!prevFormData) {
        return prevFormData; // return early if prevFormData is undefined
      }
      return {
        ...prevFormData,
        tags: value !== "" ? value.split(',').map((tag) => tag.trim()) : [], // split input by commas and trim whitespace
      };
    });
  };

  const handlePlatformsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      if (!prevFormData) {
        return prevFormData; // return early if prevFormData is undefined
      }
      return {
        ...prevFormData,
        platforms: value !== "" ? value.split(',').map((tag) => tag.trim()) : [], // split input by commas and trim whitespace
      };
    });
  };

  const handleToggleEdit = () => {
    setEditable((prevEditable) => !prevEditable);
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes (e.g., send data to a server)
    console.log("Saving changes:", formData);
    handleToggleEdit(); // Disable editing after saving changes
  };

  if (!formData) {
    return <div>Project not found</div>;
  }

  const {
    name,
    description,
    tags,
    images,
    liveSiteLink,
    sourceCodeLink,
    platforms,
    date,
    createDate,
    modifyDate,
  } = formData;

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">

      <div className="flex flex-col gap-9">
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Edit Form
            </h3>
          </div>

          <form>
            <div className="p-6">
              <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    ID
                  </label>
                  <input
                    type="text"
                    value={id}
                    disabled
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name='name'
                    value={name} onChange={handleInputChange}
                    disabled={!editable}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    name="description"
                    placeholder="Type your message"
                    value={description} onChange={handleInputChange}
                    disabled={!editable}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Live Site Link
                  </label>
                  <input
                    type="text"
                    name='liveSiteLink'
                    value={liveSiteLink} onChange={handleInputChange}
                    disabled={!editable}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Source Code Link
                  </label>
                  <input
                    type="text"
                    name='sourceCodeLink'
                    value={sourceCodeLink} onChange={handleInputChange}
                    disabled={!editable}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={date} onChange={handleInputChange}
                    disabled={!editable}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <p>Create Date: {createDate}</p>
                <p>Modify Date: {modifyDate}</p>
              </div>


            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

          <form action="#">
            <div className="p-6">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tags
                </label>
                <input
                  type="text"
                  name='tags'
                  value={tags?.join(',')} onChange={handleTagsChange}
                  disabled={!editable}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Platforms
                </label>
                <input
                  type="text"
                  name='platforms'
                  value={platforms?.join(',')} onChange={handlePlatformsChange}
                  disabled={!editable}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-black dark:text-white">
                  Image
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mt-5 mb-5 flex items-center justify-between">
                <label htmlFor="formCheckbox" className="flex cursor-pointer">
                  <div className="relative pt-0.5">
                    <input
                      type="checkbox"
                      id="formCheckbox"
                      className="taskCheckbox sr-only"
                    />
                    <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                      <span className="text-white opacity-0">
                        <svg
                          className="fill-current"
                          width="10"
                          height="7"
                          viewBox="0 0 10 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                            fill=""
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <p>Remember me</p>
                </label>

                <a href="#" className="text-sm text-primary">
                  Forget password?
                </a>
              </div>

              {editable && (
                <button 
                  type="button" 
                  onClick={handleSaveChanges}
                  className='mt-4 flex w-full justify-center rounded bg-on-primary p-3 font-medium text-gray'
                >
                  Save Changes
                </button>
              )}
              <button 
                type="button" 
                onClick={handleToggleEdit}
                className='mt-4 flex w-full justify-center rounded bg-on-primary p-3 font-medium text-gray'
              >
                {editable ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
