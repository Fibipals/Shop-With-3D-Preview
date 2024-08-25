<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=next&color=black" alt="next.js" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Three_JS-black?style=for-the-badge&logoColor=white&logo=threedotjs&color=000000" alt="three.js" />
  </div>

  <h3 align="center">3D shop</h3>

   <div align="center">
     Build this project with our detailed tutorial on <a href="https://www.youtube.com/@fibipals" target="_blank"><b>Fibipals</b></a> YouTube. Learn, Create, Achive!
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🚀 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)
6. 📦 [Assets](#assets)
7. 💡 [Resources](#resources)

## 📚 Tutorial

This repository contains the code for an in-depth tutorial featured on our YouTube channel, <a href="https://www.youtube.com/@fibipals" target="_blank"><b>Fibipals</b></a>.

Whether you're a complete beginner or looking to level up your skills, this tutorial will guide you step-by-step in creating a stunning, fully responsive 3D shop website using Next.js, Tailwind CSS, and Three.js.

<a href="https://www.youtube.com/@fibipals" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/1736fca5-a031-4854-8c09-bc110e3bc16d" /></a>

## <a name="introduction">🤖 Introduction</a>

This is a modern, fully responsive Next.js website for Shop with 3D preview of products, built with TailwindCSS and Three.Js. It features an cool hero section, The main highlight of the site is its product catalog, which allows users to see and interact with 3D models of each product. Additionally, the site includes various other 3D models scattered throughout, creating an engaging and immersive experience. This project is perfect for use as an online shop or as a standout piece in your portfolio.


## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- Tailwind CSS
- Three Js

## <a name="features">🔋 Features</a>

👉 3D Product Previews: Stunning 3D models that can be rotated and viewed from any angle, providing an immersive shopping experience.

👉 Fully Responsive Design: A design that adapts seamlessly to any screen size, ensuring optimal user experience on all devices.

👉 Modern UI/UX Elements: A sleek, intuitive interface designed with modern aesthetics in mind.

👉 Beginner-Friendly Tutorial: Perfect for those new to web development or 3D graphics, with a step-by-step guide available on YouTube.

and much more, including efficient code architecture and reusability!

## <a name="quick-start">🚀 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/Fibipals/Shop-With-3D-Preview.git
cd Shop-With-3D-Preview
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>tailwind.config.js</code></summary>

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {},
  },
  plugins: [function({ addUtilities }) {
    const newUtilities = {
      '.bg-gradient': {
        '@apply bg-gradient-to-br from-rose-400 to-fuchsia-700': {},
      },
    };
    addUtilities(newUtilities, ['responsive', 'hover']);
  },],
}
```

</details>

<details>
<summary><code>globals.css</code></summary>

```javascript
@tailwind base;
@tailwind components;
@tailwind utilities;


::-webkit-scrollbar {
  display: none;
}


@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

</details>

<details>
<summary><code>Data</code></summary>

```txt
/*** hero section ***/

Discover a keyboard designed for both style and functionality, providing unmatched comfort and efficiency for your everyday tasks.



/*** Catalog section ***/

const products = [
  {
    imgSrc: "/assets/keyboard1.png",
    title: "Magic Keyboard",
    price: 79.99,
    modelSrc: "/assets/keyboard.glb", 
  },
  {
    imgSrc: "/assets/keyboard2.png",
    title: "Dragon Keyboard",
    price: 89.99,
    modelSrc: "/assets/keyboard2.glb",
  },
  {
    imgSrc: "/assets/keyboard3.png",
    title: "Gold Keyboard",
    price: 99.99,
    modelSrc: "/assets/keyboard3.glb",
  }
];



/*** Features section ***/

const features = [
  {
    icon: FaKeyboard,
    title: "Compact Design",
    description: "Experience a sleek, compact design that frees up space for intense gaming sessions, allowing for more mouse movement and a cleaner setup."
  },
  {
    icon: FaBolt,
    title: "RGB Backlighting",
    description: "Customize your keyboard with vibrant RGB backlighting, featuring dynamic lighting effects and millions of colors to match your gaming rig."
  },
  {
    icon: FaHandRock,
    title: "Mechanical Switches",
    description: "Enjoy precise, tactile feedback with durable mechanical switches, ensuring fast response times and reliable performance during gameplay."
  },
  {
    icon: FaGamepad,
    title: "Gaming Mode",
    description: "Activate gaming mode to disable the Windows key and avoid accidental interruptions, keeping you focused on the game."
  }
];



/*** Reviews section ***/

const reviews = [
  {
    name: "Bob S.",
    imgSrc: "/assets/reviews/rev1.jpg",
    text: "I found the application to be intuitive and easy to navigate, making my overall experience very positive.",
    stars: 4.2
  },
  {
    name: "Alice J.",
    imgSrc: "/assets/reviews/rev2.jpg",
    text: "My experience with the service was exceptional. I appreciated the user-friendly interface and efficient customer support.",
    stars: 4.9
  },
  {
    name: "Fiona L.",
    imgSrc: "/assets/reviews/rev3.jpg",
    text: "I found the application to be highly reliable and praised its efficiency in managing my daily tasks effortlessly.",
    stars: 4.1
  },
  {
    name: "Ethan G.",
    imgSrc: "/assets/reviews/rev4.jpg",
    text: "I enjoyed the clean design and ease of use. The application exceeded my expectations and was a great help.",
    stars: 4.7
  },
  {
    name: "George M.",
    imgSrc: "/assets/reviews/rev5.jpg",
    text: "I appreciated the innovative features and the constant updates that keep the application ahead of its competitors.",
    stars: 4.9
  },
  {
    name: "Diana W.",
    imgSrc: "/assets/reviews/rev6.jpg",
    text: "I appreciated the detailed tutorials and helpful support provided, which made learning the platform enjoyable.",
    stars: 4.3
  },
  {
    name: "Charlie B.",
    imgSrc: "/assets/reviews/rev7.jpg",
    text: "I was impressed with the application's functionality and the seamless integration with other tools I use.",
    stars: 4.8
  },
  {
    name: "Hannah K.",
    imgSrc: "/assets/reviews/rev8.jpg",
    text: "I was delighted with the customer service and the comprehensive resources available to help me get started quickly.",
    stars: 4.4
  }
];

```

</details>


## <a name="assets">📦 Assets</a>

Public Assets used in the project can be found [here](https://drive.google.com/file/d/1ObtvQI_VjKKZeBQ-p9iDx4YHJj_Iwo-q/view?usp=drive_link)

## <a name="resources">💡 Resources</a>

Check out <a href="https://www.fibipals.com" target="_blank"><b>Fibipals.com</b></a>. Here, you can find components for your site, a cool community, articles, and more.
