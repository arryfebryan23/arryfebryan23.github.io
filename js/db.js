var dbPromised = idb.open("liga-bola", 1, function (upgradeDb) {
    upgradeDb.createObjectStore("players", {
        keyPath: 'id'
    });
    upgradeDb.createObjectStore("teams", {
        keyPath: 'id'
    });
});

function cekData(id, objectStore) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction(objectStore, "readonly");
                var store = tx.objectStore(objectStore);
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve('Tersimpan')
                } else {
                    reject('Belum disimpan')
                }
            });
    });
}


function saveData(data, objectStore) {
    dbPromised.
        then(function (db) {
            var tx = db.transaction(objectStore, 'readwrite');
            var store = tx.objectStore(objectStore);

            store.put({ value: data, id: data.id });
            return tx.complete;
        }).then(function () {
            console.log('Data berhasil disimpan.');
            M.toast({ html: 'Data berhasil disimpan!' });
        }).catch(function () {
            console.log('Data gagal disimpan.')
        })
}

function getAll(objectStore) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction(objectStore, "readonly");
                var store = tx.objectStore(objectStore);
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            }).catch(function () {
                console.log('Data gagal diambil.')
            });
    });
}

function getById(idData, objectStore) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction(objectStore, "readonly");
                var store = tx.objectStore(objectStore);
                return store.get(idData);
            })
            .then(function (data) {
                resolve(data);
            }).catch(function () {
                console.log('Data gagal diambil.')
            });
    });
}

function deleteDataById(idData, objectStore) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction(objectStore, "readwrite");
            var store = tx.objectStore(objectStore);
            store.delete(idData)
            return tx.complete;
        }).then(function () {
            M.toast({ html: 'Data berhasil dihapus!' });
            console.log('Item deleted');
        }).catch(function () {
            console.log('Data gagal dihapus.')
        });
}
