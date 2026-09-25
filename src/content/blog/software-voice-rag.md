---
title: "The software: Bhashini voice, grounded answers and offline fallback"
summary: "How voice, retrieval and a language model work together so answers come from verified documents."
part: "3.2"
order: 5
tag: "Software"
date: 2026-09-24
---
The software has one job: turn a spoken question in a supported language into an answer from an official source, and act on it.

## The pipeline

1. **Speech in.** Bhashini converts the member's speech to text in their language.
2. **Retrieval.** The question is matched against a local knowledge base built from PACS bylaws, KCC rules and scheme guidelines.
3. **Answer.** A language model, either run locally or reached through an API, writes a reply using only the retrieved documents.
4. **Speech out.** Bhashini converts the reply back to speech in the member's language.
5. **Action.** If the member wants to apply, the backend fills the KCC or scheme form on the PACS admin portal and prints a receipt.

## Why retrieval and not a general chatbot

A general chatbot can sound confident and be wrong. Answering only from verified government documents keeps replies consistent across every branch and lets us update knowledge by replacing a file.

## Keeping it working offline

Rural connectivity is unreliable. The kiosk keeps a cached copy of its knowledge base. During an outage it answers from that copy and syncs once the connection is back.
