"use client";

import { motion } from "framer-motion";
import { Github, Mail, Linkedin } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ContactSection() {
  // const handleSubmit = () => {
  //   console.log("Form submitted");
  // };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Let&apos;s Connect
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Interested in working together or have questions? Feel free to reach
            out!
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h3 className="mb-6 text-2xl font-semibold">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-muted/30 p-3">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href={`mailto:${personalInfo.contact.email}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {personalInfo.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-muted/30 p-3">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <a
                    href={`${personalInfo.contact.linkedin}`}
                    target="_blank"
                    className="break-all text-muted-foreground transition-colors hover:text-primary"
                  >
                    {personalInfo.contact.linkedin}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-muted/30 p-3">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <a
                    href={`${personalInfo.contact.github}`}
                    target="_blank"
                    className="break-all text-muted-foreground transition-colors hover:text-primary"
                  >
                    {personalInfo.contact.github}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="relative"
          >
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-50 blur-sm" />
            <div className="relative rounded-lg border border-border/40 bg-background p-8">
              <h3 className="mb-6 text-2xl font-semibold">Send a Message</h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-md border border-border/40 bg-muted/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-md border border-border/40 bg-muted/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-md border border-border/40 bg-muted/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <Button className="w-full" onClick={handleSubmit}>
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
