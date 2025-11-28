
import React, { useState, useRef, useEffect } from "react";

export const useTextToSpeech = ( tracks ) => {
  const [playingStt, setPlayingStt] = useState("IDLE");
  const [currentTrack, setCurrentTrack] = useState(0);
  const synth = window.speechSynthesis;
  const utteranceRef = useRef(null);

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
      return;
    }

    // 指定トラック文字列を登録
    const u = new SpeechSynthesisUtterance(tracks[index]);
    utteranceRef.current = u;

    // 再生開始時ハンドラ
    u.onstart = () => {
      if (pauseImmediately) {
        synth.pause()
        console.log(`Pause track ${index}`);
      } else {
        setPlayingStt("PLAY");
        console.log(`Start track ${index}`);
      }
    };
    // 一時停止時ハンドラ
    u.onpause = () => {
      setPlayingStt("PAUSE");
      console.log("Pause")
    }
    // 一時停止解除時ハンドラ
    u.onresume = () => {
      setPlayingStt("PLAY");
      console.log("Resume")
    }
    // トラック最後まで再生したときハンドラ
    u.onend = () => {
      if (currentTrack < tracks.length - 1) {
        console.log(`Track ${index} ended`);
        setCurrentTrack(index + 1);
        playTrack(index + 1); // 次を再生
      }
    };

    // 先頭から再生開始
    synth.speak(u);
  };

  const play = () => {
    if (playingStt === "IDLE") {
      playTrack(currentTrack);
    }
  };

  const pause = () => {
    if (playingStt === "PLAY") {
      synth.pause();
    }
  };

  const resume = () => {
    if (playingStt === "PAUSE") {
      synth.resume();
    }
  }

  const stop = () => {
    synth.cancel();
    console.log("Stop")
    setPlayingStt("IDLE");
    setCurrentTrack(0);
  };

  const playPause = () => {
    if (playingStt === "IDLE") {
      play()
    } else if (playingStt === "PLAY") {
      pause()
    } else if (playingStt === "PAUSE") {
      resume()
    } else {
      console.log(`Unexpected stt ${playingStt}`)
    }
  }
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
    playPause,
    stop,
    prevTrack,
    nextTrack,
  };
};
