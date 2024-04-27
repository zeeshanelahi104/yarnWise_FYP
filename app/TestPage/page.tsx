// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// // import Image1 from "../../assets/images/Deakin-Universitylogo.jpg";
// interface Program {
//   name: string;
//   programType: string;
//   duration: string;
//   degreeType: string;
//   season: string;
//   classType: string;
//   startDate: string;
//   about: string;
//   requiredDocuments: string[];
//   tuitionFee: number;
//   otherFee: number;
//   currency: string;
//   onCampus: boolean;
//   offCampus: boolean;
//   needBasedScholarship: boolean;
//   meritBasedScholarship: boolean;
//   _id: string;
// }

// interface University {
//   _id: string;
//   name: string;
//   schoolType: string;
//   state: string;
//   country: string;
//   url: string;
//   about: string;
//   image: string;
//   programs: Program[];
//   schoolId: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// const coursesData: University[] = [
//   {
//     _id: "65f17bc6fcfc532029a48475",
//     name: "Agriculture University of Tirana",
//     schoolType: "Public University",
//     state: "Tirana",
//     country: "Albania",
//     url: "http://ubt.edu.al/",
//     about:
//       "The Agriculture University of Tirana (AUT) is a leading institution in Albania specializing in agricultural sciences, forestry, and related fields. It offers undergraduate, postgraduate, and doctoral programs in various areas such as agronomy, horticulture, animal science, forestry, agricultural economics, and environmental science. The university is known for its research activities, practical training opportunities, and contributions to the agricultural sector in Albania. AUT aims to provide students with a comprehensive education that combines theoretical knowledge with practical skills, preparing them for successful careers in agriculture and related industries.",
//     image:
//       "https://res.cloudinary.com/dxt13siq2/image/upload/s--_1MKzTOk--/v1712385369/schools/images/Zy6PowGU7yDQLeO8eODD.jpg",
//     programs: [
//       {
//         name: "Biology",
//         programType: "Part Time",
//         duration: "4 years",
//         degreeType: "Undergraduate Diploma",
//         season: "FALL (JULY)",
//         classType: "In-Person",
//         startDate: "2024-04-10T00:00:00.000Z",
//         about: "Biology",
//         requiredDocuments: ["High school leaving certificate", "", "", ""],
//         tuitionFee: 1000,
//         otherFee: 200,
//         currency: "USD",
//         onCampus: false,
//         offCampus: false,
//         needBasedScholarship: false,
//         meritBasedScholarship: false,
//         _id: "6610ed5a27873afbb8b04045",
//       },
//     ],
//     schoolId: "SCGYOR7LM4M95ZK",
//     createdAt: "2024-03-13T10:11:18.902Z",
//     updatedAt: "2024-04-06T06:36:10.360Z",
//     __v: 0,
//   },
//   {
//     _id: "65f17bc6fcfc532029a48477",
//     name: "Ismail Qemali University, Vlora",
//     schoolType: "Public University",
//     state: "Vlorë",
//     country: "Albania",
//     url: "https://univlora.edu.al/",
//     about:
//       "Ismail Qemali University of Vlorë is one of the leading institutions of higher education in Albania, offering a wide range of undergraduate, postgraduate, and doctoral programs across various disciplines. The university is named after Ismail Qemali, a prominent Albanian politician and leader of the Albanian national movement. Ismail Qemali University of Vlorë is known for its academic excellence, research activities, and contributions to the intellectual and cultural life of the region. It aims to provide students with a comprehensive education that prepares them for successful careers and active participation in society.",
//     image:
//       "https://res.cloudinary.com/dxt13siq2/image/upload/s--TeBT3jd9--/v1712385617/schools/images/2glnWAHLRM2IJbYxWXQn.jpg",
//     programs: [
//       {
//         name: "Medical Laboratory Science",
//         programType: "Full Time",
//         duration: "4 years",
//         degreeType: "Doctoral Degree (Ph.D)",
//         season: "SPRING (FEBRUARY)",
//         classType: "Hybrid",
//         startDate: "2024-04-19T00:00:00.000Z",
//         about: "Medical Laboratory Science",
//         requiredDocuments: [
//           "High school leaving certificate",
//           "Undergraduate Transcript",
//           "",
//           "",
//         ],
//         tuitionFee: 2000,
//         otherFee: 200,
//         currency: "USD",
//         onCampus: false,
//         offCampus: false,
//         needBasedScholarship: false,
//         meritBasedScholarship: false,
//         _id: "6610ee5127873afbb8b0404d",
//       },
//     ],
//     schoolId: "SC0XIAOQN9X5Y5Q",
//     createdAt: "2024-03-13T10:11:18.904Z",
//     updatedAt: "2024-04-06T06:40:17.871Z",
//     __v: 0,
//   },
//   {
//     _id: "65f17bc6fcfc532029a48479",
//     name: "Polis University",
//     schoolType: "Private University",
//     state: "Tirana",
//     country: "Albania",
//     url: "https://universitetipolis.edu.al/",
//     about:
//       "Polis University is a private institution offering undergraduate and graduate programs in various fields including architecture, design, engineering, and social sciences. The university is known for its innovative approach to education, emphasis on practical learning, and collaboration with industry partners. Polis University aims to provide students with a high-quality education that combines theoretical knowledge with hands-on experience, preparing them for successful careers in their chosen fields. The university also encourages research and entrepreneurship among its students and faculty.",
//     image:
//       "https://res.cloudinary.com/dxt13siq2/image/upload/s--BMwspaTQ--/v1712386078/schools/images/VONvUBpb5JX53gcTA3Ji.jpg",
//     programs: [
//       {
//         name: "Public Health",
//         programType: "Full Time",
//         duration: "4 years",
//         degreeType: "Associate Degree",
//         season: "Fall (November)",
//         classType: "Hybrid",
//         startDate: "2024-04-10T00:00:00.000Z",
//         about: "Public Health",
//         requiredDocuments: [
//           "High school leaving certificate",
//           "High school leaving certificate",
//           "",
//           "",
//         ],
//         tuitionFee: 1000,
//         otherFee: 200,
//         currency: "USD",
//         onCampus: false,
//         offCampus: false,
//         needBasedScholarship: false,
//         meritBasedScholarship: false,
//         _id: "6610f01f27873afbb8b04054",
//       },
//     ],
//     schoolId: "SC7E06KORHYKWMN",
//     createdAt: "2024-03-13T10:11:18.914Z",
//     updatedAt: "2024-04-06T06:47:59.280Z",
//     __v: 0,
//   },
//   {
//     _id: "65f17bc7fcfc532029a48481",
//     name: "University of Arts",
//     schoolType: "Public University",
//     state: "Tirana",
//     country: "Albania",
//     url: "https://unart.edu.al/",
//     about:
//       "The University of Arts is the leading institution for arts education in Albania, offering undergraduate, postgraduate, and doctoral programs in various artistic disciplines including visual arts, music, theater, dance, and film. The university is known for its distinguished faculty, talented students, and vibrant artistic community. The University of Arts aims to nurture creativity, innovation, and cultural diversity among its students while preserving and promoting Albania's rich artistic heritage. It provides students with comprehensive training, practical experience, and opportunities for artistic expression and collaboration.",
//     image:
//       "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     programs: [],
//     schoolId: "SC69RPPC5RRL2N2",
//     createdAt: "2024-03-13T10:11:19.050Z",
//     updatedAt: "2024-03-13T10:11:19.050Z",
//     __v: 0,
//   },
//   {
//     _id: "65f17bc7fcfc532029a4847f",
//     name: "Fan S. Noli University of Korca",
//     schoolType: "Public University",
//     state: "Korçë",
//     country: "Albania",
//     url: "https://www.unkorce.edu.al/",
//     about:
//       "Fan S. Noli University is a public institution offering undergraduate and graduate programs in various fields including natural sciences, social sciences, humanities, education, and economics. The university is named after Fan S. Noli, a prominent Albanian writer, scholar, and politician. Fan S. Noli University is known for its academic excellence, research activities, and contributions to the intellectual and cultural life of the region. It aims to provide students with a comprehensive education that prepares them for successful careers and active participation in society.",
//     image:
//       "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     programs: [],
//     schoolId: "SCI545WP1IPV0EA",
//     createdAt: "2024-03-13T10:11:19.036Z",
//     updatedAt: "2024-03-13T10:11:19.036Z",
//     __v: 0,
//   },
//   {
//     _id: "65f17bc7fcfc532029a4848b",
//     name: "La Salle Open University",
//     schoolType: "Private University",
//     state: "Manila",
//     country: "Philippines",
//     url: "https://www.dlsu.edu.ph/academics/colleges-and-schools/la-salle-open-university/",
//     about:
//       "La Salle Open University is part of the De La Salle University system and offers online courses and distance education programs to students who cannot attend traditional classroom-based education. It provides flexible learning options, allowing students to study at their own pace and schedule. La Salle Open University offers various undergraduate and graduate programs in fields such as business, education, information technology, and social sciences. The university is committed to providing quality education accessible to a diverse range of learners.",
//     image:
//       "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     programs: [],
//     schoolId: "SCU2Q4WGHSUVWCN",
//     createdAt: "2024-03-13T10:11:19.207Z",
//     updatedAt: "2024-03-13T10:11:19.207Z",
//     __v: 0,
//   },
// ];
// const universityNames = [
//   "Australian Catholic University (North Sydney)",
//   "Agriculture University of Tirana",
//   "Central Queensland University",
//   "Charles Darwin university(Casuarina)",
//   "Charles Darwin university (Waterfront Darwin)",
//   "Charles Darwin university (Sydney)",
//   "Curtin University",
//   "Le Cordon Bleu Australia (Adelaide)",
//   "Le Cordon Bleu Australia (Brisbane)",
//   "Le Cordon Bleu Australia (Melbourne)",
//   "Le Cordon Bleu Australia (Sydney)",
//   "Australian Catholic University (Ballarat)",
//   "Australian Catholic University (Brisbane)",
//   "Australian Catholic University (Melbourne)",
//   "Australian Catholic University (Strathfield)",
//   "Australian Catholic University (Blacktown)",
//   "Australian Catholic University (Canberra)",
//   "Australian Catholic University (Adelaide)",
//   "Fan S. Noli University of Korca",
//   "Murdoch University (Perth)",
// ];
// const ITEMS_PER_PAGE = 2;

// const page: React.FC = () => {
//   const [filteredCourses, setFilteredCourses] = useState<University[]>([]);
//   const [selectedDegreeLevels, setSelectedDegreeLevels] = useState<string[]>(
//     []
//   );
//   console.log("selectedDegreeLevels", selectedDegreeLevels);
//   console.log("Filetered", filteredCourses);
//   const [selectedAdmissionSemesters, setSelectedAdmissionSemesters] = useState<
//     string[]
//   >([]);
//   const [minTuitionFee, setMinTuitionFee] = useState<number>(0);
//   const [maxTuitionFee, setMaxTuitionFee] = useState<number>(10000);
//   const [selectedUniversity, setSelectedUniversity] = useState<string | null>(
//     null
//   );
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = Math.min(
//     startIndex + ITEMS_PER_PAGE,
//     filteredCourses.length
//   );
//   const currentItems = filteredCourses.slice(startIndex, endIndex);

//   const goToPage = (page: any) => {
//     setCurrentPage(page);
//   };

//   const goToNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   const goToPreviousPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const goToFirstPage = () => {
//     setCurrentPage(1);
//   };

//   const goToLastPage = () => {
//     setCurrentPage(totalPages);
//   };

//   // const applyFilters = () => {
//   //   let filtered: University[] = [];

//   //   coursesData.forEach((university) => {
//   //     const universityFilteredPrograms = university.filter(
//   //       (program) => {
//   //         const matchDegree =
//   //           selectedDegreeLevels.length === 0 ||
//   //           selectedDegreeLevels.includes(program.degreeType);
//   //         const matchSemester =
//   //           selectedAdmissionSemesters.length === 0 ||
//   //           selectedAdmissionSemesters.includes(program.programType);
//   //         const matchTuitionFee =
//   //           program.tuitionFee >= minTuitionFee &&
//   //           program.tuitionFee <= maxTuitionFee;
//   //         const matchUniversity =
//   //           !selectedUniversity || university.name === selectedUniversity;
//   //         return (
//   //           matchDegree && matchSemester && matchTuitionFee && matchUniversity
//   //         );
//   //       }
//   //     );

//   //     filtered = [...filtered, ...universityFilteredPrograms];
//   //   });

//   //   setFilteredCourses(filtered);
//   // };

//   const applyFilters = () => {
//     let filtered: University[] = [];

//     coursesData.forEach((university) => {
//       const universityFilteredPrograms = university.programs.filter(
//         (program) => {
//           const matchDegree =
//             selectedDegreeLevels.length === 0 ||
//             selectedDegreeLevels.includes(program.degreeType);
//           console.log("Selected Degree Levels:", selectedDegreeLevels);
//           console.log("Program Degree Type:", program.degreeType);
//           console.log("Match Degree:", matchDegree);

//           const matchSemester =
//             selectedAdmissionSemesters.length === 0 ||
//             selectedAdmissionSemesters.includes(program.programType);

//           const matchTuitionFee =
//             program.tuitionFee >= minTuitionFee &&
//             program.tuitionFee <= maxTuitionFee;

//           const matchUniversity =
//             !selectedUniversity || university.name === selectedUniversity;

//           return (
//             matchDegree && matchSemester && matchTuitionFee && matchUniversity
//           );
//         }
//       );

//       if (universityFilteredPrograms.length > 0) {
//         const filteredUniversity: University = {
//           ...university,
//           programs: universityFilteredPrograms,
//         };
//         filtered.push(filteredUniversity);
//       }
//     });

//     console.log("filtered data: ", filtered);
//     setFilteredCourses(filtered);
//   };

//   const handleDegreeLevelChange = (level: string, isChecked: boolean) => {
//     console.log("Clicked")
//     if (isChecked) {
//       // Add level to selectedDegreeLevels if checked
//       setSelectedDegreeLevels((prevLevels) => [...prevLevels, level]);
//     } else {
//       // Remove level from selectedDegreeLevels if unchecked
//       setSelectedDegreeLevels((prevLevels) =>
//         prevLevels.filter((item) => item !== level)
//       );
//     }
//     applyFilters(); // Apply filters after updating the state
//   };

//   const handleAdmissionSemesterChange = (semester: string) => {
//     const updatedSemesters = selectedAdmissionSemesters.includes(semester)
//       ? selectedAdmissionSemesters.filter((item) => item !== semester)
//       : [...selectedAdmissionSemesters, semester];
//     setSelectedAdmissionSemesters(updatedSemesters);
//     applyFilters();
//   };

//   const handleTuitionFeeChange = (min: number, max: number) => {
//     if (min > max) {
//       setMinTuitionFee(max);
//       setMaxTuitionFee(min);
//     } else {
//       setMinTuitionFee(min);
//       setMaxTuitionFee(max);
//     }
//     applyFilters();
//   };

//   return (
//     <>
//       <div className="bg-[#f0f1f4]">
//         {/* section1 */}
//         <div className="flex bg-[#f7f8f9] p-8 pb-0 pl-0 pr-0 ml-0 mr-0 justify-center ">
//           <div className="flex  items-baseline w-2/5 text-5xl">
//             <div className="">
//               Find your study program & apply within GTWestern for free!
//             </div>
//           </div>
//           <div className="w-2/5">
//             <Image
//               width={500}
//               height={500}
//               src="/images/Image2.PNG"
//               alt="Hero"
//             />
//           </div>
//         </div>
//         {/* section2 */}
//         <div className="flex m-4 ml-0 mr-0  justify-center">
//           <div className="flex justify-center rounded-lg p-4 w-full max-w-[1170px] mx-auto bg-[#e4e4e0]">
//             <input type="text" className="p-4" placeholder="Find Programs" />
//           </div>
//         </div>
//         {/* section3 */}
//         <div className="flex justify-center p-8">
//           {/* choice selection area */}
//           <div className="flex  w-full max-w-[1170px] mx-auto justify-between">
//             <div className="w-[25%]  bg-white rounded-lg shadow-lg p-4 pt-6 space-y-4 border-2">
//               <div className="flex flex-col ">
//                 <div className="font-bold mb-2">Degree</div>
//                 <div className="flex flex-col text-sm space-y-4">
//                   <div className="flex items-center gap-3 flex-wrap">
//                     <div className="flex flex-col space-y-1 justify-center text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-15">
//                       <input
//                         type="checkbox"
//                         checked={selectedDegreeLevels.includes(
//                           "Undergraduate Diploma"
//                         )}
//                         onChange={(e) =>
//                           handleDegreeLevelChange(
//                             "Undergraduate Diploma",
//                             e.target.checked
//                           )
//                         }
//                       />

//                       <label>Bachelor</label>
//                     </div>
//                     <div className="flex flex-col space-y-1 justify-center text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-15">
//                       <input
//                         type="checkbox"
//                         // onChange={() => handleDegreeLevelChange("MASTER")}
//                       />
//                       <label>Master</label>
//                     </div>
//                     <div className="flex flex-col space-y-1 justify-center text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-15">
//                       <input
//                         type="checkbox"
//                         // onChange={() => handleDegreeLevelChange("DOCTORATE")}
//                       />
//                       <label>Doctorate</label>
//                     </div>
//                     {/* <div className="flex flex-col space-y-1 justify-center text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-15">
//                       <input
//                         type="checkbox"
//                         checked={selectedDegreeLevels.includes(
//                           "Doctoral Degree (Ph.D)"
//                         )}
//                         onChange={(e) =>
//                           handleDegreeLevelChange(
//                             "Doctoral Degree (Ph.D)",
//                             e.target.checked
//                           )
//                         }
//                       />
//                       <label>Phd</label>
//                     </div>
//                     <div className="flex flex-col space-y-1 justify-center text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-15">
//                       <input
//                         type="checkbox"
//                         checked={selectedDegreeLevels.includes(
//                           "Associate Degree"
//                         )}
//                         onChange={(e) =>
//                           handleDegreeLevelChange(
//                             "Associate Degree",
//                             e.target.checked
//                           )
//                         }
//                       />
//                       <label>Associate</label>
//                     </div> */}
//                   </div>
//                   {/* <div className="flex gap-3 items-center">
                    
//                   </div> */}
//                 </div>
//               </div>
//               <div className="space-y-2 mb-2">
//                 <div className="font-bold">Field of Study</div>
//                 <select className="p-4 bg-[#f5f5f5] w-full">
//                   <option>Select From List</option>
//                 </select>
//               </div>
//               <div>
//                 <div className="font-bold mb-2">ADMISSION SEMESTER</div>
//                 <div className="space-y-1">
//                   <div className="flex justify-between gap-4 text-sm">
//                     <div className="flex flex-col space-y-1 text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-1/2">
//                       <input
//                         type="checkbox"
//                         onChange={() =>
//                           handleAdmissionSemesterChange("SPRING (FEBRUARY)")
//                         }
//                       />
//                       <label>Spring (February)</label>
//                     </div>
//                     <div className="flex flex-col space-y-1 text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-1/2">
//                       <input
//                         type="checkbox"
//                         onChange={() =>
//                           handleAdmissionSemesterChange("FALL (JULY)")
//                         }
//                       />
//                       <label>Fall (July)</label>
//                     </div>
//                   </div>

//                   <div className="flex justify-between text-sm"></div>
//                   <div className="flex justify-between gap-4 text-sm">
//                     <div className="flex flex-col space-y-1 text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-1/2">
//                       <input
//                         type="checkbox"
//                         onChange={() =>
//                           handleAdmissionSemesterChange("FALL (JULY)")
//                         }
//                       />
//                       <label>Fall (July)</label>
//                     </div>
//                     <div className="flex flex-col space-y-1 text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-1/2">
//                       <input
//                         type="checkbox"
//                         onChange={() =>
//                           handleAdmissionSemesterChange("FALL (November)")
//                         }
//                       />
//                       <label>Fall (November)</label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-2 mb-2">
//                 <div className="font-bold">UNIVERSITIES</div>
//                 <select
//                   className="p-4 bg-[#f5f5f5] w-full"
//                   onChange={(e) => setSelectedUniversity(e.target.value)}
//                 >
//                   <option>Select From List</option>
//                   {universityNames.map((name, index) => (
//                     <option key={index} value={name}>
//                       {name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="space-y-2 mb-2">
//                 <div className="font-bold">TUITION FEES IN €</div>
//                 <div className="flex justify-between items-center">
//                   <span>{minTuitionFee}</span>
//                   <input
//                     type="range"
//                     min="0"
//                     max="10000"
//                     value={minTuitionFee}
//                     onChange={(e) =>
//                       handleTuitionFeeChange(
//                         parseInt(e.target.value, 10),
//                         maxTuitionFee
//                       )
//                     }
//                     className="w-full"
//                   />
//                   <span>{maxTuitionFee}</span>
//                 </div>
//               </div>
//               <div className="">
//                 <button className="mt-12 border-2 rounded-lg p-2">Reset</button>
//               </div>
//             </div>

//             {/* programs section */}
//             <div className="w-[71%] ">
//               <div className="space-y-2">
//                 <div className="font-semibold">
//                   Number of Programs : {coursesData.length}
//                 </div>
//                 <div className="space-y-5">
//                   {currentItems.map((course, index) => (
//                     <div
//                       key={index}
//                       className="flex p-8 pb-12 justify-start gap-10 rounded-lg shadow-lg bg-white border-2"
//                     >
//                       <div className="w-[250] flex justify-center items-center">
//                         <img
//                           width={150}
//                           height={100}
//                           className="w-[150]"
//                           src="../../assets/images/Deakin-Universitylogo.jpg"
//                           alt=""
//                         />
//                       </div>
//                       <div>
//                         <div>
//                           <div className="flex items-center text-lg gap-6">
//                             <span className="font-bold text-gray-600">
//                               {course.programs.map((program, index) => (
//                                 <span
//                                   key={index}
//                                   className="text-gray-600 text-sm font-bold"
//                                 >
//                                   {program.degreeType}
//                                 </span>
//                               ))}
//                               {/* {course.programs.degreeType} */}
//                             </span>
//                             <p className="flex items-center text-gray-700 font-[300]">
//                               {" "}
//                               {course.name} -{/* {course.country} */}
//                             </p>
//                           </div>
//                           <div>
//                             .........................................................................................................
//                           </div>
//                         </div>
//                         <div>
//                           <div className="space-x-8 mt-2">
//                             <span className="text-sm font-[300]">
//                               DEGREE / LEVEL
//                             </span>
//                             <span className="text-gray-600 text-sm font-bold">
//                               {/* {course.programType} */}
//                             </span>
//                           </div>
//                           <div className="space-x-4">
//                             <span className="text-sm font-[300]">
//                               SEMESTER TUITION FEES
//                             </span>
//                             <span className="text-gray-600 text-sm font-bold">
//                               {/* {course.tuitionFee} */}
//                             </span>
//                           </div>
//                           <div className="space-x-4">
//                             <span className="text-sm font-[300]">
//                               COURSE LANGUAGE
//                             </span>
//                             <span className="text-gray-600 text-sm font-bold">
//                               {/* {course.language} */}
//                             </span>
//                           </div>
//                           <div className="space-x-4">
//                             <span className="text-sm font-[300]">
//                               ADMISSION SEMESTER
//                             </span>
//                             <span className="text-gray-600 text-sm font-bold">
//                               {/* {course.season} */}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 {totalPages > 1 && (
//                   <div className="pagination-controls flex justify-center py-2  px-4">
//                     <button
//                       onClick={goToFirstPage}
//                       disabled={currentPage === 1}
//                       className="border border-black w-12 flex justify-center items-center rounded-[2px] hover:bg-[#DBDFEA]"
//                     >
//                       First
//                     </button>
//                     <button
//                       onClick={goToPreviousPage}
//                       disabled={currentPage === 1}
//                       className="border border-black w-9 flex justify-center items-center rounded-[2px] hover:bg-[#DBDFEA]"
//                     >
//                       <FiChevronsLeft className="w-[14px]" color="black" />
//                     </button>

//                     {[...Array(totalPages).keys()].map((pageNum) => (
//                       <button
//                         key={pageNum}
//                         onClick={() => goToPage(pageNum + 1)}
//                         className={
//                           currentPage === pageNum + 1
//                             ? "text-black bg-blue-900 hover:bg-[#00C5AA] w-9 h-10  font-medium"
//                             : "border border-black hover:text-cyan hover:bg-[#DBDFEA] text-black font-medium w-9"
//                         }
//                       >
//                         {pageNum + 1}
//                       </button>
//                     ))}
//                     <button
//                       onClick={goToNextPage}
//                       disabled={currentPage === totalPages}
//                       className="border border-black w-9 flex justify-center items-center hover:bg-[#DBDFEA]"
//                     >
//                       <FiChevronsRight className="w-[14px]" color="black" />
//                     </button>
//                     <button
//                       onClick={goToLastPage}
//                       disabled={currentPage === totalPages}
//                       className="border border-black w-12 flex justify-center items-center hover:bg-[#DBDFEA]"
//                     >
//                       Last
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;
"use client";
import Image from "next/image";
import { useState } from "react";
// import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Link from "next/link";

const degreeLevelOptions = [
  { label: "Undergraduate", value: "Undergraduate Diploma" },
  { label: "Bachelor's", value: "Bachelor’s Degree" },
  { label: "Master", value: "Master’s Degree" },
  { label: "PhD", value: "Doctoral Degree (Ph.D)" },
  { label: "Associate", value: "Associate Degree" },
];

const ITEMS_PER_PAGE = 8;

const Page = ({ data, programs, schools }: Props) => {
  console.log("🚀 ~ Page ~ data:", data)
  const [selectedDegreeLevels, setSelectedDegreeLevels] = useState<string[]>(
    []
  );
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedAdmissionSemesters, setSelectedAdmissionSemesters] = useState<
    string[]
  >([]);
  const [minTuitionFee, setMinTuitionFee] = useState<number>(1000);
  const [maxTuitionFee, setMaxTuitionFee] = useState<number>(10000);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredItems = data.filter((item: any) => {
    const matchesDegreeLevels =
      selectedDegreeLevels.length === 0 ||
      selectedDegreeLevels.includes(item.degreeType);

    const matchesProgram = !selectedProgram || item.name === selectedProgram;

    const matchesSchool = !selectedSchool || item.schoolName === selectedSchool;

    const matchesTuitionFee =
      item.tuitionFee >= minTuitionFee && item.tuitionFee <= maxTuitionFee;

    const matchesAdmissionSemesters =
      selectedAdmissionSemesters.length === 0 ||
      selectedAdmissionSemesters.includes(item.admissionSemester);

    return (
      matchesDegreeLevels &&
      matchesProgram &&
      matchesSchool &&
      matchesTuitionFee &&
      matchesAdmissionSemesters
    );
  });

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleDegreeLevelChange = (level: string) => {
    const updatedLevels = selectedDegreeLevels.includes(level)
      ? selectedDegreeLevels.filter((item) => item !== level)
      : [...selectedDegreeLevels, level];
    setSelectedDegreeLevels(updatedLevels);
  };

  const handleAdmissionSemesterChange = (semester: string) => {
    const updatedSemesters = selectedAdmissionSemesters.includes(semester)
      ? selectedAdmissionSemesters.filter((item) => item !== semester)
      : [...selectedAdmissionSemesters, semester];
    setSelectedAdmissionSemesters(updatedSemesters);
  };

  const handleMaxTuitionFeeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxTuitionFee(parseInt(e.target.value, 10));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="bg-[#f0f1f4]">
        <div className="flex bg-[#f7f8f9] p-8 pb-0 pl-0 pr-0 ml-0 mr-0 justify-center ">
          <div className="flex  items-baseline w-2/5 text-5xl">
            <div className="">
              Find your study program & apply within GTWestern for free!
            </div>
          </div>
          <div className="w-2/5">
            <Image
              width={500}
              height={500}
              src="/images/Image2.PNG"
              alt="Hero"
            />
          </div>
        </div>

        <div className="flex m-4 ml-0 mr-0  justify-center">
          <div className="flex justify-center rounded-lg p-4 w-full max-w-[1170px] mx-auto bg-[#e4e4e0]">
            <input type="text" className="p-4" placeholder="Find Programs" />
          </div>
        </div>
        <div className="flex justify-center p-8">
          <div className="flex  w-full max-w-[1170px] mx-auto justify-between">
            <div className="w-[25%]  bg-white rounded-lg shadow-lg p-4 pt-6 space-y-4 border-2">
              {/* Degree Filters Start  */}
              <div className="flex flex-col ">
                <div className="font-bold mb-2">Degree</div>
                <div className="flex flex-col text-sm space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    {degreeLevelOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex flex-col space-y-1 justify-center border p-1 border-gray-400 min-w-[70px] text-xs items-center shadow-md rounded-md"
                      >
                        <input
                          type="checkbox"
                          onChange={() => handleDegreeLevelChange(option.value)}
                        />
                        <label>{option.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Degree Filters End  */}
              {/* Field Filters Start  */}
              <div className="space-y-2 mb-2">
                <div className="font-bold">Field of Study</div>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="p-4 bg-[#f5f5f5] w-full"
                >
                  <option value={""}>Choose Program</option>
                  {programs.map((program: string) => (
                    <option value={program}>{program}</option>
                  ))}
                </select>
              </div>
              {/* Field Filters End  */}
              <div>
                <div className="font-bold mb-2">ADMISSION SEMESTER</div>
                <div className="space-y-1">
                  <div className="flex justify-between gap-4 text-sm">
                    <div className="flex flex-col space-y-1 text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-1/2">
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleAdmissionSemesterChange("SPRING (FEBRUARY)")
                        }
                      />
                      <label>Spring (February)</label>
                    </div>
                    <div className="flex flex-col space-y-1 text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-1/2">
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleAdmissionSemesterChange("FALL (JULY)")
                        }
                      />
                      <label>Fall (July)</label>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm"></div>
                  <div className="flex justify-between gap-4 text-sm">
                    <div className="flex flex-col space-y-1 text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-1/2">
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleAdmissionSemesterChange("FALL (JULY)")
                        }
                      />
                      <label>Fall (July)</label>
                    </div>
                    <div className="flex flex-col space-y-1 text-xs items-center bg-[#f6f6f6] rounded-md p-2 w-1/2">
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleAdmissionSemesterChange("FALL (November)")
                        }
                      />
                      <label>Fall (November)</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <div className="font-bold">UNIVERSITIES</div>
                <select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="p-4 bg-[#f5f5f5] w-full"
                >
                  <option value={""}>Choose School</option>
                  {schools.map((school: string) => (
                    <option value={school}>{school}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 mb-2">
                <div className="font-bold">TUITION FEES IN €</div>
                <div className="flex justify-between items-center">
                  <span>{minTuitionFee}</span>
                  <input
                    type="range"
                    id="maxTuitionFee"
                    name="maxTuitionFee"
                    min={0}
                    max={25000}
                    value={maxTuitionFee}
                    onChange={handleMaxTuitionFeeChange}
                  />
                  <span>{maxTuitionFee}</span>
                </div>
              </div>
              <div className="">
                <button className="mt-12 border-2 rounded-lg p-2">Reset</button>
              </div>
            </div>

            <div className="w-[71%] ">
              <div className="space-y-2">
                <div className="font-semibold">
                  Number of Programs : {filteredItems.length}
                </div>
                <div className="space-y-5">
                  {paginatedItems.map((course: any, index: number) => (
                    <div
                      key={index}
                      className="flex p-8  justify-start gap-10 rounded-lg shadow-lg bg-white border-2"
                    >
                      <div className="w-[250] flex justify-center items-center">
                        <img
                          width={150}
                          className="w-[150] h-full"
                          src={course.image}
                          alt=""
                        />
                      </div>
                      <div>
                        <div>
                          <div className="flex items-center text-lg gap-6 font-bold text-gray-600">
                            <p>
                              {course.name}
                              <span className=" text-gray-700 font-[300] ml-6">
                                {" "}
                                {course.schoolName} - {course.country}
                              </span>
                            </p>
                          </div>
                          <div>
                            .........................................................................................................
                          </div>
                        </div>
                        <div>
                          <div className="space-x-8 mt-2">
                            <span className="text-sm font-[300]">
                              DEGREE / LEVEL
                            </span>
                            <span className="text-gray-600 text-sm font-bold">
                              {course.degreeType}
                            </span>
                          </div>
                          <div className="space-x-4">
                            <span className="text-sm font-[300]">
                              SEMESTER TUITION FEES
                            </span>
                            <span className="text-gray-600 text-sm font-bold">
                              {course.tuitionFee}
                            </span>
                          </div>
                          <div className="space-x-4">
                            <span className="text-sm font-[300]">
                              COURSE LANGUAGE
                            </span>
                            <span className="text-gray-600 text-sm font-bold">
                              English
                            </span>
                          </div>
                          <div className="space-x-4">
                            <span className="text-sm font-[300]">
                              ADMISSION SEMESTER
                            </span>
                            <span className="text-gray-600 text-sm font-bold">
                              {course.season}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
             
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  {/* <ArrowBack /> */}
                </button>
                <span className="mx-4">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  {/* <ArrowForward /> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

interface Props {
  data: any;
  programs: string[];
  schools: string[];
}