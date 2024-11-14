"use client";

import React from "react";
import {
  cn,
} from "@nextui-org/react";

// import {RishabhIcon} from "./Rishabh";
// import SidebarDrawer from "./sidebar-drawer";

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */

export default function Component({
  children,
  header,
  title,
  subTitle,
  classNames = {},
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
  subTitle?: string;
  classNames?: Record<string, string>;
}) {
  return (
    <div className="flex min-h-screen lg:min-h-144 max-h-screen py-4 border max-w-6xl bg-black mx-auto">
      <div className="flex flex-col px-4 ">
        <header
          className={cn(
            "flex h-16 min-h-16 items-center justify-between gap-2 rounded-none rounded-t-medium border-small border-divider px-4 py-3",
            classNames?.["header"],
          )}
        >
          {(title || subTitle) && (
            <div className="">
              <div className="truncate text-small font-semibold leading-5 text-foreground">
                {title}
              </div>
              <div className="truncate text-small font-normal leading-5 text-default-500">
                {subTitle}
              </div>
            </div>
          )}
          {header}
        </header>
        <main className="flex h-full">
          <div className="flex h-full flex-col gap-4 rounded-none rounded-b-medium border-0 border-b border-l border-r border-divider py-3">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
