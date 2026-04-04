"use client";
import axios from "axios";

import React, { useState } from "react";
import { motion } from "framer-motion";

function DashboardClient({ ownerId }: { ownerId: string }) {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handlesettings=async()=>{ 
    setLoading(true)
    try {
      const result=await axios.post("/api/settings",{ownerId, businessName, supportEmail: email, knowledge})
      setLoading(false)
      alert("Settings saved successfully!")
    }  catch (error) {
      setLoading(false)
      console.error("Error saving settings:", error)
      alert("Failed to save settings")
    }
  }
  const navigateToembedclient=async()=>{
    window.location.href="/embed"
  }

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
        onClick={navigateToembedclient}
      >
        
      
        Embed AI
      </motion.button>
    </motion.nav>
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">

        {/* Animated Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8"
        >

          {/* Header */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-semibold text-gray-800"
          >
            ChatBot Settings
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm mt-1 mb-6"
          >
            Manage your AI chatbot knowledge and business details
          </motion.p>

          {/* Business Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-md font-semibold text-gray-700 mb-3">
              Business Details
            </h2>

            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full mb-3 px-4 py-3 border rounded-lg text-sm focus:outline-none" />

            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Support Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none" />
          </motion.div>

          {/* Knowledge Base */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-md font-semibold text-gray-700">
              Knowledge Base
            </h2>

            <p className="text-gray-500 text-sm mb-3">
              Add FAQs, policies, delivery info, refunds, etc.
            </p>

            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              rows={8}
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
              placeholder={`Example:
• Refund policy: 7 days return available
• Delivery time: 3-5 working days
• Cash on Delivery available
• Support hours`}
              className="w-full px-4 py-3 border rounded-lg text-sm resize-none focus:outline-none" />
          </motion.div>

          {/* Save Button */}
          <motion.button
            onClick={handlesettings}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded-lg text-sm"
          >
            {loading ? "Saving..." : "Save"}

          </motion.button>
        </motion.div>
      </div></>
  );
}

export default DashboardClient;