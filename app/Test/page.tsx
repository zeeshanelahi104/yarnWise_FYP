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
                    // <Link href={study-abroad/${course?.href}}>
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
                    // </Link>
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