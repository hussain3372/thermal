import React from "react";

const Contact = () => {
  return (
    <div>
      <div className="p-6 container m-auto">
        <div className="flex justify-between items-center">
          <div className="font-20 font-normal leading-6 flex items-center gap-3">
            Contact Us
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 items-center mt-6 space-y-5 md:space-y-0">
          <div className="flex flex-col gap-10">
            <h1 className="font-48 font-bold md:leading-[60px] text-start">
              {`We're`} Here to Help <br className="hidden xl:block"/> You
            </h1>
            <p className="font-20 font-medium leading-6 text-start">
              Welcome to the Thermal e-commerce Blog, your <br className="hidden xl:block"/> go-to source
              for expert insights, tips, and trends <br className="hidden xl:block"/> in heating, cooling,
              and energy efficiency
            </p>
          </div>
          <div className="space-y-8">
            <div className="flex flex-col items-start justify-start gap-3">
              <label className="font-14 leading-5">Full Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="bg-[#F5F9FF] rounded-xl w-full h-[48px] px-3 text-[#00000066] font-16 leading-5"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
              <label className="font-14 leading-5">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="bg-[#F5F9FF] rounded-xl w-full h-[48px] px-3 text-[#00000066] font-16 leading-5"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
              <label className="font-14 leading-5">Message</label>
              <textarea
                type="text"
                placeholder="Enter Your Message..."
                className="bg-[#F5F9FF] rounded-xl w-full h-[165px] px-3 pt-7 text-[#00000066] font-16 leading-5"
              ></textarea>
            </div>
            <div>
              <input
                type="submit"
                className="flex justify-center items-center h-10 bg-[#70A9F2] text-white font-16 font-bold leading-normal w-full rounded-lg"
              />
            </div>
            <div>
              <p className="font-16 leading-5 text-[#00000080] text-center">
                By contacting us, you agree to our <span className="text-[#042440]">terms of services</span> and Privacy <br />
                <span className="text-[#042440]">Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
