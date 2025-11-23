import { Button } from "@/components/ui/button";
import DefaultLayout from "@/layouts/default";
import { ArrowRight, CheckCircle2, Layout, ListTodo, Zap } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
    },
  },
};

const features = [
  {
    title: "Organize Effortlessly",
    description:
      "Keep your tasks structured with our intuitive list and board views.",
    icon: ListTodo,
  },
  {
    title: "Stay Focused",
    description:
      "Minimalist design helps you concentrate on what matters most right now.",
    icon: Zap,
  },
  {
    title: "Track Progress",
    description:
      "Visualize your productivity with beautiful charts and insights.",
    icon: Layout,
  },
];

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute -top-24 -left-24 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl dark:bg-primary/5" />
        <div className="absolute top-1/2 right-0 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl dark:bg-accent/5" />

        {/* Hero Section */}
        <section className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-24 text-center md:py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex max-w-4xl flex-col items-center gap-6"
          >
            <motion.div variants={itemVariants}>
              <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-foreground ring-1 ring-accent/20">
                Reimagine your productivity
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Master your day with <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Tohdo
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-lg text-muted-foreground sm:text-xl"
            >
              The simple, elegant, and powerful to-do list app designed to help
              you get more done with less stress.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full px-8 text-base"
              >
                <Link to="/auth/sign-up">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full px-8 text-base"
              >
                <Link to="/auth/sign-in">Sign In</Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Why choose Tohdo?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Built for individuals who want to bring order to chaos without the
              complexity of enterprise tools.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-8 md:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md dark:bg-white/5"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground shadow-2xl sm:px-16 md:py-24"
          >
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to take control of your tasks?
              </h2>
              <p className="mb-10 text-lg text-primary-foreground/80 sm:text-xl">
                Join thousands of users who are organizing their life with
                Tohdo. Start for free today.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="h-12 w-full rounded-full px-8 text-base font-semibold sm:w-auto"
                >
                  <Link to="/auth/sign-up">Start for Free</Link>
                </Button>
                <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                  <CheckCircle2 className="h-4 w-4" /> No credit card required
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
