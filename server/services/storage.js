const { StorageManager } = require('@slynova/flydrive')
const { AmazonWebServicesS3Storage } = require('@slynova/flydrive-s3')
const config = require('../config/storage')

function Storage() {
  const storage = new StorageManager(config)

  storage.registerDriver('s3', AmazonWebServicesS3Storage)

  return {
    // the entire interface if needed
    _internal: storage,

    // most used exports
    getSignedUrl: storage.disk().getSignedUrl,
    delete: storage.disk().delete,
    put: storage.disk().put,
    exists: storage.disk().exists,
  }
}

let storageInstance

function getStorageInstance() {
  return storageInstance || ((storageInstance = new Storage()), storageInstance)
}

exports.storage = getStorageInstance()
