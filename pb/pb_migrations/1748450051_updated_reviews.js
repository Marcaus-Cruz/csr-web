/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4163081445")

  // update field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "file3277268710",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "thumbnail",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4163081445")

  // update field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "file3277268710",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "thumbnail",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
