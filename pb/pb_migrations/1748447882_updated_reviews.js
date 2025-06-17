/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4163081445")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "json989021800",
    "maxSize": 0,
    "name": "categories",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4163081445")

  // remove field
  collection.fields.removeById("json989021800")

  return app.save(collection)
})
