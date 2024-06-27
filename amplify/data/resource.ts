import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Calendar: a
    .model({
      dateString: a.id().required(),
      diet: a.boolean().default(false),
      noAlcoholOrCheatMeal: a.boolean().default(false),
      indoorWorkout: a.boolean().default(false),
      outdoorWorkout: a.boolean().default(false),
      oneGallonOfWater: a.boolean().default(false),
      progressPicture: a.boolean().default(false),
      read: a.boolean().default(false),
      task1: a.boolean().default(false),
      task2: a.boolean().default(false),
      task3: a.boolean().default(false),
      coldShower: a.boolean().default(false),
      activeVisualization: a.boolean().default(false),
    })
    .identifier(['dateString'])
    .authorization((allow) => [allow.owner()]),
  CalendarSettings: a
    .model({
      username: a.id().required(),
      programType: a.enum(['soft', 'hard']),
      // length: a.enum(['20', '30', '60', '75'])
      // phase: a.enum(['standard', 'phase 1'])
    })
    .identifier(['username'])
    .authorization((allow) => allow.owner()),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
})
