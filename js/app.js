(() => {
    "use strict";

    const instrumentLabel = {
      piano: "피아노",
      violin: "아코디언"
    };
    const instrumentChoices = ["piano", "violin"];
    const instrumentSymbol = { piano: "♩", violin: "𝄞" };
    const instrumentDescription = {
      piano: "",
      violin: ""
    };
    const loudnessLabel = { soft: "작게", strong: "세게" };
    const notes = [
      { id: "C4", name: "C4", solfege: "도", frequency: 261.63 },
      { id: "D4", name: "D4", solfege: "레", frequency: 293.66 },
      { id: "E4", name: "E4", solfege: "미", frequency: 329.63 },
      { id: "F4", name: "F4", solfege: "파", frequency: 349.23 },
      { id: "G4", name: "G4", solfege: "솔", frequency: 392.00 },
      { id: "A4", name: "A4", solfege: "라", frequency: 440.00 },
      { id: "B4", name: "B4", solfege: "시", frequency: 493.88 },
      { id: "C5", name: "C5", solfege: "높은 도", frequency: 523.25 }
    ];

    const visibleWaveNoteIds = ["C4", "E4", "G4"];

    const waveformImageMap = {"piano":{"strong":{"G4":"assets/images/waveforms/piano/strong/G4.png","C5":"assets/images/waveforms/piano/strong/C5.png","C4":"assets/images/waveforms/piano/strong/C4.png","F4":"assets/images/waveforms/piano/strong/F4.png","A4":"assets/images/waveforms/piano/strong/A4.png","D4":"assets/images/waveforms/piano/strong/D4.png","B4":"assets/images/waveforms/piano/strong/B4.png","E4":"assets/images/waveforms/piano/strong/E4.png"},"soft":{"A4":"assets/images/waveforms/piano/soft/A4.png","B4":"assets/images/waveforms/piano/soft/B4.png","G4":"assets/images/waveforms/piano/soft/G4.png","F4":"assets/images/waveforms/piano/soft/F4.png","E4":"assets/images/waveforms/piano/soft/E4.png","C4":"assets/images/waveforms/piano/soft/C4.png","C5":"assets/images/waveforms/piano/soft/C5.png","D4":"assets/images/waveforms/piano/soft/D4.png"}},"violin":{"strong":{"B4":"assets/images/waveforms/accordion/strong/B4.png","A4":"assets/images/waveforms/accordion/strong/A4.png","D4":"assets/images/waveforms/accordion/strong/D4.png","E4":"assets/images/waveforms/accordion/strong/E4.png","F4":"assets/images/waveforms/accordion/strong/F4.png","C5":"assets/images/waveforms/accordion/strong/C5.png","C4":"assets/images/waveforms/accordion/strong/C4.png","G4":"assets/images/waveforms/accordion/strong/G4.png"},"soft":{"C4":"assets/images/waveforms/accordion/soft/C4.png","G4":"assets/images/waveforms/accordion/soft/G4.png","F4":"assets/images/waveforms/accordion/soft/F4.png","B4":"assets/images/waveforms/accordion/soft/B4.png","D4":"assets/images/waveforms/accordion/soft/D4.png","C5":"assets/images/waveforms/accordion/soft/C5.png","E4":"assets/images/waveforms/accordion/soft/E4.png","A4":"assets/images/waveforms/accordion/soft/A4.png"}}};

    const problems = [
      {
        label: "문제 1",
        instrument: "piano",
        pattern: [
          { noteId: "C4", loudness: "soft", duration: 0.38 },
          { noteId: "E4", loudness: "soft", duration: 0.38 },
          { noteId: "G4", loudness: "soft", duration: 0.38 },
          { noteId: "C4", loudness: "strong", duration: 0.38 }
        ]
      },
      {
        label: "문제 2",
        instrument: "violin",
        pattern: [
          { noteId: "C4", loudness: "soft", duration: 0.38 },
          { noteId: "C4", loudness: "soft", duration: 0.38 },
          { noteId: "G4", loudness: "strong", duration: 0.38 },
          { noteId: "G4", loudness: "strong", duration: 0.38 },
          { noteId: "E4", loudness: "soft", duration: 0.38 }
        ]
      },
      {
        label: "문제 3",
        instrument: "piano",
        pattern: [
          { noteId: "C4", instrument: "violin", loudness: "soft", duration: 0.38 },
          { noteId: "E4", instrument: "violin", loudness: "strong", duration: 0.38 },
          { noteId: "G4", instrument: "violin", loudness: "strong", duration: 0.38 },
          { noteId: "E4", instrument: "piano", loudness: "soft", duration: 0.38 },
          { noteId: "C4", instrument: "piano", loudness: "soft", duration: 0.38 }
        ]
      }
    ];

    function currentPattern() {
      return problems[state.currentProblem].pattern;
    }
    const partials = {
      piano: [
        { ratio: 1, gain: 1 }, { ratio: 2.01, gain: 0.48 }, { ratio: 3.03, gain: 0.2 },
        { ratio: 4.08, gain: 0.09 }, { ratio: 5.12, gain: 0.04 }
      ],
      violin: [
        { ratio: 1, gain: 1 }, { ratio: 2, gain: 0.74 }, { ratio: 3, gain: 0.53 },
        { ratio: 4, gain: 0.41 }, { ratio: 5, gain: 0.31 }, { ratio: 6, gain: 0.24 },
        { ratio: 7, gain: 0.18 }, { ratio: 8, gain: 0.14 }, { ratio: 9, gain: 0.11 },
        { ratio: 10, gain: 0.085 }, { ratio: 11, gain: 0.065 }, { ratio: 12, gain: 0.05 }
      ],
      clarinet: [
        { ratio: 1, gain: 1 }, { ratio: 2, gain: 0.08 }, { ratio: 3, gain: 0.68 },
        { ratio: 4, gain: 0.05 }, { ratio: 5, gain: 0.34 }, { ratio: 7, gain: 0.18 }, { ratio: 9, gain: 0.09 }
      ],
      organ: [
        { ratio: 1, gain: 1 }, { ratio: 2, gain: 0.58 }, { ratio: 3, gain: 0.34 },
        { ratio: 4, gain: 0.2 }, { ratio: 5, gain: 0.13 }, { ratio: 6, gain: 0.09 }, { ratio: 8, gain: 0.06 }
      ],
      trumpet: [
        { ratio: 1, gain: 1 }, { ratio: 2, gain: 0.86 }, { ratio: 3, gain: 0.68 },
        { ratio: 4, gain: 0.51 }, { ratio: 5, gain: 0.39 }, { ratio: 6, gain: 0.29 },
        { ratio: 7, gain: 0.21 }, { ratio: 8, gain: 0.15 }, { ratio: 9, gain: 0.11 }, { ratio: 10, gain: 0.08 }
      ]
    };

    const state = {
      activeInstruments: ["piano", "violin"],
      targetInstrument: "piano",
      selectedInstrument: "piano",
      currentProblem: 0,
      cells: Array(4).fill(null),
      resultVisible: false,
      audioMessage: "",
      playing: null,
      counter: 0
    };
    let audioContext = null;
    let playingTimer = null;

    function noteIdFromFrequency(frequency) {
      const nearest = notes.reduce((best, note) => {
        const diff = Math.abs(note.frequency - frequency);
        return !best || diff < best.diff ? { id: note.id, diff } : best;
      }, null);
      return nearest && nearest.diff < 1.5 ? nearest.id : null;
    }

    function waveform(instrument, frequency = 392, loudness = "strong", compact = false) {
      const noteId = noteIdFromFrequency(frequency);
      const imageSrc = noteId && waveformImageMap[instrument] && waveformImageMap[instrument][loudness]
        ? waveformImageMap[instrument][loudness][noteId]
        : null;
      if (imageSrc) {
        const compactClass = compact ? " compact" : "";
        return `<img class="waveform waveform-image${compactClass}" src="${imageSrc}" alt="${instrumentLabel[instrument]} ${Math.round(frequency)} Hz ${loudnessLabel[loudness]} 파형">`;
      }
      const sampleCount = compact ? 54 : 88;
      const amplitudeScale = loudness === "strong" ? 1 : 0.46;
      const totalGain = partials[instrument].reduce((sum, part) => sum + Math.abs(part.gain), 0);
      const points = Array.from({ length: sampleCount }, (_, index) => {
        const phase = (index / (sampleCount - 1)) * Math.PI * 4 * (frequency / 392);
        const raw = partials[instrument].reduce((sum, part) => sum + Math.sin(phase * part.ratio) * part.gain, 0);
        const normalizedRaw = raw / Math.max(1, totalGain * 0.52);
        const x = (index / (sampleCount - 1)) * 280;
        const y = 46 - normalizedRaw * 21 * amplitudeScale;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(" ");
      const compactClass = compact ? " compact" : "";
      return `<svg class="waveform${compactClass}" viewBox="0 0 280 92" role="img" aria-label="${instrumentLabel[instrument]} ${Math.round(frequency)} Hz ${loudnessLabel[loudness]} 합성 파형"><line x1="0" y1="46" x2="280" y2="46"></line><polyline points="${points}"></polyline></svg>`;
    }

    function renderInstrumentPicker() {
      const options = instrumentChoices.map(instrument => `<option value="${instrument}">${instrumentLabel[instrument]}</option>`).join("");
      document.getElementById("instrument-picker").innerHTML = [0, 1].map(slot => `
        <label class="instrument-select">
          <span>${slot === 0 ? "악기 A" : "악기 B"}</span>
          <select data-instrument-slot="${slot}" aria-label="${slot === 0 ? "첫 번째" : "두 번째"} 비교 악기">${options}</select>
        </label>`).join("") + `<p>선택한 두 악기가 아래 비교와 파동 셀 활동에 함께 적용됩니다.</p>`;
      document.querySelectorAll("[data-instrument-slot]").forEach(select => {
        select.value = state.activeInstruments[Number(select.dataset.instrumentSlot)];
      });
    }

    function renderInstrumentCards() {
      document.getElementById("instrument-grid").innerHTML = state.activeInstruments.map((instrument, index) => `
        <article class="instrument-card ${instrument}">
          <div class="instrument-title-row">
            <div><p class="instrument-number">${index === 0 ? "01" : "02"}</p><h3>${instrumentLabel[instrument]}</h3></div>
            <span class="instrument-symbol" aria-hidden="true">${instrumentSymbol[instrument]}</span>
          </div>
          ${waveform(instrument)}
          <button class="listen-button" type="button" data-play-single="${instrument}">
            <span aria-hidden="true">${state.playing === instrument ? "■" : "▶"}</span>
            ${state.playing === instrument ? "재생 중" : "소리 들어보기"}
          </button>
        </article>`).join("");
    }

    function renderTargetControls() {
      const tabs = document.getElementById("problem-tabs");
      tabs.innerHTML = problems.map((problem, index) => `
        <button type="button" data-problem="${index}" class="${state.currentProblem === index ? "active" : ""}" aria-pressed="${state.currentProblem === index}">
          ${problem.label}
        </button>`).join("");
      document.getElementById("problem-index").textContent = String(state.currentProblem + 1);
      document.getElementById("problem-label").textContent = problems[state.currentProblem].label;
      document.getElementById("play-target").innerHTML = `<span aria-hidden="true">${state.playing === "target" ? "■" : "▶"}</span> ${state.playing === "target" ? "예시 재생 중" : "예시 소리 듣기"}`;
    }

    function renderCellInstruments() {
      const cellInstrumentLabel = {
        piano: "악기1",
        violin: "악기2"
      };
      document.getElementById("cell-instruments").innerHTML = state.activeInstruments.map(instrument => `
        <button type="button" data-cell-instrument="${instrument}" class="${state.selectedInstrument === instrument ? `selected ${instrument}` : ""}" aria-pressed="${state.selectedInstrument === instrument}">
          <span aria-hidden="true">${instrumentSymbol[instrument]}</span>${cellInstrumentLabel[instrument]}
        </button>`).join("");
    }

    function renderWaveMatrix() {
      const visibleNotes = notes.filter(note => visibleWaveNoteIds.includes(note.id));
      const rows = ["strong", "soft"].map(loudness => `
        <div class="matrix-row ${loudness}">
          ${visibleNotes.map(note => `<button class="wave-cell-button" type="button" data-note="${note.id}" data-loudness="${loudness}" aria-label="${instrumentLabel[state.selectedInstrument]} ${Math.round(note.frequency)} Hz, ${loudnessLabel[loudness]} 파동 셀 선택">${waveform(state.selectedInstrument, note.frequency, loudness, true)}</button>`).join("")}
        </div>`).join("");
      const axis = `<div class="frequency-axis" aria-hidden="true"><span>낮은 진동수</span><span class="axis-line">→</span><span>높은 진동수</span></div>`;
      document.getElementById("wave-matrix").innerHTML = rows + axis;
    }

    function renderSequence() {
      const pattern = currentPattern();
      const slots = document.getElementById("sequence-slots");
      slots.style.setProperty("--slot-count", String(state.cells.length));
      slots.innerHTML = state.cells.map((cell, index) => `
        <div class="sequence-slot${cell ? " filled" : ""}">
          <span class="slot-index">${index + 1}</span>
          ${cell ? `<button type="button" data-remove-cell="${index}" aria-label="${index + 1}번 셀 빼기">${waveform(cell.instrument, cell.note.frequency, cell.loudness, true)}<span class="sequence-meta">${instrumentLabel[cell.instrument]} · ${loudnessLabel[cell.loudness]}</span><span class="remove-hint">눌러서 빼기</span></button>` : `<span class="empty-copy">셀을<br>골라 주세요</span>`}
        </div>`).join("");
      document.getElementById("play-mine").innerHTML = `<span aria-hidden="true">${state.playing === "mine" ? "■" : "▶"}</span> ${state.playing === "mine" ? "내 소리 재생 중" : "내 소리 듣기"}`;
      document.getElementById("audio-message").textContent = state.audioMessage;
      renderResult();
    }

    function getScore() {
      const pattern = currentPattern();
      const score = { pitch: 0, loudness: 0, instrument: 0, total: 0 };
      state.cells.forEach((cell, index) => {
        if (!cell) return;
        if (cell.note.id === pattern[index].noteId) score.pitch += 1;
        if (cell.loudness === pattern[index].loudness) score.loudness += 1;
        if (cell.instrument === (pattern[index].instrument || problems[state.currentProblem].instrument)) score.instrument += 1;
      });
      score.total = score.pitch + score.loudness + score.instrument;
      return score;
    }

    function renderResult() {
      const root = document.getElementById("result");
      if (!state.resultVisible) {
        root.innerHTML = "";
        return;
      }
      const score = getScore();
      const count = currentPattern().length;
      const maxScore = count * 3;
      root.innerHTML = `<div class="result-card ${score.total === maxScore ? "perfect" : ""}" role="status"><div class="score-ring"><strong>${score.total}</strong><span>/ ${maxScore}</span></div><div><p class="result-title">${score.total === maxScore ? "완벽해요! 예시와 똑같아요." : "한 번 더 들으면 더 가까워질 거예요."}</p><p class="result-detail">음높이 ${score.pitch}/${count} · 진폭 ${score.loudness}/${count} · 악기 ${score.instrument}/${count}</p></div></div>`;
    }

    function renderActivity() {
      renderTargetControls();
      renderCellInstruments();
      renderWaveMatrix();
      renderSequence();
    }

    function renderAll() {
      renderInstrumentPicker();
      renderInstrumentCards();
      renderActivity();
    }

    function setPlaying(kind, durationMs) {
      state.playing = kind;
      renderInstrumentCards();
      renderTargetControls();
      renderSequence();
      window.clearTimeout(playingTimer);
      playingTimer = window.setTimeout(() => {
        state.playing = null;
        renderInstrumentCards();
        renderTargetControls();
        renderSequence();
      }, durationMs);
    }

    async function getAudioContext() {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        state.audioMessage = "이 브라우저에서는 소리 합성을 지원하지 않습니다.";
        renderSequence();
        return null;
      }
      audioContext = audioContext || new AudioContextClass();
      await audioContext.resume();
      return audioContext;
    }

    function createPeriodicWaveFor(context, instrument) {
      const harmonicCount = Math.max(...partials[instrument].map(part => Math.round(part.ratio)));
      const real = new Float32Array(harmonicCount + 1);
      const imaginary = new Float32Array(harmonicCount + 1);
      partials[instrument].forEach(part => { imaginary[Math.round(part.ratio)] = part.gain; });
      return context.createPeriodicWave(real, imaginary, { disableNormalization: false });
    }

    function createBreathNoise(context, destination, start, duration, centerFrequency, level) {
      const end = start + duration;
      const releaseStart = Math.max(start + 0.08, end - 0.08);
      const bufferLength = Math.max(1, Math.ceil(context.sampleRate * duration));
      const buffer = context.createBuffer(1, bufferLength, context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
      const source = context.createBufferSource();
      source.buffer = buffer;
      const filter = context.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = centerFrequency;
      filter.Q.value = 0.72;
      const gain = context.createGain();
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(level, start + 0.025);
      gain.gain.setValueAtTime(level * 0.62, releaseStart);
      gain.gain.exponentialRampToValueAtTime(0.0001, end);
      source.connect(filter).connect(gain).connect(destination);
      source.start(start);
      source.stop(end);
    }

    function createViolinTone(context, destination, frequency, amplitude, start, duration) {
      const end = start + duration;
      const releaseStart = Math.max(start + 0.1, end - 0.1);
      const noteGain = context.createGain();
      noteGain.gain.setValueAtTime(0.0001, start);
      noteGain.gain.linearRampToValueAtTime(amplitude * 0.52, start + 0.018);
      noteGain.gain.linearRampToValueAtTime(amplitude * 0.76, start + 0.068);
      noteGain.gain.setValueAtTime(amplitude * 0.72, releaseStart);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, end);
      noteGain.connect(destination);
      const expressionGain = context.createGain();
      expressionGain.gain.value = 0.98;
      expressionGain.connect(noteGain);
      const highPass = context.createBiquadFilter();
      highPass.type = "highpass";
      highPass.frequency.value = 115;
      highPass.Q.value = 0.65;
      const bodyProfile = [
        { frequency: 285, gain: 3.2, q: 1.4 }, { frequency: 470, gain: 2.1, q: 1.7 },
        { frequency: 920, gain: 4.4, q: 2.1 }, { frequency: 1560, gain: 2.8, q: 2.5 },
        { frequency: 2750, gain: 1.7, q: 2.8 }
      ];
      let bodyOutput = highPass;
      bodyProfile.forEach(profile => {
        const resonance = context.createBiquadFilter();
        resonance.type = "peaking";
        resonance.frequency.value = profile.frequency;
        resonance.gain.value = profile.gain;
        resonance.Q.value = profile.q;
        bodyOutput.connect(resonance);
        bodyOutput = resonance;
      });
      const bowBrightness = context.createBiquadFilter();
      bowBrightness.type = "lowpass";
      bowBrightness.Q.value = 0.72;
      bowBrightness.frequency.setValueAtTime(3400, start);
      bowBrightness.frequency.exponentialRampToValueAtTime(6700, start + 0.055);
      bowBrightness.frequency.exponentialRampToValueAtTime(5600, releaseStart);
      bodyOutput.connect(bowBrightness).connect(expressionGain);
      const real = new Float32Array(partials.violin.length + 1);
      const imaginary = new Float32Array(partials.violin.length + 1);
      partials.violin.forEach((part, index) => { imaginary[index + 1] = part.gain; });
      const stringOscillator = context.createOscillator();
      stringOscillator.setPeriodicWave(context.createPeriodicWave(real, imaginary, { disableNormalization: false }));
      stringOscillator.frequency.setValueAtTime(frequency, start);
      const softClip = context.createWaveShaper();
      const curve = new Float32Array(1024);
      for (let index = 0; index < curve.length; index += 1) {
        const x = (index / (curve.length - 1)) * 2 - 1;
        curve[index] = Math.tanh(x * 1.35) / Math.tanh(1.35);
      }
      softClip.curve = curve;
      softClip.oversample = "2x";
      stringOscillator.connect(softClip).connect(highPass);
      const vibrato = context.createOscillator();
      const vibratoDepth = context.createGain();
      vibrato.frequency.value = 5.15;
      vibratoDepth.gain.setValueAtTime(0, start);
      vibratoDepth.gain.linearRampToValueAtTime(5.5, start + 0.19);
      vibrato.connect(vibratoDepth).connect(stringOscillator.detune);
      const expression = context.createOscillator();
      const expressionDepth = context.createGain();
      expression.frequency.value = 1.35;
      expressionDepth.gain.value = 0.018;
      expression.connect(expressionDepth).connect(expressionGain.gain);
      const noiseLength = Math.max(1, Math.ceil(context.sampleRate * duration));
      const noiseBuffer = context.createBuffer(1, noiseLength, context.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let index = 0; index < noiseData.length; index += 1) noiseData[index] = Math.random() * 2 - 1;
      const bowNoise = context.createBufferSource();
      bowNoise.buffer = noiseBuffer;
      const bowNoiseFilter = context.createBiquadFilter();
      bowNoiseFilter.type = "bandpass";
      bowNoiseFilter.frequency.value = 2350;
      bowNoiseFilter.Q.value = 0.7;
      const bowNoiseGain = context.createGain();
      bowNoiseGain.gain.setValueAtTime(0.0001, start);
      bowNoiseGain.gain.linearRampToValueAtTime(0.042, start + 0.012);
      bowNoiseGain.gain.exponentialRampToValueAtTime(0.012, start + 0.085);
      bowNoiseGain.gain.setValueAtTime(0.009, releaseStart);
      bowNoiseGain.gain.exponentialRampToValueAtTime(0.0001, end);
      bowNoise.connect(bowNoiseFilter).connect(bowNoiseGain).connect(highPass);
      stringOscillator.start(start);
      vibrato.start(start);
      expression.start(start);
      bowNoise.start(start);
      stringOscillator.stop(end + 0.03);
      vibrato.stop(end + 0.03);
      expression.stop(end + 0.03);
      bowNoise.stop(end);
    }

    function createClarinetTone(context, destination, frequency, amplitude, start, duration) {
      const end = start + duration;
      const releaseStart = Math.max(start + 0.09, end - 0.075);
      const noteGain = context.createGain();
      noteGain.gain.setValueAtTime(0.0001, start);
      noteGain.gain.linearRampToValueAtTime(amplitude * 0.64, start + 0.042);
      noteGain.gain.linearRampToValueAtTime(amplitude * 0.7, start + 0.09);
      noteGain.gain.setValueAtTime(amplitude * 0.68, releaseStart);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, end);
      noteGain.connect(destination);
      const highPass = context.createBiquadFilter();
      highPass.type = "highpass";
      highPass.frequency.value = 105;
      const formant = context.createBiquadFilter();
      formant.type = "peaking";
      formant.frequency.value = 1480;
      formant.Q.value = 2.2;
      formant.gain.value = 4.5;
      const warmth = context.createBiquadFilter();
      warmth.type = "peaking";
      warmth.frequency.value = 620;
      warmth.Q.value = 1.5;
      warmth.gain.value = 2.2;
      const lowPass = context.createBiquadFilter();
      lowPass.type = "lowpass";
      lowPass.frequency.value = 5200;
      lowPass.Q.value = 0.7;
      highPass.connect(warmth).connect(formant).connect(lowPass).connect(noteGain);
      const oscillator = context.createOscillator();
      oscillator.setPeriodicWave(createPeriodicWaveFor(context, "clarinet"));
      oscillator.frequency.setValueAtTime(frequency, start);
      oscillator.detune.setValueAtTime(-4, start);
      oscillator.detune.linearRampToValueAtTime(0, start + 0.065);
      oscillator.connect(highPass);
      const vibrato = context.createOscillator();
      const vibratoDepth = context.createGain();
      vibrato.frequency.value = 4.8;
      vibratoDepth.gain.setValueAtTime(0, start);
      vibratoDepth.gain.linearRampToValueAtTime(2.2, start + 0.18);
      vibrato.connect(vibratoDepth).connect(oscillator.detune);
      createBreathNoise(context, highPass, start, duration, 1900, 0.018);
      oscillator.start(start);
      vibrato.start(start);
      oscillator.stop(end + 0.03);
      vibrato.stop(end + 0.03);
    }

    function createOrganTone(context, destination, frequency, amplitude, start, duration) {
      const end = start + duration;
      const releaseStart = Math.max(start + 0.08, end - 0.075);
      const noteGain = context.createGain();
      noteGain.gain.setValueAtTime(0.0001, start);
      noteGain.gain.linearRampToValueAtTime(amplitude * 0.56, start + 0.028);
      noteGain.gain.setValueAtTime(amplitude * 0.55, releaseStart);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, end);
      noteGain.connect(destination);
      const toneFilter = context.createBiquadFilter();
      toneFilter.type = "lowpass";
      toneFilter.frequency.value = 6900;
      toneFilter.Q.value = 0.62;
      toneFilter.connect(noteGain);
      const tremolo = context.createOscillator();
      const tremoloDepth = context.createGain();
      tremolo.frequency.value = 5.6;
      tremoloDepth.gain.value = 0.018;
      tremolo.connect(tremoloDepth).connect(noteGain.gain);
      partials.organ.forEach((part, index) => {
        const oscillator = context.createOscillator();
        const partialGain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency * part.ratio, start);
        oscillator.detune.value = index % 2 === 0 ? -0.7 : 0.7;
        partialGain.gain.value = part.gain / 2.25;
        oscillator.connect(partialGain).connect(toneFilter);
        oscillator.start(start);
        oscillator.stop(end + 0.03);
      });
      tremolo.start(start);
      tremolo.stop(end + 0.03);
    }

    function createTrumpetTone(context, destination, frequency, amplitude, start, duration) {
      const end = start + duration;
      const releaseStart = Math.max(start + 0.1, end - 0.075);
      const noteGain = context.createGain();
      noteGain.gain.setValueAtTime(0.0001, start);
      noteGain.gain.linearRampToValueAtTime(amplitude * 0.48, start + 0.018);
      noteGain.gain.linearRampToValueAtTime(amplitude * 0.66, start + 0.072);
      noteGain.gain.setValueAtTime(amplitude * 0.63, releaseStart);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, end);
      noteGain.connect(destination);
      const highPass = context.createBiquadFilter();
      highPass.type = "highpass";
      highPass.frequency.value = 130;
      const bellResonance = context.createBiquadFilter();
      bellResonance.type = "peaking";
      bellResonance.frequency.value = 1180;
      bellResonance.Q.value = 1.8;
      bellResonance.gain.value = 4.2;
      const brilliance = context.createBiquadFilter();
      brilliance.type = "peaking";
      brilliance.frequency.value = 2450;
      brilliance.Q.value = 2.1;
      brilliance.gain.value = 5.2;
      const lowPass = context.createBiquadFilter();
      lowPass.type = "lowpass";
      lowPass.Q.value = 0.85;
      lowPass.frequency.setValueAtTime(2200, start);
      lowPass.frequency.exponentialRampToValueAtTime(6100, start + 0.075);
      lowPass.frequency.exponentialRampToValueAtTime(4700, releaseStart);
      highPass.connect(bellResonance).connect(brilliance).connect(lowPass).connect(noteGain);
      const oscillator = context.createOscillator();
      oscillator.setPeriodicWave(createPeriodicWaveFor(context, "trumpet"));
      oscillator.frequency.setValueAtTime(frequency, start);
      oscillator.detune.setValueAtTime(-8, start);
      oscillator.detune.linearRampToValueAtTime(0, start + 0.065);
      oscillator.connect(highPass);
      const vibrato = context.createOscillator();
      const vibratoDepth = context.createGain();
      vibrato.frequency.value = 5.4;
      vibratoDepth.gain.setValueAtTime(0, start);
      vibratoDepth.gain.linearRampToValueAtTime(3.2, start + 0.2);
      vibrato.connect(vibratoDepth).connect(oscillator.detune);
      createBreathNoise(context, highPass, start, duration, 3100, 0.012);
      oscillator.start(start);
      vibrato.start(start);
      oscillator.stop(end + 0.03);
      vibrato.stop(end + 0.03);
    }

    function createPianoTone(context, destination, frequency, amplitude, start, duration) {
      const noteGain = context.createGain();
      noteGain.connect(destination);
      noteGain.gain.setValueAtTime(0.0001, start);
      noteGain.gain.exponentialRampToValueAtTime(amplitude, start + 0.012);
      noteGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, amplitude * 0.12), start + Math.max(0.18, duration * 0.82));
      noteGain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      partials.piano.forEach(part => {
        const oscillator = context.createOscillator();
        const partialGain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency * part.ratio, start);
        partialGain.gain.value = part.gain / 1.8;
        oscillator.connect(partialGain).connect(noteGain);
        oscillator.start(start);
        oscillator.stop(start + duration + 0.04);
      });
    }

    function createTone(context, destination, instrument, frequency, amplitude, start, duration) {
      if (instrument === "violin") return createViolinTone(context, destination, frequency, amplitude, start, duration);
      return createPianoTone(context, destination, frequency, amplitude, start, duration);
    }

    const rmsGainCache = new Map();
    const TARGET_UNIT_RMS = 0.20;

    function createOutput(context, masterLevel = 0.68) {
      const master = context.createGain();
      master.gain.value = masterLevel;
      master.connect(context.destination);
      return master;
    }

    async function measureToneRms(instrument, frequency, duration) {
      const OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      if (!OfflineContext) return null;

      const sampleRate = 44100;
      const leadIn = 0.02;
      const tail = 0.08;
      const renderSeconds = leadIn + duration + tail;
      const offline = new OfflineContext(1, Math.ceil(sampleRate * renderSeconds), sampleRate);

      const sink = offline.createGain();
      sink.gain.value = 1;
      sink.connect(offline.destination);

      createTone(offline, sink, instrument, frequency, 1, leadIn, duration);

      const rendered = await offline.startRendering();
      const samples = rendered.getChannelData(0);

      const startIndex = Math.max(0, Math.floor((leadIn + 0.01) * sampleRate));
      const endIndex = Math.min(samples.length, Math.floor((leadIn + duration) * sampleRate));

      let sumSquares = 0;
      let count = 0;
      for (let index = startIndex; index < endIndex; index += 1) {
        const sample = samples[index];
        sumSquares += sample * sample;
        count += 1;
      }

      return count > 0 ? Math.sqrt(sumSquares / count) : null;
    }

    async function getRmsGain(instrument, frequency, duration) {
      const key = `${instrument}:${frequency.toFixed(2)}:${duration.toFixed(3)}`;
      if (rmsGainCache.has(key)) return rmsGainCache.get(key);

      try {
        const measuredRms = await measureToneRms(instrument, frequency, duration);
        if (!measuredRms || !Number.isFinite(measuredRms) || measuredRms < 0.0001) {
          const fallback = instrument === "violin" ? 0.8 : 1.3;
          rmsGainCache.set(key, fallback);
          return fallback;
        }

        const gain = Math.min(2.5, Math.max(0.25, TARGET_UNIT_RMS / measuredRms));
        rmsGainCache.set(key, gain);
        return gain;
      } catch (error) {
        console.warn("RMS 자동 보정 실패, 기본 보정값을 사용합니다.", error);
        const fallback = instrument === "violin" ? 0.8 : 1.3;
        rmsGainCache.set(key, fallback);
        return fallback;
      }
    }

    async function playSingle(instrument) {
      const context = await getAudioContext();
      if (!context) return;

      const frequency = 392;
      const duration = 1.2;
      const rmsGain = await getRmsGain(instrument, frequency, duration);
      const master = createOutput(context, 0.68);

      createTone(
        context,
        master,
        instrument,
        frequency,
        0.72 * rmsGain,
        context.currentTime + 0.04,
        duration
      );
      setPlaying(instrument, 1240);
    }


    async function playSequence(kind) {
      const context = await getAudioContext();
      if (!context) return;
      const pattern = currentPattern();

      if (kind === "mine" && state.cells.some(cell => cell === null)) {
        state.audioMessage = `먼저 ${pattern.length}칸을 모두 채워 주세요.`;
        renderSequence();
        return;
      }

      state.audioMessage = "";

      const playbackItems = pattern.map((target, index) => {
        const targetNote = notes.find(note => note.id === target.noteId);
        const studentCell = state.cells[index];
        const instrument = kind === "target"
          ? (target.instrument || problems[state.currentProblem].instrument)
          : studentCell.instrument;
        const frequency = kind === "target" ? targetNote.frequency : studentCell.note.frequency;
        const loudness = kind === "target" ? target.loudness : studentCell.loudness;

        return {
          instrument,
          frequency,
          loudness,
          duration: target.duration
        };
      });

      const rmsGains = await Promise.all(
        playbackItems.map(item => getRmsGain(item.instrument, item.frequency, item.duration))
      );

      const master = createOutput(context, 0.68);
      let cursor = context.currentTime + 0.06;

      playbackItems.forEach((item, index) => {
        const baseAmplitude = item.loudness === "soft" ? 0.46 : 1.15;
        const pianoStrongBoost = item.instrument === "piano" && item.loudness === "strong" ? 3.50 : 1.0;
        const accordionVolumeScale = item.instrument === "violin" ? 0.80 : 1.0;
        createTone(
          context,
          master,
          item.instrument,
          item.frequency,
          baseAmplitude * rmsGains[index] * pianoStrongBoost * accordionVolumeScale,
          cursor,
          item.duration
        );
        cursor += item.duration + 0.075;
      });

      setPlaying(kind, Math.max(200, (cursor - context.currentTime) * 1000));
    }

    function addCell(noteId, loudness) {
      const note = notes.find(item => item.id === noteId);
      const emptyIndex = state.cells.findIndex(cell => cell === null);
      if (emptyIndex === -1) {
        state.audioMessage = `${state.cells.length}칸이 모두 찼어요. 바꿀 셀을 먼저 눌러 빼 주세요.`;
        renderSequence();
        return;
      }
      state.counter += 1;
      state.cells[emptyIndex] = { id: state.counter, instrument: state.selectedInstrument, note, loudness };
      state.resultVisible = false;
      state.audioMessage = "";
      renderSequence();
    }

    function changeActiveInstrument(slot, instrument) {
      const next = [...state.activeInstruments];
      const otherSlot = slot === 0 ? 1 : 0;
      if (next[otherSlot] === instrument) next[otherSlot] = next[slot];
      next[slot] = instrument;
      state.activeInstruments = next;
      if (!next.includes(state.selectedInstrument)) state.selectedInstrument = next[0];
      renderInstrumentPicker();
      renderInstrumentCards();
      renderCellInstruments();
      renderWaveMatrix();
    }

    function selectProblem(index) {
      state.currentProblem = index;
      state.targetInstrument = problems[index].instrument;
      if (!state.activeInstruments.includes(state.selectedInstrument)) state.selectedInstrument = state.activeInstruments[0];
      state.cells = Array(currentPattern().length).fill(null);
      state.resultVisible = false;
      state.audioMessage = "";
      renderActivity();
    }

    document.addEventListener("change", event => {
      const select = event.target.closest("[data-instrument-slot]");
      if (select) changeActiveInstrument(Number(select.dataset.instrumentSlot), select.value);
    });

    document.addEventListener("click", event => {
      const button = event.target.closest("button");
      if (!button) return;
      if (button.dataset.playSingle) return void playSingle(button.dataset.playSingle);
      if (button.dataset.problem !== undefined) {
        selectProblem(Number(button.dataset.problem));
        return;
      }
      if (button.dataset.cellInstrument) {
        state.selectedInstrument = button.dataset.cellInstrument;
        renderCellInstruments();
        renderWaveMatrix();
        return;
      }
      if (button.dataset.note) return void addCell(button.dataset.note, button.dataset.loudness);
      if (button.dataset.removeCell !== undefined) {
        state.cells[Number(button.dataset.removeCell)] = null;
        state.resultVisible = false;
        renderSequence();
        return;
      }
      if (button.id === "play-target") return void playSequence("target");
      if (button.id === "play-mine") return void playSequence("mine");
      if (button.id === "clear-cells") {
        state.cells = Array(currentPattern().length).fill(null);
        state.resultVisible = false;
        state.audioMessage = "";
        renderSequence();
        return;
      }
      if (button.id === "check-answer") {
        if (state.cells.some(cell => cell === null)) {
          state.audioMessage = `정답을 비교하려면 ${state.cells.length}칸을 모두 채워 주세요.`;
        } else {
          state.audioMessage = "";
          state.resultVisible = true;
        }
        renderSequence();
      }
    });

    renderAll();
  })();
