# Sample TRIZ Brainstorming Session

This directory contains a complete example of a TRIZ brainstorming session for the problem:

**"Zero-Latency Hazard Detection for L5 Autonomous Vehicles"**

## Problem Overview

**Domain:** Autonomous Vehicle Engineering / AI Safety Systems

**Core Contradiction:**
- **Improve:** Accuracy of Object Detection (Safety)
- **Worsens:** Computational Complexity & Response Time

**Ideal Final Result:** The vehicle inherently detects and avoids all hazards instantly, in any weather condition, without requiring expensive sensor upgrades or supercomputers.

## Sample Files

### Input
- `problem-statement.json` - The structured problem definition

### Raw Solutions
- `raw-solution-principle-1.json` - Example of solutions generated for TRIZ Principle #1 (Segmentation)

### Evaluated Solutions
- `evaluated-solution-example.json` - Example showing how solutions are scored against the KPI matrix

### Reports
- `top-solutions-summary.md` - Executive summary of top-ranked solutions
- `detailed-report-example.md` - Detailed breakdown of top 3 solutions with full KPI justifications

## Key Insights from This Session

### Top Solution: "Spinal Reflex Sensor Loop"
- **TRIZ Principle:** Segmentation
- **Score:** 4.45 / 5.00
- **Key Innovation:** Dual-layer architecture separating safety-critical reflexes from complex decision-making
- **Strengths:** 
  - Near-zero latency
  - Uses commodity components
  - Strong IP potential
- **Challenges:**
  - 12-18 month integration timeline
  - Safety certification requirements

### Runner-Up: "Pre-Computed Hazard Maps"
- **TRIZ Principle:** Preliminary Action
- **Score:** 4.30 / 5.00
- **Key Innovation:** Pre-calculate hazard zones to reduce real-time computation
- **Strengths:**
  - Software-only (OTA deployable)
  - Zero BOM impact
  - Immediate implementation
- **Challenges:**
  - Limited to predictable scenarios
  - Requires historical data

## How to Use These Samples

1. **Study the Problem Statement**: See how a complex engineering problem is structured for TRIZ analysis

2. **Review Raw Solutions**: Understand how Gemini generates creative solutions based on TRIZ principles

3. **Examine Evaluations**: Learn how solutions are objectively scored across multiple KPIs

4. **Analyze Reports**: See how insights are synthesized into actionable recommendations

## Applying to Your Own Problems

Use this sample as a template:

1. Structure your problem similarly to `problem-statement.json`
2. Expect 5 solutions per TRIZ principle (200 total for all 40 principles)
3. Each solution will be scored on 6 KPIs with weighted totals
4. Top 2 solutions per principle will be selected (80 total)
5. Final ranking provides implementation roadmap

## Notes

- This is a **representative sample** showing the structure and quality of outputs
- A full session would include solutions for all 40 TRIZ principles
- Processing time for a complete session: 30-60 minutes
- Total API calls: ~200+ (40 principles × 5 solutions + evaluations)

## Real-World Application

This autonomous vehicle example demonstrates how TRIZ can be applied to:
- Complex technical contradictions
- Multi-constraint optimization problems
- Cross-domain innovation transfer
- Technology roadmap planning

The methodology is equally applicable to:
- Product development
- Process optimization
- Business model innovation
- Service design
- Organizational challenges

