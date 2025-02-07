"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";

function FAQ() {
  const faqs = [
    {
      question: "What is Raptors Who Code Club",
      answer:
        "Raptors Who Code Club is a virtual club at Montgomery College that serves all three campuses: Takoma Park, Germantown, and Rockville, Maryland. Our club is dedicated to students who are passionate about technology and coding.",
    },
    {
      question: "Who can join the Raptors Who Code Club?",
      answer:
        "We welcome all motivated and excited students from Montgomery College, regardless of their campus affiliation. Whether you're a beginner or an experienced coder, we have a place for you!",
    },
    {
      question: "How can I join the Raptors Who Code Club?",
      answer:
        "To join, simply fill out our membership form on the club's website or attend one of our virtual meetings. We are always accepting new members!",
    },
  ];

  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    if (openIndices.includes(index)) {
      // If the question is already open, close it
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      // Otherwise, add it to the list of open questions
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-[100px] ">
      {/*  Page Title*/}
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-400">Join us Today!</p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border ${
              openIndices.includes(index)
                ? "border-purple-500"
                : "border-gray-600"
            }  overflow-hidden`}
          >
            <div
              className="flex justify-between items-center cursor-pointer p-6"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg text-white font-medium">{faq.question}</h3>
              <span className="text-white text-xl">
                {openIndices.includes(index) ? "−" : "+"}
              </span>
            </div>
            {openIndices.includes(index) && (
              <p className="text-gray-300 mt-4 pb-4 pl-6">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Us Button */}
      <div className="text-center">
        <Link href="https://discord.gg/gQ7tqpb5" target="_blank">
          <button className="bg-transparent hover:bg-purple-500 text-white border text-white font-medium py-3 px-6 rounded border border-[#9030CF] transition-colors">
            Still Have Questions? Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
}

export default FAQ;
