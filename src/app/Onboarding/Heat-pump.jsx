import React from "react";

const HeatPump = () => {
  return (
    <div>
      <div className="container m-auto">
        <div className="mt-14 flex flex-col justify-center items-center text-center gap-8">
          <h1 className="font-32 font-bold leading-10">
            Tell Us About Your Heat Pump Experience?
          </h1>

          <p className="font-16 font-normal leading-5 opacity-60">
            This information helps us match you with relevant projects.
          </p>

          <h1 className="font-28 font-medium leading-8">
            Have you installed Air Source Heat Pumps before?
          </h1>

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-start justify-start flex-wrap gap-5">
              <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                    fill="#70A9F2"
                  />
                </svg>
                yes
              </span>

              <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                    fill="#70A9F2"
                  />
                </svg>
                no
              </span>
            </div>
          </div>

          <h1 className="font-28 font-medium leading-8">
            Which types of heat pumps have you worked with?
          </h1>

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-start justify-start flex-wrap gap-5">
              <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                    fill="#70A9F2"
                  />
                </svg>
                Air source heat pumps
              </span>

              <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                    fill="#70A9F2"
                  />
                </svg>
                Ductless mini-split heat pumps
              </span>

              <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                    fill="#70A9F2"
                  />
                </svg>
                Hybrid heat pumps (Combined systems)
              </span>

              <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                    fill="#70A9F2"
                  />
                </svg>
                Water source heat pumps
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatPump;
