"use client";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export default function Support() {
  const dotclass = "w-1 h-1 inline-block bg-white rounded-full opacity-30 ml-3";
  return (
    <SectionWrapper className="py-10">
      <div className="container mx-auto px-4 md:px-10 ">
        <motion.div
          className={`relative mx-auto flex w-full flex-col items-center rounded-2xl bg-blue-600 px-7 pt-14 text-white  md:flex-row md:p-14 lg:w-4/5  `}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="absolute bottom-10 left-[60%] translate-x-[-60%]">
            {[1, 2, 3, 4].map((_, idx) => (
              <span key={idx} className={dotclass}></span>
            ))}
            <br />
            {[1, 2, 3, 4].map((_, idx) => (
              <span key={idx} className={dotclass}></span>
            ))}
          </div>
          <div className="md:w-2/3 lg:w-2/4">
            <div className="mb-2 flex items-center gap-2">
              <span className="block h-0.5 w-5 bg-white"></span>
              <h2 className="text-sm font-medium text-white">CONTACT US</h2>
              <span className="block h-0.5 w-5 bg-white"></span>
            </div>
            <h2 className="mb-4 font-bold md:text-2xl lg:text-3xl">
              24/7 Expert Hosting Support Our Customer's Love
            </h2>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-fit rounded-full bg-white uppercase text-blue-600 hover:bg-blue-50">
                Get in Contact{" "}
                <span className="transition-all duration-150 group-hover:ml-2">
                  <MoveRight />
                </span>{" "}
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="static bottom-0 right-0 mt-6 md:absolute md:mt-0 md:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="mx-auto overflow-hidden">
              <Image
                alt="support women"
                className=" object-cover"
                height={300}
                src="/images/calling-women.png"
                width={300}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
