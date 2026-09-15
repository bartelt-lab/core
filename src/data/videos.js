/**
 * Central registry of every video shipped under `public/videos`.
 *
 * One entry per file, and the entry is what makes a video shippable: a clip with
 * no entry here fails `npm run check-videos`, and so does an entry pointing at a
 * file that is not on disk. The rules, the encode buckets and the review workflow
 * live in `wiki/video.md` and `wiki/video-workflow.md`.
 *
 * `description` is written for machines as much as for people. Agents working on
 * this site use it to answer "which clip shows X" without opening the file, so it
 * describes what is literally on screen — overlays, panel labels, HUD readouts —
 * rather than selling the project. `frames` points at a four-frame contact strip
 * under `wiki/video-frames/` for when the text is not enough.
 *
 * Keep `usedOn` accurate: it is how you find every render site before touching a
 * file. Videos live at native resolution wherever the frame carries thin lines or
 * small text, which is why several entries are large; see the bucket rules.
 */

/** Encode buckets. The bucket decides resolution and CRF — see wiki/video.md. */
export const BUCKETS = {
    TALKING_HEAD: 'talking-head',
    UI_CAPTURE: 'ui-capture',
    INSTRUMENTED: 'instrumented',
    CAMERA: 'camera',
    BACKGROUND_LOOP: 'background-loop',
}

export const videos = [
    {
        id: 'house-price-prediction',
        src: '/videos/ai-team-projects/ai4bim/house-price-prediction.mp4',
        poster: '/videos/ai-team-projects/ai4bim/house-price-prediction-poster.webp',
        bucket: BUCKETS.UI_CAPTURE,
        duration: 17,
        description:
            'AI4BIM web app on the Predict House Prices screen. A property-features form (square footage, bedrooms, bathrooms, year built, location) is filled in and submitted, and the result panel returns an estimated price of $59,813 alongside a feature-importance bar chart ranking which inputs drove the estimate.',
        frames: 'wiki/video-frames/house-price-prediction.jpg',
        usedOn: ['src/pages/tuc/projects/AI4AIProject.jsx'],
    },
    {
        id: 'ifc-layout',
        src: '/videos/ai-team-projects/ai4bim/ifc-layout.mp4',
        poster: '/videos/ai-team-projects/ai4bim/ifc-layout-poster.webp',
        bucket: BUCKETS.UI_CAPTURE,
        duration: 28,
        description:
            'AI4BIM layout generator. A natural-language prompt describing a desired apartment is typed into the prompt box, a slider is adjusted, and Generate Layout produces a 2D floor-plan preview of coloured rooms.',
        frames: 'wiki/video-frames/ifc-layout.jpg',
        usedOn: ['src/pages/tuc/projects/AI4AIProject.jsx'],
    },
    {
        id: 'room-classifier',
        src: '/videos/ai-team-projects/ai4bim/room-classifier.mp4',
        poster: '/videos/ai-team-projects/ai4bim/room-classifier-poster.webp',
        bucket: BUCKETS.UI_CAPTURE,
        duration: 13,
        description:
            'AI4BIM room classifier. A room photograph is uploaded through the drop zone and the classification panel returns DiningRoom with a confidence score, a list of alternative candidate room types, and the input features used.',
        frames: 'wiki/video-frames/room-classifier.jpg',
        usedOn: ['src/pages/tuc/projects/AI4AIProject.jsx'],
    },
    {
        id: 'ai4bim-platform-walkthrough',
        src: '/videos/ai-team-projects/ai4bim-platform-walkthrough.mp4',
        poster: '/videos/ai-team-projects/ai4bim-platform-walkthrough-poster.webp',
        bucket: BUCKETS.UI_CAPTURE,
        duration: 58,
        description:
            'End-to-end walkthrough of the AI4BIM platform. An IFC file is picked from a file dialog and loaded into the 3D viewer, which shows a sectioned duplex apartment with a project tree, element counts and a raw JSON inspector. The final segment opens the built-in assistant panel that answers questions about the loaded building model, next to grid and dark-mode display settings.',
        frames: 'wiki/video-frames/ai4bim-platform-walkthrough.jpg',
        usedOn: ['src/pages/tuc/projects/AI4AIProject.jsx', 'src/pages/tuc/AiTeamProjects.jsx'],
    },
    {
        id: 'human-awareness-detection',
        src: '/videos/ai-team-projects/human-awareness-detection.mp4',
        poster: '/videos/ai-team-projects/human-awareness-detection-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 37,
        description:
            'Office scene with the perception stack running live. Several people are detected with coloured bounding boxes carrying per-person IDs and distances, plus a gaze state per subject such as NOT LOOKING AT PROCESS or GAZE UNKNOWN. A bottom overlay reports pipeline latency as current, average and maximum milliseconds for camera-to-output and processing. Our own footage, but a quick throwaway demo rather than a prototype — the project team starts from scratch, so treat it as showing the target capability only.',
        frames: 'wiki/video-frames/human-awareness-detection.jpg',
        usedOn: ['src/pages/HumanAwarenessDetection.jsx'],
    },
    {
        id: 'leader-following-related-work',
        src: '/videos/ai-team-projects/leader-following-related-work.mp4',
        poster: '/videos/ai-team-projects/leader-following-related-work-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 75,
        description:
            'Footage from our own robotics lab of the Ridgeback following a person in a lab coat. A wide room view is paired with the robot onboard camera, which boxes the tracked leader in yellow and prints a CONTROL: AUTONOMY status with desired against measured linear and angular velocity. The run continues out of the lab and along a corridor.',
        frames: 'wiki/video-frames/leader-following-related-work.jpg',
        usedOn: ['src/pages/HumanAwarenessDetection.jsx'],
    },
    {
        id: 'vergabepilot-walkthrough',
        src: '/videos/ai-team-projects/vergabepilot-walkthrough.mp4',
        poster: '/videos/ai-team-projects/vergabepilot-walkthrough-poster.webp',
        bucket: BUCKETS.UI_CAPTURE,
        duration: 56,
        description:
            'Vergabepilot.AI walkthrough over sandbox data, played at 3x speed. It moves from a German public-tender document page listing Anschreiben and Leistungsbeschreibungen files into the admin dashboard, showing URLs grouped by domain, cascade run history, and audit-trail, diagnostics and error-report controls. The tender data shown is a sandbox, not live customer data.',
        frames: 'wiki/video-frames/vergabepilot-walkthrough.jpg',
        usedOn: ['src/pages/tuc/AiTeamProjects.jsx', 'src/pages/tuc/projects/VergabepilotProject.jsx'],
    },
    {
        id: 'ai-team-project-showcase',
        src: '/videos/ai-team-projects/ai-team-project-showcase.mp4',
        poster: '/videos/ai-team-projects/ai-team-project-showcase-poster.webp',
        bucket: BUCKETS.CAMERA,
        duration: 50,
        description:
            'Programme showcase for the Core Team Project, now the AI Team Project. Covers the partner setting with BMW Group TechWorks Romania branding, students working together at workstations, and a robot demonstration in a teaching room. This is a programme video, not a technical demo.',
        frames: 'wiki/video-frames/ai-team-project-showcase.jpg',
        usedOn: ['src/pages/tuc/AiTeamProjects.jsx'],
    },
    {
        id: 'ai-team-project-showcase-2022',
        src: '/videos/ai-team-projects/ai-team-project-showcase-2022.mp4',
        poster: '/videos/ai-team-projects/ai-team-project-showcase-2022-poster.webp',
        bucket: BUCKETS.CAMERA,
        duration: 75,
        description:
            '2022 edition of the programme showcase, shown on the site as the archive entry. Open-plan working space, students collaborating at a desk, and a group photo from a team hike — programme culture rather than a technical demo.',
        frames: 'wiki/video-frames/ai-team-project-showcase-2022.jpg',
        usedOn: ['src/pages/tuc/AiTeamProjects.jsx'],
    },
    {
        id: 'core-labs-hero',
        src: '/videos/core-labs-hero.mp4',
        poster: '/videos/hero-poster.webp',
        bucket: BUCKETS.BACKGROUND_LOOP,
        duration: 31,
        description:
            'Ambient hero loop of the CORE lab: a benchtop robot arm beside a rack of coloured vials, then a humanoid robot working at a bench alongside a researcher in a lab coat with sample trays and an anatomical model. Silent, and it plays behind a dark overlay, so it is never the subject of attention.',
        frames: 'wiki/video-frames/core-labs-hero.jpg',
        usedOn: ['src/pages/CoreLabs.jsx'],
    },
    {
        id: 'g1-teleoperation',
        src: '/videos/demonstrations/dynamo/g1-teleoperation.mp4',
        poster: '/videos/demonstrations/dynamo/g1-teleoperation-poster.webp',
        bucket: BUCKETS.CAMERA,
        duration: 42,
        description:
            'VR teleoperation of the Unitree G1 humanoid. An operator wearing a head-mounted display moves their arms and the robot mirrors the motion, first standing in the lab and then seated at a bench with coloured vials and trays.',
        frames: 'wiki/video-frames/g1-teleoperation.jpg',
        usedOn: ['src/pages/Dynamo.jsx'],
    },
    {
        id: 'isaac-sim-room-generation',
        src: '/videos/demonstrations/dynamo/isaac-sim-room-generation.mp4',
        poster: '/videos/demonstrations/dynamo/isaac-sim-room-generation-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 7,
        description:
            'First version of procedural environment generation in Isaac Sim. A large open-plan office is populated with rows of cubicles, desks and partitions, with robot instances placed among them to generate training scenes at scale.',
        frames: 'wiki/video-frames/isaac-sim-room-generation.jpg',
        usedOn: ['src/pages/Dynamo.jsx'],
    },
    {
        id: 'ridgeback-slam-navigation',
        src: '/videos/demonstrations/dynamo/ridgeback-slam-navigation.mp4',
        poster: '/videos/demonstrations/dynamo/ridgeback-slam-navigation-poster.webp',
        bucket: BUCKETS.UI_CAPTURE,
        duration: 194,
        description:
            'First working version of the Ridgeback simulation stack, recorded as a full desktop capture. Gazebo Sim shows a corridor world containing a red sphere target, an image view reports the state machine including RETURN and RETURNING HOME with a rear view, and RViz displays the accumulated point cloud used for SLAM and navigation.',
        frames: 'wiki/video-frames/ridgeback-slam-navigation.jpg',
        usedOn: ['src/pages/Dynamo.jsx'],
    },
    {
        id: 'demonstration-data-collection',
        src: '/videos/demonstrations/dynamo/demonstration-data-collection.mp4',
        poster: '/videos/demonstrations/dynamo/demonstration-data-collection-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 24,
        description:
            'Replay of a recorded teleoperation episode in a multi-pane viewer. Wrist and external camera streams show the arm grasping a red block while synchronised joint-state plots and a scrub timeline run alongside — the recorded format the policy trains on.',
        frames: 'wiki/video-frames/demonstration-data-collection.jpg',
        usedOn: ['src/pages/Dynamo.jsx'],
    },
    {
        id: 'bbox-room-generation',
        src: '/videos/demonstrations/dynamo/bbox-room-generation.mp4',
        poster: '/videos/demonstrations/dynamo/bbox-room-generation-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 6,
        description:
            'Top-down view of bounding-box driven room generation. Furniture and props are placed into an empty room, each outlined by a coloured box, with the layout changing between takes.',
        frames: 'wiki/video-frames/bbox-room-generation.jpg',
        usedOn: ['src/pages/Dynamo.jsx'],
    },
    {
        id: 'distance-estimator-benchmarking',
        src: '/videos/demonstrations/dynamo/distance-estimator-benchmarking.mp4',
        poster: '/videos/demonstrations/dynamo/distance-estimator-benchmarking-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 189,
        description:
            'Benchmark comparing several distance-estimation approaches across RGB, depth and point-cloud inputs in simulation. A colormapped depth panel runs beside the scene while the detection readout toggles between detected and not detected as the humanoid moves at range.',
        frames: 'wiki/video-frames/distance-estimator-benchmarking.jpg',
        usedOn: ['src/pages/Dynamo.jsx'],
    },
    {
        id: 'red-block-pick-place',
        src: '/videos/demonstrations/dynamo/red-block-pick-place.mp4',
        poster: '/videos/demonstrations/dynamo/red-block-pick-place-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 69,
        description:
            'Evaluation rollouts of a red-block pick-and-place policy, filmed from the robot viewpoint over the tabletop. A yellow HUD reports the commanded colour, the trial index and elapsed time, and the reward flips from R=+0 to R=+1 at the moment a trial succeeds. Several consecutive trials are cut together.',
        frames: 'wiki/video-frames/red-block-pick-place.jpg',
        usedOn: ['src/pages/Dynamo.jsx'],
    },
    {
        id: 'ridgeback-environment-exploration',
        src: '/videos/demonstrations/dynamo/ridgeback-environment-exploration.mp4',
        poster: '/videos/demonstrations/dynamo/ridgeback-environment-exploration-poster.webp',
        bucket: BUCKETS.UI_CAPTURE,
        duration: 209,
        description:
            'Desktop capture of autonomous exploration in simulation. RViz builds a 2D occupancy map of a cross-shaped corridor layout while Gazebo shows the robot moving through the white corridors toward a red sphere target, with small camera and depth panels alongside.',
        frames: 'wiki/video-frames/ridgeback-environment-exploration.jpg',
        usedOn: ['src/pages/Dynamo.jsx'],
    },
    {
        id: 'randomized-pick-place-env',
        src: '/videos/demonstrations/dynamo/randomized-pick-place-env.mp4',
        poster: '/videos/demonstrations/dynamo/randomized-pick-place-env-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 33,
        description:
            'Domain-randomised pick-and-place scenes in Isaac Sim. Between takes the room furniture, cabinets, crates and props change around a humanoid working at a bench, producing varied training environments for the same task.',
        frames: 'wiki/video-frames/randomized-pick-place-env.jpg',
        usedOn: ['src/pages/Dynamo.jsx'],
    },
    {
        id: 'three-color-block-pick-place',
        src: '/videos/demonstrations/dynamo/three-color-block-pick-place.mp4',
        poster: '/videos/demonstrations/dynamo/three-color-block-pick-place-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 94,
        description:
            'Colour-conditioned pick-and-place evaluation with green, blue and red blocks on the table. The HUD names the commanded colour per trial and the reward reaches R=+1 on success. Not every trial succeeds — one green attempt runs past 27 seconds still at R=+0 — so the reel shows both outcomes.',
        frames: 'wiki/video-frames/three-color-block-pick-place.jpg',
        usedOn: ['src/pages/Dynamo.jsx'],
    },
    {
        id: 'g1-ridgeback-teleoperation-sim',
        src: '/videos/demonstrations/dynamo/g1-ridgeback-teleoperation-sim.mp4',
        poster: '/videos/demonstrations/dynamo/g1-ridgeback-teleoperation-sim-poster.webp',
        bucket: BUCKETS.UI_CAPTURE,
        duration: 56,
        description:
            'Isaac Sim scene combining the G1 humanoid and the Ridgeback mobile base in a simulated laboratory with benches, shelving and bins, driven through the Omniverse viewport.',
        frames: 'wiki/video-frames/g1-ridgeback-teleoperation-sim.jpg',
        usedOn: ['src/pages/Dynamo.jsx'],
    },
    {
        id: 'leader-following-run-01',
        src: '/videos/demonstrations/leader-following/leader-following-run-01.mp4',
        poster: '/videos/demonstrations/leader-following/leader-following-run-01-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 158,
        description:
            'RGB-D plus 2D LiDAR stage, in simulation. Three people in purple, red and yellow shirts stand among green sphere obstacles; detections are classified by shirt colour and drawn into the 3D point cloud as matching coloured boxes, with the yellow person teleoperated as the leader and a pale yellow line marking the intended follow path. This stage was about checking the target in the point cloud before continuous following existed.',
        frames: 'wiki/video-frames/leader-following-run-01.jpg',
        usedOn: ['src/pages/LeaderFollowing.jsx'],
    },
    {
        id: 'leader-following-run-02',
        src: '/videos/demonstrations/leader-following/leader-following-run-02.mp4',
        poster: '/videos/demonstrations/leader-following/leader-following-run-02-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 105,
        description:
            'The 3D LiDAR version of the same scenario. A 360-degree LiDAR point cloud carries the environment understanding, visible as concentric rings, while the camera is used only to detect people, classify shirt colour and highlight them in RViz.',
        frames: 'wiki/video-frames/leader-following-run-02.jpg',
        usedOn: ['src/pages/LeaderFollowing.jsx'],
    },
    {
        id: 'uni-navid-demo',
        src: '/videos/demonstrations/leader-following/uni-navid-demo.mp4',
        poster: '/videos/demonstrations/leader-following/uni-navid-demo-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 135,
        description:
            'Uni-NaVid navigation demo in a simulated street environment. Insets show the LiDAR view and a follower panel that locks onto a person in high-visibility clothing and draws a predicted trajectory across the ground.',
        frames: 'wiki/video-frames/uni-navid-demo.jpg',
        usedOn: ['src/pages/LeaderFollowing.jsx'],
    },
    {
        id: 'omtrackvla-demo',
        src: '/videos/demonstrations/leader-following/omtrackvla-demo.mp4',
        poster: '/videos/demonstrations/leader-following/omtrackvla-demo-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 136,
        description:
            'OmTrackVLA open-vocabulary tracking in the same simulated street scene. A tracking panel reports target lock state while a strip of recent frames and the LiDAR view run alongside, keeping the described target in focus as the robot moves.',
        frames: 'wiki/video-frames/omtrackvla-demo.jpg',
        usedOn: ['src/pages/LeaderFollowing.jsx'],
    },
    {
        id: 'human-following-milestone-01',
        src: '/videos/demonstrations/leader-following/human-following-milestone-01.mp4',
        poster: '/videos/demonstrations/leader-following/human-following-milestone-01-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 43,
        description:
            'First real-world validation of the leader-following pipeline. The Ridgeback follows a person in a lab coat around laboratory equipment while the inset robot camera boxes the leader in yellow and prints CONTROL: AUTONOMY with a HOLDING or MOVING state plus velocity readouts.',
        frames: 'wiki/video-frames/human-following-milestone-01.jpg',
        usedOn: ['src/pages/LeaderFollowing.jsx'],
    },
    {
        id: 'human-following-milestone-02',
        src: '/videos/demonstrations/leader-following/human-following-milestone-02.mp4',
        poster: '/videos/demonstrations/leader-following/human-following-milestone-02-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 30,
        description:
            'Extended indoor route. The same pipeline follows the leader out through a doorway and along a narrow corridor, with the perception inset keeping the target localised as the room geometry changes.',
        frames: 'wiki/video-frames/human-following-milestone-02.jpg',
        usedOn: ['src/pages/LeaderFollowing.jsx'],
    },
    {
        id: 'NeuroCore_demo',
        src: '/videos/demonstrations/neurocore/NeuroCore_demo.mp4',
        poster: '/videos/demonstrations/neurocore/NeuroCore_demo-poster.webp',
        bucket: BUCKETS.UI_CAPTURE,
        duration: 135,
        description:
            'Tour of the NeuroCore cluster dashboard. Node cards summarise GPU state and storage volumes, a system-metrics view plots utilisation time series, and a performance-benchmark page lists per-GPU benchmark runs with status, utilisation, memory, temperature, power and duration. Individual cluster hostnames are visible on screen.',
        frames: 'wiki/video-frames/NeuroCore_demo.jpg',
        usedOn: ['src/pages/tuc/projects/NeuroCoreProject.jsx', 'src/pages/tuc/AiTeamProjects.jsx'],
    },
    {
        id: 'stratego-demo-rp3',
        src: '/videos/demonstrations/stratego/stratego-demo-rp3.mp4',
        poster: '/videos/demonstrations/stratego/stratego-demo-rp3-poster.webp',
        bucket: BUCKETS.UI_CAPTURE,
        duration: 20,
        description:
            'Two small language models playing Stratego against each other. The board shows the pieces while a side panel names the model to move, counts the turn, and logs eliminated pieces for each side.',
        frames: 'wiki/video-frames/stratego-demo-rp3.jpg',
        usedOn: ['src/pages/tuc/AiTeamProjects.jsx', 'src/pages/tuc/projects/StrategoProject.jsx'],
    },
    {
        id: 'data-collection-viz',
        src: '/videos/demonstrations/vial-sort/data-collection-viz.mp4',
        poster: '/videos/demonstrations/vial-sort/data-collection-viz-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 24,
        description:
            'Replay of a teleoperated vial-sorting episode in a multi-pane viewer: a colormapped depth view of the rig, a side camera on the SO-101 arm and vial rack, a wrist camera approaching a vial, and joint-signal plots on a shared timeline.',
        frames: 'wiki/video-frames/data-collection-viz.jpg',
        usedOn: ['src/pages/VialSort.jsx'],
    },
    {
        id: 'depth-perception-comparison',
        src: '/videos/demonstrations/vial-sort/depth-perception-comparison.mp4',
        poster: '/videos/demonstrations/vial-sort/depth-perception-comparison-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 21,
        description:
            'Three-way depth comparison on the vial rack, panelled as RGB input, Depth Anything V2 and Intel RealSense. The learned depth map resolves the tubes as continuous surfaces while the RealSense output drops out to black across the transparent glass — the evidence behind keeping the policy RGB-first.',
        frames: 'wiki/video-frames/depth-perception-comparison.jpg',
        usedOn: ['src/pages/VialSort.jsx'],
    },
    {
        id: 'policy-comparison',
        src: '/videos/demonstrations/vial-sort/policy-comparison.mp4',
        poster: '/videos/demonstrations/vial-sort/policy-comparison-poster.webp',
        bucket: BUCKETS.INSTRUMENTED,
        duration: 26,
        description:
            'Side-by-side autonomous rollouts of three policies — ACT, pi0 and pi0.5 — on the vial-sorting task, each column showing the arm attempting the commanded arrangement with its own status overlay.',
        frames: 'wiki/video-frames/policy-comparison.jpg',
        usedOn: ['src/pages/VialSort.jsx'],
    },
    {
        id: 'Student-Testim-1',
        src: '/videos/testimonials/Student-Testim-1.mp4',
        poster: '/videos/testimonials/Student-Testim-1-poster.webp',
        bucket: BUCKETS.TALKING_HEAD,
        duration: 84,
        description:
            'A student speaks to camera about taking part in the AI Team Project programme, recorded in a computer lab with other participants working at workstations behind them. Speech audio, so it is the one bucket where the audio track matters.',
        frames: 'wiki/video-frames/Student-Testim-1.jpg',
        usedOn: ['src/pages/tuc/AiTeamProjects.jsx'],
    },
    {
        id: 'Student-Testim-2',
        src: '/videos/testimonials/Student-Testim-2.mp4',
        poster: '/videos/testimonials/Student-Testim-2-poster.webp',
        bucket: BUCKETS.TALKING_HEAD,
        duration: 83,
        description:
            'A second student testimonial about the AI Team Project programme, recorded to camera in the same computer lab setting. Speech audio.',
        frames: 'wiki/video-frames/Student-Testim-2.jpg',
        usedOn: ['src/pages/tuc/AiTeamProjects.jsx'],
    },
    {
        id: 'Student-Testim-3',
        src: '/videos/testimonials/Student-Testim-3.mp4',
        poster: '/videos/testimonials/Student-Testim-3-poster.webp',
        bucket: BUCKETS.TALKING_HEAD,
        duration: 65,
        description:
            'A third student testimonial about the AI Team Project programme, recorded to camera in the same computer lab setting. Speech audio.',
        frames: 'wiki/video-frames/Student-Testim-3.jpg',
        usedOn: ['src/pages/tuc/AiTeamProjects.jsx'],
    },
]

/** Look up an entry by its public path, e.g. videoBySrc['/videos/core-labs-hero.mp4']. */
export const videoBySrc = Object.fromEntries(videos.map((v) => [v.src, v]))
