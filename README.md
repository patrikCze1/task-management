# Taskly

A task management app built with Nuxt 4, Vue 3, Pinia, Tailwind CSS, and Zod.

## Features

- Create and manage projects
- CRUD operations for tasks (title, description, due date, priority)
- Form validation with Zod schemas
- Filter tasks by status (all/active/completed) and priority
- Dark mode with system preference detection
- Custom error page

## Tech Stack

- **Framework:** Nuxt 4 / Vue 3
- **State:** Pinia (localStorage persistence)
- **Styling:** Tailwind CSS 4
- **Validation:** Zod 4
- **Testing:** Vitest (unit + Nuxt environment)

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Starts the dev server on `http://localhost:3000`.

## Testing

```bash
pnpm test
```

Run a specific test project:

```bash
pnpm test -- --project unit
pnpm test -- --project nuxt
```

## Production

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Docker

```bash
docker build -t taskly .
docker run -p 3000:3000 taskly
```

## Project Structure

```
app/
  components/     # Vue components (base, input, project, task, the)
  composables/    # Composables (useTaskCrud, useTaskFilters, useTaskValidation, etc.)
  pages/          # Nuxt pages (index, projects/[id])
  stores/         # Pinia stores (projectStore)
shared/
  enums/          # Enums (TaskPriorityEnum)
  schemas/        # Zod validation schemas (task)
  types/          # TypeScript type definitions (task, project, taskFilter)
test/
  unit/           # Unit tests (schemas)
  nuxt/           # Nuxt environment tests (composables)
```
