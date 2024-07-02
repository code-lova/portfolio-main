import {
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    threejs,
    laravel,
    mysql,
    php,
    python,
    next,
    csharp,
    express,
    postgresql,
    sql,
    django,
    
} from "../assets/icons";

import {
    web,
    mobile,
    frontend,
    backend,
    saas,
    blog,

} from "../assets/images"

import * as sIIcons from "react-icons/sl"

export const navLinks = [

    {
        id: 'features',
        title: "Features"
    },
    {
        id: 'portfolio',
        title: "Portfolio"
    },
    {
        id: 'resume',
        title: "Resume"
    },
    {
        id: 'testimonials',
        title: "Testimonials"
    },
    {
        id: 'blog',
        title: "Blog"
    },
    {
        id: 'contact',
        title: "Contact"
    },
    {
        id: 'login',
        title: "Login"
    },
];



export const adminNavLinks = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        icon: 'RiDashboardFill',
        link: '/admin/dashboard'
    },
    {
        id: 'category',
        name: 'Category',
        icon: 'RiSignpostFill',
        link: '/admin/category'

    },
    {
        id: 'projects',
        name: 'Projects',
        icon: 'RiProjectorFill',
        link: '/admin/projects'

    },
    {
        id: 'blogscat',
        name: 'Blog Category',
        icon: 'RiFileShredFill',
        link: '/admin/blog-category'
    },
    {
        id: 'blogs',
        name: 'Blogs',
        icon: 'RiBloggerFill',
        link: '/admin/blog'
    },
    {
        id: 'settings',
        name: 'Settings',
        icon: 'RiFolderSettingsFill',
        link: '/admin/settings'
    },
    {
        id: 'switch',
        name: 'Switch',
        icon: 'RiSwitchFill',
        link: '/admin/switch'
    },
    {
        id: 'logout',
        name: 'Logout',
        icon: 'RiLogoutBoxRFill',
        link: '/logout'
    },
];

export const findMeSocials = [
    {
        id: "github",
        icon: "SlSocialGithub",
        link: "https://github.com/code-lova"
    },
    {
        id: "instagram",
        icon: "SlSocialInstagram",
        link: "https://instagram.com/code_lova"
    },
    {
        id: "linkedin",
        icon: "SlSocialLinkedin",
        link: "https://www.linkedin.com/in/jeremiah-ebizo"
    }
];

export const technologies = [
    {
        name: "HTML 5",
        icon: html,
    },
    {
        name: "CSS 3",
        icon: css,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "PHP",
        icon: php,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Node JS",
        icon: nodejs,
    },
    {
        name: "MongoDB",
        icon: mongodb,
    },
    {
        name: "Laravel",
        icon: laravel,
    },
    {
        name: "git",
        icon: git,
    },
    {
        name: "figma",
        icon: figma,
    },
    {
        name: "Python",
        icon: python,
    },
    {
        name: "C#",
        icon: csharp,
    },
    {
        name: "Next Js",
        icon: next,
    },
    {
        name: "Express Js",
        icon: express,
    },
    {
        name: "MYSQL",
        icon: mysql,
    },
    {
        name: "sql",
        icon: sql,
    },
];

export const bestSkills = [
    {
        title: "html",
        name: html,
    },
    {
        title: "css",
        name: css,
    },
    {
        title: "javascript",
        name: javascript,
    },
    {
        title: "sql",
        name: sql,
    },
];

export const features = [
    {
        icon: blog,
        title: "Freelancer",
        desc: [
            "I create custom, responsive websites and dynamic web applications using React, Next, Node.js, and Laravel. My services include API integration, CMS setup & mobile-friendly designs.",
        ]
    },
    {
        icon: mobile,
        title: "Mobile Development",
        desc: [
            "I build high-quality mobile apps that deliver exceptional user experiences and drive business success.",
        ]
    },
    {
        icon: saas,
        title: "SaaS Application",
        desc: [
            "I specialize in developing scalable and efficient cloud-based solutions that streamline business processes. To drive productivity and foster growth.",
        ]
    },
    {
        icon: frontend,
        title: "Frontend Development",
        desc: [
            "I provide tailored front-end development services, collaborating closely with clients from wireframing to full-scale implementation to bring their visions to life.",
        ], 
    },
    {
        icon: backend,
        title: "Backend Development",
        desc: [
           "I excel in creating robust server-side solutions, optimizing database performance, and integrating custom APIs for high-traffic operations.",
        ], 
    },
    {
        icon: web,
        title: "Web Application",
        desc: [
            "I develop visually appealing websites tailored to your business needs, focusing on responsive design, robust backend development and seamless technology integration.",
        ] 
    }
];


export const education = [
    {
        id: "bsc",
        name: "Software Developmer",
        school: "Bringham Young University - Idaho",
        type: "Bachelor of Science(BSc)",
        year: "(2026) Current",
        description: "The Bachelor of Science in Software Development at Brigham Young University-Idaho emphasizes theoretical foundations and practical applications. The curriculum covers computer programming, web development, software testing, and industry-standard coding practices."
    },
    {
        id: "alx",
        name: "Software Engineer",
        school: "ALX Africa",
        type: "Certification",
        year: "(2024)",
        description: "Alx Africa's Software Engineering program provided an intensive, hands-on curriculum focusing on algorithms, data structures, and systems design. Practical experience is emphasized through collaborative projects and real-world problem solving." 
    },
    {
        id: "dip",
        name: "Web & Computer Programming",
        school: "Bringham Young University - Idaho",
        type: "Diploma",
        year: "(2024)",
        description: "This program helped me develop my web development skills in software development, web design, and database management. Coursework includes Web Development (HTML, CSS, JavaScript), Programming Languages (Python, C#) and Database Systems (SQL, NoSQL)." 
    },
    {
        id: "pathway",
        name: "BYU Pathway Connect",
        school: "BYU Pathway Worldwide",
        type: "Certification",
        year: "(2023)",
        description: "This program exposed me to the foundational courses in life skills, math, and writing, preparing for university while emphasizing personal finance, study skills, and professional development for career readiness. Its integrated curriculum fosters spiritual and secular growth." 
    },
    {
        id: "hnd",
        name: "Higher National Diploma (HND)",
        school: "Delta State Polytechnic - Nigeria",
        type: "Computer Science - Ceritification",
        year: "(2017)",
        description: "This certification provided comprehensive training for me in key areas of computing. Coursework includes web technology, database management systems, network administration, and IT management." 
    },
    {
        id: "nd",
        name: "National Diploma (ND)",
        school: "Delta State Polytechnic - Nigeria",
        type: "Computer Science - Ceritification",
        year: "(2014)",
        description: "This program covered a comprehensive curriculum covering essential topics in computing. Gained proficiency in database management systems and networking fundamentals. Practical coursework includes, database administration, and IT support." 
    },
];


export const devskill = [
    { id: "html", name: html, score: "99%" },
    { id: "css", name: css, score: "96%" },
    { id: "javascript", name: javascript, score: "92%" },
    { id: "php", name: php, score: "80%" },
    { id: "sql", name: sql, score: "90%" },
    { id: "python", name: python, score: "85%" },
    { id: "c#", name: csharp, score: "87%" },
];


export const designSkill = [
    { id: "Figma", name: figma, score: "70%" },
    { id: "Corel Draw", name: "Corel Draw", score: "81%" },
    { id: "Image Editing", name: "Editing", score: "90%" },
    { id: "Responsive Design", name: "Responsiveness", score: "95%" },
    { id: "Canva", name: "Canva", score: "88%" },
    // { id: "Photoshop", name: "Photoshop", score: "59%" },
    { id: "Web Design", name: "Web Design", score: "82%" },

];


export const testimonials = [
    {
        title: "chamber",
        name: "Web Application - FullStack",
        client: "BYUI - Paul Chaney",
        star: 5,
        date: "Via School Project - September 27, 2023",
        description: "Nice work on completing your chamber of commerce project assignment. Good optimization and fast load time."
    },
    {
        title: "fullstack",
        name: "Web Application - Debugging",
        client: "CEO - Dennis",
        star: 5,
        date: "Via referral - July 18, 2022",
        description: "I've never met a web developer who truly cares about their clients' success like Jeremiah does."
    },
    {
        title: "backend",
        name: "Web Application - Backend",
        client: "Delaclique - Adesuwa(Marketing)",
        star: 5,
        date: "Via referral - April 21, 2021",
        description: "I thought it was impossible to make a website as beautiful as our product, but Jeremiah proved me wrong."
    },

    
];

export const contact = [
    {
        title: "num",
        name: "number",
        phone: "+2348157717165",
        email: "ebinuga@hotmail.com",
    },

]

