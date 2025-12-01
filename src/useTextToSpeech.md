# 仕様に影響を与える実機確認結果
- 再生開始まで時間がかかる事がある。
  - GUIはすぐに反応させたいが、音が出るまで時間がかかることがあるので、別Statusとする。
  - onstartハンドラで音が出始めるタイミングを取れる。
- pauseはイベント発火しないシステムが有る。
  - PAUSE状態への遷移はユーザー要求をトリガとし、onpause,onresumeハンドラには頼らない。
- pauseの後のresume()が効かない?

動作仕様
|状態名|play|play/pause|pause|stop|prev|next|
|-|-|-|-|-|-|-|
|IDLE|currentTrackで<br>再生開始|currentTrackで<br>再生開始|currentTrackで<br>再生一時停止|currentTrack=1|currentTrackを<br>デクリメント|currentTrackを<br>インクリメント|
|TO_PLAY|無効|無効|無効|再生停止<br>currentTrack=1|無効|無効|
|PLAY|無効|再生一時停止|再生一時停止|再生停止<br>currentTrack=1|前のトラック先頭<br>から再生|次のトラック先頭<br>から再生|
|PAUSE|再生再開|再生再開|無効|再生停止<br>currentTrack=1|前のトラック先頭<br>でPause|次のトラック先頭<br>でPause|
