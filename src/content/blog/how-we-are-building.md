---
title: "How we are building BHUTRANA"
summary: "The hardware, software and data choices behind the kiosk, and where the project stands."
part: "3"
order: 3
tag: "Build"
date: 2026-09-24
---
Every part of BHUTRANA uses technology selected for a practical branch setting: Bhashini for speech, a Raspberry Pi kiosk, NFC or RFID identification, and thermal printing. We are integrating these parts into one member-facing experience.

## The three layers

**Hardware.** A Raspberry Pi 5 with a touchscreen, microphone, speaker, card reader and receipt printer inside a podium-style enclosure. Details are in [the hardware post](/blog/hardware-kiosk/).

**Software.** A Python and Flask backend, a kiosk interface, Bhashini for voice, a local retrieval database and a language model. Details are in [the software post](/blog/software-voice-rag/).

**Data.** Verified documents from the Ministry of Cooperation, NABARD and state cooperative departments, loaded as PDFs and updated centrally.

## Why central updates matter

Because answers come from a shared document set, updating that set updates every kiosk. Nobody has to retrain staff at each branch.

## Where we are

BHUTRANA is a Smart India Hackathon 2026 project by Team Mitras. The prototype is being built on a laptop first and will move to Raspberry Pi hardware afterwards. Our first demo languages are Hindi, Tamil and English.
