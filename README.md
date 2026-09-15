# GAMEReP

2D story-driven platformer about music, friendship and chasing a dream.

## Запуск

1.  Скачать репозиторий.
2.  Открыть `index.html` в браузере.

## GitHub Pages

`Settings → Pages → Deploy from branch`.

## Управление

-   A / D или стрелки --- движение
-   SPACE --- прыжок
-   SHIFT --- dash
-   J --- обычная атака
-   K --- музыкальная атака
-   Q --- специальная способность
-   E --- взаимодействие
-   ESC --- пауза

## Сохранение

Прогресс хранится в `localStorage`, backend не нужен.

## Важно

Игра использует Canvas API и процедурную векторную графику, поэтому
базовая версия запускается без внешних игровых ассетов. URL кнопки
MET200\$ задаётся только в `js/config.js`.

## GAMEReP 2.0 assets

The player sprites use Kenney CC0 assets from the Simplified Platformer Pack / Platformer Characters packs. The assets are loaded from Kenney's public GitHub mirror so the GitHub Pages build does not need a binary asset bundle.

Sources:
- https://kenney.nl/assets/simplified-platformer-pack
- https://kenney.nl/assets/platformer-characters
- https://github.com/ETdoFresh/kenney.nl

CC0 allows use in personal and commercial projects.

### Controls
- PC: A/D — move, W — jump, E — interact, J — attack, K — music attack, Q — special, Shift — dash, Esc — pause.
- Mobile: on-screen A/W/D/E/J/K/Q/DASH buttons.

### New gameplay
- Choose a character before starting a new game.
- Meet the friend and move to REP ПВЗ.
- Every 4 seconds REP ПВЗ pays 25 ₽ per recorded track.
- Attack damage grows with the number of recorded tracks.
- The boss starts automatically after the three main QUEST LOG objectives are complete.
- All playable surfaces are grounded; there are no floating platforms.
