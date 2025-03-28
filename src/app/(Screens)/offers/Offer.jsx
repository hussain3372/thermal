import { offers } from "@/app/data/offers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Offer = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="font-20 leading-6 flex items-center gap-3">
          Job Offers
        </div>
        <div>
          <div className="relative">
            <input
              type="text"
              name="text"
              className="global-input"
              placeholder="Find something.."
            />
            <div className="search-icon">
              <Image
                src="/search-icon.svg"
                width={16}
                height={16}
                alt="search"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {offers.map((item, index) => (
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
                <p className="font-12 font-normal leading-4 tracking-[0.15px] w-auto md:w-96 lg:w-auto">
                  {item.desc.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br className="hidden lg:block"/>
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
                <h1 className="font-16 font-normal leading-5 md:text-end">{item.date}</h1>
              </div>

              <div className="flex md:justify-end items-end">
                <h1 className="new-badge">{item.status}</h1>
              </div>

              <Link href="/order-detail" className="check-detail-btn flex md:justify-end items-end">
                {item.detailBtn}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
