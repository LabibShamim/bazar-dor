"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "../../app/lib/auth-client";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) return <div className="w-[170px]" />;
  return (
    <div className="flex shrink-0 items-center justify-end">
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-100"
          >
            <div className="avatar">
              <div className="relative h-10 w-10 overflow-hidden rounded-2xl bg-gray-100">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="Profile"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[20px] ">
                    👤
                  </div>
                )}
              </div>
            </div>

            <span className="max-w-32 truncate font-semibold text-gray-800">
              {user.name}
            </span>

            <span className="text-xs text-gray-500">▼</span>
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-[100] mt-3 w-80 rounded-3xl border border-gray-200 bg-white p-5 shadow-xl"
          >
            <li className="pointer-events-none mb-3">
              <div className="flex flex-col items-start gap-1 whitespace-normal">
                <span className="text-lg font-semibold text-gray-800">
                  {user.name}
                </span>
                <span className="break-all text-sm text-gray-500">
                  {user.email}
                </span>
              </div>
            </li>

            <li>
              <Link href="/Profile" className="py-3 text-base text-gray-800">
                👤 আমার প্রোফাইল
              </Link>
            </li>

            <li>
              <button
                type="button"
                onClick={() => authClient.signOut()}
                className="py-3 text-base text-red-500"
              >
                ↩ সাইন আউট
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/SignIn"
            className="btn min-h-9 h-9 rounded-[8px] border-none bg-[#f5f5f599] px-5 text-sm text-black shadow-md hover:bg-[#dedede]"
          >
            সাইন ইন
          </Link>

          <Link
            href="/SignUp"
            className="btn min-h-9 h-9 rounded-[8px] border-none bg-[#078b43] px-5 text-sm text-white shadow-md hover:bg-[#067537]"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;