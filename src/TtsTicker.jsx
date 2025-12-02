import React, { useMemo } from "react";

export function TtsTicker({ currentStr, displayStartIndex }) {
  // 1文字あたりの幅(px)を仮定（フォントサイズに応じて調整）
  const charWidthPx = 16;

  // 画面幅に収まる文字数を計算
  const maxChars = useMemo(() => {
    return Math.floor(window.innerWidth / charWidthPx);
  }, []);

  // 表示文字列全体を保持
  const displayStr = currentStr;

  // スクロール位置を計算
  const translateX = -(displayStartIndex * charWidthPx);

  return (
    <div className="w-full overflow-hidden whitespace-nowrap text-lg font-mono">
      <div
        className="
          inline-block
          transition-transform
          duration-500
          ease-linear
        "
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {displayStr}
      </div>
    </div>
  );
}
