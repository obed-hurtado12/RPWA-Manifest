//Crea la Base de datos
let eq = window.indexedDB.open("pwadb", 1);

//Si se necesita actualizar haremos lo siguiente
req.onupgradeneeded = (e) => {
  console.log("DB updated");
  let db = e.target.result;
  db.createObjectStore("users", {
    keyPath: "id",
  });
};

req.onerror = (e) => {
  console.log("DB - Error -> ", e.target.error);
};

req.onsuccess = (e) => {
    let db = e.target.result;
    let transaction = db.transaction("users", "readwrite");

    transaction.onerror = (e) => {
        console.log("TR - Error -> ", e.target.error);
    };

    transaction.oncomplete = (e) => {
        console.log("TR - Done -> ", e);
    };

    let stored = transaction.objectStore("users");
    stored.add({
        id: new Date().toISOString(),
        username: "Obed",
        fullname: "Obed Hurtado",
    });

    stored.onsuccess = (e) => {
        console.log("ST - Success -> ", "Agregado correctamente");
    };
};