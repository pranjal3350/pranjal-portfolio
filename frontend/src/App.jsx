import React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import {
  ArrowRight, Github, Linkedin, Mail, Menu, X, Download,
  Code2, Database, Server, Wrench, GraduationCap, Send,
  ExternalLink, Moon, Sun, CheckCircle2
} from "lucide-react";

const API = "https://pranjal-portfolio-hvjp.onrender.com/api";

async function api(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    headers: {"Content-Type": "application/json"},
    ...options
  });
  if (!response.ok) throw new Error("API request failed");
  return response.json();
}

function Layout({ children, profile }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const links = [
    ["/", "Home"], ["/about", "About"], ["/skills", "Skills"],
    ["/projects", "Projects"], ["/experience", "Experience"],
    ["/education", "Education"], ["/resume", "Resume"], ["/contact", "Contact"]
  ];

  return (
    <>
      <header className="nav">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="logo">PD</span>
          <span>Pranjal Dwivedi</span>
        </Link>

        <button className="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X/> : <Menu/>}
        </button>

        <nav className={open ? "nav-links open" : "nav-links"}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
         
          <a className="small-cta" href={profile?.resume_url || "#"} download={!!profile?.resume_url}>
            <Download size={16}/> Resume
          </a>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Pranjal Dwivedi</span>
        <span>Built with React + FastAPI + SQL</span>
      </footer>
    </>
  );
}

function SectionTitle({eyebrow, title, text}) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Home({profile, projects}) {
  return (
    <div>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">Hello, I'm</span>
          <h1>Pranjal <strong>Dwivedi</strong></h1>
          <h2>Python Full Stack Developer</h2>
          <p>
            I'm a Python Full Stack Developer focused on building practical web applications using Python, Django, FastAPI, React and SQL.
          </p>
          <div className="actions">
            <Link className="btn primary" to="/projects">View Projects <ArrowRight size={18}/></Link>
           <a
  className="btn primary"
  href="/resume.pdf"
  download="Pranjal_Dwivedi_Resume(3).pdf"
>
  Download Resume
</a>
          </div>
          <div className="socials">
            <a href={profile?.github} target="_blank"><Github/></a>
            <a href={profile?.linkedin} target="_blank"><Linkedin/></a>
            <a href={`mailto:${profile?.email}`}><Mail/></a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="avatar">PD</div>
          <div className=" orbit-one"></div>
              <div className=" orbit-two"></div>
          <span className="code-float">&lt;/&gt;</span>
        </div>
      </section>

      <section className="stats container">
        <div><b>{projects.length}+</b><span>Projects</span></div>
        <div><b>B.Tech</b><span>Computer Science</span></div>
        <div><b>Python</b><span>Primary Language</span></div>
        <div><b>Fresher</b><span>Open to Opportunities</span></div>
      </section>

      <section className="section container">
        <SectionTitle eyebrow="About Me" title="A Python Full Stack Developer" />
        <div className="about-preview">
          <p>{profile?.bio}</p>
          <div className="mini-grid">
            <div><Code2/><b>Python</b><span>Backend</span></div>
            <div><Server/><b>FastAPI / Django</b><span>Backend</span></div>
            <div><Code2/><b>React</b><span>Frontend</span></div>
            <div><Database/><b>SQL</b><span>Database</span></div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionTitle eyebrow="Featured Work" title="Projects" text="A selection of applications I've built while learning and practicing full-stack development."/>
          <ProjectGrid projects={projects.slice(0, 3)}/>
          <div className="center"><Link className="btn" to="/projects">View all projects <ArrowRight size={17}/></Link></div>
        </div>
      </section>
    </div>
  );
}

function About({profile}) {
  return <section className="page container">
    <SectionTitle eyebrow="About Me" title="Building with Python and the web" text="A short introduction about my background and development focus."/>
    <div className="two-col">
      <div className="card large">
        <h3>Who I am</h3>
        <p>{profile?.bio}</p>
        <p>I focus on learning by building complete applications: frontend interfaces, backend APIs, database operations and deployment-ready project structure.</p>
      </div>
      <div className="card">
        <h3>Quick Facts</h3>
        <ul className="facts">
          <li><GraduationCap/><span><b>B.Tech</b><small>Computer Science & Engineering</small></span></li>
          <li><Code2/><span><b>Python</b><small>Primary language</small></span></li>
          <li><Server/><span><b>FastAPI / Django</b><small>Backend frameworks</small></span></li>
          <li><Database/><span><b>SQL</b><small>Database</small></span></li>
        </ul>
      </div>
    </div>
  </section>;
}

function Skills({skills}) {
  const icons = {Frontend: Code2, Backend: Server, Database: Database, Tools: Wrench};
  return <section className="page container">
    <SectionTitle eyebrow="Technical Skills" title="Technologies I work with" text="Grouped by the role each technology plays in a full-stack application."/>
    <div className="skill-grid">
      {Object.entries(skills).map(([category, items]) => {
        const Icon = icons[category] || Code2;
        return <div className="card skill-card" key={category}>
          <div className="skill-icon"><Icon/></div>
          <h3>{category}</h3>
          <div className="tags">{items.map(x => <span key={x}>{x}</span>)}</div>
        </div>
      })}
    </div>
  </section>;
}

function ProjectGrid({projects}) {
  return <div className="project-grid">
    {projects.map(p => <div className="project-card" key={p.id}>
      <div className="project-image"><Code2 size={42}/></div>
      <div className="project-body">
        <div className="tags">{p.technologies.slice(0,4).map(x => <span key={x}>{x}</span>)}</div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <div className="project-actions">
          <Link className="btn primary small" to={`/projects/${p.id}`}>View Project</Link>
          <a className="btn small" href={p.github_url} target="_blank"><Github size={15}/> GitHub</a>
        </div>
      </div>
    </div>)}
  </div>;
}

function Projects({projects}) {
  return <section className="page container">
    <SectionTitle eyebrow="My Work" title="Projects" text="Projects that demonstrate my Python full-stack development skills."/>
    <ProjectGrid projects={projects}/>
  </section>;
}

function ProjectDetails({projects}) {
  const {id} = useParams();
  const project = projects.find(p => String(p.id) === id);
  if (!project) return <section className="page container"><h2>Project not found</h2><Link to="/projects">Back to projects</Link></section>;

  return <section className="page container">
    <Link to="/projects" className="back">← Back to Projects</Link>
    <div className="detail-head">
      <div>
        <div className="tags">{project.technologies.map(x => <span key={x}>{x}</span>)}</div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>
      <div className="detail-visual"><Code2 size={70}/></div>
    </div>
    <div className="detail-grid">
      <div className="card"><h3>Overview</h3><p>{project.description}</p><h3>Features</h3><ul className="checks">
        <li><CheckCircle2/> Responsive user interface</li>
        <li><CheckCircle2/> Backend API integration</li>
        <li><CheckCircle2/> Database operations</li>
        <li><CheckCircle2/> Clean project structure</li>
      </ul></div>
      <div className="card"><h3>Technology</h3><div className="tags big">{project.technologies.map(x=><span key={x}>{x}</span>)}</div><h3>Links</h3>
        <div className="actions"><a className="btn" href={project.github_url} target="_blank"><Github/> GitHub</a>{project.live_url && <a className="btn primary" href={project.live_url} target="_blank"><ExternalLink/> Live Demo</a>}</div>
      </div>
    </div>
  </section>;
}

function Experience() {
  return (
    <section className="page container">
      <SectionTitle
        eyebrow="Experience & Training"
        title="My learning journey"
      />

      <div className="timeline">

        {/* Naresh IT Training */}
        <div className="timeline-card">
          <div className="timeline-icon">
            <GraduationCap />
          </div>

          <div className="timeline-content">
            <div className="timeline-header">
              <div>
                <span className="eyebrow">Training</span>

                <h3>Python Full Stack Developer Training</h3>

                <p>Naresh IT Technologies</p>
              </div>

              <a
                href="/NARESH IT certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn small primary"
              >
                View Certificate
              </a>
            </div>

            <div className="tags">
              <span>Python</span>
              <span>Django</span>
              <span>HTML/CSS</span>
              <span>SQL</span>
              <span>REST APIs</span>
              <span>Git/GitHub</span>
            </div>

            <h4>What I practiced</h4>

            <ul className="checks">
              <li>
                <CheckCircle2 /> Built web applications
              </li>

              <li>
                <CheckCircle2 /> Worked with databases
              </li>

              <li>
                <CheckCircle2 /> Created REST APIs
              </li>

              <li>
                <CheckCircle2 /> Used Git/GitHub
              </li>
            </ul>
          </div>
        </div>


        {/* Python CRISP Training */}
        <div className="timeline-card">
          <div className="timeline-icon">
            <GraduationCap />
          </div>

          <div className="timeline-content">
            <div className="timeline-header">
              <div>
                <span className="eyebrow">Training</span>

                <h3>Python CRISP Training</h3>
              </div>

              <a
                href="/CRISP Certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn small primary"
              >
                View Certificate
              </a>
            </div>

            <div className="tags">
              <span>Python</span>
              <span>Programming</span>
              <span>Problem Solving</span>
            </div>

            <h4>What I learned</h4>

            <ul className="checks">
              <li>
                <CheckCircle2 /> Python fundamentals and programming concepts
              </li>

              <li>
                <CheckCircle2 /> Object-Oriented Programming
              </li>

              <li>
                <CheckCircle2 /> Problem solving using Python
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
function Education() {
  return (
    <section className="page container">
      <SectionTitle eyebrow="Education" title="Academic background" />

      <div className="card education-card">
        <div className="skill-icon">
          <GraduationCap />
        </div>

        <div className="education-content">
          <h2>B.Tech – Computer Science & Engineering</h2>

          <p>
            RGPV (Rajiv Gandhi Proudyogiki Vishwavidyalaya)
          </p>

          <div className="education-details">
            <span className="cgpa-badge">
              CGPA: 6.87
            </span>

            <button
  className="btn small primary"
  onClick={() => {
    window.open("/marksheet.pdf", "_blank");
  }}
>
  View Marksheet
</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Resume({profile}) {
  return <section className="page container">
    <SectionTitle eyebrow="Resume" title="My professional summary" text="Keep the resume concise and aligned with the projects shown on this portfolio."/>
    <div className="resume-card card">
      <div className="resume-icon"><Download size={40}/></div>
      <div><h2>Python Full Stack Developer</h2><p>Pranjal Dwivedi</p><div className="tags"><span>Python</span><span>Django</span><span>FastAPI</span><span>React</span><span>SQL</span></div></div>
     <a
  className="btn primary"
  href="/resume.pdf"
  download="Pranjal_Dwivedi_Resume(3).pdf"
>
  Download Resume
</a>
    </div>
  </section>;
}

function Contact({profile}) {
  const [form, setForm] = useState({name:"", email:"", subject:"", message:""});
  const [status, setStatus] = useState("");
  const submit = async e => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await api("/contact", {method:"POST", body:JSON.stringify(form)});
      setStatus("Message sent successfully.");
      setForm({name:"",email:"",subject:"",message:""});
    } catch {
      setStatus("Could not send. Make sure the FastAPI server is running.");
    }
  };

  return <section className="page container">
    <SectionTitle eyebrow="Contact" title="Get in touch" text="I'm open to discussing entry-level opportunities, projects and collaborations."/>
    <p className="contact-subtitle">
  Send a message to Pranjal Dwivedi
</p>
    <div className="contact-grid">
      <div className="card contact-info">
        <h3>Contact details</h3>
        <a href={`mailto:${profile?.email}`}><Mail/><span><b>Email</b><small>{profile?.email}</small></span></a>
        <a href={profile?.linkedin} target="_blank"><Linkedin/><span><b>LinkedIn</b><small>Connect with me</small></span></a>
        <a href={profile?.github} target="_blank"><Github/><span><b>GitHub</b><small>View my code</small></span></a>
      </div>
      <form className="card contact-form" onSubmit={submit}>
        <label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
        <label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
        <label>Subject<input required value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}/></label>
        <label>Message<textarea required rows="6" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></label>
        <button className="btn primary" type="submit"><Send size={17}/> Send Message</button>
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  </section>;
}
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest("a, button")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className={`custom-cursor ${hovering ? "cursor-hover" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      <div
        className={`cursor-ring ${hovering ? "ring-hover" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}

function App() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api("/profile"), api("/skills"), api("/projects")])
      .then(([p,s,pr]) => {setProfile(p);setSkills(s);setProjects(pr);})
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading portfolio...</div>;

  return (
  <>
    <CustomCursor />

    <Layout profile={profile}>
    <Routes>
      <Route path="/" element={<Home profile={profile} projects={projects}/>}/>
      <Route path="/about" element={<About profile={profile}/>}/>
      <Route path="/skills" element={<Skills skills={skills}/>}/>
      <Route path="/projects" element={<Projects projects={projects}/>}/>
      <Route path="/projects/:id" element={<ProjectDetails projects={projects}/>}/>
      <Route path="/experience" element={<Experience/>}/>
      <Route path="/education" element={<Education/>}/>
      <Route path="/resume" element={<Resume profile={profile}/>}/>
      <Route path="/contact" element={<Contact profile={profile}/>}/>
      <Route path="*" element={<section className="page container"><h1>404</h1><p>Page not found.</p><Link className="btn primary" to="/">Go Home</Link></section>}/>
   </Routes>
  </Layout>
  </>
  );
}

export default App;
