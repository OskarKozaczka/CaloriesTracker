import { precacheAndRoute } from 'workbox-precaching'
  
self.addEventListener('push', event => {console.log("push")})

precacheAndRoute(self.__WB_MANIFEST)
