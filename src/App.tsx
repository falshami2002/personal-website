import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaGithub, FaAws } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { FiGithub, FiPlay } from "react-icons/fi";
import { FaLink } from "react-icons/fa6";
import { SiTypescript, SiReact, SiNodedotjs, SiExpress, SiPython, SiTensorflow, SiKotlin, SiDocker, SiMongodb, SiJavascript, SiNextdotjs, SiPostgresql  } from "react-icons/si";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_2bdn9dd",
        "template_ycnvpii",
        formRef.current,
        "LrM4edznFeHxbnFaL"
      )
      .then(
        () => setStatus("Message sent successfully!"),
        (error) => {
          console.error(error);
          setStatus("Something went wrong. Please try again.");
        }
      );

    (e.target as HTMLFormElement).reset();
  };

  return (
    <form
      ref={formRef}
      onSubmit={sendEmail}
      className="grid gap-3 max-w-lg mx-auto text-left"
    >
      <input
        type="text"
        name="user_name"
        placeholder="Your Name"
        className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
        required
      />
      <input
        type="email"
        name="user_email"
        placeholder="Your Email"
        className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        rows={4}
        className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
        required
      />
      <button
        type="submit"
        className="rounded-full text-black px-4 py-2 text-sm transition-colors duration-300"
      >
        Send
      </button>

      {status && <p className="text-sm text-center text-slate-600 mt-2">{status}</p>}
    </form>
  );
}

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const ResumePreview = () => {
  return (
    <div className="flex justify-center py-8">
      <div className="border border-slate-300 rounded-xl shadow-sm overflow-hidden">
        <Document file="/Resume.pdf" onLoadError={console.error}>
          <Page
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="bg-white"
          />
        </Document>
      </div>
    </div>
  );
}

const skills = [
  { name: "TypeScript", icon: <SiTypescript className="text-sky-600 text-2xl sm:text-4xl" /> },
  { name: "React", icon: <SiReact className="text-sky-500 text-2xl sm:text-4xl" /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-green-600 text-2xl sm:text-4xl" /> },
  { name: "Express", icon: <SiExpress className="text-gray-700 text-2xl sm:text-4xl" /> },
  { name: "Python", icon: <SiPython className="text-yellow-500 text-2xl sm:text-4xl" /> },
  { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500 text-2xl sm:text-4xl" /> },
  { name: "Kotlin", icon: <SiKotlin className="text-purple-500 text-2xl sm:text-4xl" /> },
  { name: "AWS", icon: <FaAws className="text-orange-400 text-2xl sm:text-4xl" /> },
  { name: "Docker", icon: <SiDocker className="text-sky-500 text-2xl sm:text-4xl" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-700 text-2xl sm:text-4xl" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-2xl sm:text-4xl" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-gray-900 text-2xl sm:text-4xl" /> },
  { name: "SQL", icon: <SiPostgresql className="text-blue-500 text-2xl sm:text-4xl" /> },
];

const SkillsSection = () => {
  return (
    <Section id="skills" title="Skills">
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-3 border border-slate-200 rounded-xl px-5 py-3 text-base sm:text-lg text-slate-800 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {skill.icon}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs text-slate-700">
      {children}
    </span>
  );
}

type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  liveUrl?: string;
};

function ProjectCard({ title, description, tech, image, githubUrl, demoUrl, liveUrl }: ProjectCardProps) {

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-[minmax(260px,420px)_1fr]">
        <div className="relative bg-slate-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover aspect-square md:aspect-auto md:h-full"
          />
        </div>
        <div className="p-6 md:p-8">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{description}</p>

          <div className="mt-5">
            <p className="font-medium text-slate-800 text-sm">Technologies Used:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {tech.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-black">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-slate-300 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm hover:border-slate-300"
              >
                <FiGithub />
                View on GitHub
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-800 hover:border-slate-300"
              >
                <FiPlay />
                Watch Demo
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-800 hover:border-slate-300"
              >
                <FaLink />
                Go to Live Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


const SECTIONS = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
] as const;

type SectionId = typeof SECTIONS[number]["id"];

function useActiveSection(sectionIds: SectionId[]) {
  const [active, setActive] = useState<SectionId>(sectionIds[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -70% 0px",
          threshold: 0.1,
        }
      );

      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return active;
}

function Section({
  id,
  title,
  children,
}: {
  id: SectionId;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-label={title} className="scroll-mt-24 py-16 sm:py-20 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">{title}</h2>
        <div className="mt-4 text-slate-700 leading-relaxed">{children}</div>
      </div>
    </section>
  );
}

function TopNav({ active }: { active: SectionId }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <nav className="flex items-center justify-between h-14">
          <a href="#about" className="text-slate-900 font-bold tracking-tight">Firas Alshami</a>
          <ul className="hidden sm:flex gap-2">
            {SECTIONS.map((s) => (
              <li key={s.id} className={`transition-colors duration-300 inline-block rounded-full px-3 py-1 text-sm transition-colors hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded-xl hover:text-black ${active === s.id ? "bg-black text-white" : "text-black"}`}>
                <a
                  href={`#${s.id}`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default function Portfolio() {
  const active = useActiveSection(SECTIONS.map((s) => s.id));
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="scroll-smooth bg-white text-slate-800 min-h-screen w-screen max-w-full overflow-x-hidden"
    >
      <TopNav active={active} />
      <div className="h-14" aria-hidden />

      {/* Hero */}
      <section className="px-4 md:px-8 w-full">
        <div className="mx-auto w-full max-w-7xl pt-12 sm:pt-16 pb-6 text-center flex justify-center items-center flex-col gap-4">
          <img src="headshot.jpg" className="rounded-full w-50"></img>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            Hi, I’m Firas Alshami
          </h1>
          <p className="mt-4 text-slate-700 max-w-3xl mx-auto text-lg">
            Software Engineer | Computer Science @ California State University, Fullerton
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <div className="group rounded-full px-4 py-2 bg-slate-900 border border-black transition-colors duration-300 hover:bg-white">
              <a
                href="https://www.linkedin.com/in/firas-alshami-b8959a260/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-3xl text-white transition-colors duration-300 group-hover:text-black" />
              </a>
            </div>
            <div className="group rounded-full px-4 py-2 bg-slate-900 border border-black transition-colors duration-300 hover:bg-white">
              <a
                href="https://github.com/falshami2002"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-3xl text-white transition-colors duration-300 group-hover:text-black" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="w-full">
        <Section id="about" title="About Me">
          <div className="mx-auto max-w-3xl grid gap-3 text-left">
            <div className="rounded-2xl border border-slate-200 p-10 m-5 shadow-sm">
              <p className="text-lg text-black font-semibold">Developer with a Passion for Full-Stack Development and Machine Learning</p>
              <br></br>
              <p>Hi! My name is Firas, and I am a recent graduate from California State University, Fullerton. I graduated in May 2025 with a Major GPA of 3.92 and learned many valuable development and problem solving skills. My passion for software began at a young age as I was creating mods for my friends and I to enjoy on a Minecraft server. Throughout the years, this passion has grown to encompass solving real-world problems through software.</p>
              <br></br>
              <p>As a software engineer, I enjoy working on both front-end and back-end development, as well as exploring the field of machine learning. I am always eager to learn new technologies and improve my skills. In my free time, I enjoy contributing to open-source projects, building personal projects, and staying up-to-date with the latest trends in technology.</p>
              <br></br>
              <p>Feel free to explore my portfolio to see some of the projects I've worked on and the skills I've acquired. If you'd like to get in touch, please don't hesitate to reach out through the contact section below!</p>
            </div>
          </div>
        </Section>

        <Section id="resume" title="Resume">
          <div className="flex items-center justify-center gap-3 flex-col">
            <ResumePreview />
            <div className="group rounded-full px-4 py-2 bg-slate-900 border border-black transition-colors duration-300 hover:bg-white">
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoDownloadOutline className="text-3xl text-white transition-colors duration-300 group-hover:text-black" />
              </a>
            </div>
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <br></br>
          <ul className="mx-auto max-w-3xl text-left divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <li className="p-10">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <p className="text-lg font-semibold text-slate-900">Lead Research Assistant · Supportive Housing Project</p>
                  <p className="text-sm text-slate-600">Led a 5-person team to develop a full-stack Kotlin Android application</p>
                </div>
                <p className="text-sm text-slate-500">June 2024 – July 2025 · Fullerton, CA</p>
              </div>
              <ul className="mt-3 list-disc pl-5 text-slate-700 space-y-2">
                <li className="text-md text-slate-700">Led a 5-person team applying Agaile and CI/CD practices to build an Android application in Kotlin and IoT devices for supportive housing partners</li>
                <li className="text-md text-slate-700">Delivered the system 3 weeks ahead of schedule to partners housing over 20,000 residents, securing over $2 million in funding</li>
                <li className="text-md text-slate-700">Built and deployed a secure Express + Node.js REST API with a local SQLite database safeguarding resident data</li>
                <li className="text-md text-slate-700">Programmed ESP32 and Arduino microcontrollers in C++, reducing device-app latency to less than 200 ms for real-time performance</li>
              </ul>
            </li>
          </ul>
        </Section>

        <Section id="education" title="Education">
          <br></br>
          <div className="mx-auto max-w-3xl grid gap-3 text-left">
            <div className="rounded-2xl border border-slate-200 p-10 shadow-sm">
              <p className="text-lg text-black font-bold">California State University, Fullerton</p>
              <div className="flex items-center">
                <p className="font-medium text-slate-900">Bachelor of Science in Computer Science</p>
                <p className="text-sm text-slate-600">&nbsp;|&nbsp;Graduated May of 2025</p>
              </div>
              <div className="flex items-center">
                <p className="font-medium text-slate-900">Major GPA:</p>
                <p className="text-md text-black">&nbsp;3.92</p>
              </div>
              <p className="text-md text-black">Dean's Honor List All Semesters</p>
              <br></br>
              <p className="font-medium text-slate-900">Relevant coursework:</p>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-md text-slate-700">Data Structures and Algorithms</li>
                <li className="text-md text-slate-700">Databases and File Structures</li>
                <li className="text-md text-slate-700">Artifical Intelligence</li>
                <li className="text-md text-slate-700">Front End Web Development</li>
                <li className="text-md text-slate-700">Back End Web Development</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <br></br>
          <div className="mx-auto max-w-7xl space-y-6">
            <ProjectCard
              title="Chess Image Analysis"
              description="A full-stack web application build using React, Node.js, Express, and MongoDB (MERN) to allow users to analyze online chess positions from images. The application takes a user's input, uses OpenCV to process the image and divide it into 64 squares, passes the images to a machine learning model to detect what piece occupies each square, and then returns a Forsyth-Edwards Notation string and allows the user to analyze the position using an engine. Users can sign up, authenticated with JWT, to save positions and store them for later analysis."
              tech={["React", "Node.js", "Express", "MongoDB", "OpenCV", "TensorFlow", "Docker", "Typescript", "Python", "Tailwind CSS"]}
              image={"/chess-analysis.jpg"}
              githubUrl="https://github.com/falshami2002/Online-Chess-Image-Analysis"
              liveUrl="https://online-chess-image-analysis.netlify.app/"
            />
            <ProjectCard
              title="Soccer Pass Prediction"
              description="A machine learning model built using Python and TensorFlow to predict successful passes in soccer games and assign an expected pass value to each pass indicating the chance of success. The model was trained on a dataset of passes from professional soccer games, using features such as player positions, pass distance, and pass angle. The model achieved an accuracy of 85% on the test set and was able to identify key factors that contribute to successful passes."
              tech={["OpenCV", "TensorFlow", "Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"]}
              image={"/fitquest-1.png"}
              githubUrl="https://github.com/falshami2002/Online-Chess-Image-Analysis"
            />
            <ProjectCard
              title="Mastermind Trivia Game"
              description="A full-stack web application built using Next.js and AWS services including Lambda, DynamoDB, S3, and Step Functions to create a multiplayer real-time trivia-style game based around soccer with different game modes. The application features a serverless architecture, allowing for scalability and cost-effectiveness. Users can sign up and challenge their friends."
              tech={["Next.js", "AWS Lambda", "DynamoDB", "S3", "Step Functions", "TypeScript", "Tailwind CSS"]}
              image={"/fitquest-1.png"}
            />
          </div>
        </Section>

        <SkillsSection/>

        <Section id={"contact" as SectionId} title="Contact">
          <br></br>
          <ContactForm />
        </Section>
      </main>
    </div>
  );
}
