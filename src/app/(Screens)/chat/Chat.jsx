import Image from "next/image";
import React from "react";

const Chat = () => {
  return (
    <div className="w-full">
      <div className="py-8 px-8">
        <div className="border-b border-[#00000033]">
          <div className="flex items-center gap-3 pb-2">
            <div className="relative">
              <Image src="/pr4.svg" width={46} height={45} alt="profile-img" />
              <span className="bg-[#33EC23] w-3 h-3 rounded-full absolute left-[30px] top-[35px]"></span>
            </div>
            <div>
              <h1 className="font-14 font-bold leading-5 text-[#70A9F2]">
                Lisa Roy
              </h1>
            </div>
          </div>
        </div>

        <div className="my-6">
          <div className="flex flex-col gap-5">
            <div className="flex justify-start items-end gap-2">
              <Image src="/pr4.svg" width={25} height={25} alt="mic-img" />
              <p className="bg-[#42C1F214] py-2 pl-5 pr-6 font-16 font-normal leading-5 rounded-t-xl rounded-br-xl rounded-bl-none w-[265px]">
                Hi David, have you got the project report pdf?
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-5">
            <div className="flex justify-end items-end gap-2">
              <p className="bg-[#17465533] py-2 pl-5 pr-6 font-16 font-normal leading-5 rounded-t-xl rounded-bl-xl rounded-br-none">
                NO. I did not get it
              </p>
              <Image src="/pr3.svg" width={25} height={25} alt="mic-img" />
            </div>
          </div>

          <div class="flex items-center justify-center my-6">
            <div class="border-t border-gray-300 flex-grow"></div>
            <span class="px-4 py-1 mx-4 bg-gray-100 text-black text-sm rounded-full shadow-sm">
              Yesterday
            </span>
            <div class="border-t border-gray-300 flex-grow"></div>
          </div>

          
            <div className="flex justify-start items-end gap-2">
              <Image src="/pr4.svg" width={25} height={25} alt="mic-img" />
              <p className="bg-[#42C1F214] py-2 pl-5 pr-6 font-16 font-normal leading-5 rounded-t-xl rounded-br-xl rounded-bl-none w-[265px]">
                Ok, I will just sent it here. Plz be sure to fill the details by
                today end of the day.
              </p>
            </div>

            <div className="flex justify-start items-end gap-2 mt-5">
              <Image src="/pr4.svg" width={25} height={25} alt="mic-img" />
              <p className="bg-[#42C1F214] py-2 pl-5 pr-6 font-16 font-normal leading-5 rounded-t-xl rounded-br-xl rounded-bl-none w-[265px]">
                Ok, I will just sent it here. Plz be sure to fill the details by
                today end of the day.
              </p>
            </div>
          

          <div className="flex flex-col gap-5 mt-5">
            <div className="flex justify-end items-end gap-2">
              <p className="bg-[#17465533] py-2 pl-5 pr-6 font-16 font-normal leading-5 rounded-t-xl rounded-bl-xl rounded-br-none w-[265px]">
                Ok. Should I send it over email as well after filling the
                details.
              </p>
              <Image src="/pr3.svg" width={25} height={25} alt="mic-img" />
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-5">
            <div className="flex justify-start items-end gap-2">
              <Image src="/pr4.svg" width={25} height={25} alt="mic-img" />
              <p className="bg-[#42C1F214] py-2 pl-5 pr-6 font-16 font-normal leading-5 rounded-t-xl rounded-br-xl rounded-bl-none w-[265px]">
                Ya. I will be adding more team members to it.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-5">
            <div className="flex justify-end items-end gap-2">
              <p className="bg-[#17465533] py-2 pl-5 pr-6 font-16 font-normal leading-5 rounded-t-xl rounded-bl-xl rounded-br-none ">
                OK
              </p>
              <Image src="/pr3.svg" width={25} height={25} alt="mic-img" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <div className="absolute left-[18px] top-[10px] bottom-[10px]">
              <Image src="/mic.svg" width={12} height={19} alt="mic-img" />
            </div>
            <div>
              <input
                type="text"
                className="bg-[#F5F9FF] rounded-[30px] w-full h-[39px] font-16 pl-12 pr-40 font-normal focus:outline-none"
              />
            </div>

            <div className="absolute right-[118px] top-[10px] bottom-[10px]">
              <Image src="/pin.svg" width={24} height={24} alt="mic-img" />
            </div>

            <div className="absolute right-[72px] top-[5px] bottom-[10px]">
              <Image
                src="/camera.svg"
                width={28}
                height={28}
                alt="camera-img"
              />
            </div>

            <div className="absolute right-[32px] top-[5px] bottom-[10px]">
              <Image src="/emoji.svg" width={28} height={28} alt="camera-img" />
            </div>
          </div>
          <div>
            <Image src="/send.svg" width={40} height={39} alt="send-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
