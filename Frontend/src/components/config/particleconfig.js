const particleconfig = {
   background: {
    color: {
      value: "transparent",
    },
    image: "",
    position: "",
    repeat: "",
    size: "",
    opacity: 1,
  },
  backgroundMask: {
    composite: "destination-out",
    cover: {
      color: {
        value: "#fff",
      },
      opacity: 1,
    },
    enable: false,
  },
  defaultThemes: {},
  delay: 0,
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  fpsLimit: 144,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "repulse",
      },
      onHover: {
        enable: true,
        mode: "grab",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 1,
      },
      grab: {
        distance: 140,
        links: {
          opacity: 0.6,
        },
      },
    },
  },
 
  particles: {
    color: {
      value: ["#007bff", "#6c757d", "#495057"],
    },
    links: {
      color: "#007bff",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 1.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 60,
    },
    opacity: {
      value: 0.4,
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.1,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
      animation: {
        enable: true,
        speed: 2,
        minimumValue: 0.1,
      },
    },
  },
  detectRetina: true,
};
export default particleconfig