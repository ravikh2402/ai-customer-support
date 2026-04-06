"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
function embedclient({ ownerId }: { ownerId: string }) {
  const navigateToDashboard=async()=>{
    window.location.href="/dashboard"
  }
  
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(embed);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  }
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const embed=`<script src="${appUrl}/chatBot.js"
              data-owner-id="${ownerId}"
              ></script>`

  return (
     <><motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between"
    >
      {/* Left: Logo / Title */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold text-gray-800"
      >
        Support AI
      </motion.h1>

      {/* Right: Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="bg-black text-white px-5 py-2 rounded-lg text-sm"
        onClick={navigateToDashboard}
        
      >
        Go To Dashboard
      </motion.button>
    </motion.nav><div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-semibold text-gray-800 mb-6"
          >
            Copy and paste this code before {"</body>"}
          </motion.h1>

          {/* Code Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-black rounded-xl p-5 relative mb-6"
          >
            <pre className="text-white text-sm overflow-x-auto">
              {embed}
            </pre>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 bg-white text-black text-xs px-3 py-1 rounded-md"
              onClick={handleCopy}
            >
              Copy
            </motion.button>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-600 mb-8"
          >
            <p>1. Copy the embed script</p>
            <p>2. Paste it before the closing body tag</p>
            <p>3. Reload your website</p>
          </motion.div>

          {/* Live Preview Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg font-semibold text-gray-800 mb-2"
          >
            Live Preview
          </motion.h2>

          <p className="text-sm text-gray-500 mb-4">
            This is how the chatbot will appear on your website
          </p>

          {/* Preview Window */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 rounded-xl p-6 h-[320px] relative border"
          >
            <div className="text-gray-400 text-sm">
              Your website goes here
            </div>

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-16 right-6 w-[260px] bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-black text-white text-xs px-4 py-2 flex justify-between items-center">
                Customer Support
                <span className="cursor-pointer">×</span>
              </div>

              <div className="p-3 text-xs space-y-2">
                <div className="bg-gray-100 px-3 py-2 rounded-lg w-fit">
                  hi how can I help you?
                </div>

                <div className="bg-black text-white px-3 py-2 rounded-lg w-fit ml-auto">
                  what is the return policy?
                </div>
              </div>
            </motion.div>

            {/* Floating Chat Button */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-4 right-6"
            >
              <div className="w-12 h-12 bg-black rounded-full shadow-lg cursor-pointer" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div></>
  );
}


export default embedclient