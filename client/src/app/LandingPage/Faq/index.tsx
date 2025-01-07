"use client"

import React from "react";
import { useState } from "react";

function FAQ() {

  const faqs = [
    {
        question: "Lorem Ipsum Dummy Text?",
        answer: "Yes, 100% free. The catch? We hope you'll hire us for repairs once we find the leak.",
    },
    {
        question: "Another Lorem Ipsum Dummy Text?",
        answer: "Yes, 100% free. The catch? We hope you'll hire us for repairs once we find the leak.",
    },
    {
        question: "More Lorem Ipsum Dummy Text?",
        answer: "Yes, 100% free. The catch? We hope you'll hire us for repairs once we find the leak.",
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
        <p className="text-lg text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis enim sapien. Pellentesque lacinia laoreet magna, non pretium vel.
        </p>
    </div>

    {/* FAQ Items */}
    <div className="space-y-4">
      {faqs.map((faq, index) => (
         <div key={index} className={`border ${openIndices.includes(index) ? "border-purple-500" : "border-gray-600"}  overflow-hidden`} >
            <div className="flex justify-between items-center cursor-pointer p-6" onClick={() => toggleFAQ(index)}>
               <h3 className="text-lg text-white font-medium">{faq.question}</h3>
                 <span className="text-white text-xl">
                     {openIndices.includes(index) ? "−" : "+"}
                 </span>
             </div>
            {openIndices.includes(index) && (
            <p className="text-gray-300 mt-4 pb-4 pl-6">{faq.answer}</p>)}
          </div>))}
      </div>

      {/* Contact Us Button */}
      <div className="text-center">
         <button className="bg-transparent hover:bg-purple-500 text-white border text-white font-medium py-3 px-6 rounded border border-[#9030CF] transition-colors">
          Still Have Questions? Contact Us
          </button>
      </div>

  </div>);
}

export default FAQ;
