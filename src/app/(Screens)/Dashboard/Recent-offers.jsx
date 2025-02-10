import { completed } from "@/app/data/completed";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecentOffers = () => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        {completed.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="section-bg md:flex justify-between items-center"
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <h1 className="font-16 font-bold leading-5 ">{item.name}</h1>
                <span className="font-12 font-normal leading-normal opacity-60">
                  {item.id}
                </span>
              </div>

              <div className="flex gap-2">
                <div>
                  <h1 className="text-[#1559A8] font-20 font-semibold leading-7 tracking-[0.15px]">
                    $129
                  </h1>
                </div>
                <Image
                  src="/location.svg"
                  width={20}
                  height={20}
                  alt="location"
                />
                <span className="font-16 font-normal leading-normal opacity-35">
                  {item.location}
                </span>
              </div>
              <div>
                <p className="font-12 normal-font leading-4 tracking-[0.15px] w-auto md:w-96 lg:w-auto">
                  {item.desc.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br className="hidden lg:block" />
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-3 md:mt-0">
              <div className="flex items-center gap-2">
                <Image
                  src="./calendar.svg"
                  className=""
                  width={20}
                  height={20}
                  alt="calendar"
                />
                <h1 className="font-16 normal-font leading-5 md:text-end">
                  {item.date}
                </h1>
              </div>

              <div className="flex md:justify-end items-end">
                <h1 className="completed-badge">{item.status}</h1>
              </div>

              <Link
                href="/previous-detail"
                className="check-detail-btn flex md:justify-end items-end"
              >
                {item.detailBtn}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOffers;
