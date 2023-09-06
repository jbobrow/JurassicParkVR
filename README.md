# JurassicParkVR
In 1993, Jurassic Park demoed the future, including a Virtual Reality DNA Explorer. Now that DNA Explorer is a reality.
🧬

<img src="https://github.com/jbobrow/JurassicParkVR/blob/main/assets/JurassicPark_Screenshot.png" alt="Screenshot of Jurassic Park in Three.js" width="300"/>

## Instructions
To run the DNA viewer locally, you will need to do the following:
1. install [node.js](https://nodejs.org/en) & [vite.js](https://vitejs.dev/)
2. open terminal (or your CLI of choice) and `cd` to this folder
3. type `npm install` – this will install the javascript dependencies
4. type `npx vite` – this will locally serve our DNA Explorer

## Features
- [x] DNA Strand model
- [x] Drag to view around

## Todo
- [ ] Fix helical rail to remain normal to the rotational axis of the helix 
- [ ] Enable VR Headset
- [ ] Use OpenCV for hand manipulation 

## Why this?
Why not?

Okay, that's not a great answer. Admittedly, I hadn't used node.js to deploy apps locally, or at least not of my own accord and needed a small project to have a fun excuse to learn how to navigate a node.js workflow. In theory, it is easy... just write `npm install` or `npm run` but in practice, I found that too much was happening behind the scenes and that makes me feel uncomfortable, or at very least, less able to fix things when they go wrong. One of my colleagues mentioned that that Jurassic Park is now 30 years old😲 and we reminisced about Mr. DNA. Which of course led me to [this video](https://www.youtube.com/watch?v=qUaFYzFFbBU) and [this moment here at 1:50](https://youtu.be/qUaFYzFFbBU?t=110). I love the quality of the rendering, and the details such as the misalignment of the pieces and the intersection of the volumes and enjoyed recreating them. Next step, use the webcam to allow your hands to manipulate the model with the help of [this](https://victordibia.com/handtrack.js/#/) or [this](https://blog.tensorflow.org/2021/11/3D-handpose.html).

## Special Thanks
[Three.js](https://threejs.org/)

🦖 📟 🛻 🎬 🍿
