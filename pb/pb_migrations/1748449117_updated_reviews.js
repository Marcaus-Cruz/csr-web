/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4163081445")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation3479234172",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "owner",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "number4131486926",
    "max": null,
    "min": null,
    "name": "altRating",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4163081445")

  // remove field
  collection.fields.removeById("relation3479234172")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number4131486926",
    "max": null,
    "min": null,
    "name": "mainRating",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
