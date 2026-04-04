"use client";
import { useState } from "react";

import { motion } from "framer-motion";
import styles from "./homeclient.module.css";

export default function HomeClient({email}:{email?:string }) {
  const firstletter=email?.charAt(0).toUpperCase()
  const [open, setopen] = useState(false);


  const handleGetStarted = () => {
    alert("Redirecting to signup page...");
  };

  const handleLearnMore = () => {
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const handleLogin = () => {
    window.location.href="/api/auth/login"
  };
  const handlelogout=async()=>{
    await fetch("/api/auth/logout")
    window.location.href="/"
  }
  const navigateToDashboard=async()=>{
    window.location.href="/dashboard"
  }

  return (
    <div className={styles.container}>

      {/* Navbar */}
      <nav className={styles.navbar}>
        <motion.div
          className={styles.logo}
          initial={{ opacity:0, y:-20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6 }}
        >
          SupportAI
        </motion.div>

         {email?
         <div>
          <button onClick={() => setopen(!open)}
          style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          background: "black",
          color: "white",
          fontSize: "18px",
          cursor: "pointer"
        }}>{firstletter}</button>


           {open && (
        <div style={{
            position: "absolute",
            right: 0,
            marginTop: "10px",
            width: "200px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            padding: "12px",
            textAlign: "center",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0px)" : "translateY(-10px)",
            pointerEvents: open ? "auto" : "none",
            transition: "all 0.25s ease"
          }}>
          
          {/* Email */}
          <div style={{ 
            fontSize: "14px", 
            color: "#333", 
            marginBottom: "10px"
          }}>
            {email}
          </div>

          {/* Logout Button */}
           {/* Dashboard Button */}
        <button
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "8px",
            border: "none",
            borderRadius: "6px",
            background: "#3b82f6",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            transition: "background 0.2s"
          }}
          onClick={navigateToDashboard}
        >
          Dashboard
        </button>

        {/* Logout Button */}
        <button
          style={{
            width: "100%",
            padding: "8px",
            border: "none",
            borderRadius: "6px",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            transition: "background 0.2s"
          }}
          onClick={handlelogout}
        >
          Logout
        </button>
      

        </div>
      )}
          
         </div>:
         <motion.button

          className={styles.loginBtn}
          whileHover={{ scale:1.1 }}
          whileTap={{ scale:0.95 }}
          onClick={handleLogin}
        >
          Login
        </motion.button>}
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>

        <motion.div
          className={styles.left}
          initial={{ opacity:0, x:-60 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:0.8 }}
        >
          <h1>
            AI Customer Support <br />
            Built for Modern <br />
            Websites
          </h1>

          <p>
            Add a powerful AI chatbot to your website in minutes.
            Let your customers get instant answers using your own
            business knowledge.
          </p>

          <div className={styles.buttons}>

            <motion.button
              className={styles.primary}
              whileHover={{ scale:1.05 }}
              whileTap={{ scale:0.95 }}
              onClick={handleGetStarted}
            >
              Get Started
            </motion.button>

            <motion.button
              className={styles.secondary}
              whileHover={{ scale:1.05 }}
              whileTap={{ scale:0.95 }}
              onClick={handleLearnMore}
            >
              Learn More
            </motion.button>

          </div>
        </motion.div>

        {/* Chat Preview */}
        <motion.div
          className={styles.chatPreview}
          initial={{ opacity:0, x:80 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:0.9 }}
        >

          <p className={styles.chatTitle}>Live Chat Preview</p>

          <motion.div
            className={styles.userMsg}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:0.5 }}
          >
            Do you offer cash on delivery?
          </motion.div>

          <motion.div
            className={styles.botMsg}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:1 }}
          >
            Yes, Cash on Delivery is available.
          </motion.div>

          <motion.button
            className={styles.chatButton}
            whileHover={{ scale:1.2 }}
            whileTap={{ scale:0.9 }}
            onClick={() => alert("Opening chatbot...")}
            >🗨️
          </motion.button>

        </motion.div>

      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>

        <motion.h2
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.6 }}
        >
          Why Businesses Choose SupportAI
        </motion.h2>

        <div className={styles.featureGrid}>

          {["Plug & Play", "Admin Controlled", "Always Online"].map((title,i)=>(

            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity:0, y:40 }}
              whileInView={{ opacity:1, y:0 }}
              transition={{ delay:i*0.2 }}
              whileHover={{ scale:1.05 }}
            >
              <h3>{title}</h3>
              <p>
                Powerful AI tools that help businesses automate
                customer support and improve response times.
              </p>
            </motion.div>

          ))}

        </div>

      </section>

    </div>
  );
}