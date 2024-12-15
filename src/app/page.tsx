'use client';
import type { Metadata } from "next";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();
  useEffect(() => {
      router.push('/pages/HomePage');
  }, []);
  return (<></>)
}
