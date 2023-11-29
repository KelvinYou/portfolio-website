import React from 'react'
import projects from "@/data/projects.json";
import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';

const Projects = () => {
  return (
    <div>
      <div>
        My Projects
      </div>

      <div className="overflow-x-auto p-4 bg-slate-50">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Date
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">

            {projects.map((project: Project) => (
              <tr key={project._id}>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{project._id}</td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{project.name}</td>
                <td className=''>
                  {project.images && project.images.length > 0  && <>
                    <Image
                      src={project.images[0]}
                      alt={project._id}
                    >

                    </Image>
                    {project.images[0]}
                  </>}
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{project.date}</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <Link
                    href={`/admin/dashboard/projects/${project._id}`}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Projects