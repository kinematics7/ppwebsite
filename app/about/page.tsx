"use client"

import { motion } from "framer-motion"
import { History, Truck, Users, Heart } from "lucide-react"
import Logo from "../components/logo"

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-950">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Logo width={80} height={80} className="mx-auto mb-6" />
            <h1 className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-4">
              About Park & Play
            </h1>
            <p className="text-lg text-cyan-300 max-w-2xl mx-auto">
              Bringing the authentic 80s arcade experience directly to your events
            </p>
          </motion.div>
        </div>

        {/* Our Story */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={fadeIn} className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <History className="h-8 w-8 text-pink-500" />
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
                Our Story
              </h2>
            </div>
            <div className="prose prose-lg prose-invert max-w-none">
              <p>
                Park & Play was born from a passion for classic arcade gaming and a desire to share that nostalgic
                experience with others. Founded in 2018 by lifelong gamers Mike and Sarah Johnson, our mobile arcade
                business began with just three classic machines and a dream.
              </p>
              <p>
                What started as weekend rentals for birthday parties quickly grew into a full-service mobile arcade
                experience. Today, we proudly own over 30 fully-restored classic arcade cabinets from the golden age of
                arcade gaming.
              </p>
              <p>
                Our mission is simple: bring the authentic arcade experience of the 80s and early 90s to modern events,
                creating unforgettable memories and introducing new generations to the games that defined an era.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          className="mb-20 bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-2xl border border-pink-500/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={fadeIn} className="text-center mb-10">
            <Truck className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">We bring the arcade to you in three simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Book Your Event",
                description:
                  "Choose your date, location, and the number of arcade machines you want. We'll handle the rest!",
              },
              {
                step: "2",
                title: "We Deliver & Set Up",
                description: "Our team arrives with the selected arcade machines and sets everything up at your venue.",
              },
              {
                step: "3",
                title: "Play & Enjoy",
                description:
                  "Your guests enjoy unlimited play on authentic arcade machines. When the event is over, we pack up and leave everything clean and tidy.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-black/50 p-6 rounded-xl border border-cyan-500/30 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-cyan-300 mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Team */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={fadeIn} className="text-center mb-10">
            <Users className="h-12 w-12 mx-auto text-pink-500 mb-4" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The passionate arcade enthusiasts behind Park & Play
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mike Johnson",
                role: "Founder & Arcade Technician",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Mike has been restoring arcade machines for over 15 years and knows every circuit board by heart.",
              },
              {
                name: "Sarah Johnson",
                role: "Co-Founder & Event Coordinator",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Sarah handles all event logistics and ensures every detail is perfect for your arcade experience.",
              },
              {
                name: "Alex Rivera",
                role: "Technical Specialist",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Alex keeps our machines running perfectly and can fix any arcade issue on the spot.",
              },
            ].map((member, index) => (
              <motion.div key={index} variants={fadeIn} className="text-center">
                <div className="mb-4 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-cyan-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="relative w-40 h-40 mx-auto rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-pink-400 mb-3">{member.role}</p>
                <p className="text-gray-300">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={fadeIn} className="text-center mb-10">
            <Heart className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              What drives us to deliver the best retro gaming experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Authenticity",
                description:
                  "We're committed to providing the most authentic arcade experience possible, with original machines and genuine parts.",
              },
              {
                title: "Reliability",
                description:
                  "Our machines are meticulously maintained to ensure they work perfectly throughout your entire event.",
              },
              {
                title: "Customer Service",
                description:
                  "We go above and beyond to make your event special, with personalized service and attention to detail.",
              },
              {
                title: "Passion",
                description:
                  "We're genuine arcade enthusiasts who love sharing the joy of retro gaming with new generations.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-black/50 p-6 rounded-xl border border-pink-500/30"
              >
                <h3 className="text-xl font-bold text-pink-300 mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
