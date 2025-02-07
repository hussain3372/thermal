import Link from "next/link";
import React from "react";

const ContactPreferences = () => {
  return (
    <div>
      <div className="container m-auto">
        <div className="mt-14 flex flex-col justify-center items-center text-center gap-8">
          <h1 className="font-32 bold-font leading-10">
            What is Your Contact Preferences?
          </h1>

          <p className="font-16 font-normal leading-5 opacity-60">
            Please select your preferred way of receiving work orders and
            communications.
          </p>

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
                SMS
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
                Email
              </span>
            </div>
          </div>

          <p className="font-16 font-normal leading-5">
            Currently, you will receive offers within the proximity of your
            city.
          </p>

          <h1 className="font-28 font-medium leading-8">
            Are you interested in receiving work orders in an 80 km <br />{" "}
            perimeter from your main location?
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
        </div>
      </div>

      <div>
        <div className="float-end gap-5 mt-16 py-3">
          <Link href="/" className="secondary-blue-btn">
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPreferences;
