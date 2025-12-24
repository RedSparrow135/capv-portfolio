export const projects = [
 {
    id: "inventario",
    short: "Inventario Android",
    title: "Sistema de Inventario",
    subtitle: "Gestión de activos con Android Nativo y Cloud Backend",
    status: "Deploy Activo",
    stack: ["Android", "Spring Boot", "Azure", "MySQL", "Nginx"],
    longDescription:
      "Solución integral diseñada para optimizar la gestión de activos empresariales. Arquitectura desacoplada con app nativa en Java y API REST en Spring Boot.",
    media: {
      type: "image",
      src: "/mockups/DevOpsManager.png",
    },
    actions: {
      demo: "#",
      repo: "#",
    },
  },

  {
    id: "devops",
    title: "DevOps Manager",
    subtitle: "Orquestación y monitoreo CI/CD",
    short: "DevOps Manager",
    stack: ["Terraform", "Docker", "Azure DevOps"],

    media: {
      type: "video",
      src: "/mockups/devops-demo.mp4"
    },

    status: "EN DESARROLLO",
    description: [
      "Automatización de pipelines CI/CD.",
      "Monitoreo de despliegues en tiempo real.",
      "Infraestructura como código."
    ],

    actions: {
      demo: false,
      repo: true
    }
  }
];
