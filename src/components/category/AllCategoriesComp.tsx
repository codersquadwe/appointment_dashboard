'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const AllCategoriesComp = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
      const getCategories = async () => {
          try {
              const res: any = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/category/getAllCategories`);
              console.log(res)
              if (res.status === 200) {
                  const formattedCategories = res.data.data.map((category: any) => ({
                      ...category,
                      createdAt: new Date(category.createdAt).toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                      }),
                  }));
                  setCategories(formattedCategories);
              }

          } catch (e) {
              console.log(e)
          }
        }
        getCategories()
    }, [])

    console.log(categories);
    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                    #
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Category Name
                                </th>
                                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                    Created At
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category: any, index) => (
                                <tr key={category._id}>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {index + 1}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {category.name}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {category.createdAt}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button className="hover:text-warning text-xl">
                                                <FaRegPenToSquare />
                                            </button>
                                            <button className="hover:text-danger text-xl">
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllCategoriesComp;