"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  eventType: z.string().min(1, {
    message: "Please select an event type.",
  }),
  date: z.string().min(1, {
    message: "Please select a date.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Booking() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      eventType: "",
      date: "",
      message: "",
    },
  })

  const router = useRouter()

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Redirect to the contact page
    router.push("/contact")
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-950 to-black py-20">
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #ff00ff 0, #ff00ff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 sm:text-5xl">
            Book Your Event
          </h2>
          <p className="mb-8 text-lg text-pink-300">
            Ready to bring the ultimate 80s arcade experience to your next event? Fill out the form below and let's get
            the games rolling!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyan-300">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} className="border-cyan-500 bg-black/50 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyan-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        {...field}
                        className="border-cyan-500 bg-black/50 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyan-300">Event Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-cyan-500 bg-black/50 text-white">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-purple-950 text-white border-cyan-500">
                        <SelectItem value="birthday">Birthday Party</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="festival">Festival</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyan-300">Event Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="border-cyan-500 bg-black/50 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyan-300">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your event, location, and any specific games you'd like..."
                        className="min-h-[120px] border-cyan-500 bg-black/50 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-pink-500 hover:to-cyan-500 text-white font-bold shadow-[0_0_15px_rgba(255,0,255,0.3)]"
              >
                BOOK NOW
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}
