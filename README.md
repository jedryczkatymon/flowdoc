# Flowdoc

Flowdoc is a full-stack monorepo designed for posting food orders. It leverages a modern TypeScript ecosystem to ensure type safety and developer efficiency across both the frontend and backend.

## 🚀 Prerequisites

Before running the project locally, ensure you have the following installed:

- **Node.js**: Recommended LTS version.
- **pnpm** (v10.32.1+): The fast, disk-efficient package manager used for this workspace.
- **PostgreSQL**: The relational database engine required for the Prisma ORM.

## 🛠️ Installation & Setup

1. Clone the repository and navigate to the root folder.
2. Install dependencies for the entire workspace:

```bash
pnpm install
```

3. Configure the Backend:
   - Navigate to `packages/flowdoc-backend`.
   - Create a `.env` file and define your connection string:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/flowdoc"
```

4. Initialize the Database:

```bash
pnpm prisma generate
pnpm tsx prisma/seed.ts
```

5. Run the Project:
   - **Backend**: `cd packages/flowdoc-backend && pnpm run dev`
   - **Frontend**: `cd packages/flowdoc-frontend && pnpm run dev`

## 🧠 Tech Decisions

### Tech Stack

| Layer    | Technology        | Justification                                                                                                                                                      |
| -------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Frontend | React + Vite      | React provides a robust component-based architecture. Vite was chosen over CRA for its lightning-fast Hot Module Replacement (HMR) and superior build performance. |
| Backend  | Express.js        | A minimalist framework that allows for maximum control over middleware and routing logic.                                                                          |
| Database | Postgres + Prisma | Prisma acts as a type-safe query builder, reducing runtime errors and providing an intuitive API for complex relational data.                                      |

### Architecture

#### Why a Monorepo?

I chose a monorepo structure (via `pnpm` workspaces) to eliminate the "integration friction" often found in multi-repo setups. It allows for:

- **Shared Type Definitions**: Ensuring that API responses in the backend match the expectations of the frontend in real-time.
- **Simplified Tooling**: A single command installs all dependencies, and a unified versioning strategy keeps the project consistent.

#### Backend Layered Pattern

The backend follows a **Layered Architecture** (Routes → Controllers → Services). This separation of concerns ensures that:

- **Routes** only handle HTTP entry points.
- **Controllers** manage request validation and response orchestration.
- **Services** contain the core business logic, making the code testable and reusable.

### Security & Authorization

For the `/admin/orders` route, I implemented a custom header-based authorization middleware (`x-admin-token`).

- **The Approach**: While straightforward, this mirrors "API Key" patterns used in many production environments for internal service-to-service communication.
- **Trade-off**: While highly performant and easy to write and debug, it is less secure than JWT or session-based OIDC flows. It was chosen here to demonstrate middleware implementation and request interception as simply as possible.

### Hosting

| Layer    | Platform | Justification                                                                                          |
| -------- | -------- | ------------------------------------------------------------------------------------------------------ |
| Frontend | Vercel   | Native support for Vite/React projects with zero-config deployments and automatic preview URLs per PR. |
| Backend  | Railway  | Simple deploys and status of the top choice for backend hosting.                                       |

Both platforms were chosen for their generous free tiers and best-in-class developer experience — a developer doesn't need to be a DevOps engineer to understand the deployment workflow. Push to `main`, and the platform handles the rest.
