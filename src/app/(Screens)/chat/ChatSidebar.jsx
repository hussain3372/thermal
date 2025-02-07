import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import "./chat.css";
import Chat from "./Chat";
import { chat } from "@/app/data/chat";

const ChatSidebar = () => {
  return (
    <div>
      <Tabs className="flex gap-5">
        <div className="bg-[#F5F9FF] border border-l border-r border-t-0 border-b-0 py-10 pl-6 pr-4 w-[450px] h-screen overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div>
                <Image
                  src="/pr3.svg"
                  width={46}
                  height={45}
                  alt="profile-img"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-14 font-bold leading-5 text-[#70A9F2]">
                  David Peters
                </h1>
                <p className="font-12 font-bold leading-4">Senior Developer</p>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="relative">
              <input
                type="text"
                name="text"
                className="bg-[#FFFFFF] font-16 py-3 px-5 pl-12 flex justify-start items-center w-full h-[40px] font-normal text-[#CDCDCD] focus:outline-none"
                placeholder="Find something.."
              />
              <div className="absolute top-3 left-5">
                <Image
                  src="./search-icon.svg"
                  width={16}
                  height={16}
                  alt="search"
                />
              </div>
            </div>
          </div>
          <TabList className="flex flex-col gap-5">
            {chat.map((item, index) => (
              <Tab key={index} className="p-2 bg-transparent cursor-pointer hover:bg-[#a8c8f1] rounded-lg">
                <div  className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div>
                      <Image
                        src={item.img}
                        width={46}
                        height={45}
                        alt="profile-img"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-14 font-medium leading-5">
                        {item.title}
                      </h1>
                      <p className="font-12 font-normal leading-4 opacity-60">
                        {item.mes}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 justify-end items-end">
                    <p className="font-12 font-bold leading-4 text-[#70A9F2]">
                      {item.time}
                    </p>
                    <span className="w-3 h-3 bg-[#70A9F2] rounded-full flex justify-center items-center text-white font-8 font-normal">
                      1
                    </span>
                  </div>
                </div>
              </Tab>
            ))}
          </TabList>
        </div>

        <TabPanel>
          <Chat />
        </TabPanel>
        <TabPanel>
          <h1>Content2</h1>
        </TabPanel>
        <TabPanel>
          <h1>Content3</h1>
        </TabPanel>
        <TabPanel>
          <h1>Content4</h1>
        </TabPanel>
        <TabPanel>
          <h1>Content5</h1>
        </TabPanel>
        <TabPanel>
          <h1>Content6</h1>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ChatSidebar;
