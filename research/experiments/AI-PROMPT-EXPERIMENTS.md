# AI Prompt Experiments — JWORDENAI R&D Lab

> Track A/B tests on AI prompt strategies. Each experiment has a hypothesis, test setup, and measured outcome.

---

## Experiment #001: Bid Proposal Tone
**Status:** In Progress  
**Hypothesis:** Proposals written in "authoritative executive" tone convert at 20% higher rate than standard contractor language.  
**Test:** 50/50 split on proposal emails — Track to signed contract.  
**Current Data:** Pending  

---

## Experiment #002: RAG Context Window Size
**Status:** Planned  
**Hypothesis:** Injecting 3 knowledge chunks (vs. 5) produces faster, equally accurate responses.  
**Test:** Route 50% of queries with 3 chunks, 50% with 5 chunks. Measure latency + accuracy score.  
**Current Data:** Pending  

---

## Experiment #003: Voice vs. Text Lead Capture
**Status:** Planned  
**Hypothesis:** Voice interface on field estimator page increases lead submissions by 35%.  
**Test:** A/B with voice enabled/disabled on `/estimator` route.  
**Current Data:** Pending  

---

## Experiment #004: Multi-Model vs. Single-Model Quality
**Status:** Planned  
**Hypothesis:** Routing specs queries to Gemini (long-context) produces 40% more accurate VDOT citations than Claude.  
**Test:** 100 spec questions scored by human rater (1–5 accuracy). Compare Claude vs. Gemini responses.  
**Current Data:** Pending  

---

## How to Add an Experiment

1. Copy experiment template below
2. Assign next sequential ID
3. Set hypothesis before starting
4. Record results after 30-day measurement window
5. Update ROADMAP.md if results change strategy

### Template
```
## Experiment #XXX: [Title]
**Status:** Planned | In Progress | Complete
**Hypothesis:** [What you expect to happen and why]
**Test:** [How to measure — what splits, what metrics]
**Result:** [Outcome, statistical significance]
**Decision:** [What to change based on this result]
```
