"use client"

import { motion } from "framer-motion"

interface LogoProps {
  className?: string
  width?: number
  height?: number
  animate?: boolean
}

export default function Logo({ className = "", width = 80, height = 80, animate = true }: LogoProps) {
  const arcadeMachine = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  const machinePart = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const wheels = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const screen = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  }

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      variants={animate ? arcadeMachine : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {/* Cabinet Base */}
      <motion.rect
        x="20"
        y="15"
        width="60"
        height="65"
        rx="3"
        fill="#1a0033"
        stroke="#ff00ff"
        strokeWidth="2"
        variants={machinePart}
      />

      {/* Screen */}
      <motion.rect
        x="25"
        y="20"
        width="50"
        height="35"
        rx="2"
        fill="#000000"
        stroke="#00ffff"
        strokeWidth="2"
        variants={screen}
      />

      {/* Screen Content - Pac-Man and Ghost */}
      <motion.circle cx="40" cy="37" r="5" fill="#ffff00" variants={machinePart} />
      <motion.path d="M60 32 L65 37 L60 42 L55 42 L55 32 L60 32" fill="#ff00ff" variants={machinePart} />

      {/* Control Panel */}
      <motion.rect
        x="25"
        y="60"
        width="50"
        height="15"
        rx="2"
        fill="#2a0044"
        stroke="#ff00ff"
        strokeWidth="1"
        variants={machinePart}
      />

      {/* Joystick */}
      <motion.circle cx="35" cy="67" r="4" fill="#ff00ff" variants={machinePart} />
      <motion.circle cx="35" cy="67" r="2" fill="#00ffff" variants={machinePart} />

      {/* Buttons */}
      <motion.circle cx="55" cy="65" r="3" fill="#ff0000" variants={machinePart} />
      <motion.circle cx="65" cy="65" r="3" fill="#00ff00" variants={machinePart} />
      <motion.circle cx="60" cy="70" r="3" fill="#0000ff" variants={machinePart} />

      {/* Wheels */}
      <motion.circle cx="30" cy="85" r="5" fill="#333333" stroke="#00ffff" strokeWidth="1" variants={wheels} />
      <motion.circle cx="70" cy="85" r="5" fill="#333333" stroke="#00ffff" strokeWidth="1" variants={wheels} />

      {/* Marquee */}
      <motion.rect
        x="15"
        y="10"
        width="70"
        height="10"
        rx="2"
        fill="#2a0044"
        stroke="#ff00ff"
        strokeWidth="1"
        variants={machinePart}
      />

      {/* Marquee Text */}
      <motion.text
        x="50"
        y="18"
        fontSize="8"
        fontWeight="bold"
        fill="#00ffff"
        textAnchor="middle"
        variants={machinePart}
      >
        PARK & PLAY
      </motion.text>
    </motion.svg>
  )
}
