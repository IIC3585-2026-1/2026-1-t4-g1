# 2026-1-t4-g1

## Cómo levantar el proyecto

### Opción A — Live Server (VS Code)

1. Abrir la carpeta del proyecto en VS Code
2. Clic derecho sobre `index.html` → "Open with Live Server"
3. La app abrirá en `http://127.0.0.1:5500`

### Opción B — Python

```bash
python -m http.server 5500
```

Luego abrir `http://127.0.0.1:5500` en el navegador.

---

## Instalación (Add to Home Screen)
1. Abrir la app en el navegador 
2. Clic en el ícono de "+" o "Add to Home Screen" (depende del navegador)
3. Seguir las instrucciones para agregar la app a la pantalla de inicio del dispositivo. Esto instalará la PWA y permitirá usarla como una app nativa, incluyendo el acceso a notificaciones push.

---

## Notificaciones push
Las notificaciones push se implementaron usando **Firebase Cloud Messaging (FCM)**. 

El flujo es:
1. Al hacer clic en **"Activar notificaciones"** el navegador solicita permiso y genera un **Token FCM** único para ese dispositivo (visible en la consola del navegador)
2. Ese token identifica el dispositivo ante Firebase
3. Desde Firebase Console → **Cloud Messaging** → **"Send test message"** se puede enviar una notificación a ese token específico
4. La notificación llega al sistema operativo mediante el Service Worker, sin importar si la pestaña está activa


## Uso de IA.
Se utilizó para:
- Generar el CSS de la página.
- Replicar el algoritmo utilizado por Splittypie para dividir los gastos y calcular los balances de cada integrante.
- Implementar la integración con Firebase Cloud Messaging (hacer paso a paso)

## Referencias.
- Implementación del Service Worker basado en: https://developer.mozilla.org/es/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers

- Implementación de notificaciones basado en: https://developer.mozilla.org/es/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Re-engageable_Notifications_Push