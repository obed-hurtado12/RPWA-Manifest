 //5. Cache and network race
  // const source = new Promise((resolve, reject) => {
  //   let flag = false;
    
  //   const failsOnce = () => {
  //     if (flag) {
  //       //Si ya falló una vez aquí la lógica para controlarlo
  //       if (/\.(png|jpg)$/i.test(e.request.url)) {
  //         resolve(caches.match("/img/no-found.png"));
  //       } else {
  //         reject("SourceNotfound");
  //       }
  //     } else {
  //       flag = true;
  //     }
  //   }
  //   fetch(e.request).then((resFetch) => {
  //     resFetch.ok ? resolve(resFetch) : failsOnce();
  //   }).catch(failsOnce);
  //   caches
  //   .match(e.request)
  //   .then((sourceCache) => {
  //     sourceCache ? resolve(sourceCache) : failsOnce();
  //   });
  // });

  //4. Cache with Network Update
  //Primero todo lo devuelve del caché
  //Después actualiza  el recurso
  //Se ocuapa cuando nuestro equipo tenga:
  //Rendimiento crítico. Siempre se queda un paso atrás
  // const source = caches.open(STATIC).then((cache) => {
  //   fetch(e.request).then((resFetch) => {
  //     cache.put(e.request, resFetch);
  //   });

  //   return cache.match(e.request);
  // });
  // e.respondWith(source);

  //3. Network with Cache FallbackNetwork with Cache Fallback
  // const source = fetch(e.request)
  //   .then((res) => {
  //     if (!res) throw Error("Notfound");
  //     caches.open(DYNAMIC).then((cache) => {
  //       cache.put(e.request, res);
  //     });
  //     return res.clone();
  //   })
  //   .catch((err) => {
  //     return caches.match(e.request);
  //   });
  // e.respondWith(source);
// https://chat.openai.com/c/a442e470-0270-4898-9451-42c9fea5d1e5
  //2. Cache with Network Fallback|
  // const source = caches.match(e.request)
  // .then((res) => {
  //     if(res) return res;
  //     return fetch(e.request).then((resFetch) => {
  //         caches.open(DYNAMIC).then((cache) => {
  //             cache.put(e.request, resFetch);
  //         });
  //         return resFetch.clone();
  //     });
  // });

  //1. Cache Only
  //e.respondWith(caches.match(e.request));



  // ---------------------------------------------------------------------------------------------

  //Actividad 16/10/2023
  // self.addEventListener("fetch", (e) => {
  //   console.log(e.request);
  
  //   const source = caches.match(e.request) // Intenta encontrar una coincidencia en la caché para la solicitud actual (e.request).
  //   .then((res) => {
  //     if (res) return res; // Si se encuentra una coincidencia en la caché, devuelve esa respuesta directamente.
  
  //     return fetch(e.request) // Si no hay coincidencia en la caché, realiza una solicitud de red para obtener la respuesta.
  //       .then((resFetch) => {
  //         if (!resFetch || resFetch.status !== 200) {
  //           // Si la respuesta no es válida (nula o no tiene un estado 200), muestra la página de error desde la caché.
  //           return caches.match('pages/offline.html');
  //         }
  
  //         caches.open(DYNAMIC).then((cache) => {
  //           cache.put(e.request, resFetch); // Guarda la respuesta en la caché dinámica (DYNAMIC).
  //         });
  //         return resFetch.clone(); // Devuelve una copia de la respuesta original para su uso en el cliente.
  //       })
  //       .catch(() => {
  //         // Si no hay conexión a Internet o se produce un error en la solicitud de red, muestra la página de error desde la caché.
  //         return caches.match('pages/offline.html');
  //       });
  //   });