declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
  }

  interface Process {
    env: ProcessEnv;
  }
}

declare const process: NodeJS.Process;
