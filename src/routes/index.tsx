import { type ParentComponent, For } from 'solid-js'
import { Title, useRouteData } from 'solid-start'
import {
  createServerAction$,
  createServerData$,
  redirect,
} from 'solid-start/server'

type Fruit = {
  fruitId: number
  name: string
}

async function getFruit(db: D1Database): Promise<Fruit[]> {
  const dbResult = await db
    .prepare(`SELECT fruitId, name FROM FRUIT`)
    .all<Fruit>()
  return dbResult.results ?? []
}

async function addFruit(db: D1Database, fruitName: string): Promise<Fruit> {
  return db
    .prepare(
      `
      INSERT INTO Fruit (name) VALUES (?1) 
      RETURNING fruitId, name`
    )
    .bind(fruitName)
    .first<Fruit>()
}

export const routeData = () => {
  return createServerData$(async (_, { env, request }) => {
    return getFruit(env.__D1_BETA__db)
  })
}

const Home: ParentComponent = () => {
  const fruit = useRouteData<typeof routeData>()

  const [addingFruit, { Form: AddFruitForm }] = createServerAction$(
    async (form: FormData, { env, request }) => {
      await addFruit(env.__D1_BETA__db, form.get('fruitName') as string)
      return redirect('/')
    }
  )

  return (
    <>
      <Title>The Definitive List of Fruit</Title>
      <h1>The Definitive List of Fruit</h1>
      <ol>
        <For each={fruit()}>{(fruit) => <li>{fruit.name}</li>}</For>
      </ol>
      <AddFruitForm>
        <input name="fruitName" />
        <button type="submit" disabled={addingFruit.pending}>
          Add Fruit
        </button>
      </AddFruitForm>
    </>
  )
}

export default Home
