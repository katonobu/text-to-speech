
import { useState, useRef, useEffect } from "react";

export const useTextToSpeech = ( tracks ) => {
  const [playingStt, setPlayingStt] = useState("IDLE");
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentStr, setCurrentStr] = useState("")
  const [eventInfo, setEventInfo] = useState(null)
  const utteranceRef = useRef(null);

  const synth = window.speechSynthesis;

  const updateEvent = (event) => {
    const {charIndex, elapsedTime, name} = event
    setEventInfo({charIndex, elapsedTime, name})
  }

  // reloadされるとき、再生を停止させる。
  useEffect(() => {
    const handleUnload = () => {
      window.speechSynthesis.cancel();
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  // 指定トラックの再生を開始する
  const playTrack = (index, pauseImmediately = false) => {
    // 指定トラックが最後まで到達してたら停止
    if (index >= tracks.length) {
      console.log("All tracks finished");
      setPlayingStt("IDLE");
      setCurrentTrack(0);
      setCurrentStr("")
      return;
    }

    // 指定トラック文字列を登録
    const u = new SpeechSynthesisUtterance(tracks[index]);
    setCurrentStr(tracks[index])
    utteranceRef.current = u;

    // 再生開始時ハンドラ
    u.onstart = (event) => {
      if (pauseImmediately) {
        synth.pause()
        console.log(`Pause track ${index}`);
      } else {
        setPlayingStt("PLAY");
        console.log(`Start track ${index}`);
      }
      updateEvent(event)
    };
    // 一時停止時ハンドラ
    u.onpause = (event) => {
      console.log("Paused")
      updateEvent(event)
    }
    // 一時停止解除時ハンドラ
    u.onresume = (event) => {
      console.log("Resumed")
      updateEvent(event)
    }
    // トラック最後まで再生したときハンドラ
    u.onend = (event) => {
      if (currentTrack < tracks.length - 1) {
        console.log(`Track ${index} ended`);
        setCurrentTrack(index + 1);
        playTrack(index + 1); // 次を再生
      }
      updateEvent(event)
    };
    u.onboundary = (event) => {
      updateEvent(event)
    }

    // 先頭から再生開始
    synth.speak(u);
  };

  const playDisabled = () => !(playingStt === "IDLE")
  const play = () => {
    if (playingStt === "IDLE") {
      setPlayingStt("TO_PLAY");
      playTrack(currentTrack);
    }
  };

  const pauseDisabled = () => !(playingStt === "PLAY" || playingStt === "PAUSE")
  const pause = () => {
    if (playingStt === "PLAY") {
      setPlayingStt("PAUSE");
      synth.pause();
    } else if (playingStt === "PAUSE") {
      setPlayingStt("PLAY");
      synth.resume();
    }
  }

  const stopDisabled = () => false
  const stop = () => {
    synth.cancel();
    console.log("Stop")
    setPlayingStt("IDLE");
    setCurrentTrack(0);
    setCurrentStr("")
  };

  const playStopDisabled = () => false
  const playStop = () => {
    if (playingStt === "IDLE") {
      play()
    } else {
      stop()
    }
  }

  const playPauseDisabled = () => playingStt === "TO_PLAY"
  const playPause = () => {
    if (playingStt === "IDLE") {
      play()
    } else if (playingStt === "PLAY") {
      pause()
    } else if (playingStt === "PAUSE") {
      pause()
    } else if (playingStt === "TO_PLAY") {
      // なにもしない      
    } else {
      console.log(`Unexpected stt ${playingStt}`)
    }
  }

  const prevTrackDisabled = () => !(0 < currentTrack)
  const prevTrack = () => {
    if (0 < currentTrack) {
      setCurrentTrack(currentTrack - 1);
      if (playingStt !== "IDLE") {
        synth.cancel(); // 再生停止して
        playTrack(currentTrack - 1, playingStt === "PAUSE"); // 指定トラックを再生or先頭でpause
      } else {
        // IDLE時はcurrentTrackの変更だけ
      }
    }
  }

  const nextTrackDisabled = () => !(currentTrack < tracks.length -1 )
  const nextTrack = () => {
    if (currentTrack < tracks.length -1 ) {
      setCurrentTrack(currentTrack + 1);
      if (playingStt !== "IDLE") {
        synth.cancel();
        playTrack(currentTrack + 1, playingStt === "PAUSE"); // 指定トラックを再生or先頭でpause
      } else {
        // IDLE時はcurrentTrackの変更だけ
      }
    }
  }

  
  return {
    playingStt,
    currentTrack,
    totalTracks: tracks.length,
    currentStr,
    eventInfo,
    playDisabled,
    play,
    pauseDisabled,
    pause,
    playPauseDisabled,
    playPause,
    playStopDisabled,
    playStop,
    stopDisabled,
    stop,
    prevTrackDisabled,
    prevTrack,
    nextTrackDisabled,
    nextTrack,
  };
};
