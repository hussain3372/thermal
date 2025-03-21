"use client";

import Image from "next/image";

const Installation = () => {
   return (
     <div>
       <div className="font-20 font-bold leading-6">Order Detail</div>
 
       <div className="flex justify-between items-center mt-7">
         <div className="font-16 font-medium leading-5">Charlie Chaplin</div>
         <div className="completed-badge">Completed</div>
       </div>
 
       <div className="sm:flex justify-between items-center mt-3 border-b border-[#C5C5C5] pb-7 space-y-5 sm:space-y-0">
         <div className="font-22 font-normal leading-normal text-[#5F5F5F]">
           Order Id: 1326747
         </div>
       </div>
 
       <div className="mt-7 border border-[#0000001F] rounded-[20px] p-3 ">
         <div className="sm:flex justify-between items-center space-y-3">
           <div className="font-20 font-bold leading-6 sm:flex items-center gap-3.5">
             Customer Reviews
             <div className="gap-1 flex items-center">
               <Image src="/star.svg" height={16} width={16} alt="star" />
               <Image src="/star.svg" height={16} width={16} alt="star" />
               <Image src="/star.svg" height={16} width={16} alt="star" />
               <Image src="/star.svg" height={16} width={16} alt="star" />
               <Image src="/star.svg" height={16} width={16} alt="star" />
             </div>
             <span className="text-[#00000099] font-14 font-normal ">
               (5.0)
             </span>
           </div>
 
           <div className="text-[#00000099] font-14 font-normal ">
             12:00PM / 12.8.2024
           </div>
         </div>
 
         <p className="font-16 font-normal leading-5 opacity-60 pt-3.5">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
           minim veniam, quis nostrud <br className="hidden md:block" />{" "}
           exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         </p>
         <div></div>
       </div>
 
       <div className="flex flex-col gap-4 mt-7">
         <div className="flex justify-between items-center">
           <div className="font-20 font-bold leading-6 text-[#3F3F3F]">
             Heater Repairing
           </div>
           <div>
             <Image src="/mes-icon.svg" height={40} width={40} alt="logo" />
           </div>
         </div>
 
         <div>
           <div className="flex gap-2">
             <Image
               src="/blue-location.svg"
               width={20}
               height={20}
               alt="location"
             />
             <span className="font-14 font-normal leading-normal">
               Location
             </span>
           </div>
         </div>
 
         <div>
           <p className="font-16 font-normal leading-5 opacity-60">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
             ad minim veniam, quis nostrud <br className="hidden md:block" />{" "}
             exercitation ullamco laboris nisi ut aliquip ex ea commodo
             consequat.
           </p>
         </div>
       </div>
 
       <div className="grid sm:grid-cols-2 gap-6 mt-7">
         <div className="bg-[#FFFFFF] rounded-lg py-5 px-4 gap-4 border border-[#C5C5C5] flex flex-col justify-center items-center">
           <Image src="/calendar.svg" width={24} height={24} alt="calendar" />
           <h1 className="font-14 font-normal leading-normal text-[#3F3F3F]">
             19 Jan 2023
           </h1>
         </div>
         <div className="bg-[#FFFFFF] rounded-lg py-5 px-4 gap-4 border border-[#C5C5C5] flex flex-col justify-center items-center">
           <Image src="/clock.svg" width={24} height={24} alt="calendar" />
           <h1 className="font-14 font-normal leading-normal text-[#3F3F3F]">
             9:00 PM - 10:00PM
           </h1>
         </div>
       </div>
 
       <div className="my-5">
         <div>
           <div className="font-20 font-bold leading-6 text-[#3F3F3F]">
             Heater Repairing
           </div>
           <p className="font-16 font-normal leading-5 opacity-60  pt-4">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
             ad minim veniam, quis nostrud <br className="hidden md:block" />
             exercitation ullamco laboris nisi ut aliquip ex ea commodo
             consequat.
           </p>
         </div>
         <div className="my-5 flex items-center flex-wrap justify-start gap-5 ">
           <Image src="/prev5.png" width={180} height={180} alt="preview-img" />
           <Image src="/prev5.png" width={180} height={180} alt="preview-img" />
           <Image src="/prev5.png" width={180} height={180} alt="preview-img" />
           <Image src="/prev5.png" width={180} height={180} alt="preview-img" />
         </div>
       </div>
     </div>
   );
};

export default Installation;
