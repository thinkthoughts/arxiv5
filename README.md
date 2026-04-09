# arxiv5.app

**structured arXiv bridge system**

A lightweight static site that turns arXiv reading into a measurable pipeline:

* one JSON per paper
* auto-generated HTML table
* bridge notes (constraint → signal > noise, 45° 📐)
* repo + Colab linkage
* engagement tracking (zero → five)

---

## 🎯 Goal

**paper → conversation (lift5)**

arxiv5 is not just a list of papers.
It is a system for converting:

* reading → structured understanding
* understanding → visible signal
* signal → real interaction

---

## 🧠 Core Concepts

### Constraint → Signal > Noise

Each paper is mapped into a minimal, shared structure:

* what constraint it defines
* how it reduces degeneracy
* how signal emerges

### 45° 📐

A shorthand for:

* alignment
* usable signal
* stable reasoning

---

## 🔢 Engagement Model

Each paper has a binary engagement state:

* `zero` → no author interaction yet
* `five` → author engagement (threshold crossed)

This defines success as:

> **did the paper become a conversation?**

---

## 🗂 Repo Structure

```
arxiv5-app/
├── index.html
├── styles.css
├── app.js
├── data/
│   ├── index.json
│   ├── 2604.xxxxx.json
│   └── ...
├── papers/
│   ├── 2604.xxxxx.html
│   └── ...
└── lift5.html
```

---

## 📄 JSON Format (per paper)

```
{
  "id": "2604.03163",
  "title": "...",
  "area": "Cosmology",
  "date": "2026-04",

  "arxiv": "https://arxiv.org/abs/2604.03163",
  "paper_page": "/papers/2604.03163.html",
  "repo": "",

  "bridge_note": "...",
  "tags": ["cosmology"],

  "status": "bridged",
  "engagement": "zero",
  "engagement_date": null,
  "engagement_detail": null
}
```

---

## ⚙️ Workflow

For each new arXiv paper:

1. add `data/ID.json`
2. add `papers/ID.html`
3. append ID to `data/index.json`
4. (optional) link repo / Colab
5. publish bridge note
6. attempt engagement (lift5)

---

## 🚀 lift5 (engagement pipeline)

`zero` is not a dead state.

It links to **lift5**, the execution layer:

1. read → extract signal
2. bridge → translate
3. publish → visible signal
4. target → author
5. iterate → refine

---

## 🔗 Related Systems

* sdg5.app
* 9423Phase
* science5 / quantumCompute5
* #beyondEndoscopy
* #zeroMisogyny

---

## 📊 What This Builds

arxiv5 becomes:

* a **research index**
* a **bridge layer**
* a **live interaction tracker**

Instead of:

> “papers we read”

It becomes:

> **papers we attempted to engage — and which responded**

---

## 🧭 Future Extensions

* sorting / filtering by area, engagement, date
* automatic tweet / email generation
* per-paper outreach history
* synthesis pages (ML, cosmology, etc.)
* engagement analytics (time-to-five)

---

## 🌿 Summary

arxiv5.app is a minimal system for:

> **turning research into interaction**

zero → five
signal → conversation
