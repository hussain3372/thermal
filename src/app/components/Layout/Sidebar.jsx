import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  return (
    <div
      className={`bg-[#F5F9FF] top-[86px] w-[220px] pt-[14px] pl-6 pr-[27px] pb-5 fixed lg:block transition-transform duration-300 ease-in-out overflow-y-auto ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 h-full z-50 flex flex-col`}
    >
      <div className="mt-[60px]">
        <div>
          <div className="flex flex-col gap-[20px] justify-start mb-5">
            <div>
              <h1 className="text-[#000] font-14 font-normal leading-5">
                Manage
              </h1>
            </div>
            <div>
              <Link
                href="/"
                className={`font-16 font-normal leading-5 gap-2 flex items-center justify-start ${
                  pathname === "/" ? "text-[#1559A8]" : "text-[#00000099]"
                } hover:text-[#1559A8]`}
              >
                <Image
                  src="/dashboard-logo.svg"
                  height={24}
                  width={24}
                  alt="logo"
                />
                Dashboard
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-[20px] justify-start mb-5">
            <div>
              <h1 className="text-[#000] font-14 font-normal leading-5">
                Status
              </h1>
            </div>
            <div>
              <Link
                href="/offers"
                className={`font-16 font-normal leading-5 gap-2 flex items-center justify-start ${
                  pathname === "/offers" ? "text-[#1559A8]" : "text-[#00000099]"
                } hover:text-[#1559A8]`}
              >
                <Image src="/logo1.svg" height={24} width={24} alt="logo" />
                Offers
              </Link>
            </div>
            <div>
              <Link
                href="/current-orders"
                className={`font-16 font-normal leading-5 gap-2 flex items-center justify-start ${
                  pathname === "/current-orders" ? "text-[#0EB6C0]" : "text-[#00000099]"
                } hover:text-[#0EB6C0]`}
              >
                <Image src="/logo2.svg" height={24} width={24} alt="logo" />
                In progress
              </Link>
            </div>
            <div>
              <Link
                href="/accepted-orders"
                className={`font-16 font-normal leading-5 gap-2 flex items-center justify-start ${
                  pathname === "/accepted-orders" ? "text-[#1559A8]" : "text-[#00000099]"
                } hover:text-[#1559A8]`}
              >
                <Image src="/logo3.svg" height={24} width={24} alt="logo" />
                Accepted
              </Link>
            </div>
            <div>
              <Link
                href="/installations"
                className={`font-16 font-normal leading-5 gap-2 flex items-center justify-start ${
                  pathname === "/installations"
                    ? "text-[#65B400]"
                    : "text-[#00000099]"
                } hover:text-[#65B400]`}
              >
                <Image src="/logo4.svg" height={24} width={24} alt="logo" />
                Installation Completed
              </Link>
            </div>
            <div>
              <Link
                href="/payments"
                className={`font-16 font-normal leading-5 gap-2 flex items-center justify-start ${
                  pathname === "/payment" ? "text-[#0EB6C0]" : "text-[#00000099]"
                } hover:text-[#0EB6C0]`}
              >
                <Image src="/logo5.svg" height={24} width={24} alt="logo" />
                Payment
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-[20px] justify-start">
            <div>
              <h1 className="text-[#000] font-14 font-normal leading-5">
                Order History
              </h1>
            </div>

            <div>
              <Link
                href="/completed-orders"
                className={`font-16 font-normal leading-5 gap-2 flex items-center justify-start ${
                  pathname === "/completed-orders"
                    ? "text-[#007E8F]"
                    : "text-[#00000099]"
                } hover:text-[#007E8F]`}
              >
                <Image src="/logo6.svg" height={24} width={24} alt="logo" />
                Previous Orders
              </Link>
            </div>

            <div>
              <Link
                href="/completed-orders"
                className={`font-16 font-normal leading-5 gap-2 flex items-center justify-start ${
                  pathname === "/completed-orders"
                    ? "text-[#65B400]"
                    : "text-[#00000099]"
                } hover:text-[#65B400]`}
              >
                <Image src="/logo7.svg" height={24} width={24} alt="logo" />
                Completed
              </Link>
            </div>

            <div>
              <Link
                href="/cancelled-orders"
                className={`font-16 font-normal leading-5 gap-2 flex items-center justify-start ${
                  pathname === "/cancelled-orders"
                    ? "text-[#ED2024]"
                    : "text-[#00000099]"
                } hover:text-[#ED2024]`}
              >
                <Image src="/logo8.svg" height={24} width={24} alt="logo" />
                Cancelled Orders
              </Link>
            </div>

            <div>
              <Link
                href="/cancelled-orders"
                className={`font-16 font-normal leading-5 gap-2 flex items-center justify-start ${
                  pathname === "/cancelled-orders"
                    ? "text-[#000000]"
                    : "text-[#000000]"
                } hover:text-[#000000]`}
              >
                <Image src="/logo9.svg" height={24} width={24} alt="logo" />
                Communications
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
