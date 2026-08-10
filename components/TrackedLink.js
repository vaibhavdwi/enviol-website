"use client";

import Link from "next/link";
import { track } from "@/utils/tracker";
import { NAVIGATION_EVENTS } from "@/analytics/events";

export default function TrackedLink({
  href,
  children,
  trackingData,
  className,
}) {
  return (
    <Link
      href={href}
      onClick={() =>
        track(NAVIGATION_EVENTS.NAVIGATION_CLICK, {
          metadata: trackingData,
        })
      }
      className={className}
    >
      {children}
    </Link>
  );
}