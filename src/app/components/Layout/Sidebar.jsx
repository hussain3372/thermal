import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");

  // Define all statuses with their respective properties
  const statuses = [
    {
      name: "Offers" ,
      key: "offer" ,
      color: "text-blue-500",
      icon: "/logo1.svg",
    },
    {
      name: "In progress",
      key: "in-progress",
      color: "text-indigo-500",
      icon: "/logo2.svg",
    },
    {
      name: "Accepted",
      key: "accept",
      color: "text-green-800",
      icon: "/logo3.svg",
    },
    {
      name: "Installation Completed",
      key: "installation-completed",
      color: "text-green-500",
      icon: "/logo4.svg",
    },
    {
      name: "Payment",
      key: "payment-in-progress",
      color: "text-lime-500",
      icon: "/logo5.svg",
    },

    // Order history section, added to statuses for dynamic rend
    {
      name: "Previous Orders",
      key: "previous",
      color: "text-[#007E8F]",
      icon: "/logo6.svg",
    },
    {
      name: "Completed",
      key: "completed",
      color: "text-[#65B400]",
      icon: "/logo7.svg",
    },
    {
      name: "Cancelled Orders",
      key: "cancelled",
      color: "text-[#ED2024]",
      icon: "/logo8.svg",
    },
    {
      name: "Reject Orders",
      key: "reject",
      color: "text-[#ED2024]",
      icon: "/logo8.svg",
    },
  ];

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

          {/* Status Section */}
          <div className="flex flex-col gap-[20px] justify-start mb-5">
            <div>
              <h1 className="text-[#000] font-14 font-normal leading-5">
                Status
              </h1>
            </div>
            <ul>
              {statuses.slice(0, 5).map((status) => {
                const isActive = activeStatus === status.key; // Compare directly with query param

                return (
                  <li key={status.key} className="py-2">
                    <Link
                      href={`/orders?status=${status.key}`} // Pass status in query
                      className={`font-16 font-normal flex items-center gap-3 justify-start w-[200px] ${
                        isActive
                          ? `${status.color} font-bold`
                          : "text-[#00000099]"
                      } hover:text-[#668DFF]`}
                    >
                      <Image
                        width={20}
                        height={20}
                        src={status.icon}
                        alt={status.name}
                        className="w-5 h-5"
                      />
                      {status.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div>
              <h1 className="text-[#000] font-14 font-normal leading-5">
                Order History
              </h1>
            </div>

            <ul>
              {statuses.slice(5, 9).map((status) => {
                const isActive = activeStatus === status.key; // Compare directly with query param

                return (
                  <li key={status.key} className="py-2">
                    <Link
                      href={`/orders?status=${status.key}`} // Pass status in query
                      className={`font-16 font-normal flex items-center gap-3 justify-start w-[200px] ${
                        isActive
                          ? `${status.color} font-bold`
                          : "text-[#00000099]"
                      } hover:text-[#668DFF]`}
                    >
                      <Image
                        width={20}
                        height={20}
                        src={status.icon}
                        alt={status.name}
                        className="w-5 h-5"
                      />
                      {status.name}
                    </Link>
                  </li>
                );
              })}

              <div className="pt-2">
                <Link
                  href="#"
                  className={`font-16 font-normal leading-5 gap-2 flex items-center justify-start ${
                    pathname === "#" ? "text-[#000000]" : "text-[#000000]"
                  } hover:text-[#000000]`}
                >
                  <Image src="/logo9.svg" height={24} width={24} alt="logo" />
                  Communications
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
