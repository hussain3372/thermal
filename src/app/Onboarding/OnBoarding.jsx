"use client";

import "@/app/globals.css";
import "@/app/fonts.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PersonalInformation from "./Personal-information";
import Lisence from "./Lisence";
import Experties from "./Experties";
import HeatPump from "./Heat-pump";
import ContactPreferences from "./Contact-preferences";
import "./boarding.css";
import ContractorInsurance from "./Contractor-insurance";

export function OnBoarding() {
  return (
    <div className="container m-auto">
      <Tabs className="flex flex-col justify-center items-center px-10 xl:px-80 py-16">
        <TabList className="pb-10 flex justify-center items-center flex-wrap gap-12 lg:gap-5">
          <Tab className="relative border border-[#00000066] text-[#00000066] hover:bg-[#70A9F2] hover:border-[#70A9F2] hover:text-white focus:bg-[#70A9F2] focus:border-[#70A9F2] focus:text-white rounded-full w-[44px] h-[44px] flex justify-center items-center font-24 font-bold cursor-pointer transition-colors duration-300 ease-in-out">
            1
            <span className="absolute font-12 text-center leading-3 top-14 text-[#00000066] transition-colors duration-300 ease-in-out tab-span-hover">
              Personal Information
            </span>
          </Tab>

          <span className="text-[#00000066] hidden lg:block">----------</span>

          <Tab className="relative border border-[#00000066] text-[#00000066] hover:bg-[#70A9F2] hover:border-[#70A9F2] hover:text-white focus:bg-[#70A9F2] focus:border-[#70A9F2] focus:text-white rounded-full w-[44px] h-[44px] flex justify-center items-center font-24 font-bold cursor-pointer transition-colors duration-300 ease-in-out">
            2
            <span className="absolute font-12 text-center leading-3 top-14 text-[#00000066] transition-colors duration-300 ease-in-out tab-span-hover">
              Licenses and Qualifications
            </span>
          </Tab>

          <span className="text-[#00000066] hidden lg:block">----------</span>

          <Tab className="relative border border-[#00000066] text-[#00000066] hover:bg-[#70A9F2] hover:border-[#70A9F2] hover:text-white focus:bg-[#70A9F2] focus:border-[#70A9F2] focus:text-white rounded-full w-[44px] h-[44px] flex justify-center items-center font-24 font-bold cursor-pointer transition-colors duration-300 ease-in-out">
            3
            <span className="absolute font-12 text-center leading-3 top-14 text-[#00000066] transition-colors duration-300 ease-in-out tab-span-hover">
            Contractor Insurance
            </span>
          </Tab>

          <span className="text-[#00000066] hidden lg:block">----------</span>

          <Tab className="relative border border-[#00000066] text-[#00000066] hover:bg-[#70A9F2] hover:border-[#70A9F2] hover:text-white focus:bg-[#70A9F2] focus:border-[#70A9F2] focus:text-white rounded-full w-[44px] h-[44px] flex justify-center items-center font-24 font-bold cursor-pointer transition-colors duration-300 ease-in-out">
            4
            <span className="absolute font-12 text-center leading-3 top-14 text-[#00000066] transition-colors duration-300 ease-in-out tab-span-hover">
              Experties
            </span>
          </Tab>

          <span className="text-[#00000066] hidden lg:block">----------</span>

          <Tab className="relative border border-[#00000066] text-[#00000066] hover:bg-[#70A9F2] hover:border-[#70A9F2] hover:text-white focus:bg-[#70A9F2] focus:border-[#70A9F2] focus:text-white rounded-full w-[44px] h-[44px] flex justify-center items-center font-24 font-bold cursor-pointer transition-colors duration-300 ease-in-out">
            5
            <span className="absolute font-12 text-center leading-3 top-14 text-[#00000066] transition-colors duration-300 ease-in-out tab-span-hover">
              Heating Appliances
            </span>
          </Tab>

          <span className="text-[#00000066] hidden lg:block">----------</span>

          <Tab className="relative border border-[#00000066] text-[#00000066] hover:bg-[#70A9F2] hover:border-[#70A9F2] hover:text-white focus:bg-[#70A9F2] focus:border-[#70A9F2] focus:text-white rounded-full w-[44px] h-[44px] flex justify-center items-center font-24 font-bold cursor-pointer transition-colors duration-300 ease-in-out">
            6
            <span className="absolute font-12 text-center leading-3 top-14 text-[#00000066] transition-colors duration-300 ease-in-out tab-span-hover">
              Heating System Capacity
            </span>
          </Tab>
        </TabList>

        <TabPanel>
          <PersonalInformation />
        </TabPanel>

        <TabPanel>
          <Lisence />
        </TabPanel>

        <TabPanel>
          <ContractorInsurance />
        </TabPanel>

        <TabPanel>
          <Experties />
        </TabPanel>

        <TabPanel>
          <HeatPump />
        </TabPanel>

        <TabPanel>
          <ContactPreferences />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default OnBoarding;
