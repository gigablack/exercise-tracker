# Exercise Tracker API

## Home Page https://exercise-tracker-api.now.sh/

## [project url]/api/exercise/new-user

This endpoint receive a **username** by *POST*. If the user does not exist, it will be created and saved in the database. If the user exist, it will be returned from the database.

## [project url]/api/exercise/add

This endpoint receive by *POST* a **userId**, a **description**, a **duration** in *minutes* and a **date**. Then register a new exercise in the database with the **userId**.

## [project url]/api/exercise/log

This endpoint receive by *GET* different queries. **userId**, **from**, **to**, **limit** and return the exercises that belong to that user in that interval of time.

### Example: [project url]/api/exercise/log?[userId]&{from}&{to}&{limit}

- **[]** = Required
- **{}** = Optional
- **limit** = Number
- **from** - **to** = Dates