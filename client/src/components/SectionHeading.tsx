import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({ title, subtitle, alignment = "center", light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${alignment === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight ${light ? "text-white" : "text-foreground"}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${light ? "text-gray-300" : "text-muted-foreground"}`}>
            {subtitle}
          </p>
        )}
        <div className={`h-1.5 w-24 bg-primary rounded-full mt-6 ${alignment === "center" ? "mx-auto" : ""}`} />
      </motion.div>
    </div>
  );
}
