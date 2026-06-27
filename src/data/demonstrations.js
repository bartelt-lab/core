export const autonomousDemonstrations = [
  {
    id: 4,
    title: "Traffic Network Builder",
    description: "Interactive tools for constructing and simulating complex traffic networks to rigorously test autonomous systems.",
    video: "/videos/demonstrations/autonomous_driving/TrafficNetworkBuilder.mp4",
    youtubeId: null, // Embed blocked, use local video for preview
    youtubeIdModal: "-dYcWwliIzw", // Full video in modal
    thumbnail: null,
    category: "Simulation",
  },
  {
    id: 2,
    title: "Benchmarking Framework",
    description: "A comprehensive benchmarking suite for evaluating autonomous driving algorithms across various metrics and scenarios.",
    video: "/videos/demonstrations/autonomous_driving/Benchmarking.mp4",
    youtubeId: "Ri2_skC4FZY",
    thumbnail: null,
    category: "Evaluation",
  },
  {
    id: 3,
    title: "Real-Time Corridor Planning",
    description: "Advanced corridor planning using cubic spirals for smooth, kinematically feasible trajectory generation in real-time.",
    video: "/videos/demonstrations/autonomous_driving/Real-Time Corridor Planning using Cubic Spirals.mp4",
    youtubeId: "jxxT4aKgNAA",
    thumbnail: null,
    category: "Motion Planning",
  },
  {
    id: 1,
    title: "Real-World 1:10 Scale Autonomous Driving",
    description: "Testing real-world 1:10 scale autonomous driving capabilities, showcasing reliable navigation and control.",
    video: "/videos/demonstrations/autonomous_driving/ADatIG.mp4",
    youtubeId: "wrY34WyTEzo",
    thumbnail: null,
    category: "Field Test",
  },
];

export const cognitiveProjects = [
  {
    id: 'dynamo',
    title: "DyNAMO",
    description: "Our research advances Cognitive Robotics by bridging perception, reasoning, and action. At the core is Dynamo, a comprehensive framework for dynamic manipulation and operational intelligence.",
    content: "Dynamo is a cognitive robotic system built to adapt to unstructured environments and learn through interaction. By integrating foundation models with rigorous control theory, it achieves versatile, robust behavior in real-world settings.",
    image: "/videos/demonstrations/robotics/Lab4K.webp",
    link: "/dynamo",
    isTeaser: false,
  },
  {
    id: 'leader-following',
    title: "Leader Following",
    description: "Obstacle-avoidant leader following on a quadruped robot using multi-sensor fusion - RF transponder, RGB cameras, and LiDAR - with a legged-platform-adapted local planner. Accepted to IEEE ICRA 2025.",
    content: "A virtual leash for robotic assistants: the ANYmal quadruped tracks a human operator through dynamic, obstacle-dense environments without joystick control. The system fuses global leader cues with local perception so the robot can keep formation, re-plan around clutter, and remain useful in real corridors instead of clean lab demos.",
    image: "/images/projects/leader-following/hero.webp",
    link: "/leader-following",
    isTeaser: false,
  },
  {
    id: 'vial-sort',
    title: "Vial Sort",
    description: "Language-conditioned vial sorting on a Waveshare SO-101 arm using a pi0 vision-language-action model fine-tuned with LoRA. Two experiments compare static versus domain-randomized training data.",
    content: "A VLA-based pick-and-place pipeline built with LeRobot: the robot receives a natural language instruction, observes the workspace from three RGB camera views, and executes the requested vial arrangement on Jetson inference. The project studies whether randomized training data improves transfer when lighting, rack placement, and vial colors change.",
    image: "/images/projects/vial-sort/hero.webp",
    link: "/vial-sort",
    isTeaser: false,
  },
  {
    id: 'v-jepa',
    title: "Project Unknown",
    description: "A new initiative building upon Video Joint Embedding Predictive Architectures.",
    content: "Bridging the gap between world models and control.",
    image: null, // Will use abstract gradient
    link: null,
    isTeaser: true,
  }
];
