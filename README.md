# 2026-1-t4-g1

## Setup
Levantar servidor con el comando `python -m http.server 5500` o utilizando la extensión live server de VS Code.

## Funcionamiento notificaciones.
Al activarlas se generan notificaciones aleatorias cada 30 segundos, dependiendo también de la presencia de participantes y gastos dentro del evento.

## Uso de IA.
Se utilizó para:
- Generar el CSS de la página.
- Replicar el algoritmo utilizado por Splittypie para dividir los gastos y calcular los balances de cada integrante.

## Referencias.
- Implementación del Service Worker basado en: https://developer.mozilla.org/es/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers

- Implementación de notificaciones basado en: https://developer.mozilla.org/es/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Re-engageable_Notifications_Push