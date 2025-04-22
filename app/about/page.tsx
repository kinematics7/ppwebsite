"use client"

import { motion } from "framer-motion"
import { History, Truck, Heart } from "lucide-react"
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
              Bringing the authentic arcade experience directly to your events
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
                Welcome to our mobile arcade business! We are a husband and wife duo team that share a passion for old
                classic arcade games and a little competition. A hobby turned business, we wanted to share that love and
                passion by bringing the fun to you.
              </p>
              <p>
                Our mission is to provide a unique and exciting experience for all ages with our mobile arcade trailer
                that offers a wide selection of games. Whether it's a birthday party, corporate event, or fundraiser,
                we've got you covered.
              </p>
              <p>
                We will ensure that your event runs smoothly from start to finish and will create a fun and safe
                environment for everyone to enjoy. Book us for your next event and let us bring the party to you!
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
