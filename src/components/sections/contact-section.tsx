"use client";

import { motion } from "framer-motion";
import { Github, Mail, Linkedin } from "lucide-react";
import { personalInfo } from "@/constants";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ContactSection() {
  // const handleSubmit = () => {
  //   console.log("Form submitted");
  // };

  return (
    <section id="contact" className="py-24 bg-muted/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-16 text-center"
        >
          <h2 className="section-heading !mb-4">
            Let&apos;s Connect
          </h2>
          <p className="section-subheading !mb-0">
            Interested in working together or have questions? Feel free to reach
            out!
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="glass-card rounded-2xl p-8 sm:p-10"
          >
            <h3 className="mb-8 text-2xl font-semibold text-center">Contact Information</h3>
            <div className="space-y-6">
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="group flex items-center gap-5 rounded-xl border border-border/40 bg-background/50 p-5 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg cursor-pointer"
                aria-label={`Send email to ${personalInfo.contact.email}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <Mail className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {personalInfo.contact.email}
                  </p>
                </div>
              </a>

              <a
                href={`${personalInfo.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-xl border border-border/40 bg-background/50 p-5 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg cursor-pointer"
                aria-label="Visit my LinkedIn profile"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                  <Linkedin className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1">LinkedIn</h4>
                  <p className="text-sm text-muted-foreground truncate">
                    Connect with me
                  </p>
                </div>
              </a>

              <a
                href={`${personalInfo.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-xl border border-border/40 bg-background/50 p-5 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg cursor-pointer"
                aria-label="Visit my GitHub profile"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-500/10 text-gray-500 dark:text-gray-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-500/20">
                  <Github className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1">GitHub</h4>
                  <p className="text-sm text-muted-foreground truncate">
                    View my code
                  </p>
                </div>
              </a>
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
