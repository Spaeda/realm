# Rainbow Database structure

According to MongoDB documentation, we use uuid instead of objectId (https://docs.mongodb.com/realm/mongodb/document-schemas/#uuid).

## Scene

| Name          | Type      | Required  | Description      |
| ------------- | --------- | --------- | ---------------- |
| _id           | uuid  | Yes       | Id of this Scene |
| anchor        | string    | Yes       | Id provided by Azure Spatial Anchor |
| geo_location  | decimal[] | Yes       | Geo coordinates |
| owner         | string  | Yes       | Owner of this scene |
| name          | string    | Yes       | Name of this scene |
| scale         | decimal[] | Yes       | Scale of this scene |
| created       | date      | Yes       | Creation date |
| assets        | asset[]   | Yes       | List of assets |
| effects       | effect[]  | No        | List of effects (T&A) triggered from an asset of this scene |
| hashtags      | string[]  | No        | List of hashtags |
| type          | string    | Yes       | Type of this scene |

## Asset

| Name          | Type      | Required  | Description      |
| ------------- | --------- | --------- | ---------------- |
| id            | uuid  | Yes       | Id of this asset |
| type          | string    | Yes       | Type of this asset |
| provider      | string    | No        | Provider for an external resource |
| name          | string    | Yes       | Name of this asset |
| url           | string    | No        | Url used to identify main file |
| scale         | decimal[] | No        | Scale of this asset |
| online        | bool      | No        | Asset file has been uploaded in Blob Storage |
| size          | decimal[] | No        | Size of this asset |

## Effect

| Name          | Type          | Required  | Description      |
| ------------- | ------------- | --------- | ---------------- |
| trigger       | effectType    | Yes       | |
| action        | effectType    | Yes       | |

## EffectType

| Name          | Type          | Required  | Description      |
| ------------- | ------------- | --------- | ---------------- |
| type          | string        | Yes       | Type of this effect |
| assets        | uuid[]    | No        | List of asset in relation with this effect |
| parameters    | object        | No        | Dynamic object to store additional informations |
