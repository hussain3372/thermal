import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

const DateCalendarValue = ({ setIsModalOpen, setIsSuccessModalOpen }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleAddTimeSlot = () => {
    // Close the main modal and open the success modal
    setIsModalOpen(false); // Close main modal
    setIsSuccessModalOpen(true); // Open success modal
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="border border-[#E5E7F0] rounded-lg mb-4">
        <div className="md:flex justify-center items-center">
          <div>
            <DateCalendar value={startDate} onChange={handleStartDateChange} />
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="flex flex-col items-center">
                <select className="border border-[#E5E7F0] hover:border-[#70A9F2] focus:outline-none rounded-md p-1 text-[#BDC0CC] font-14 font-normal leading-5 bg-[#F5F7FA]">
                  {[...Array(12)].map((_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <select className="border border-[#E5E7F0] hover:border-[#70A9F2] focus:outline-none rounded-md p-1 text-[#BDC0CC] font-14 font-normal leading-5 bg-[#F5F7FA]">
                  {[...Array(60)].map((_, i) => (
                    <option key={i}>{i < 10 ? `0${i}` : i}</option>
                  ))}
                </select>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <select className="border border-[#E5E7F0] hover:border-[#70A9F2] focus:outline-none rounded-md p-1 text-[#BDC0CC] font-14 font-normal leading-5 bg-[#F5F7FA]">
                  {["AM", "PM"].map((period) => (
                    <option key={period}>{period}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <DateCalendar value={endDate} onChange={handleEndDateChange} />
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="flex flex-col items-center">
                <select className="border border-[#E5E7F0] hover:border-[#70A9F2] focus:outline-none rounded-md p-1 text-[#BDC0CC] font-14 font-normal leading-5 bg-[#F5F7FA]">
                  {[...Array(12)].map((_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <select className="border border-[#E5E7F0] hover:border-[#70A9F2] focus:outline-none rounded-md p-1 text-[#BDC0CC] font-14 font-normal leading-5 bg-[#F5F7FA]">
                  {[...Array(60)].map((_, i) => (
                    <option key={i}>{i < 10 ? `0${i}` : i}</option>
                  ))}
                </select>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <select className="border border-[#E5E7F0] hover:border-[#70A9F2] focus:outline-none rounded-md p-1 text-[#BDC0CC] font-14 font-normal leading-5 bg-[#F5F7FA]">
                  {["AM", "PM"].map((period) => (
                    <option key={period}>{period}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end">
          <button className="text-[#BDC0CC] font-14 font-normal leading-5 bg-[#F5F7FA] border border-[#E5E7F0] rounded-md m-4 p-1 flex justify-center items-center">
            Select Time Zone
          </button>
        </div>
      </div>

      <div className="flex justify-end items-end mt-7">
        <button onClick={handleAddTimeSlot} className="secondary-blue-btn">
          +Add time slot
        </button>
      </div>
    </LocalizationProvider>
  );
};

export default DateCalendarValue;
