export const projects = [
  {
    id: "inventario",
    short: "Inventario Android",
    title: "Sistema de Inventario",
    subtitle: "Gestión de activos con Android Nativo y Cloud Backend",
    status: "Deploy Activo",
    stack: ["Android", "Spring Boot", "Azure", "MySQL", "Nginx"],
    longDescription:
      "Solución integral diseñada para optimizar la gestión de activos empresariales. Arquitectura desacoplada con app nativa en Java y API REST en Spring Boot, desplegada en Azure con servidor Linux y proxy Nginx.",
    media: {
      type: "video",
      src: "/mockups/inventario.mp4",
    },
    actions: {
      demo: "#",
      repo: "#",
    },
  },

  {
    id: "devops",
    short: "DevOps Manager",
    title: "DevOps Manager",
    subtitle: "Orquestación y monitoreo CI/CD",
    status: "EN DESARROLLO",
    stack: ["Terraform", "Docker", "Azure DevOps", ".NET 8", "WPF"],
    description: [
      "Automatización de pipelines CI/CD.",
      "Monitoreo de despliegues en tiempo real.",
      "Infraestructura como código.",
      "Dashboard de control de proyectos y entornos."
    ],
    media: {
      type: "video",
      src: "/mockups/devops-demo.mp4",
    },
    actions: {
      demo: false,
      repo: true,
    },
  },

  {
    id: "batimusic",
    short: "Bot de Música Discord",
    title: "BatiMusic",
    subtitle: "Bot de música 24/7 para Discord",
    status: "Activo",
    stack: [
      "Node.js",
      "Discord.js",
      "YouTube",
      "Spotify",
      "FFmpeg",
      "Cloud VM"
    ],
    longDescription:
      "BatiMusic es un bot de música para Discord diseñado para ofrecer reproducción inmediata y sin fricción. Basta con enviar el nombre de una canción o un enlace y el bot se encarga del resto. Pensado para funcionamiento 24/7 en la nube, con enfoque en estabilidad, baja latencia y experiencia simple para el usuario.",
    description: [
      "Reproducción por nombre o enlace (YouTube / Spotify).",
      "Funcionamiento 24/7 en servidor cloud.",
      "Comandos simples y respuesta rápida.",
      "Gestión automática de colas y desconexión inteligente."
    ],
    media: {
      type: "image",
      src: "/mockups/batimusic-banner.png",
    },
    actions: {
      demo: false,
      repo: true,
    },
  },
];
