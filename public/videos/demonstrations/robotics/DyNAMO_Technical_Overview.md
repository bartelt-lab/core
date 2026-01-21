# DyNAMO — Technical Overview

DyNAMO is a simulation-first robotics project focused on autonomous mobility, humanoid manipulation, and AI-driven control.

## Hardware Stack
- **Mobile Base:** Clearpath Ridgeback — autonomous navigation and payload transport  
- **Manipulator:** Unitree G1 humanoid — dexterous, multi-object manipulation

## Simulation & Tooling
- **Primary simulator:** NVIDIA Isaac Lab  
- **Scene representation:** Universal Scene Description (USD)  
- **Synthetic data:** Isaac Replicator for scalable training and evaluation

## Core Technical Focus
- Autonomous navigation, mapping, and socially aware path planning  
- AI-based manipulation using foundation models, imitation learning, and vision–language–action policies  
- Interface-driven system design to decouple mobility, manipulation, and perception  
- Procedural simulation environments with accurate physics and digital twins

## Goal
Demonstrate an integrated system where a humanoid robot identifies, grasps, and places multiple objects onto an autonomously navigating mobile base—validated entirely in simulation before real-world deployment.
